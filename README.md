## 博客使用

~~~
master 分支仅仅用于博客的展示，不做任何操作
blog 分支用于同步本地的文件，用于环境的迁移，以及写博客
~~~



### 同步迁移步骤（windows)

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



### 写博客常用命令

##### 创建文章

~~~
hexo new "xx" (hexo n "")
~~~

##### 生成静态文件并启动本地预览

~~~
hexo s -g
~~~

##### 生成静态并提交到远程仓库

~~~
hexo d -g 
~~~



### 错误处理

##### .deploy_git报错

~~~
fatal: in unpopulated submodule '.deploy_git'
FATAL Something's wrong. Maybe you can find the solution here: http://hexo.io/docs/troubleshooting.html

解决方法：删除文件，然后重新生成和部署
rm -rf .deploy_git
hexo g
hexo d
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

