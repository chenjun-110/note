/*
npm search express 搜索模块
npm update express 更新模块
npm uninstall express 卸载模块
npm ls 查看
npm list express 查看模块版本号
npm list 查看本地所有模块
npm config set proxy null 解决抛错npm err! Error: connect ECONNREFUSED 127.0.0.1:8087 

<<<<<<< HEAD
npm init 生成package.json，创建模块的前提
npm adduser 模块注册用户
npm publish 发布模块

npm install -g cnpm --registry=https://registry.npm.taobao.org 淘宝npm
cnpm install 淘宝下载
cnpm install express --save 安装express

$ node --expose-gc
global.gc() 手动垃圾回收
process.memoryUsage() 查看内存占用
=======
>>>>>>> e92839421b666749e2781ea698fea3281dcc7901
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

//exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
var express = require('express');
//node hello.js 运行服务器
var http = require('http');
http.createServer(function(request,response){ //创建服务器
	response.writeHead(200,{'Content-Type':'text/html'}); //响应头
	response.write("hallo");
	response.end('Hello Worlds\n'); //页面输出
}).listen(8889); //http://127.0.0.1:8889/
console.log("hi kaka"); //控制台输出

var events = require('events');// 引入 events 模块
var eventEmitter = new events.EventEmitter();// 创建 eventEmitter 对象
eventEmitter.on('eventName', eventHandler);// 绑定事件，名字随意，重复绑定不会被覆盖而是先后调用
eventEmitter.emit('eventName'); // 触发事件

var buf = new Buffer(10); 
buf.write(""); //写入字符，类似的还有writeUIntLE、writeUIntBE、writeIntLE、writeIntBE、
buf.toString('utf8',0,5); //返回写入的0-5位utf8字符，类似的还有readUIntLE、readUIntBE、readIntLE、readIntBE
buf.toJSON(buf); //将 Buffer 转换为 JSON 对象
Buffer.concat([buf1,buf2]); //合并缓冲区
buf1.compare(buf2); //比大小，返回值>0 <0 =0
buf1.copy(buf2); //buf1的值复制到buf2
buf.slice(0,2); //裁剪返回buf的0 1位字符内存
buf.length; //内存长度,不会随内容改变而改变
buf[i]; //设置或获取指定字节.

var fs = require("fs");
fs.readFile('input.txt', function (err, data) { //读取文件内容，非阻塞是无顺序的。
    if (err) return console.error(err);
    console.log(data.toString());
});

//读取流txt例子
var data = '';
var readerStream = fs.createReadStream('input.txt'); // 创建可读流
readerStream.setEncoding('UTF8'); // 设置编码为 utf8。
// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {//当有数据可读时触发。
   data += chunk;
});
readerStream.on('end',function(){ //没有更多的数据可读时触发。
   console.log(data);
});
readerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("程序执行完毕");

//写入流txt例子
var data = '菜鸟教程官网地址：www.runoob.com';
var writerStream = fs.createWriteStream('output.txt');// 创建一个可以写入的流，写入到文件 output.txt 中
writerStream.write(data,'UTF8'); // 使用 utf8 编码写入数据
writerStream.end(); // 标记文件末尾
// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
    console.log("写入完成。");
});
writerStream.on('error', function(err){
   console.log(err.stack);
});
console.log("程序执行完毕");

readerStream.pipe(writerStream); //管道流:从读取流获取数据传入到写入流，把input.txt写入到output.txt

var zlib = require('zlib'); 
fs.createReadStream('input.txt') // 压缩 input.txt 文件为 input.txt.gz
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input110.txt.gz'));
console.log("文件压缩完成。");

fs.createReadStream('input110.txt.gz') // 解压 input.txt.gz 文件为 input.txt
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input110.txt'));
console.log("文件解压完成。");

fs.open('input.txt', 'r+', function(err, fd) { //打开文件，r+读写模式，
   if (err) {
       return console.error(err);
   }    
});

fs.stat('/Users/liuht/code/itbilu/demo/fs.js', function (err, stats) { //获取文件信息
    console.log(stats.isFile()); 		//stats有很多方法，isFile判断是否是文件
});

/*
模块
hello.js中 Hello为构造函数。
	module.exports = Hello; 
b.js中
	var Hello = require('./hello'); 
	hello = new Hello(); 

hello.js中 world为方法函数
	exports.world = fuc; 
b.js中
	var hello = require('./hello');
	hello.world();
*/
console.log( __filename ); //带文件名的路径
console.log( __dirname );  //不带文件名的路径
console.time("获取数据");
//
// 执行一些代码
//
console.timeEnd('获取数据');

/*
process 是一个全局变量，即global对象的属性，了一个与操作系统的简单接口。
exit 进程准备退出时触发
beforeExit 清空事件循环并没有其他安排时触发
uncaughtException 异常冒泡回到事件循环时触发
Signal 进程接收到信号时就触发
 */
process.on('exit', function(code) {
  console.log('退出码为:', code);
});
process.argv.forEach(function(val, index, array) { //process还有很多属性，array[0]是node路径，[1]是脚本文件路径
   console.log(index + ': ' + val);
}); 
console.log('当前目录: ' + process.cwd()); //process还有很多方法。

var util = require('util'); //提供很多常用函数
util.inherits(Sub, Base); //Sub函数只继承Base函数的原型
util.inspect(obj); //把对象转成字符串
