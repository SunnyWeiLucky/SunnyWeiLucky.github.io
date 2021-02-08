---
title: ffmpeg-内存io模式(内存区做输入或输出)
categories: [Media,video]
tags:
  - ffmpeg
  - io
abbrlink: 2452888490
date: 2020-10-14 15:03:21
---

​	在转码的过程中，我们有时候需要从远程下载文件，当文件很大的时候会占用本地的磁盘空间，同时下载的时间也比较的长，这时候我们考虑直接读取流信息或者写入流信息来进行操作，而不是上传或者下载整个文件来解决。

### 实现方法

​	转码的基础逻辑不变，仅仅是在输入输出读取的方式不同，我们需要自己实现输入输出的函数。

#### 关键结构体

​	`AVIOContext`，我们需要初始化这个结构体来存放内存的数据。

### 内存读取数据

​		转码的基本流程不变，仅仅是在开始读取数据的时候有些不同

#### 读取本地文件

![file](/images/ffmpeg/file.png)

#### 读取流文件

![stream](/images/ffmpeg/stream.png)

![read](/images/ffmpeg/readstream.png)

### ffmpeg内存读取数据

​	如图,<font color="red">红色框</font>内是当输入是流时的处理，<font color="green">绿色框</font>内是当输入是文件时的处理，二选一即可。![input.png](/images/ffmpeg/stream/input.png)

`fill_iobuffer` 函数是我们自己实现的输入流的函数，内容如下：

~~~cpp
   359 //读取流数据
   360 int fill_iobuffer(void *opaque, uint8_t *buf, int buf_size) {
   361     string hosts = "192.168.50.31:7480";
   362     string ak = "11043ee2070d01eb5740f9870dfe3abd";
   363     string sk = "bb31a3a96b829976513ee62b4e28ee3f";
   364     S3::Client client(hosts, ak, sk);
   365     static uint64_t offset = 0;
   366     uint64_t num;
   367     try {
   368         // num  = client.GetObject("leopardsrc", "video-H263-AC3.avi",offset,
   369         // buf_size, (char* )buf);
   370         num = client.GetObject("leopardsrc", "video-H264-AAC.m4v", offset,
   371                                buf_size, (char *)buf);
   372         offset += num;
   373         return num;
   374     }
   375     catch (S3::S3Exception &e) {
   376         LOG(ERROR) << e.str();
   377         return 0;
   378     }
   379 }   
~~~

### ffmpeg内存存储数据

​	如图,<font color="red">红色框</font>内是当输入是流时的处理，<font color="green">绿色框</font>内是当输入是文件时的处理，二选一即可。![output.png](/images/ffmpeg/stream/output.png)

`write_buffer` 函数是我们自己实现的输出流的函数，内容如下：

~~~cpp
   614 int write_buffer(void *opaque, uint8_t *buf, int buf_size) {
   627     if (!feof(fp_write)) {
   634         int true_size = fwrite(buf, 1, buf_size, fp_write);
   635         return true_size;
   636     } else {
   637         return -1;
   638     }
   639 } 
~~~

​	目前这个是测试ffmpeg能够支持自己的输出函数，如果是关于s3的输出支持，需要看s3关于流的实现接口。目前s3是不支持流的处理，只能考虑s3的分块上传。

#### 输出到内存注意事项

##### avio_open

​	当你的输出函数是自己实现的，不是默认的写入到本地文件，则`avio_open`这个函数不能够被调用。如图,加入一个判断，当输出为自定义函数时不调用avio_open函数。![avio.png](/images/ffmpeg/stream/avio.png)

同样，在释放资源的时候也需要做相同的处理。在文件`mediainfo.h`中的`~FileInfoStruct()`函数中加入一层判断。![avio1.png](/images/ffmpeg/stream/avio1.png)

##### 输出封装格式的限制

​	有一些封装格式不支持以流的方式作为输出，如mp4，错误信息如下：

~~~shell
[mp4 @ 0x8d0c80] muxer does not support non seekable output
~~~

​	解决方法：通过将mp4文件进行碎片化，即生成Fmp4格式来进行操作。如图  ![fmp4.png](/images/ffmpeg/stream/fmp4.png)

​	我们需要添加`movflags`参数来进行处理。