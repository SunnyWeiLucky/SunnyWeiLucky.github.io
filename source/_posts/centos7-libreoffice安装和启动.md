---
title: centos7-libreoffice安装和启动
categories: [Media,doc]
tags: libreoffice
abbrlink: 3025513893
date: 2020-12-03 10:17:38
---

​	centos7下的文档转码的利器`libreoffice`，下面介绍一下centos7平台上对于这个软件的安装

### libreoffice下载

[libreoffice下载](https://www.libreoffice.org/download/download/)，在这里可以下载LO的最新的版本

这个是网上找的镜像，[可以参考](http://mirrors.ustc.edu.cn/tdf/libreoffice/stable/)

~~~sh
LibreOffice_6.4.3_Linux_x86-64_rpm_langpack_zh-CN.tar
LibreOffice_6.4.3_Linux_x86-64_rpm.tar.gz
LibreOffice_6.4.3_Linux_x86-64_rpm_sdk.tar.gz
~~~

#### 解压

~~~shell
tar -zxvf LibreOffice_6.4.3_Linux_x86-64_rpm_langpack_zh-CN.tar -C /root/libreoffice
tar -zxvf LibreOffice_6.4.3_Linux_x86-64_rpm.tar.gz -C /root/libreoffice
tar -zxvf LibreOffice_6.4.3_Linux_x86-64_rpm_sdk.tar.gz -C /root/libreoffice
~~~

#### 安装

进入每个目录下的RPMS目录下使用以下命令执行

~~~
yum localinstall *.rpm
~~~

#### 安装依赖包

~~~shell
yum install cairo
yum install cups-libs
yum install libSM
~~~

#### 汉化

~~~shell
yum groupinstall "fonts"
~~~

#### example

~~~shell
libreoffice6.4 --headless --invisible --convert-to pdf test.docx --outdir /data/file
~~~

### bug提交

在使用的过程中，我发现了一个bug，影响了我产品的功能，所有让社区的管理帮忙提交了bug修复，[见下](https://bbs.libreofficechina.org/thread-2616-1-1.html)