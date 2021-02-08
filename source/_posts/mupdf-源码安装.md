---
title: mupdf-源码安装
categories: [Media,doc]
tags: mupdf
abbrlink: 3549577056
date: 2020-04-29 11:44:14
---

### 一，源码下载

~~~
直接到官网上下载源码包
https://www.mupdf.com/downloads/index.html
mupdf-1.16.1-source.tar.gz
~~~



### 二，相关依赖下载

~~~
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see http://www.gnu.org/licenses

yum install freeglut-devel
~~~

### 三，编译安装

~~~
make prefix=/usr/local install
~~~

### 四，使用注意

在cmake的项目中使用静态库的时候，你只能生成静态链接库，在生成应用的时候，链接静态库和动态库都是一样的用法