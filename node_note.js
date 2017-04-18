/*
npm search express 搜索模块
npm update express 更新模块
npm uninstall express 卸载模块
npm ls 查看
npm list express 查看模块版本号
npm list 查看本地所有模块
npm config set proxy null 解决抛错npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 

npm init 生成package.json，创建模块的前提
npm adduser 模块注册用户
npm publish 发布模块
npm install -g cnpm --registry=https://registry.npm.taobao.org 淘宝npm
cnpm install 淘宝下载

ctrl + c - 退出当前终端
.save filename - 保存当前的 Node REPL 会话到指定文件
.load filename - 载入当前 Node REPL 会话的文件内容。
tab 键 - 列出当前命令
.help - 列出使用命令
 */

/*
事件：
addListener(event, listener) 为指定事件添加一个监听器到监听器数组的尾部。
on(event, listener) 指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。
once(event, listener) 只会触发一次
removeListener(event, listener) 移除指定事件的某个监听器
removeAllListeners([event]) 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。
setMaxListeners(n) 提高监听器的默认限制10的数量。
listeners(event) 返回指定事件的监听器数组。
emit(event, [arg1], [arg2], [...]) 按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false。
newListener 添加新监听器时被触发。
listenerCount(emitter, event) 返回指定事件的监听器数量。EventEmitter类的方法。
 */



//node hello.js 运行服务器
var http = require('http');
http.createServer(function(request,response){ //创建服务器
	response.writeHead(200,{'Content-Type':'text/html'}); //响应头
	response.end('Hello Worlds\n'); //页面输出
}).listen(8889); //http://127.0.0.1:8889/
console.log("hi kaka"); //控制台输出

var express = require('express');

var fs = require("fs");
fs.readFile('input.txt', function (err, data) { //读取文件内容，非阻塞是无顺序的。
    if (err) return console.error(err);
    console.log(data.toString());
});

var events = require('events');// 引入 events 模块
var eventEmitter = new events.EventEmitter();// 创建 eventEmitter 对象
eventEmitter.on('eventName', eventHandler);// 绑定事件，名字随意，重复绑定不会被覆盖而是先后调用
eventEmitter.emit('eventName'); // 触发事件

var buf = new Buffer(10); 
buf.write(""); //写入字符
buf.toString('utf8',0,5); //返回写入的0-5位字符
buf.toJSON(buf); //将 Buffer 转换为 JSON 对象