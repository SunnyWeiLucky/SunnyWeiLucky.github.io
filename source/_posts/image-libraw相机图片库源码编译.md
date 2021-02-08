---
title: image-libraw相机图片库源码编译
categories: [Media,image]
tags: libraw
abbrlink: 1731984249
date: 2020-01-17 17:37:04
---

~~~
LibRaw is a library for reading RAW files from digital photo cameras (CRW/CR2, NEF, RAF, DNG, MOS, KDC, DCR, etc, virtually all RAW formats are supported).
~~~

### 一，源码下载

~~~
git clone https://github.com/LibRaw/LibRaw.git
~~~

### 二，编译环境准备

~~~
1，查看文件DEVELOPER-NOTES，提示我们,执行mkdist.sh脚本来生成编译的东西
2， 安装需要的软件
	 yum install autoconf automake freetype-devel gcc gcc-c++ libtool make pkgconfig -y
	 yum install wget -y
	 yum install lcms2 lcms2-devel -y
	 yum install jasper jasper-devel
~~~

### 三，准备编译遇到的错误

~~~
下载dcraw.c失败，我们需要手动的下载
修改mkdist.sh脚本文件
wget https://www.dechifro.org/dcraw/dcraw.c
然后在执行 mkdist.sh脚本
~~~

### 四，编译

~~~
./configure --prefix=/usr/local/helios CXX=/usr/local/bin/g++
make
make install

~~~

### 五，执行遇到的问题

~~~
在程序中执行 open_file CR2的时候程序崩溃，因为自己的g++编译是4.8.5的，但是更新到4.9.2后就成功了
~~~

