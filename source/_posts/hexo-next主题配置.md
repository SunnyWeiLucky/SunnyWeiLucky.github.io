---
title: hexo-next主题配置
categories: Tool
tags: hexo
abbrlink: 1968653668
date: 2020-05-07 16:46:52
---



主要记录一下自己在搭建个人博客的时候，一些配置，基本上是查阅别人的文章，这里记录一下

### 一，hexo安装

[hexo安装](https://www.jianshu.com/p/eded1dd2d794)

[next主题设置](https://www.jianshu.com/p/b20fc983005f)



### 二，添加LocalSearch搜索

~~~
 npm install hexo-generator-searchdb --save
 
 编辑主题配置文件，启用本地搜素
 # Local search
local_search:
  enable: true
~~~

### 三，网站访问量统计

![baidu.png](/images/blog/baidu.png)

### 四，阅读次数统计

[LeanCloud添加阅读次数](https://www.cnblogs.com/lijianming180/p/12433189.html)

### 五，添加评论

[valine](https://blog.csdn.net/jiunian_2761/article/details/97388997)

### 六，域名申请

[域名申请](https://blog.csdn.net/linshuhe1/article/details/73013730)

### 七，谷歌检索

[谷歌检索](https://www.itrhx.com/2019/09/17/A48-submit-search-engine-inclusion/)

### 八，永久文章链接

[abbrlink](https://www.jianshu.com/p/c7de2ae59975)

### 九，404

[404错误](https://www.jianshu.com/p/2349c763cc02)

### 十，码云+GitHub部署

![gitee.png](/images/blog/gitee.png)

~~~
需要在站点配置文件中配置gitee和GitHub的仓库地址
然后就可以部署了，不过我们在gitee上部署后，每次都需要手动的去更新gitee page，才能生效
~~~

