---
title: centos7-常用的命令
date: 2020-05-06 14:52:04
categories: centos7
tags: 
---

记录一下自己常用的centos7上的命令行



### mount挂载

~~~
虚拟机和主机共享目录
mount -t cifs //192.168.30.97/code /mnt -o username=Administrator,password=Helios

/code 是主机上的目录，需要设置为共享的
username 为主机的用户名
password 是主机的密码
/mnt 是虚拟机上的目录

卸载：
umount /mnt
卸载失败可以重启服务器
~~~

