[TOC]
### http模块：

    1. 启动服务器：http.createServer((req,res)=>).listen(8888) 监听请求事件
         1. 响应: writeHead() write() end()
       2. 请求： nodejs默认不理会post体
         1. 接收数据段事件：req.on('data',(d) => v+=d)
         2. 接收完毕事件：'end' 可用querystring.parse(v)转成post请求对象格式
    2. 模拟请求：http.request({host:'',port:'',path:''}) -> req.end()
  url路由模块：
    3. 获取pathname: url.parse(request.url).pathname;
    4. 获取参数： url.parse(request.url).query;
    5. 打印所有属性值：在启动服务器时response.end(util.inspect(url.parse(req.url, true)))
    6. 相对路径转绝对：url.resolve(url,href)
  querystring模块：
    7. 获取参数的值： querystring.parse(pathname)[key]
  全局变量：
    8. global属性有 最外层变量、未声明的变量
    9. 带文件名的路径 __filename
  3. 不带文件名的目录	路径 __dirname / process.cwd()
    10. 代码执行时间 console.time("");console.timeEnd("");
    11. process:
            1. 触发进程事件 process.on('',(code)=>)
            2. 常用事件：exit退出 beforeExit清空事件循环 uncaughtException异常 Signal信号
            3. 常用退出码：1~12 128
            4. 属性：16个 

### util模块：

    1. inherits(a,b) a继承b的原型
    2. inspect() 对象转字符串,调试有用
    3. isArray() isRegExp isDate isError
  fs模块：大多是异步方法
    4. 读取 readFile('txt',(err,data)=>)
    5. 打开 open()
    6. 获取文件类型 stat(path,(err,stats)=>)
    7. 写入 writeFile()
    8. 读取 read()
    9. 关闭 close()
    10. 截取 ftruncate()
    11. 删除 unlink()
    12. 创建目录 mkdir() 读取目录 readdir() 删除目录 rmdir()
   net模块:
    13. 启动TCP服务器 net.createServer((o)=>).listen
    14. 模拟客户端socket连接 net.connect({port:},()=>) 
   其它模块：os系统操作 path文件路径 dns解析域名 domain捕获错误
   搭建简单能访问页面的顺序：http.createServer->fs.readFile-> res.write(data.toString()) -> res.end()

### 事件循环

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

### child_process模块：

  1. `exec('node a.js',{cwd:'./note'},(err,stdout,stderr)=>)`子进程执行命令,子进程输出传到参数。`exec`只针对js文件当前目录，跳`cd`了必须设置`cwd`！
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
  6. formidable:流式解析文件上传
  7. blanket:测试覆盖率 mocha

`node -e "console.log('hello world')" `执行字符串

### npm:

  1. 包只下载一次：在已下载目录npm link express把包移到全局，在需要使用的地方npm link express获取快捷入口。
  2. 更新全局包：npm update express -g
  3. 目录：bin存放二进制，lib存放js，doc存放文档，test存放测试

### 命令行：

  1. touch a.js 新建文件
  2. 快捷键：ctrl+C 终止 ctrl+D 退出 Tab自动补全
  3. 比如fs
  4. _变量为最近输出值
  5. `du -sh`总大小 `du -ah`显示大小的`ls` 

### repl模块:

  1. repl.start({ prompt: '> ',useColors:true });

## 深入浅出node.js

libuv:跨系统的中间层
Apache是一线程一请求。Nginx是事件驱动。
多线程的缺点：线程切换有开销，每个线程占内存。
单线程的缺点：无法利用多核CPU,报错会崩溃，大计算占CPU影响其它异步。child_process可开启多进程。

    1. 如果只有纯计算，没有IO？ 可用C++扩展用多线程并行计算。
    2. 只有Js是单线程的，底层异步IO是多线程的，win下是IOCP方案,*nix是自定义线程池。
    3. IO：包括磁盘文件、硬件、套接字等
  js做位运算(转码)要先把double型转为int型，占CPU，需要借助C++模块。
  模块：
     4. 核心模块运行时编译为二进制，加载快。
     5. 带后缀名更快.
     6. require：对.json底层调用fs读取,JSON.parse解析。对.js会用vm.runInThisContext包装成函数。对.node会调用process.dlopen。
     7. process.binding用来加载核心模块的内建C++部分
  fs.open底层获得文件描述符，进行IO的前提。
  事件：
    8. Node对事件限制10个监听者，emitter.setMaxers(0)可解除。
    9. EventEmitter的error如果被监听，则监听者执行，否则作为异常抛出，可能崩溃。
    10. util.inherits(f,events.EventEmitter)继承事件类
    11. once():数据库有巨大访问时，用状态变量保证每次一条。同名重复查询用once监听一个,在某个查询回调触发emit()把数据传给监听者，这样所有重复查询都能在同一时刻收到数据了。
   异步代码规范：异步函数的回调1参为error，内部也要判断error是否存在。
   异步异常：
    12. try-catch只能捕捉本次循环。
    13. 回调内部异常，小心回调前面的部分重复执行。
   并发：
    14. 并发控制：IO并发过多超过文件描述符数量，需要加以限制。超过的载入调用队列。
    15. 拒绝模式：调用队列满员后，新加入的可能会等待超时，索性拒绝掉，节省调用方的时间。
    16. 超时控制：某个IO时间过长，终止它，节省调用队列的等待时间。
   内存：
    17. V8默认限制使用内存，64位1.4G 32位0.7G。
            1. 解除：node --max-old-space-size=1000 a.js //单位MB 设置常驻老生代内存限制，而暂存的新生代内存用--max-new-space-size 
            2. process.memoryUsage()返回的hepTotal是申请到的堆内存、heapUsed是内存已使用数、rss常驻内存。单位字节。
            3. 系统总内存：os.totalmem() 闲置内存：os.freemem()
    18. 垃圾回收原理：Scavenge算法的新生代内存又分Form空间、To空间，从Form复制存活对象到To,释放死对象并互换空间位置。如果To空间占比超25%,对象则被移入老生代空间接受新垃圾回收算法Mark-Sweep/Mark-Compact。Sweep在遍历标记活对象清除死对象，会产生间断的内存碎片。间隔过小不足以分配大内存对象时切换到Compact移动所有对象位置消除间隔。回收会导致逻辑停顿，V8是和逻辑是交替执行的。
    19. 垃圾回收日志:node --trace_gc或--prof a.js 
    20. 全局变量、闭包变量容易成为老生代。
    21. Buffer对象是堆外内存不受V8限制。适合不直接操作字符串。 
    22. 应用注意:
            1. js缓存对象:查询时先 if(obj[key]) 没有就真实查询。注意：要限制缓存对象大小和过期时间。(进程间不共享内存，所以缓存对象可能会重复，推荐Reids和Memcached软件存储缓存)
            2. exports:模块会常驻老生代，防止内存泄漏。如果不可避免要增加内存，必须设计可清空的接口。
            3. 队列：比如是数据库记录日志，记录队列激增，会导致写入函数堆积，进而内存爆炸。解决：浅层用文件写入达到消费速度大于写入速度，深层设置队列满员的报警机制、队列调用设超时模式和拒绝模式。
          Buffer:
    23. API: new Buffer/buf.write 字符转BUF buf.toString('base64') BUF转字符 
    24. fs.createReadStream('a.txt',{highWaterMark:10}) 每次读10个字节
            1. data事件默认传出的是buffer对象。如果读取流每次读取的buffer长度不等于编码正确显示所需长度，就会有乱码。
            2. setEncoding()：让data事件传出的是字符串。可解决utf8、base64、ucs-2/utf-16LE的乱码
            3. 底层：调用fs.read(),highWaterMark设置过小，会导致函数调用频繁、data事件触发频繁。
    25. 网络传输时，预先把静态内容转成buf,不要实时转换。性能提高一倍。
   网络：
    26. net--TCP dgram--UDP http--HTTP https--HTTPS
    27. TCP:
            1. 三次握手：游览器请求->响应->开始传输 （客户端服务端各提供一个套接字创建会话）
            2. 事件：net.createServer监听connection事件(connect事件用于客户端)，server.listen监听listening事件,server.close只是停止接受新连接、close事件是所有连接断开。调用write触发本端drain事件。
            3. TCP对小数据包有优化算法：在缓冲区合并小数据，可能会延迟发送。调用socket.setNoDelay(true)可取消Nagele算法，write会立刻发送。
    28. UDP:
            1. 和TCP的区别：一个套接字和多个UDP服务通信。会丢包。适合音视频、DNS。
            2. 创建套接字：dgram.createSocket('udp4') 服务端监听连接事件listening、接收事件message、绑定端口bind() 客户端发送信息send、关闭连接close()
    29. HTTP:
            1. 基于TCP：封装了net模块
            2. setHeader可多次设置，writeHead则把报头写入连接
            3. res.end：先调用write发送，必须调用否则长连接等待。TCP连接肯能用于下一次请求响应。
            4. 服务端事件：connection在TCP连接时，request在解析出请求头时，close在所有连接断开时(server.close()仅停止接受新连接)，checkContinue在客户端上传头带`EXpect:100-continue`大数据时触发(如果没监听它自动响应100Continue头，客户端再发起请求触发request事件)，connect在收到connect请求时，upgrade在请求升级协议时，
            5. 模拟客户端：http.request
              1. options:host域名 hostname名称 port服务器端口 localAddress本地网卡 socketPath:Domain套接字路径 auth:Basic认证 agent代理对象设置
              2. http.globalAgent:HTTP代理对象、重用TCP连接、同一服务器连接池最多并发5个连接。
              3. agent:false解除连接限制。agent=new http.Agent({maxSocket:10})连接限制10个。agent.sockets当前连接数，agent.requests等待连接数
              4. 客户端事件：response、socket连接`分配`给请求对象时、connect发起connect请求后收到`200`时、upgrade发起upgrade请求后收到`101 Switching Protocols`时，continue发起Expect头收到`100`Continue时
    30. WebSocket:
          1. 握手由HTTP完成，传输由TCP完成。
                2. 请求头：Upgrade:websocket、Connection:Upgrade升级协议，Sec-WebSocket-Key：值是随机base64码、会在服务端的固定码拼接通过sha1算法计算转码返回
                    3. 接收数据：在upgrade回调内监听socket.on('data')。socket.write则是发数据。注意：这里收发的数据格式是(数据帧buffer+数据体buffer),要做解析。
        安全：
    31. crypto 加解密、tls 基于TSL/SSL的TCP(在传输层加解密)、https 
    32. TSL：
          1. 底层用openssl生成，公钥加密发出数据，私钥解密收到数据，安全连接时互换公钥。
                2. 中间人攻击：中间人拿到服务器公钥并把自己的公钥发给客户端。
                    3. 数字证书CA：用来判断是否为目标服务器的公钥。客户端创建私钥：openssl genrsa -out client.key 1024 -> 生成csr:openssl req -new -key client.key -out client.csr -> 生成证书：openssl x509 -req -CA ca.crt -CAkey ca.key -CAcreateserial -in client.csr -out client.crt
                        4. 检测证书正常：openssl s_client -connect 127.0.0.1:8000
                            5. createServer和connect都需要读取server.key/server.crt/ca.crt
                    crypto：
                                1. createHash('sha1').update(key+固定码).digest('base64') 固定码："258EAFA5-E914-47DA-95CA-C5AB0DC85B11"

业务逻辑：
    1. 请求方法的判断：switch(req.method)
         1. RESTful:GET表示查看资源、POST更新资源、PUT新建资源、DELETE删除资源
    2. URL路径解析:url.parese(req.url).pathname
         1. 访问静态文件：拿pathname和本地路径拼接->读取文件->错返404，对返200。
               2. 路由自然映射逻辑：`"/controller/action/a/b/c".split('/') -> obj[controller][action].apply(null,[req,res].concat(args))`controller是控制器，action是行为函数，后面是参数。
    3. URL查询解析。
         1. 参数解析为对象：`querystring.parse(url.parse(URL).query)` 或 `url.parse(URL,true).query` 中间件的做法是把该对象又赋值给`req.query`做某些处理
    4. 
         1. Cookie解析
             1. 在`req.headers`内部，一般都把cookie字符串解析为对象赋值给`req.cookies`供内部使用:例如`if(!req.cookies.init)`
             2. `res.setHeader('Set-Cookie',[])`字段意思：`HttpOnly`document.cookie不可见、`Secure`仅HTTPS有效、`path`和访问路径对应才可见、`Expires/Max-Age`过期
             3. 缺点：报头过大、前后端都可篡改、上级path的cookie对子路径可见(静态文件不需要cookie：更换域名、下载线程翻倍但域名转IP要DNS查询、除非做DNS缓存)
               2. Session
             1. 把session的键存在cookie的值，如果它被篡改就取不到session的值了。
             2. 超时一般设为20分钟，删除重生成session，再又把键用cookie传至客户端。
             3. token:首次登陆创建随机token`token=req.session.t || (req.session.t=Random(x))` if(token===req.body.t)
               3. 缓存：
             1. 时间戳法：`req.headers['if-modified-since']`和服务器最后修改时间相等，返304使用缓存。不相等则`res.setHeader('Last-Modified',time)` 返200
             2. 哈希法：Etag比时间戳好，比较的是hash值是否变动。`req['if-none-match']===hash`返304， 反之`res.setHeader('ETag',hash)`返200
             3. 过期法：不用发请求,倒计时计算比Expires好。`res.setHeader("Cache-Control",time)`
             4. 清除缓存：游览器根据URL缓存，所以改URL的参数即可。
    5. Basic认证
           1. 请求头插入base64的值：`Authorization:Basic 值`
           2. `new Buffer(name+':'+password).toString('base64')`
           3. 如果是初次访问，`res.setHeader('WWW-Authenticate','Basic realm="Secure Area"') res.writeHead(401)`响应头告诉游览器需要什么认证和加密方式。
           4. 缺点：密码几乎暴露，需要加入服务器传随机数。
    6. 表单数据解析:
           1. 识别请求头是否为表单请求：`req.headers['content-type']==='application/x-www-form-urlencoded'`
           2. 提交的是JSON或XML、content-type：application/json或xml
           3. 提交的是file文件:`content-type：multipart/form-data;boundary=`等同于<from />的enctype属性 数据体的每段开头都是`--boundary值` 总结尾`--boundary值--` Content-Length：数据体长度
    7. 文件上传处理。
         1. 识别请求头是否带post体：`'transfer-encoding' in req.headers || 'content-length' in req.headers` -> data事件拼接buffer
    8. 数据上传安全：
           1. 内存爆炸：并发上传大数据。方案：1.限制上传大小返`400`，单次返`413`。 2.node只保留文件路径，将数据流流式导入硬盘。
           2. CSRF：用token代替session
    9. 页面渲染：
    10. MIME: 
           1. res.writeHead(200,{'Content-Type':''}) `text/html`和`text/plain`区别是后者为纯文本会显示html标签字符 
           2. 客户端识别为下载：`Content-Disposition：attachment;filename='a.txt'` 值为`inline`是即时查看。默认存储文件名。 
           3. 跳转页面：`res.setHeader('Location',url)`返302
    11. 进程：
       1. Master-Worker模式：主进程不处理业务，fork()复制进程(启动30ms/10MB内存)来做，利用多核。
       2. 前端js和UI共用线程互相阻塞，webWorker可解决。
       3. 只有Node进程有IPC通道才能互相通信，主进程负责接收请求用send('',服务器变量)发给子进程message。子进程底层会创建服务器对象并监听文件描述符，但文件描述符同一时间只能被子进程接。
       4. 信号事件：`kill -l` 可被进程监听 'SIGTERM'是终止信号。
       5. 分布式好处：发生错误自动切换。
       6. 判断主进程：'NODE_UNIQUE_ID' in process.env
     child_process API:
       spawn('cmd.exe', ['/c', 'my.bat']);   等价  exec('my.bat',()=>)
       spawn('"my script.cmd"', ['a', 'b'], { shell: true }); 等价 exec('"my script.cmd" a b',()=>)
       spawn('node',['a.js']) exec('node a.js',()=>) execFile('a.js',()=>) fork('./a.js')
       execFile()不会其衍生shell、js文件首行必须是`#!/usr/bin/env node` fork只用于Node
       发送杀死进程信号：kill() process.kill(pid,)
     测试：
    12. API: ok()值为真 equal()值相等 deepEqual()对象的值相等 strictEqual()值全等 
    13. assert异常会停止，如果需要继续并生成报告需要框架
    14. 单元测试：用于检测代码行为符合预期。 只关心输入。 把mock数据拿来运行。
    15. 基准测试：相同输入、相同次数、比较两个函数执行所花时间
    16. 压力测试：网络并发的吞吐率、响应时间、并发数。
    17. 性能测试：PV在10万以上要做。 QPS是每秒处理请求数。

产品化：

    1. 工程化：目录结构、构建工具、编码规范、代码审查。自动部署。
    2. 性能：动态请求和静态请求(走CDN)分离。动态数据转Buffer，但静态数据本身就是Buffer。 缓存 多进程架构 数据库读写分离。
    3. 日志：
           1. console.log/info输出到process.stdout console.warn/error输出到process.stderr。
           2. 子函数报错，应层层传给祖先函数处理。最上层调用者用参数向下传errorcallback()处理.
    4. 监控:
           1. 日志:新增异常类型和数量、QPS能看出业务的时间分布、PV/UV能看出使用者习惯和访问高峰。
           2. 响应时间：用Nginx反向代理监控。 
           3. 监控进程数量、磁盘用量、内存泄漏、CPU用户态占用小于70%、内核态小于30%、CPU平均负载、网络流量、IO负载、应用状态、域名DNS故障。
    5. 水平扩展：多机器、多机房、多进程。

函数转promise函数:util.promisify(fuc)

#### 二进制

在PHP中，通过位运算符很容易就可以做到类似的权限控制：

```
<?php
//定义权限
define('READ', 1<< 0);    // 把可读权限放在最右边 001
define('WRITE', 1<<1);    // 可读权限向左移一位 010
define('EXCUTE', 1<<2);   // 可执行权限向左移两位 100

//赋予权限
$user_permission =  WRITE  ; 110 7

//验证权限
echo '可读：', ($user_permission & READ) ? 'Yes' : 'No', "\n"; 001 110 与 000
echo '可写：', ($user_permission & WRITE) ? 'Yes' : 'No', "\n"; 010 011与 010
echo '可执行：', ($user_permission & EXCUTE) ? 'Yes' : 'No', "\n"; 100 111 与 1
?>
```
PHP语言本身的错误控制 也是用位运算来做的，它甚至还利用了按位异或和按位非，使得错误控制更加精确。

#####  优点和缺陷

位运算的运算对象是二进制的位，速度快，效率高，而且节省存储空间，位运算做权限控制又相当地灵活。但是，位运算也有很大的局限，因为在32位计算机上，位移不能超过32次，这就要求权限数量不超过32种。

```
for ($i = 1; $i < 14; $i++) { //牌数1-13
    for ($k = 1; $k < 5; $k++) { //花色1-4
        $a       = $k << 4; //花色数据存入前4位
        $c       = $i | $a; //牌数数据存入后4位合并
        $p       = dechex($c); //转16进制
        $plist[] = $p; 
    }
}

$num = hexdec($hexNum); //16转10进制
$suit = $num >> 4;  //获取前4位
$n = $num & 15;  //获取后4位 （和00001111做&运算，得后4位）
return ['n'=>$n, 'suit'=>$suit];
```



#### mysql库
事物：
  connection.beginTransaction() 回调里用query操作sql。 
  connection.rollback();和connection.commit(); 放在query的回调里。
回调层级：
beginTransaction
  query
    query
      rollback/commit

