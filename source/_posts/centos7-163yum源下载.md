---
title: centos7-163yum源下载
categories: centos7
tags: yum
abbrlink: 2361785990
date: 2020-05-06 11:14:01
---



我们在centos7上下载东西的时候，有时候自带的源里面没有我们需要的软件，所有我们需要更换源来进行下载



### 一，下载repo文件

~~~
wget http://mirrors.163.com/.help/CentOS7-Base-163.repo
~~~



### 二，备份并且替代系统的repo文件

~~~
cp  CentOS7-Base-163.repo  /etc/yum.repos.d/ 

cd /etc/yum.repos.d/ 

mv CentOS-Base.repo CentOS-Base.repo.bak 

mv CentOS7-Base-163.repo CentOS-Base.repo
~~~



### 三，执行yum源更新命令

~~~
yum clean all 

yum makecache 

yum update
~~~



