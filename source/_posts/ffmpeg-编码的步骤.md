---
title: ffmpeg-编码的步骤
categories: [Media,video]
tags: ffmpeg
abbrlink: 3394448682
date: 2019-05-05 14:39:17
---

&nbsp;&nbsp;&nbsp;&nbsp;总结一下编码的大致过程，方便自己下一次的处理，分为音频编码和视频

### 音频编码的过程

#### 1，打开输出的文件流
```
AVFormatContext *ofmt_ctx;
avformat_alloc_output_context2(&ofmt_ctx, NULL, NULL, filename);
```

#### 2，创建输出的音频流
```
AVStream *audioStream;
AVCodec *encoder;
AVCodecContext *enc_ctx;
audioStream = avformat_new_stream(ofmt_ctx, NULL);
if (!audioStream){
	av_log();
}
encoder = avcodec_find_encoder(AV_CODEC_ID_AAC);
if(!encoder){
	av_log();
}

```
#### 3，设置编码的上下文
```
enc_ctx = avcodec_alloc_context3(encoder);
if (!enc_ctx){
	av_log();
}
enc_ctx -> bit_rate = 64000;
enc_ctx -> sample_rate = 44100;
enc_ctx -> channel_layout = 2;//这个可以根据输入来设置
enc_ctx -> channels = av_get_channel_layout_nb_channels(enc_ctx -> channel_layout);
enc_ctx -> sample_fmt = encoder -> sample_fmts[0];
AVRational time_base = {1, enc_ctx -> sample_rate};
enc_ctx -> time_base = time_base;

```
#### 4，设置flag
```
if (ofmt_ctx -> oformat -> flags & AVFMT_GLOBALHEADER)
	enc_ctx -> flags |= AV_CODEC_FLAG_GLOBAL_HEADER;
```

#### 5，打开编码器
```
ret = avcodec_open2(enc_ctx, encoder, NULL);
if (ret < 0){
	av_log();
}
```

#### 6，设置codec_tag
```
audioStream -> codecpar -> codec_tag = 0;
```

#### 7，copy code to stream
```
ret = avcodec_parameters_from_context(audioStream -> codecpar, enc_ctx);
```
