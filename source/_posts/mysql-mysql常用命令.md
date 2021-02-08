---
title: mysql-mysql常用命令
categories: [Database,mysql]
tags: cmd
abbrlink: 4107582643
date: 2020-05-28 14:33:43
---

记录一下常用的mysql数据库的命令

### 数据库导入

~~~
mysql -uroot -phelios2020 </opt/vidFactory/database/sql/initDatatbase.sql
~~~

### 数据库导出

~~~
mysqldump -uroot -p 数据库名 > initDatatbase.sql
~~~

### database

##### 展示数据库

~~~
show databases;
~~~

##### 使用数据库

~~~
use vidfactory;
~~~

### table

##### 展示表

~~~
show tables;
~~~

##### 插入数据

###### 插入所有字段

~~~
inset into tableName values(值1，值2，值3....)
~~~

###### 插入某些字段

~~~
inset into tableName(列名a,列名b,列名c) values(值1，值2，值3);
~~~

##### 查看某个表的结构

~~~
desc tableName \G;
~~~

