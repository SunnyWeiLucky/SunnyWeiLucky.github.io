---
title: spider-centos7安装selenium模拟浏览器请求
categories: [Tool,spider]
tags:
  - selenium
abbrlink: 933612194
date: 2020-07-22 09:32:16
---

### 安装selenium

~~~
pip install selenium
~~~

### 安装chrome浏览器

##### 1，配置yum源

在目录/etc/yum.repos.d/ 下新建文件 google-chrome.repo

~~~
cd /etc/yum.repos.d/
vim google-chrome.repo
~~~

写入以下内容

~~~
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/$basearch
enabled=1
gpgcheck=1
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub
~~~

安装google chrome浏览器

~~~
 yum -y install google-chrome-stable
~~~

google官方源可能在中国无法使用，导致安装失败或者在国内无法更新，可以添加以下参数来安装

~~~
yum -y install google-chrome-stable --nogpgcheck
~~~

##### 运行chrome

找到chrome路径，并做个软连接，方便使用：

~~~
which google-chrome-stable
ln -s xxx /bin/chrome
~~~

使用root用户启动chrome示例时会提示添加参数–no-sandbox flag

~~~
chrome --no-sandbox flag
~~~

### 安装chromedriver

查看google-chrome的版本

~~~
google-chrome --version
~~~

chromedriver版本支持的Chrome版本

[chromeDriver官网](https://sites.google.com/a/chromium.org/chromedriver/downloads)官网一般比较慢

[淘宝镜像](http://npm.taobao.org/mirrors/chromedriver/)

移动chromedriver到/usr/bin

### selenium+python验证

运行一段test.py

~~~python
from selenium import webdriver                                                                                                       
from selenium.webdriver.chrome.options import Options
 
chrome_options = Options()
chrome_options.add_argument("--headless")
chrome_options.add_argument('--disable-gpu')
chrome_options.add_argument('--no-sandbox')    # 禁止沙箱模式，否则肯能会报错遇到chrome异常
url="https://www.west.cn/login.asp"
brower=webdriver.Chrome(executable_path="/usr/bin/chromedriver", chrome_options=chrome_options)
brower.get(url)
print(brower.current_url)
brower.get("https://www.west.cn/Manager/")
print(brower.current_url)
brower.quit()
~~~

~~~
python3.6 test.py
~~~

结果：

~~~
https://www.west.cn/login.asp
https://www.west.cn/login.asp?pageStr=/Manager/Default.asp
~~~

### 使用pyautogui

对于一些元素虽然页面可以点击，但是获取的元素无法点击，我们可以使用pyautogui来模拟鼠标的点击更加的方便

~~~
pip install pyautogui
~~~

### 远程调用

使用selenium-server-standalone进行远程调用，[详解可以看这篇连接](https://www.xiehai.win/java/2019/05/24/selenium-server-standalone.html)

[selenium-server-standalone下载](http://selenium-release.storage.googleapis.com/index.html)

##### jar8环境的安装

[jar环境的安装](https://www.yaosansi.com/post/install-java-jdk-on-centos/)

##### 参数配置

参数配置方式

~~~
# 启动hub
java -jar selenium-server-standalone-3.141.59.jar -role hub -maxSession 10 -port 4444
# 启动node
java -jar  -"Dwebdriver.chrome.driver=C:\\tools\\driver\\chromedriver.exe" selenium-server-standalone-3.141.59.jar -role node  -hub http://localhost:4444/grid/register -port 4445
~~~

配置文件方式

~~~
# 启动hub
java -jar selenium-server-standalone-3.141.59.jar -role hub -hubConfig hub.json
# 启动node
java -jar selenium-server-standalone-3.141.59.jar -role node -hub http://localhost:4444/grid/register -nodeConfig node.json
~~~

`hub.json`

~~~json
{
  "port": 4444,
  "newSessionWaitTimeout": -1,
  "servlets": [],
  "capabilityMatcher": "org.openqa.grid.internal.utils.DefaultCapabilityMatcher",
  "throwOnCapabilityNotPresent": true,
  "nodePolling": 5000,
  "cleanUpCycle": 5000,
  "timeout": 60,
  "browserTimeout": 60,
  "maxSession": 10,
  "jettyMaxThreads": -1
}
~~~

`node.json`

~~~
{
  "capabilities": [
	{
	  "browserName": "firefox",
	  "marionette": true,
	  "maxInstances": 1,
	  "seleniumProtocol": "WebDriver"
	},
	{
	  "browserName": "chrome",
	  "maxInstances": 3,
	  "platform": "WINDOWS",
	  "webdriver.chrome.driver": "D:\\javaproject\\oATFWeb\\External\\chromedriver2.4.1.exe",
	  "seleniumProtocol": "WebDriver"
	},
	{
	  "browserName": "internet explorer",
	  "platform": "WINDOWS",
	  "maxInstances": 1,
	  "seleniumProtocol": "WebDriver"
	},
	{
	  "browserName": "safari",
	  "technologyPreview": false,
	  "platform": "MAC",
	  "maxInstances": 1,
	  "seleniumProtocol": "WebDriver"
	}
  ],
  "proxy": "org.openqa.grid.selenium.proxy.DefaultRemoteProxy",
  "maxSession": 5,
  "port": 5555,
  "register": true,
  "registerCycle": 5000,
  "hub": "http://10.12.1.140:4444",
  "nodeStatusCheckTimeout": 5000,
  "nodePolling": 5000,
  "role": "node",
  "unregisterIfStillDownAfter": 60000,
  "downPollingLimit": 2,
  "debug": false,
  "servlets": [],
  "withoutServlets": [],
  "custom": {},
  "browserTimeout": 60,
  "timeout": 60
}
~~~

`访问http://hub.ip:port/grid/console可以看到node的详细配置`

##### 例子

~~~python
from selenium import webdriver
from selenium.webdriver.remote.webdriver import WebDriver as RemoteWebDriver
from selenium.webdriver.chrome.options import Options
import time
 
 
chrome_options = Options()
 
proxy='58.254.220.116:53579'
#chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])
#chrome_options.add_argument("--proxy-server=http://" + proxy)
chrome_options.add_argument("start-maximized")
chrome_options.add_argument("enable-automation")
chrome_options.add_argument("--headless")
#chrome_options.add_argument("blink-settings=imagesEnabled=false")
chrome_options.add_argument('--disable-gpu')
#chrome_options.add_argument("--dns-prefetch-disable")
#chrome_options.add_argument("--no-proxy-server")
chrome_options.add_argument('--no-sandbox')    # 禁止沙箱模式，否则肯能会报错遇到chrome异常
#url="https://www.365365918.com/#/AC/B1/C1/D8/E91032124/F3/I1/"
#url="https://www.365365918.com/"
url="https://www.betvictor68.mobi/"
#url="https://blog.csdn.net/tiantiantdx/article/details/79434550?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-8.edu_weight&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-8.edu_weight"
#url="https://juejin.im/entry/5b2ca6316fb9a00e7747561a"
#url="https://stackoverflow.com/questions/48450594/selenium-timed-out-receiving-message-from-renderer"
#url="https://zhuanlan.zhihu.com/p/111859925"
#打开google浏览器
#brower=webdriver.Chrome(executable_path="/usr/bin/chromedriver", chrome_options=chrome_options)
brower=RemoteWebDriver(command_executor="http://192.168.50.74:4444/wd/hub", desired_capabilities=chrome_options.to_capabilities())
#访问地址
brower.get(url)
#设置请求的时间，等待js执行完毕
#time.sleep(5)
brower.implicitly_wait(30);
pageSource=brower.find_element_by_xpath("//*").get_attribute("outerHTML")
#pageSource=brower.execute_script("return document.documentElement.outerHTML")
fo = open("/root/bet365.html", "w")
fo.write(pageSource)
fo.close()
#print(pageSource)
#退出Google浏览器
brower.quit()
~~~

### windows搭建python的环境

[直接到官网](https://www.python.org/downloads/windows/)下载对应版本的

submit text3执行python

##### 设置build

~~~
打开sublime，依次点击菜单Tools-->Build System-->New Build System
~~~

~~~
{
	"cmd": ["D:\helios\software\python\python.exe", "-u", "$file"],
	"file_regex": "[ ]File \"(…?)\", line ([0-9]*)",
	"selector": "source.python"
}
~~~

~~~
ctrl + b来执行python
~~~



