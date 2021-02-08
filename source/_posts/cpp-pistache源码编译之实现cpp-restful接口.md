---
title: cpp-pistache源码编译之实现cpp restful接口
abbrlink: 2728951675
date: 2020-06-19 15:07:56
categories: [Cpp,restful]
tags: pistache
---

cpp实现restful类型的接口比较的复杂，我们使用pistache库来解决这个问题，经对比，这个库是速度最快的。

### 源码下载

~~~
git clone https://github.com/oktal/pistache.git
~~~

### 第三方库更新

~~~
 git submodule update --init
~~~

### 编译

##### 依赖下载gcc升级

[gcc5.1.0源码编译](http://www.helioswei.top/article/2230395924.html)

~~~ 
gcc version >5.1.0 #我们需要支持c++14
~~~

我们虽然重新编译安装了gcc，但系统有多个gcc的环境，我们在使用的时候可能还是默认的调用gcc4.8的低级版本，为了解决这个问题，我们可以显示的设置调用，我们需要设置编译器的环境变量，将5.1.0的编译器命令行设置到环境变量中：

~~~
export CC=/usr/local/bin/gcc
export CXX=/usr/local/bin/g++
~~~

##### cmake升级

[cmake下载](https://cmake.org/download/)，选择最新的下载即可，然后执行安装三部曲

~~~
cmake version > 3.18.0
~~~

##### curl-devel下载

~~~
yum install curl-devel -y
~~~

##### 编译

~~~
cd pistache
mkdir build
cd build
~~~

~~~
cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release -DPISTACHE_BUILD_EXAMPLES=true -DPISTACHE_BUILD_TESTS=true -DPISTACHE_BUILD_DOCS=false -DPISTACHE_USE_SSL=true -DCMAKE_INSTALL_PREFIX=/usr/local/pistache ..
make -j 4
make install
~~~



### 使用

`注意，这个在使用的时候需要选择c++的标准,设置`

~~~
g++ -std=c++14 #一般常用的是c++11
~~~



