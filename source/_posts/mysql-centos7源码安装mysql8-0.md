---
title: mysql-centos7源码安装mysql8.0
categories: [Database,mysql]
tags: mysql
abbrlink: 1044847951
date: 2020-04-17 10:24:23
---

	因为直接通过yum安装的是mariadb，所以我们需要通过另外的方法来进行安装

### 一，下载mysql

地址：[https://dev.mysql.com/downloads/repo/yum/](https://dev.mysql.com/downloads/repo/yum/)。选择对应版本下载

### 二，使用wget下载

~~~
在网站上看对应的版本号就好了
wget https://repo.mysql.com//mysql80-community-release-el7-3.noarch.rpm
~~~

### 三，安装mysql的源

~~~
yum -y localinstall mysql80-community-release-el7-1.noarch.rpm（对应版本）
~~~

### 四，在线安装mysql

~~~
yum -y install mysql-community-server
~~~

### 五，linux下设置不区分大小写

  1. 使用root账号登录，修改/etc/my.cnf；
  2. 在[mysqld]下加入一行：lower_case_table_names=1
  3. mysqld --user=mysql --lower-case-table-names=1 --initialize-insecure datadir=/var/lib/mysql

### 六，设置开机自启

~~~
systemctl enable mysqld
systemctl daemon-reload
~~~

### 七，修改本地root的密码

  1. 查看root账户的临时密码，vim  /var/log/mysqld.log
  2. 登录mysql，mysql -u root -p，输入1，中的临时密码
  3. ALTER USER 'root'@'localhost' IDENTIFIED BY '你的密码';
     修改密码为 你的密码 (备注：默认密码策略要求密码必须是大小写字母数字特殊字母的组合，至少8位)

### 八， 修改密码策略要求

~默认密码策略要求密码是大小写字母+数字+特殊字母的组合而且最少8位,不需要修改策略的可以跳过这步~

~~~
1，查看密码的策略
SHOW VARIABLES LIKE 'validate_password%';
2，修改密码的策略
set global validate_password.check_user_name=OFF;
set global validate_password.policy=LOW;
set global validate_password.length=4;
flush privileges;
3，修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
~~~

### 九，设置允许远程连接

~~~
1，重新登录mysql；
2，选择mysql表； use mysql;
3,更新表的内容；
update user set Host='%' where User='root';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;//可能会报错，执行两次即可（不成功就再flush privileges;一次）
~~~

### 十，查看加密方式

~~~
select user, host, plugin, authentication_string from user\G;查看加密方式
8.0加密方式（caching_sha2_password）有些客户端还不支持 ，导致客户端连接失败，所以使用mysql_native_password加密
alter user 'root'@'%' identified with mysql_native_password by 'helios2020';

~~~

### 九，卸载mysql

~~~
删除Mysql
yum remove mysql mysql-server mysql-libs mysql-server;
find / -name mysql 将找到的相关东西delete掉
(rm -rf /var/lib/mysql)；
rpm -qa|grep mysql(查询出来的东东yum remove掉)
rm /etc/my.cnf （可能不存在）
~~~

