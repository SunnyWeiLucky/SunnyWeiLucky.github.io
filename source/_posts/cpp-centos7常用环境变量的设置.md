---
title: cpp-centos7常用环境变量的设置
categories: [Cpp,gcc]
tags:
  - env
abbrlink: 1768093973
date: 2020-06-19 11:56:16
---

我们在centos7开发的cpp的时候，在编译的时候需要设置一些常有的环境变量，如头文件的路径，动态库的路径



### 设置c语言的头文件的搜索路径

~~~
export C_INCLUDE_PATH =
~~~

### 设置c语言的链接库的搜索路径

~~~
export LIBRARY_PATH = 
~~~

### 设置cpp的头文件的搜索路径

~~~
export CPLUS_INCLUDE_PATH = 
~~~

### 设置cpp的链接库的搜索路径

~~~
export LD_LIBRARY_PATH = 
~~~

### 对于GCC版本的选择

我们在用cmake编译源码的时候，有时候需要gcc不同的版本，以支持c++11的特性

`gcc4.8.5以下不支持``gcc5.1.0支持c++11`,我们在编译的时候可以显示的设置编译器的选择,下面是我自己编译的gcc5.1.0版本，这样在编译的时候就会调用

~~~
export CC=/usr/local/bin/gcc
export CXX=/usr/local/bin/g++
~~~



