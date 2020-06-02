---
title: github-解决GitHub clone慢的问题
categories:
  - github
  - git
tags:
  - github
  - git
abbrlink: 814027255
date: 2020-06-01 15:23:20
---

哎，有时候自己在GitHub上下载东西的时候总是很慢，这里记载一下几个加快的方法



### 一，使用gitee码云来进行clone

将需要clone的项目，先转移到码云上，然后通过码云来下载本地，速度很快；



### 二，修改hosts

在linux上 

~~~
vim  /etc/hosts
#添加
151.101.72.249 github.http://global.ssl.fastly.net
192.30.253.112 github.com
~~~

