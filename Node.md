http模块：
  1. 启动服务器：http.createServer((req,res)=>).listen(8888)
    1. 响应: writeHead() write() end()
	2. 请求： nodejs默认不理会post体
	  1. 接收数据段事件：req.on('data',(d) => v+=d)
	  2. 接收完毕事件：'end' 可用querystring.parse(v)转成post请求对象格式
  2. 模拟请求：http.request({host:'',port:'',path:''}) -> req.end()
url路由模块：
  1. 获取pathname: url.parse(request.url).pathname;
  2. 获取参数： url.parse(request.url).query;
  3. 打印所有属性值：在启动服务器时response.end(util.inspect(url.parse(req.url, true)))
  4. 相对路径转绝对：url.resolve(url,href)
querystring模块：
  1. 获取参数的值： querystring.parse(pathname)[key]
全局变量：
  1. global属性有 最外层变量、未声明的变量
  2. 带文件名的路径 __filename
  3. 不带文件名的目录	路径 __dirname / process.cwd()
  4. 代码执行时间 console.time("");console.timeEnd("");
  5. process:
    1. 触发进程事件 process.on('',(code)=>)
    2. 常用事件：exit退出 beforeExit清空事件循环 uncaughtException异常 Signal信号
    3. 常用退出码：1~12 128
    4. 属性：16个 
util函数库：
  1. inherits(a,b) a继承b的原型
  2. inspect() 对象转字符串,调试有用
  3. isArray() isRegExp isDate isError
fs：大多是异步方法
  1. 读取 readFile('txt',(err,data)=>)
  2. 打开 open()
  3. 获取文件类型 stat(path,(err,stats)=>)
  4. 写入 writeFile()
  5. 读取 read()
  6. 关闭 close()
  7. 截取 ftruncate()
  8. 删除 unlink()
  9. 创建目录 mkdir() 读取目录 readdir() 删除目录 rmdir()
net:
  1. 启动TCP服务器 net.createServer((o)=>).listen
  2. 模拟客户端socket连接 net.connect({port:},()=>) 
其它模块：os系统操作 path文件路径 dns解析域名 domain捕获错误
搭建简单能访问页面的顺序：http.createServer->fs.readFile-> res.write(data.toString()) -> res.end()
事件循环：
  1. 顺序：timer i/o错误回调 idle/prepare内部 poll check close
  2. poll阶段如果setTimeout时间到，且poll空闲就循环下去，在timer执行setTimeout回调。
  3. poll阶段会阻塞等待异步i/o完成，插入回调到poll队列。
  4. setImmediate在check执行。
  5. 在异步io回调内，setImmediate先于setTimeout执行。
  6. process.nextTick()在循环阶段切换时执行，推荐用setImmediate代替。前者递归会阻塞其它程序的回调。

child_process：
  1. exec('node a.js',(err,stdout,stderr)=>)子进程执行命令,子进程输出传到参数
  2. spawn('node', ['a.js', i])
  3. fork("a.js", [i])
mysql:
  1. createConnection({}) 
  2. connection.connect() 连接
  3. connection.query('',(err,data,fields)=>) 
  4. connection.end()
三方库：
  1. utility格式库可以转md5加密
  2. 爬虫：superagent对三方网站发起请求，cheerio以jq的方式处理数据
  3. eventproxy:简化异步并发多个请求
  4. async:能设置并发连接数的异步请求


node -e "console.log('hello world')" 执行字符串
npm:
  1. 包只下载一次：在已下载目录npm link express把包移到全局，在需要使用的地方npm link express获取快捷入口。
  2. 更新全局包：npm update express -g

命令行：
  1. touch a.js 新建文件