---
title: ffmpeg-内存io模式(内存区做输入或输出)
categories: ffmpeg
tags:
  - ffmpeg
  - io
abbrlink: 2452888490
date: 2020-10-14 15:03:21
---

​	在转码的过程中，我们有时候需要从远程下载文件，当文件很大的时候会占用本地的磁盘空间，同时下载的时间也比较的长，这时候我们考虑直接读取流信息或者写入流信息来进行操作，而不是上传或者下载整个文件来解决。



### 内存读取数据

​		转码的基本流程不变，仅仅是在开始读取数据的时候有些不同

#### 读取本地文件

![file](/images/ffmpeg/file.png)

#### 读取流文件

![stream](/images/ffmpeg/stream.png)

![read](/images/ffmpeg/readstream.png)