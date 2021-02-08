---
title: git-大文件上传管理
categories: [Tool,git]
tags: lfs
abbrlink: 3538252460
date: 2020-05-22 16:32:56
---

### git lfs安装和配置

git lfs 需要客户端支持, 请根据自己的操作系统下载对应的客户端

[git lfs客户端下载](https://git-lfs.github.com/)

`以Centos7为例，下载客户端后运行rpm安装`

~~~
rpm -i git-lfs-2.2.1-1.el7.x86_64.rpm
git lfs install（完成初始化）
~~~



### 设置管理的文件类型

~~~
#压缩包
git lfs track *.tar *.tar.gz *.tgz *.zip *.7z
#图片
git lfs track *.jpg *.png *.jpeg *.bmp *.gif *.tiff
#库
git lfs track *.jar *.war *.so *.so.*
#非文本文档
git  lfs  track *.doc *.docx *.ppt *.pptx *.pdf *.xls *.xlsx
#安装包
git  lfs  track *.rpm *.deb *.img *.iso
~~~

`设置完之后会在项目根目录下出现.gitattributes文件`