---
title: centos7-zsh的使用和配置
categories:
  - Centos7
tags:
  - zsh
abbrlink: 192192511
date: 2020-12-08 16:58:14
---

​	 本文主要是记录centos7搭建自己个性的命令行。

### 安装zsh

~~~sh
yum install zsh
~~~

#### 将其设置为默认shell

~~~`
chsh -s /bin/zsh
~~~

`可以通过echo $SHELL来查看当前默认的shell，如果没有改为/bin/zsh,那么需要重新启动shell`

### 安装oh-my-zsh

[地址](https://github.com/ohmyzsh/ohmyzsh)

~~~
	sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
~~~

#### 配置文件

​	默认的配置文件是在`/root/.zshrc`，可以通过配置文件来配置一下插件以及功能

##### 主题修改

在`.zshrc`中找到`ZSH_THEME`，即可修改主题，[主题地址](https://github.com/ohmyzsh/ohmyzsh/wiki/themes)可自己修改

##### zsh扩展

​	在`/root/.zshrc`中找到`plugins`关键字，就可以自定义启用的插件了，目前插件存放在workspace上


~~~