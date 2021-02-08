---
title: poco-源码编译包含mysql
categories: Cpp
tags:
  - poco
abbrlink: 3587508548
date: 2020-04-17 10:08:59
---

### 一，源码下载库

~~~
先在git上fork，然后同步到码云上，在clone可以加快下载的速度
git clone https://gitee.com/helioswei/poco.git
~~~



### 二，编译环境准备

~~~
yum install gcc-c++ make openssl-devel
~~~



### 三，安装mysql

~~~
见mysql的源码安装，安装时没有头文件，所以我们需要安装头文件
yum install mysql-devel
~~~



### 四，编译

~~~
需要提前安装GCC5.1.0来支持c++14
./configure --shared --prefix=/usr/local/poco  --cflags=-std=c++14 --include-path=/usr/include/mysql/ --library-path=/usr/lib64/mysql/ --omit=Data/ODBC,MongoDB,PDF
~~~

