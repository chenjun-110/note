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
  5. `du -sh`总大小 `du -ah`显示大小的`ls` 

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
  1. API: new Buffer/buf.write 字符转BUF buf.toString('base64') BUF转字符 
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
    4. 服务端事件：connection在TCP连接时，request在解析出请求头时，close在所有连接断开时(server.close()仅停止接受新连接)，checkContinue在客户端上传头带`EXpect:100-continue`大数据时触发(如果没监听它自动响应100Continue头，客户端再发起请求触发request事件)，connect在收到connect请求时，upgrade在请求升级协议时，
    5. 模拟客户端：http.request
      1. options:host域名 hostname名称 port服务器端口 localAddress本地网卡 socketPath:Domain套接字路径 auth:Basic认证 agent代理对象设置
      2. http.globalAgent:HTTP代理对象、重用TCP连接、同一服务器连接池最多并发5个连接。
      3. agent:false解除连接限制。agent=new http.Agent({maxSocket:10})连接限制10个。agent.sockets当前连接数，agent.requests等待连接数
      4. 客户端事件：response、socket连接`分配`给请求对象时、connect发起connect请求后收到`200`时、upgrade发起upgrade请求后收到`101 Switching Protocols`时，continue发起Expect头收到`100`Continue时
  5. WebSocket:
    1. 握手由HTTP完成，传输由TCP完成。
    2. 请求头：Upgrade:websocket、Connection:Upgrade升级协议，Sec-WebSocket-Key：值是随机base64码、会在服务端的固定码拼接通过sha1算法计算转码返回
    3. 接收数据：在upgrade回调内监听socket.on('data')。socket.write则是发数据。注意：这里收发的数据格式是(数据帧buffer+数据体buffer),要做解析。
安全：
  1. crypto 加解密、tls 基于TSL/SSL的TCP(在传输层加解密)、https 
  2. TSL：
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
页面渲染：
  1. MIME: 
    1. res.writeHead(200,{'Content-Type':''}) `text/html`和`text/plain`区别是后者为纯文本会显示html标签字符 
    2. 客户端识别为下载：`Content-Disposition：attachment;filename='a.txt'` 值为`inline`是即时查看。默认存储文件名。 
    3. 跳转页面：`res.setHeader('Location',url)`返302


Linux命令行：
  1. 打开文件:vi a.txt
  2. 查看文件: cat
  3. 保存并退出vi: ESC -> :wq
  4. 查询程序安装路径：where node

###正则表达式基础： 无法梳理嵌套结构
字符组：
  1. 一个`[]`仅代表单个字符的范围。括号内出现的字符就是将要匹配的目标。
  2. 顺序无所谓
  3. 范围表示法： `-`号代表ASCII码值范围所以有顺序 横线紧邻`［`或`[^`不需转义
  4. 排除字符组：`[^ ]` 它必须匹配到一个字符! ^必须紧临`[` `[^0-9][0-9]`能查A8，查不了8！
  5. 字符组简记法：等价于[]，既可单独写也可写在[]内 \d数字 \w数和字母_ \s空白 \b字符和空格的边界 大写等价于非[^ ]
元字符：
  1. 转义符：单\是转义，双\是自己，三\是自己和转义。 转义贪婪量词只需一个\{m,n}
  2. 有特殊含义的
量词：
  1. 字符组的长度 闭区间 \d{m,n} {m,} {0,n} {m}
  2. 量词简记法：+ {1,}  ？ {0,1}  * {0,}
  3. 贪婪：`*`可配可不配选择配并记录状态，直到无词可配再回溯到最近位。导致`".*"`匹配出"ab"c" 适合区分文件路径和文件名
  4. 懒惰：`*？`原理与上相反，单个问号仍然是贪婪的，把问号加在任何量词后面转为懒惰量词。 懒惰遇到量词后的词会终结！贪婪遇到最后的该词才终结。
分组：
  1. 非捕获分组：`(?: )`作用是量词可应用在整体上了。
  2. 只用？限制各个部分会有缺陷，分组适合同时出现或同时不出现的情况。
  3. 多选：`(a|b|c)`只要有一个成功则匹配成功。思路：把出现情况按逻辑分类，每类单独写一个正则用|连接。 对顺序有要求
  4. 捕获分组：分组编号从左`1`到右的开括号算起。存储结果，适合提取src这种内嵌多种内容。 一个分组匹配多次存储的是最后一次。
  5. 反向引用：`<([^>]+)></\1>` 取得分组1匹配到的结果值，适合匹配重复数据。 \10如果有分组10就是\10，没有就是\1和0。
断言：
  1. 匹配的是位置,不是字符。
  2. \brow\b row左右都必须是单词边界。适合缩小匹配范围.适合单词加标签高亮功能. 
  3. ^ 整个字符串的开始， $ 整个字符串的结束,受多行模式影响。适合在每行开始结尾插入标签，文本转html。`^\s+`消除行头空格。
  4. 顺序环视：`(?! )`/`(?= )`字符之后不能/必须出现某字符 js只支持顺序环视。
性能：
  1. 捕获分组会存储匹配结果，非捕获分组不会。
###正则表达式例子：
  1. `[0-9][1-9]{8}` 第1个字符是0-9，后8个字符是1-9
  2. `[\s\S]`/`(.|\n)`任意字符 [a-z]小写 [A-Za-z]大小写 [0-9]数字 [^a-z]除了小写 [^xy]除了xy [-0-9]横线和数字。
  3. `<[^>]+>`匹配所有标签 `"[^"]*"`匹配双引号 `<[^/][^>]*>`类似<div> `</[^>]+>`类似</script> `<[^>]+/>`类似<img />  `[^>]` 不是尖括号的任何字符，也就是到尖括号停止。`[^>]*`则是匹配大量非尖括号到>停止。 `[^>]*>`最后手动加个>
  4. https? s可有可无 ￥?100  
  5. `//.*`单行注释，单行不存在换行所以用点号
  6. `<script[\s>][\s\S]+?</script>`
  7. `.*/`URL路径 `[^/]*$`文件名
  8. ^(ab|cd)$不能匹配abc ^ab|cd$可以
  9. <(?!a) <右边不能有a
JSapi:
//.test():只要有匹配则返true
.match(//):匹配结果转数组 g拿不到()捕获分组数组 RegExp.$1可拿捕获分组
.split(//):字符串拆分为数组
//.exec():返匹配数组的第一项
.search(//):返匹配的偏移