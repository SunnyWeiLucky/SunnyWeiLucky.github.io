---
title: github-解决GitHub clone慢的问题
categories: [Tool,git]
tags: git
abbrlink: 814027255
date: 2020-06-01 15:23:20
---

哎，有时候自己在GitHub上下载东西的时候总是很慢，这里记载一下几个加快的方法



### 使用gitee码云来进行clone

将需要clone的项目，先转移到码云上，然后通过码云来下载本地，速度很快；



### 修改hosts

通过[查询IP地址网站](https://www.ipaddress.com/)查询下面两个域名的IP地址

~~~
github.global.ssl.fastly.net
~~~

~~~
github.com
~~~

##### 在linux上  vim /etc/hosts

~~~
199.232.69.194 github.global.ssl.fastly.net
140.82.113.3 github.com
~~~

##### 在Windows上 修改 C:\Windows\System32\drivers\etc\hosts

1. 对于Windows下的hosts执行需要权限，我们可以将其先拷贝到桌面，修改后再copy回去

2. 打开cmd命令行，执行下面的命令

3. ~~~
   ipconfig/flushdns
   ~~~


### 设置代理

​	推荐有代理的使用，作为一名开发，经常需要Google，要不自己搭建一个梯子，要不就是买一个。我们在github上clone的时候可以设置代理。

~~~

git config --global https.proxy http://127.0.0.1:1080

git config --global https.proxy https://127.0.0.1:1080

git config --global --unset http.proxy

git config --global --unset https.proxy

~~~

