---
title: centos7-yum的使用
categories: Centos7
tags:
  - yum
abbrlink: 1714992348
date: 2020-11-19 17:40:53
---

记录yum的使用

### 安装

#### 搜索指定的版本安装

~~~sh
yum list --showduplicates xxx
~~~

#### 下载软件包

~~~
yum install yum-plugin-downloadonly
~~~

~~~
yum install fontconfig --downloadonly --downloaddir=/root/wei/
~~~

