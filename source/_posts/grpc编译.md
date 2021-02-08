---
title: grpc编译
categories: [Cpp,protocol]
tags: grpc
abbrlink: 1473358207
date: 2020-01-14 18:54:12
---

~~~
环境 centos7
~~~

## 一，安装编译依赖的环境

~~~
yum install -y pkgconfig autoconf automake libtool make gcc-c++ unzip
yum install -y gflags-devel gtest-devel clang libcxx-devel
yum install -y openssl  openssl-devel
yum install -y  libunwind libunwind-devel
yum install -y epel-release
yum install -y golang
~~~



## 二，源码下载

~~~
git clone https://github.com/grpc/grpc.git
cd grpc
git submodule update --init

~~~

## 三，编译

#### 1，编译cmake

~~~
需要下载cmake高级版本，yum安装的版本太低
https://cmake.org/download/
源码安装cmake，
（1）删除原来版本的cmake
（2）./configure
（3）make && make install
如果找不到，则创建软链接
ln -s /usr/local/bin/cmake /usr/bin/cmake
~~~

#### 2，先编译protobuf

~~~
cd third_party/protobuf
git submodule update --init --recursive
./autogen.sh
./configure --prefix=/usr/local/helios/protobuf
make 
make check
make install
2,建立软链接
ln -s /usr/local/helios/protobuf/bin/protoc /usr/local/bin/protoc
检测是否安装成功
protoc --version
~~~



#### 3，编译grpc（cmake)

~~~
cd grpc
mkdir -p  cmake/build
cmake -DBUILD_SHARED_LIBS=on -DCMAKE_INSTALL_PREFIX=/usr/local/helios/grpc -DCMAKE_BUILD_TYPE=DEBUG -Wno-dev ../../
make
make install
~~~

#### 4，编译（make,不建议使用）

~~~
2,编译grpc
cd grpc根目录
make -j 4
make install
~~~

#### 5，问题

~~~
对于cpp的使用，当编译好了之后，运行helloworld程序，没有响应，有很大的问题
https://github.com/grpc/grpc/issues/21280#issuecomment-558164977

解决方法：修改源码（不使用）
vim / src / core / lib / surface / init.cc

diff --git a/src/core/lib/surface/init.cc b/src/core/lib/surface/init.cc
index 2812427f7a..3c6a547b20 100644
--- a/src/core/lib/surface/init.cc
+++ b/src/core/lib/surface/init.cc
@@ -156,7 +156,7 @@ void grpc_init(void) {
      * at the appropriate time */
     grpc_register_security_filters();
     register_builtin_channel_init();
-    grpc_tracer_init();将源码中的这个给注销
+    // grpc_tracer_init();
     /* no more changes to channel init pipelines */
     grpc_channel_init_finalize();
     grpc_iomgr_start();
     
修改源码：
vim src/core/lib/debug/trace.cc
 void TraceFlagList::Add(TraceFlag* flag) {
+  TraceFlag* t;
+  for (t = root_tracer_; t; t = t -> next_tracer_) {
+       if (t == flag ) return;
+  }
   flag->next_tracer_ = root_tracer_;
   root_tracer_ = flag;
遍历链表，如果存在则不加入
~~~

#### 6，运行helloworld程序

~~~
cd examples/cpp/helloworld
make

出现问题：
which: no grpc_cpp_plugin in (/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin)
因为自己配置的路径，所以先给grpc_cpp_plugin  建立软连接
ln -s /usr/local/helios/grpc/bin/grpc_cpp_plugin   /usr/local/bin/grpc_cpp_plugin


helloworld.pb.h:10:40: fatal error: google/protobuf/port_def.inc: No such file or directory
配置cpp头文件路径
export CPLUS_INCLUDE_PATH=$CPLUS_INCLUDE_PATH:/usr/local/helios/grpc/include


Package protobuf was not found in the pkg-config search path.
Perhaps you should add the directory containing `protobuf.pc'
to the PKG_CONFIG_PATH environment variable
No package 'protobuf' found
Package grpc was not found in the pkg-config search path.
Perhaps you should add the directory containing `grpc.pc'
to the PKG_CONFIG_PATH environment variable
No package 'grpc' found
配置pkgconfig搜索路径
export PKG_CONFIG_PATH=$PKG_CONFIG_PATH:/usr/local/helios/protobuf/lib/pkgconfig/:/usr/local/helios/grpc/lib/pkgconfig/

error while loading shared libraries: libgrpc_plugin_support.so.1: cannot open shared object file
配置cpp动态库搜索路径
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/helios/grpc/lib/:/usr/local/helios/grpc/lib64/:/usr/local/helios/protobuf/lib
~~~

