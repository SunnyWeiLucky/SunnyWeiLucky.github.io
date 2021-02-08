---
title: image-libvips图片处理库源码编译
categories: [Media,image]
tags: libvips
abbrlink: 3448999942
date: 2020-01-15 09:43:01
---

~~~
目前主要是用于苹果平台图片heic图片的转码处理
~~~

### 1，从GitHub上下载源码

~~~
git  clone  https://github.com/libvips/libvips.git
~~~

### 2，下载需要的依赖

~~~
yum install gtk-doc
yum install gobject-introspection
yum install gobject-introspection-devel
yum install expat-devel
yum install glib glib-devel
yum install gcc gcc-c++
yum install make pkgconfig autoconf automake
~~~

### 3，编译出现的问题

~~~
libpango-1.0.so: undefined reference to `fribidi_get_par_embedding_levels_ex'

检查ldd /usr/lib64/libpango-1.0.so发现，有一个ibfribidi.so.0 => /lib64/libfribidi.so.0链接开始链接的是我自己的，有问题，改回来就好了，可能是版本冲突的原因，需要保证链接库的版本一致
~~~



### 3，安装我们需要支持的图片格式依赖

~~~
yum install -y libjpeg-turbo libjpeg-turbo-devel
yum install -y libexif libexif-devel
yum install -y giflib giflib-devel
yum install -y librsvg2 librsvg2-devel
yum install -y libtiff libtiff-devel 
yum install -y libwebp libwebp-devel
yum install -y libpng libpng-devel
yum install -y  libgsf libgsf-devel
yum install -y poppler-glib poppler-glib-devel
yum install -y openslide openslide-devel
yum install -y orc orc-devel
yum install -y libimagequant libimagequant-devel
yum install -y cfitsio cfitsio-devel
yum install -y matio matio-devel
yum install -y fftw fftw-devel
~~~

### 4，安装libheif

~~~
1,git 源码安装libde265,## 注意这个必须安装，不然在编译libvips时，虽然configure表示支持，但是在真正使用的时候会报错

2，git源码安装libheif，需要注意 配置libde265支持
~~~

#### 5，编译

~~~
1，./configure
2,make && make install
自己写的myconfig.sh文件

  1 #!/bin/sh                                                                                                                          
  2 commoninclude=/usr/include
  3 commonlib=/usr/lib64
  4  
  5 CPPFLAGS="-g -Wall -I${commoninclude}  -L${commonlib}"    \
  6 CXXFLAGS="-g -Wall -I${commoninclude}  -L${commonlib}"    \
  7 PKG_CONFIG_PATH="/usr/local/lib/pkgconfig:/usr/local/heif/lib/pkgconfig"         \
  8 ./configure  --enable-gtk-doc-pdf=yes --prefix=/usr/local/vips    \

~~~

