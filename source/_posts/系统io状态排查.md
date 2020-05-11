---
title: 系统io状态排查
categories: centos7
tags: tools
abbrlink: 4148759935
date: 2019-04-28 14:36:56
---

&nbsp;&nbsp;&nbsp;&nbsp;这几天在排查自己写的转码服务性能上不去，转码特别慢，正常情况下，转码时CPU可以飙到很高，但是在问题机器上CPU只要50%左右，排查了好久，最终确定是某个其它服务io资源占用了太多，导致了我的转码服务io占用几乎没有，所以出现了问题，介绍几个io的工具，帮助以后查看系统的情况。

### iostat
&nbsp;&nbsp;&nbsp;&nbsp;iostat主要是用来查看系统的io使用情况，
只记录自己使用的命令

#### 下载
```
yum install sysstat
```

#### 使用
```
iostat [-c ] [ -d ] [ -k ] [ -m ] [ -x ]
```
