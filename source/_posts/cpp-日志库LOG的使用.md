---
title: cpp-日志库LOG的使用
categories: [Cpp,log]
tags:
  - easyloggingcpp
abbrlink: 1373770285
date: 2020-09-11 17:52:33
---

​	在开发的时候，我们经常要写日志，这里提供一个日志库的使用方法；

​	目前我常用的cpp的日志库是这个[easyloggingcpp](https://github.com/amrayn/easyloggingpp)，官网有详细的一些说明怎么使用的，我这里记录一些使用中需要注意的地方：

### 编译

easyloggingcpp编译的时候比较的简单，直接把easyloggingcpp.h和easyloggingcpp.cpp放到自己的项目中进行编译就好了。

### 多线程中使用

在多线程中使用，需要设置几个比较重要的点，不然就会抛出异常的错误，导致程序中断，有以下几点

1. 在编译的时候需要需要添加参数，`-DELPP_THREAD_SAFE`用以支持多线程，使用cmake进行编译时，需要在Cmakefile文件中设置如下参数，并且cmake的版本需要在3.0以上

   ~~~
   SET(CMAKE_CXX_FLAGS "-DELPP_THREAD_SAFE")
   ~~~

2. 在使用的文件中，需要预定义一个变量

   ~~~
   #define ELPP_THREAD_SAFE
   ~~~

### 主进程使用

我们需要在程序的入口位置设置下面的环境变量

~~~
INITIALIZE_EASYLOGGINGPP
~~~

