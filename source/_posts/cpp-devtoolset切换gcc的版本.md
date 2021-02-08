---
title: cpp-devtoolset切换gcc的版本
categories: [Cpp,gcc]
tags:
  - gcc
  - devtoolset
abbrlink: 2538200340
date: 2020-06-19 16:47:14
---

我们在编译cpp的时候，有时候需要支持c++11/14的一些特性，就需要升级gcc的版本，为了简单的升级，Red Hat提供了scl软件集来为用户提供一种以方便、安全地安装和使用应用程序和运行时环境的多个（而且可能是更新的）版本的方式，同时避免把系统搞乱。下载devtoolset

使用scl升级gcc的步骤

### 一，安装scl源

~~~
yum install centos-release-scl scl-utils-build
~~~

### 二，列出scl有哪些可用的源

~~~
yum list all --enablerepo='centos-sclo-rh' | grep devtoolset
~~~

### 三，安装gcc，g++

~~~
yum install devtoolset-7-gcc devtoolset-7-gcc-c++
~~~

### 四，切换版本

这个版本的切换仅对当前的环境有用

##### 启动环境

~~~
scl enable devtoolset-7 bash
gcc -v

~~~

##### 退出环境

~~~
exit
~~~

