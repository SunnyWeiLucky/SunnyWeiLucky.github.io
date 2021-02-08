---
title: s3-关于s3cmd的下载
categories: [Database,s3]
tags: [s3,cmd]
abbrlink: 3778876136
date: 2019-03-18 18:02:31
---

&nbsp;&nbsp;&nbsp;&nbsp;很多人都用过对象存储，比如亚马逊的s3平台，我想大家都比较熟悉，今天来介绍一款工具，用来在centos7平台上方便的操作对象存储的东西，比如查看自己的桶，创建桶等。

## s3cmd的下载 ##

### 第一步下载get-pip.py
>wget  https://bootstrap.pypa.io/get-pip.py

### 第二步安装get-pip.py
>python get-pip.py

### 第三步安装s3cmd
>pip install s3cmd

### 第四步设置.s3cfg
>设置三个比较主要的  
>![设置access_key](/images/access_key.png)  
>![设置host_bucket](/images/host_bucket.png)  
>![设置secret_key](/images/secret_key.png)  


