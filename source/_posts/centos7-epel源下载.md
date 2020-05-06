---
title: centos7-epel源下载
date: 2020-05-06 11:20:01
categories: centos7
tags: yum源
---



### 一，什么是epel

**EPEL的全称叫 Extra Packages for Enterprise Linux** 。EPEL是由 Fedora 社区打造，为 RHEL 及衍生发行版如 CentOS、Scientific Linux 等提供高质量软件包的项目。装上了 EPEL之后，就相当于添加了一个第三方源。

如果你知道rpmfusion.org的话，拿 rpmfusion 做比较还是很恰当的，rpmfusion 主要为桌面发行版提供大量rpm包，而***EPEL则为服务器版本提供大量的rpm包，而且大多数rpm包在官方 repository 中是找不到的\***

另外一个特点是**绝大多数rpm包要比官方repository 的rpm包版本要来得新**。所以，我们有时候在yum下载的时候如果没有找到某个包或者版本过低，可以使用这个方式来尝试。



### 二，yum下载

~~~
yum install -y epel-release
~~~

