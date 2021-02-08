---
title: opencv-源码安装
categories: [Media,image]
tags: opencv
abbrlink: 3084764285
date: 2020-04-29 11:41:25
---

### 一，源码下载

​		通过git源码下载OpenCV，直接在GitHub上下载的速度特别慢，所以我们需要先将其fork，然后同步到gitee上面，通过自己的gitee账号来进行下载，这个速度比较快。

~~~
git clone https://gitee.com/helioswei/opencv.git
~~~



### 二，源码编译

##### 1，cmake版本需求

~~~
CMake 3.5.1 or higher is required.  You are running version 2.8.12.2
我们需要先源码编译cmake
~~~



##### 2，安装相关的依赖

~~~
1，需要Python的依赖包

~~~



##### 2，编译

~~~
在OpenCV目录中，创建build目录，然后直接cmake
cd opencv
mkdir build
cd build
cmake ..
~~~

