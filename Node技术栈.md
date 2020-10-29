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

#### Sequelize ORM框架
sequelize.define 定义表结构
```
const A = sequelize.define('表名', {
    date:{ 
        type: Sequelize.DATE, 
        defaultValue: Sequelize.NOW, //设置默认时间
        allowNull: false, // NOT NULL 
        unique: true, //唯一
        primaryKey: true, //主键
        autoIncrement: true, //自增列
    },
    bar_id: { //外键列 A.hasOne(B);B.belongsTo(A); AB会获的get/set/add方法
        type: Sequelize.INTEGER,
        references: {
          model: Bar,// 模型名
          key: 'id'//列名
        }
      }
});
//数据类型
type: Sequelize.CHAR(10) .BOOLEAN .DATE .STRING .INTEGER

```
```
A.update(data,{'fields':[列]}) 只更新data的某个key
A.findAll({
	'attributes':[列，[列b，列b别名]], //只查某列
	'where':{
		'列': [列值]， // 默认AND条件
		'id': {
			'$eq':1 // id=1 
		},
		'$and':[{'id':2}], // 显示AND条件
		'order':[[列,'DESC'],[列]], //排序
		'limit':10 //显示10条
		'offset':10 //分页跳过10条
	}
}) 
where操作符：$eq =, $ne !=, $gt >, $gte >=, $lt <, $lte <=, $between 之间, $notBetween 非之间, $in IN(), $notIn NOT IN(), $like 通配符, $notLike 
where条件：$and AND, $or OR, $not NOT,
```
  create 创建表
  查单条A.findAll == select * from A 查询并获取数A.findAndCountAll 
  a = await A.findOne() -> a.get('列')
  插入 A.bulkCreate([{'列':值}, {'列':值}])
  /update/destroy 更新删除

#### ioredis
```
var redis = new Redis({ //可new多个实例作发布订阅
  port: 6379,          
  host: '127.0.0.1',   
  family: 4,           // 4 (IPv4) or 6 (IPv6)
  password: 'auth',
  db: 0,
  prefix : 'sam:',//存诸前缀
  ttl : 60 * 60 * 23,//过期时间
})
var pipeline = redis.pipeline(); //批处理性能提高3倍，用法相同。
```
redis.set('key', 100, 'EX', 10)
redis.get('key').then((result)=>)
redis.set('foo', new Buffer('bar'))
redis.getBuffer('foo',(err,res)=>) 
redis.sadd('sets', [1, 3, 5, 7])

redis1.subscribe("channel1",(err,count)=> )
redis2.publish("channel1","msg")
redis.on('message'或'messageBuffer',(channel, message)=> ) 统一接收数据，后者接收二进制

redis.pipeline().set('foo','bar').del('cc').exec().then((result)=>) result是数组保存每条命令的结果。
redis.multi().set('foo', 'bar').get('foo').exec((err, results)=>) multi返回管道实例，err会自动取消事务。
redis.pipeline().get('foo').multi().set('foo', 'bar').get('foo').exec().get('foo').exec(); 

redis.monitor 监控redis服务器接收到的所有命令
redis.scanStream 遍历所有key

###### 多个子进程监听同一端口
![多个子进程监听同一端口-2020-10-29-22-25-56](http://img.996lucky.top/markdown_多个子进程监听同一端口-2020-10-29-22-25-56.png)