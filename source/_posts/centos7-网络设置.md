---
title: centos7-网络设置
categories: Centos7
tags: network
abbrlink: 3594159119
date: 2020-06-09 14:19:49
---

配置centos7的网络，让其可以正常的连接网络

### 一，打开网络配置所在的文件

~~~
cd /etc/sysconfig/network-scripts
vi ifcfg-ens160 (不同的系统，文件名不同)
~~~

~~~
TYPE=Ethernet
PROXY_METHOD=none
BROWSER_ONLY=no
#设置静态ip还是动态IP
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=ens160
UUID=750fb5d2-4bff-437d-ab4e-75eaf038429d
DEVICE=ens160
#开机自启动
ONBOOT=yes
#静态ip地址
IPADDR=192.168.50.72
#静态网关
NETMASK=255.255.255.0
#路由
GATEWAY=192.168.50.1
~~~

设置好之后，重启网络服务

~~~
systemctl restart network
~~~

### 二，配置域名解析

~~~
vi /etc/resolv.conf
~~~

添加内容如下：

~~~
nameserver   8.8.8.8

nameserver   8.8.4.4

nameserver    114.114.114.114
~~~

