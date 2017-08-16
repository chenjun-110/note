http模块：
  1. 启动服务器：http.createServer((req,res)=>).listen(8888) 监听请求事件
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
util模块：
  1. inherits(a,b) a继承b的原型
  2. inspect() 对象转字符串,调试有用
  3. isArray() isRegExp isDate isError
fs模块：大多是异步方法
  1. 读取 readFile('txt',(err,data)=>)
  2. 打开 open()
  3. 获取文件类型 stat(path,(err,stats)=>)
  4. 写入 writeFile()
  5. 读取 read()
  6. 关闭 close()
  7. 截取 ftruncate()
  8. 删除 unlink()
  9. 创建目录 mkdir() 读取目录 readdir() 删除目录 rmdir()
net模块:
  1. 启动TCP服务器 net.createServer((o)=>).listen
  2. 模拟客户端socket连接 net.connect({port:},()=>) 
其它模块：os系统操作 path文件路径 dns解析域名 domain捕获错误
搭建简单能访问页面的顺序：http.createServer->fs.readFile-> res.write(data.toString()) -> res.end()
事件循环：
  1. 顺序：timer i/o错误回调 idle/prepare内部 poll(I/O) check close
  2. poll阶段如果setTimeout时间到，且poll空闲就循环下去，在timer执行setTimeout回调。
  3. poll阶段会阻塞等待异步i/o完成，插入回调到poll队列。
  4. setImmediate在check执行。
  5. 在异步io回调内，setImmediate先于setTimeout执行。
  6. process.nextTick()在循环阶段切换时执行/(书上说是在idle执行，推荐用setImmediate代替。前者递归会阻塞其它程序的回调。)
    1. 把递归写法换成process.nextTick(f()),可不防止阻塞。
    2. 把同步回调转为异步回调
    3. process.nextTick嵌套递归会一直运行？多个process.nextTick语句总是一次执行完。
    4. 可取代setTimeout(,0)
    5. 优先级顺序：process.nextTick > setTimeout/setInterval > setImmediate 后2个是check观察者

child_process模块：
  1. exec('node a.js',(err,stdout,stderr)=>)子进程执行命令,子进程输出传到参数
  2. spawn('node', ['a.js', i])
  3. fork("a.js", [i])
mysql模块:
  1. createConnection({}) 
  2. connection.connect() 连接
  3. connection.query('',(err,data,fields)=>) 
  4. connection.end()
三方库：
  1. utility格式库可以转md5加密
  2. 爬虫：superagent对三方网站发起请求，cheerio以jq的方式处理数据
  3. eventproxy:简化异步并发多个请求
  4. async:能设置并发连接数的异步请求
  5. iconv-lite:让Buffer支持GBK编码


node -e "console.log('hello world')" 执行字符串
npm:
  1. 包只下载一次：在已下载目录npm link express把包移到全局，在需要使用的地方npm link express获取快捷入口。
  2. 更新全局包：npm update express -g
  3. 目录：bin存放二进制，lib存放js，doc存放文档，test存放测试

命令行：
  1. touch a.js 新建文件
  2. 快捷键：ctrl+C 终止 ctrl+D 退出 Tab自动补全
  3. 比如fs
  4. _变量为最近输出值

repl模块:
  1. repl.start({ prompt: '> ',useColors:true });

###深入浅出node.js
libuv:跨系统的中间层
Apache是一线程一请求。Nginx是事件驱动。
单线程的缺点：无法利用多核CPU,报错会崩溃，大计算占CPU影响其它异步。child_process可解决。
  1. 如果只有纯计算，没有IO？ 可用C++扩展用多线程并行计算。
  2. 只有Js是单线程的，底层异步IO是多线程的，win下是IOCP方案,*nix是自定义线程池。
  3. IO：包括磁盘文件、硬件、套接字等
js做位运算(转码)要先把double型转为int型，占CPU，需要借助C++模块。
模块：
   1. 核心模块运行时编译为二进制，加载快。
   2. 带后缀名更快.
   3. require：对.json底层调用fs读取,JSON.parse解析。对.js会用vm.runInThisContext包装成函数。对.node会调用process.dlopen。
   4. process.binding用来加载核心模块的内建C++部分
fs.open底层获得文件描述符，进行IO的前提。
事件：
  1. Node对事件限制10个监听者，emitter.setMaxListeners(0)可解除。
  2. EventEmitter的error如果被监听，则监听者执行，否则作为异常抛出，可能崩溃。
  3. util.inherits(f,events.EventEmitter)继承事件类
  4. once():数据库有巨大访问时，用状态变量保证每次一条。同名重复查询用once监听一个,在某个查询回调触发emit()把数据传给监听者，这样所有重复查询都能在同一时刻收到数据了。
异步代码规范：异步函数的回调1参为error，内部也要判断error是否存在。
异步异常：
  1. try-catch只能捕捉本次循环。
  2. 回调内部异常，小心回调前面的部分重复执行。
并发：
  1. 并发控制：IO并发过多超过文件描述符数量，需要加以限制。超过的载入调用队列。
  2. 拒绝模式：调用队列满员后，新加入的可能会等待超时，索性拒绝掉，节省调用方的时间。
  3. 超时控制：某个IO时间过长，终止它，节省调用队列的等待时间。
内存：
  1. V8默认限制使用内存，64位1.4G 32位0.7G。
    1. 解除：node --max-old-space-size=1000 a.js //单位MB 设置常驻老生代内存限制，而暂存的新生代内存用--max-new-space-size 
    2. process.memoryUsage()返回的hepTotal是申请到的堆内存、heapUsed是内存已使用数、rss常驻内存。单位字节。
    3. 系统总内存：os.totalmem() 闲置内存：os.freemem()
  2. 垃圾回收原理：Scavenge算法的新生代内存又分Form空间、To空间，从Form复制存活对象到To,释放死对象并互换空间位置。如果To空间占比超25%,对象则被移入老生代空间接受新垃圾回收算法Mark-Sweep/Mark-Compact。Sweep在遍历标记活对象清除死对象，会产生间断的内存碎片。间隔过小不足以分配大内存对象时切换到Compact移动所有对象位置消除间隔。回收会导致逻辑停顿，V8是和逻辑是交替执行的。
  3. 垃圾回收日志:node --trace_gc或--prof a.js 
  4. 全局变量、闭包变量容易成为老生代。
  5. Buffer对象是堆外内存不受V8限制。适合不直接操作字符串。 
  6. 应用注意:
    1. js缓存对象:查询时先 if(obj[key]) 没有就真实查询。注意：要限制缓存对象大小和过期时间。(进程间不共享内存，所以缓存对象可能会重复，推荐Reids和Memcached软件存储缓存)
    2. exports:模块会常驻老生代，防止内存泄漏。如果不可避免要增加内存，必须设计可清空的接口。
    3. 队列：比如是数据库记录日志，记录队列激增，会导致写入函数堆积，进而内存爆炸。解决：浅层用文件写入达到消费速度大于写入速度，深层设置队列满员的报警机制、队列调用设超时模式和拒绝模式。
Buffer:
  1. API: new Buffer/buf.write 字符转BUF buf.toString BUF转字符 
  2. fs.createReadStream('a.txt',{highWaterMark:10}) 每次读10个字节
    1. data事件默认传出的是buffer对象。如果读取流每次读取的buffer长度不等于编码正确显示所需长度，就会有乱码。
    2. setEncoding()：让data事件传出的是字符串。可解决utf8、base64、ucs-2/utf-16LE的乱码
    3. 底层：调用fs.read(),highWaterMark设置过小，会导致函数调用频繁、data事件触发频繁。
  3. 网络传输时，预先把静态内容转成buf,不要实时转换。性能提高一倍。
网络：
  1. net--TCP dgram--UDP http--HTTP https--HTTPS
  2. TCP:
    1. 三次握手：游览器请求->响应->开始传输 （客户端服务端各提供一个套接字创建会话）
    2. 事件：net.createServer监听connection事件(connect事件用于客户端)，server.listen监听listening事件,server.close只是停止接受新连接、close事件是所有连接断开。调用write触发本端drain事件。
    3. TCP对小数据包有优化算法：在缓冲区合并小数据，可能会延迟发送。调用socket.setNoDelay(true)可取消Nagele算法，write会立刻发送。
  3. UDP:
    1. 和TCP的区别：一个套接字和多个UDP服务通信。会丢包。适合音视频、DNS。
    2. 创建套接字：dgram.createSocket('udp4') 服务端监听连接事件listening、接收事件message、绑定端口bind() 客户端发送信息send、关闭连接close()
  4. HTTP:
    1. 基于TCP：封装了net模块
    2. setHeader可多次设置，writeHead则把报头写入连接
    3. res.end：先调用write发送，必须调用否则长连接等待。TCP连接肯能用于下一次请求响应。
    4. 事件：connection在TCP连接时，request在解析出请求头时，close在所有连接断开时(server.close()仅停止接受新连接)，checkContinue在客户端上传头带`EXpect:100-continue`大数据时触发(如果没监听它自动响应100Continue头，客户端再发起请求触发request事件)，connect在收到connect请求时，upgrade在请求升级协议时，


Linux命令行：
  1. 打开文件:vi a.txt
  2. 查看文件: cat
  3. 保存并退出vi: ESC -> :wq
  4. 查询程序安装路径：where node
