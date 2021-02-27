---
title: AI-PaddleHub的体验使用
categories:
  - AI
  - PaddleHub
tags: PaddleHub
abbrlink: 1959613013
date: 2020-12-03 14:25:47
password: 123456
---

​		最近体验了一下比较火的AI项目，[PaddleHub](https://github.com/PaddlePaddle/PaddleHub)，对于python我是陌生的，所以下面是作为新手的一些操作指南，保证能够正确的尝试到这个项目的有趣之处。

​		[官网操作指南](https://github.com/PaddlePaddle/PaddleHub/blob/release/v2.0.0-beta/README_ch.md)

### 环境依赖

1. Python>=3.6
2. PaddlePaddle>=2.0.0rc

### 环境更新

~~~sh
pip3 install --upgrade pip
~~~

~~~shell
pip3 install --upgrade setuptools
~~~

### 安装

#### paddlepaddle的安装

~~~
pip3 install paddlepaddle==2.0.0rc
~~~

#### paddlehub的安装

~~~shell
pip3 install paddlehub --upgrade -i https://mirrors.aliyun.com/pypi/simple  --default-timeout=100
~~~

#### 依赖库安装

~~~sh
pip3 install matplotlib
~~~

### 模型库的下载

​		下载模型，PaddleHub必须在访问外网的情况下才能下载。你可以现在网络条件好的环境下，先下载安装对应的module，之后将安装好module 完整的拷贝到你需要的机器上，放在`HUB_HOME`下。[关于`HUB_HOME`的解释参考](https://github.com/PaddlePaddle/PaddleHub/blob/release/v1.7/docs/tutorial/cmdintro.md#paddlehub%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%B7%A5%E5%85%B7)

​		[PaddleHub支持模型列表](https://paddlepaddle.org.cn/hublist),我们可以在这个地址上找到所有需要的模型，然后我们通过手动的下载，比如`deeplabv3p_xception65_humanseg`[模型下载](https://paddlepaddle.org.cn/hubdetail?name=deeplabv3p_xception65_humanseg&en_category=ImageSegmentation)

~~~
hub install deeplabv3p_xception65_humanseg==1.1.1
~~~

### example

#### 人像抠图

~~~sh
hub run deeplabv3p_xception65_humanseg  --input_path test_image.jpg  --visualization=True --output_dir="human_output"
~~~

`如果你开始没有下载模型库，则这个执行的过程会超级的慢，所以一般建议先手动的安装模型库`