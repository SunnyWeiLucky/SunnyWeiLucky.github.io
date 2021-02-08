---
title: git-常用的命令
categories: [Tool,git]
tags: cmd
abbrlink: 2063445917
date: 2019-03-15 16:27:10
---

&nbsp;&nbsp;&nbsp;&nbsp;记录一些git常用的命令，便于在长时间不用时能够有个地方查阅，下面的几个是经常用到的。在windows下使用git，许多朋友都说无法使用一些状态（修改，保存，提交）图标，是因为图标显示不是git本身的功能呢，我们需要下载TortoiseGit才能使用图标。

### 文件管理

##### 重命名文件夹
```
git  mv -f oldfolder newfolder
```

##### 删除新增的多个文件

~~~
git clean -xdf
~~~

### 提交管理

##### 删除中间的某次提交

```
git revert commit id
```

##### 版本回退
```
git reset --hard commitid
这个不会保留之前的记录
```
##### 撤销本地提交
```
git reset --soft commitid
git reset --mixed commitid
两者的区别，--soft会将改动放在缓存区 --mixed不会讲改动放在缓存区
```

##### 撤销远程的提交
```
git log
git reset --hard commitid
git push origin HEAD:master --force
```

##### 强制提交
```
git push -u origin master -f
```

### 分支管理

##### 将某个分支的提交copy到另一个分支上

```
例如，有两个分支，a,b,想要将a的某次提交，copy到b分支上
1,在a分支上 git log 查询commitid
2,git checkout b  切换分支
3,git cherry-pick commitid
```

##### 统计当前分支的提交数目
```
git rev-list HEAD | wc -l
```
##### 删除缓存的远程分支列表

~~~
git remote prune origin
or
git fetch -p
~~~

### stash管理

##### 冻结当前的分支修改

~~~
git stash save "说明信息选填"
~~~

##### 列出所有的工作现场存储

~~~
git stash list
~~~

##### 恢复某个工作现场

~~~
git stash apply stash@{n}
~~~

##### 删除存储的某个工作现场

~~~
git stash drop stash@{n}
~~~

##### 恢复的同时把stash内容也删除了

~~~
git stash pop stash@{n} 
~~~

### config

##### 解决git clone 项目中某个文件都需要输入密码

~~~
git config --global credential.helper store
~~~

##### 配置邮件和用户名

~~~
git config --global user.email "xxx"
git config --global user.name "xxx"
~~~

### tag管理

##### 列出本地标签

~~~
git tag
~~~

##### 切换到某个tag

~~~
git checkout tagName
~~~

##### 本地打标签 -a 指定标签名， -m 指定说明文字

~~~
git  tag -a v4.1.1 -m "删除临时文件"
~~~

##### 本地tag推送到远程

###### 单一

~~~
git push origin tagName
#
git push origin v4.1.1
~~~

###### 多个

~~~
git push --tags
~~~

##### 删除远程tag

~~~
git push origin --delete tag tagName
~~~

##### 删除本地tag

~~~
git tag -d tagName
~~~

##### 拉取tag到本地

~~~
git fetch origin tag tagName
~~~



