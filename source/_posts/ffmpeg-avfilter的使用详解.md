---
title: ffmpeg_avfilter的使用详解
categories: [Media,video]
tags:
  - ffmpeg
abbrlink: 4030313287
date: 2019-03-27 10:23:18
---

&nbsp;&nbsp;&nbsp;&nbsp;在ffmpeg，我们对视音频进行一些处理，如添加水印，有个很方便的库，avfilter，

过滤的过程
解码后的画面 -> buffer过滤器 -> 其他过滤器 -> buffersink 过滤器 -> 处理好的画面