## 博客使用

### 同步迁移步骤

### 一，环境的安装（windows）

##### 1，安装git
[git下载](https://git-scm.com/downloads)
~~~
git --version
~~~
##### 2，安装node.js
[node.js下载](https://nodejs.org/zh-cn/)
~~~
node -v
~~~

##### 3，安装hexo
~~~
npm install hexo-cli -g
~~~
##### 4，clone
~~~
git clone https://github.com/SunnyWeiLucky/SunnyWeiLucky.github.io.git
~~~
##### 5， hexo
~~~
cd SunnyWeiLucky.github.io
git checkout blog
执行hexo命令即可
~~~



### hexo常用命令

##### 生成静态文件

~~~
hexo generate (hexo g)
~~~

##### 启动本地服务

~~~
hexo server (hexo s)
~~~

##### 提交到远程仓库

~~~
hexo deploy (hexo d)
~~~

##### 创建页面(相当于目录)

~~~
hexo new page "xx" (hexo n page)
~~~

##### 创建文章

~~~
hexo new "xx" (hexo n "")
~~~

##### 生成静态并提交到远程仓库

~~~
hexo d -g 
~~~

##### 生成静态文件并启动本地预览

~~~
hexo s -g
~~~

##### 清除本地public文件

~~~
hexo clean
~~~

