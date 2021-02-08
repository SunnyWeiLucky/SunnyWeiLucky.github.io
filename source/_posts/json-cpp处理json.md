---
title: json-cpp处理json
categories: [Cpp,protocol]
tags: json
abbrlink: 3190039070
date: 2020-06-16 11:27:54
---

cpp处理json常用的库

### poco-json

poco库中处理json的模块，将其转换为json字符串时键名会按照字母的顺序排列

### jsoncpp

jsoncpp这个库，将其转换为json字符串时键名也会按照字母的顺序排序

#### 1，下载

[jsonspp下载](https://sourceforge.net/projects/jsoncpp/)

#### 2，安装

##### scons下载

使用scons来安装，如果yum没有找到，则需要[更新yum库](http://www.helioswei.top/article/3859923575.html)

~~~
yum install scons -y
~~~

##### 编译jsoncpp

编译好的链接库，存放在jsoncpp源目录下的libs中`libjson_linux-gcc-4.8.5_libmt.so`，头文件放在include目录下

~~~
cd jsoncpp的源目录

scons platform=linux-gcc
~~~

### protobuf

序列化，这个将其转换为json字符串时会按照message的顺序，比较的好。

#### 1，使用步骤

##### 先写proto的文件 status.proto

~~~
syntax = "proto3";                                                                                                                    
package biyi;
 
message UnifiedLog{
    Cont content = 1;
    string sign = 2;
}
 
message Cont{
    string time_iso8601 = 1;
    string companyId = 2;
    string company = 3;
    string projectNameCN = 4;
    string projectName = 5;
    string componentName = 6;
    string componentMethodName = 7;
    string componentType = 8;
    string componentVer = 9;
    string componentLang = 10; 
    string userName = 11; 
 
}
~~~

##### cpp调用

~~~
#include <iostream>
#include "../build/proto/status.pb.h"
#include <google/protobuf/util/json_util.h>
 
namespace proto = google::protobuf::util;
 
using namespace biyi;
using namespace std;
 
int main() {
    UnifiedLog uniLog;
    uniLog.set_sign(
        "68f3ea8baebbaddc5a47d6d955ecf53892edb4d3d8a3afe08cf4518204d30af5");
    uniLog.mutable_content()->set_time_iso8601("2020-03-09T11:11:14+08:00");
    uniLog.mutable_content()->set_companyid("000");
    uniLog.mutable_content()->set_company("ctsi");
    uniLog.mutable_content()->set_projectnamecn("001");
    uniLog.mutable_content()->set_projectname("biyi");
    uniLog.mutable_content()->set_componentname("micro-service-statics");
    uniLog.mutable_content()->set_componentmethodname("DemoBean.echo");
    uniLog.mutable_content()->set_componenttype("微服务组件");
    uniLog.mutable_content()->set_componentver("v1.0.0");
    uniLog.mutable_content()->set_componentlang("java");
    uniLog.mutable_content()->set_username("admin");
 
    cout << uniLog.sign() << endl;
    // message to json string
    string str;
    proto::Status status = proto::MessageToJsonString(uniLog, &str);
    if (!status.ok()) {
        cout << status.ToString() << endl;
    } else {
        cout << "str: " << str << endl;
    }
 
    return 0;
} 
~~~



