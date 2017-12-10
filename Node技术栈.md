### koa
const app = new Koa();

创建服务器：app.listen(3000) http.createServer(app.callback()).listen(3000);
中间件：app.use(fuc)
Cookie：
 ctx.cookies.set('name', 'value', { signed: true }); 签名要配合`app.keys=[]`多个name.sig options:signed maxAge expires path domain secure httpOnly overwrite 
 ctx.cookies.get(name, [options])


app.context就是ctx ctx.app应用程序实例引用 koa@1.x使用this引用Context对象
ctx.req/res Node原生对象，绕过Koa的response处理是不被支持的
`ctx.response === ctx.body` ctx.request.body
ctx.state命名空间

错误：
 默认stderr 自定义app.on('error', err =>)
 ctx.throw(400); ctx.assert
Content-Type 
 ctx.is（） 是否有  ctx.request.is()
 ctx.accepts 是否是
ctx.acceptsEncodings 是否是指定的Accept-Encoding
ctx.acceptsCharsets 是否是Accept-Charset
ctx.acceptsLanguages 是否是Accept-Language
request.socket返回请求套接字。
路由：
ctx.redirect('/sign-in') 重定向
中间件:
koa-convert 继续使用function*中间件语法
koa-bodyparser 解析表单/json数据/上传文件,body才有数据。
koa-static 静态文件 
koa-router 路由
koa-json 响应带缩进的字符串
koa-logger 让console.log美观
koa-views 模板引擎的容器
koa-session2
koa2-cors 跨域
三方库：
ioredis
nodemon 修改文件自动重启服务
uuid 随机uid
Sequelize ORM框架
```
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(require('koa-static')(__dirname + '/public'))
app.use(route.routes(), route.allowedMethods())
```
NODE_ENV=development貌似不能卸载npm scripts字符串内
process.env.NODE_ENV process.env是电脑环境变量，要手动设置

父进程的回调错误捕获要借助这3个API：
process.stdout.write
process.stderr.write
process.exit(1) 非0则表示失败
```
console.error = function () {
    var msg = Array.prototype.join.call(arguments, ', ');
    process.stderr.write(msg);
};
```