---
title: rabbitmq-AMQPCPP使用问题记录
categories: [Database,rabbitmq]
tags: rabbitmq
abbrlink: 3077642244
date: 2020-09-29 16:57:46
---

​		记录[AMQP_CPP](https://github.com/CopernicaMarketingSoftware/AMQP-CPP)的使用过程中出现的问题，我是用的主要是`LibEvHandler`这个类来进行处理的,以下所有的问题都是在这个基础上面,仔细的查看头文件可以了解更多的使用方法。

### 任务执行长时间后导致连接丢失的问题

`LibEvHandler`中对于rabbitmq的默认心跳是60s，如果当前队列没有任务处理，则其会自动的发送心跳，保持client和server之间的连接，如果你执行某个任务的时间过长，大于60s，则在执行任务期间，其不会自动的发送心跳导致两者之间的连接断开，导致下次获取数据时提示链接错误，获取数据失败。解决办法：

1. 重写LibEvHandler中的`onNegotiate`以及`onHeartbeat`这两个方法，前者用于设置心跳的时间，后者用于心跳发送时的函数。

   ~~~cpp
   >> 23 class MyHandler : public AMQP::LibEvHandler {
      24  
      25    public:
   >> 26     MyHandler(struct ev_loop* loop) : AMQP::LibEvHandler(loop) {}
      27     //解决consume在处理任务时的连接超时的问题
   >> 28     uint16_t onNegotiate(AMQP::TcpConnection* connection, uint16_t timeout) {
      29         return 70;//必须设置一个值
      30     }
   >> 31     virtual void onHeartbeat(AMQP::TcpConnection* connection) {
      32         connection->heartbeat();
      33     }
      34 };
   
   ~~~

2. 另外开一个线程，定时手动的发送心跳给rabbitmq

   ~~~cpp
      46     void run() {
   >> 47         struct ev_loop* loop = ev_loop_new();
      48         // AMQP::LibEvHandler handler(loop);
      49         MyHandler handler(loop);
      50         AMQP::TcpConnection connection(&handler, *_address);
      51         _connection = &connection;
      52         AMQP::TcpChannel channel(&connection);
      53         //// channel.setQos(1);
      54         _channel = &channel;
                 //另外开一个线程，用于检测rabbitmq的链接，以及定时的发送心跳
      55         std::thread check(&Consume::checkConnect, this);
      56         // 1s后执行一次回调，之后每10s执行一次
      57         ev_timer_init(&_timer, TClass::callback, 1, 0);
      58         _timer.data = this;
      59         ev_timer_start(loop, &_timer);
      60         ev_run(loop, 0);
      61         check.join();
      62     }
   
   ~~~

   ~~~cpp
     165     void checkConnect() {
     166         while (true) {
                     //判读链接是否可用，可用即发送心跳
     167             if (_connection->usable()) _connection->heartbeat();
                     //判读当前通道是否可用，如果失败则杀死当前程序
     168             _channel->onError([&](const char* message) {
     169                 LOG(ERROR) << "The channel is error, exit: " << message;
     170                 killAll();
     171             });
                     //判读当前连接是否关闭，如果关闭则杀死当前程序
     172             if (_connection->closed()) {
     173                 if (_connection != NULL) _connection->close();
     174                 LOG(ERROR) << "The connection is closed,exit";
     175                 killAll();
     176             }
                     //sleep 5s
     177             Poco::Thread::sleep(5000);
     178         }
     179     }
     180     void killAll() { kill(0, SIGABRT); }
   
   ~~~

### 每次仅仅处理一个任务的问题

​		对于消息者来说，监听一个队列，如果队列里面有多条的数据，其会一下子都消费掉（有个最大值可查文档），比如你的队列里面有100条数据，其会都拿到放到内存中，如果过程中你的服务挂掉，则数据会丢失，为了解决这个问题，我们需要设置消费者每次拿到的数据量。AMQP_CPP中使用`setQos()`来进行设置

<font color="red">`注意：仅对手动ack有效`</font>

~~~cpp
 AMQP::TcpChannel channel(&connection);
 channel.setQos(1);
~~~

### 无法重新连接的问题

如果我们的rabbitmq挂了我们的服务应该怎么办了，一般对于这种有两种方法来处理

1. 实现rabbitmq的重试机制，rabbitmq连接断开后，我们能够自动的恢复；
2. 服务中断机制，rabbitmq连接断开，我们的服务也中断，再通过某个服务能够拉起（守护进程）

再AMQP_CPP中重连的机制不好处理，所以我们选择第二种方法