---
title: centos7-常用的命令
categories: centos7
abbrlink: 2689943165
date: 2020-05-06 14:52:04
tags: 
- centos7
---

记录一下自己常用的centos7上的命令行

### mount挂载

~~~
虚拟机和主机共享目录
mount -t cifs //192.168.30.97/code /mnt -o username=Administrator,password=Helios

/code 是主机上的目录，需要设置为共享的
username 为主机的用户名
password 是主机的密码
/mnt 是虚拟机上的目录

卸载：
umount /mnt
卸载失败可以重启服务器
~~~



### nohup常驻服务

~~~
linux平台上，要在后台运行脚本的话，一般是在命令之后加上&即可。
常驻服务的运行，退出终端也可以的命令行
nohup
具体方法
nohup ./videotool &

~~~



### 查看系统的状态的命令

##### 查看内存

~~~
free -h
~~~

##### 查看磁盘使用

~~~
df -h 
~~~

##### 查看文件大小

~~~
du -sh 11.mkv
~~~



### 复制

~~~
cp  -rfd   ./oldname  ./newname
-r 复制目录
-f 强制复制
-d 复制软连接

忽略冲突复制
\cp  -rfd   ./oldname  ./newname 
~~~



### 定时任务

~~~
基本格式：
* * * * * command  
含义：
分 时 天 月 周  
使用*/n 表示此字段上每隔n执行一次，同时注意如果低时间使用了，会覆盖高时间的*/n,不要同时使用某一天与一周的某一天，如果这个两个相等，则会执行两次
~~~

##### 添加

~~~
crontab -e
~~~

##### 查看

~~~
crontab -l
~~~

##### 删除

~~~
crontab -r  这个表示删除所有的定时任务，如果需要删除单个，则使用crontab -e 进行编辑，然后删除某一行
~~~

### 获取服务运行时使用的内存

![cache.png](/images/linux/cache.png)



### 控制进程使用cpu数目

##### 获取进程id

~~~
pgrep  -f   servername

pidof   servername
~~~

##### 设置CPU使用

~~~
注意： 默认情况下，taskset不会影响进程的所有线程（LWP）。使用任务集的“-a”选项来影响流程中的所有线程

一般可以这样设置：   taskset   -apc  0   8991     (这个目前最有效）
~~~

### 脚本中生成随机数

~~~
UUID=`echo $RANDOM`
~~~

### 记录程序运行的资源到文件中

~~~
yum install -y time
~~~

~~~
/usr/bin/time -v -o video.log ffmpeg -i xxx.mp4
~~~



