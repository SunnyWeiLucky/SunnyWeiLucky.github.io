---
title: rabbitmq-AMQPCPP的编译
categories: [Database,rabbitmq]
tags:
  - rabbitmq
abbrlink: 3142310907
date: 2020-07-27 17:01:57
---

###  下载

~~~
git clone https://github.com/CopernicaMarketingSoftware/AMQP-CPP.git
~~~

### 编译

~~~
cd AMQP-CPP
mkdir build
cd build
~~~

~~~
cmake -DAMQP-CPP_BUILD_SHARED=true -DAMQP-CPP_LINUX_TCP=true -DCMAKE_INSTALL_PREFIX=/usr/local/amqpcpp ..
make
make install
~~~

