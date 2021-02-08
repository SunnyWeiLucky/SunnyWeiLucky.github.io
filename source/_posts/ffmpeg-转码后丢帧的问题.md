---
title: ffmpeg-转码后丢帧的问题
categories: [Media,video]
tags: ffmpeg
abbrlink: 3032443121
date: 2020-09-29 16:35:30
---

在生产环境的使用中，我们转码有时候会出现缺帧的情况，比如一个10s的视频，经过转码后只有了7s，这就是因为转码逻辑没有处理好，导致丢失了大量的帧。

### 函数

##### ffmpeg提供了两组函数，分别用于编码和解码：

- 解码：`avcodec_send_packet()`、`avcodec_receive_frame()`
- 编码：`avcodec_send_frame()`、`avcodec_receive_packet()`



##### 在一个循环体内去接收codec的输出

即周期性地调用`avcodec_receive_()`来接收codec输出的数据：

- **解码**：调用`avcodec_receive_frame()`，如果成功会返回一个包含未压缩数据的`AVFrame`。

- **编码**：调用`avcodec_receive_packet()`，如果成功会返回一个包含压缩数据的`AVPacket`。

- **反复**地调用`avcodec_receive_packet()`直到返回 `AVERROR(EAGAIN)`或其他错误。返回`AVERROR(EAGAIN)`错误表示codec需要新的输入来输出更多的数据。对于每个输入的packet或frame，codec一般会输出一个frame或packet，**但是也有可能输出0个或者多于1个**。部分代码实例：

- ~~~cpp
  1514     while(true){
    1515         //对于每个输入的packet或者frame，codec一般会输出一个frame或者packet，但是也有可能输出0个或者多于1个
    1516         //对于多于1个的情况，我们使用while来解决
    1517         error = avcodec_receive_packet(encCtx, &outputPacket);
    1518         if (error == AVERROR(EAGAIN)) {
    1519             error = 0;
    1520             // cout << "EAGAIN" << endl;
    1521             goto cleanup;
    1522         } else if (error == AVERROR_EOF) {
    1523             error = 0;
    1524             goto cleanup;
    1525         } else if (error < 0) {
    1526             av_log(NULL, AV_LOG_ERROR, "Could not encode frame\n");
    1527             goto cleanup;
    1528         } else { 
    1529             *dataPresent = 1;
    1530         }        
    1531                  
    1532         outputPacket.stream_index = streamIndex;
    1533                  
    1534         //转换pts
    1535         av_packet_rescale_ts(&outputPacket, encCtx->time_base,
    1536                              ofmtCtx->streams[streamIndex]->time_base);
    1537     
    1538         // if (AVMEDIA_TYPE_AUDIO == encCtx -> codec_type){
    1539         //  _pts2ms = outputPacket.pts *av_q2d(ofmtCtx -> streams[streamIndex] ->
    1540         // time_base) * 1000 ;//单位ms(微妙)
    1541         //}      
    1542         //_pts2ms = outputPacket.pts *av_q2d(ofmtCtx -> streams[streamIndex] ->
    1543         // time_base) * 1000 ;//单位ms(微妙)
    1544         pts2ms = outputPacket.pts *
    1545                  av_q2d(ofmtCtx->streams[streamIndex]->time_base) *
    1546                  1000;  //单位ms(微妙)
    1547                         //编码视频和音频的时候，两者的时间是不一样的，为了保证进度一直向前，所以取最大值
    1548         if (pts2ms > _pts2ms) _pts2ms = pts2ms;
    1549         av_log(NULL, AV_LOG_INFO, "progress: %s\n", printProgress().c_str());
    1550         sendProgress();
    1551         if (!_ip.empty()) printProgress(_ip, _port);
    1552                  
    1553         if (*dataPresent &&
    1554             (error = av_interleaved_write_frame(ofmtCtx, &outputPacket)) < 0) {
    1555             av_log(NULL, AV_LOG_ERROR, "Could not write frame,%s,%s:%d\n",
    1556                    av_err2str(error), __FILE__, __LINE__);
    1557             goto cleanup;
    1558         }        
    1559     }   
  ~~~

- 流处理结束的时候需要flush（洗刷） codec。因为codec可能在内部缓冲多个frame或packet，出于性能或其他必要的情况（如考虑B帧的情况）。 处理流程如下：

  1. 调用`avcodec_send_()`传入的AVFrame或AVPacket指针设置为NULL。 这将开启draining mode（排水模式）

     ~~~cpp
       1653     int dataWritten;
       1654     int ret;       
       1655     if (NULL != output->videoStream) {
       1656         do {       
       1657             dataWritten = 0;
       1658             ret = encodeMediaFrame(NULL, output->formatContext,
       1659                                    output->videoCodecCtx, &dataWritten,
       1660                                    output->videoStream->index);
       1661             if (0 > ret) {
       1662                 av_log(NULL, AV_LOG_ERROR,
       1663                        "Failed whileflush video encode, %s:%d\n", __FILE__,
       1664                        __LINE__);
       1665                 return ret;
       1666             }      
       1667             av_log(NULL, AV_LOG_INFO, "flush video encoder data\n");
       1668         } while (dataWritten);
       1669     }  
     ~~~

  2. 反复地调用`avcodec_receive_()`直到返回`AVERROR_EOF`的错误，这个方法这个时候不会返回`AVERROR(EAGAIN)`的错误，除非你忘记了开启draining mode

  3. codec可以重新开启，但是需要先调用 `avcodec_flush_buffers()`来重置codec

