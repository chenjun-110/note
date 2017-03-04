

1.最好的办法就是不要使用document.write()动态加载脚本
2.如果一定要使用document.write()加载脚本，使用异步加载的方式，如<script src="..." async> 或使用DOM API element.appendChild()

谷歌白屏时间：`(chrome.loadTimes().firstPaintTime - chrome.loadTimes().startLoadTime)*1000`
304表示已被缓存
IE8及其之前的IE版本更新间隔为15.6毫秒。假设你设定的setTimeout延迟为16.7ms，那么它要更新两个15.6毫秒才会该触发延时。

图片优化
base64图片:适用于图片<2KB,重用不多。IE8不得超过32KB。移动端不好。
格式：jpg保存色彩复杂的，GIF保存色彩单调的。
渐进式图片：PS中`存储为web所用格式`JPG勾选`连续`和`转换为sRGB选项`。提高的渲染性能
图片来源多个域名


------------------------------------------------------------------

第一章 加载和运行
原因：js单线程引起阻塞。每个`<script>`无论是内联外联在下载和运行时都会暂停。js下载后会运行，而运行会阻止下面的脚本下载(IE8`<script>`可以同时下载，仅限script)。
在body之前是不会进行渲染的。
解决：将脚本放在底部。
减少外联脚本数量，用打包工具整合一起，缩短下载时间。
限制HTTP请求数量
问题:js文件过于庞大，可以拆分逐步添加，等load加载之后再加载脚本。除非
--->1.`defer`属性，会下载但运行在DOM加载完成之后，在onload事件之前，无论内联外联。
--->2.不支持defer的可以用DOM`动态`生成script插入，也不会阻塞除非该脚本里包含其他脚本的调用接口。
--->用load事件或readystatechange`监听`动态脚本:![](http://i.imgur.com/pOOBjEQ.png)动态脚本不能保证顺序
--->```loadScript("a.js",function(){loadScript("b.js",function(){  });});```或者按照顺序把脚本整合成一个文件，因为动态脚本是异步脚本，大文件没事。
3.还有一种非阻塞脚本是用xhr脚本注入。优点是下载后自己决定什么时候执行。缺点：脚本必须在相同域，不能用CDN。
![](http://i.imgur.com/0APeu58.png)
推荐做法：先加载loadScript函数，再用此函数加载其它动态脚本。注意：动态脚本不需要window.onload事件了。有些非阻塞库集成了loadScript函数。

第二章
1.尽量使用直接量和变量，少用数组和对象。尤其是IE7/8超慢。
直接量：包括字符串、数字、布尔、对象、数组、函数、正则、空、未定义。它不保存在任何位置。
2.搜索作用域影响性能，搜局部变量最快。尤其是IE7/8。谷歌可以做到搜全局和局部速度差不多。
Tips:用局部变量保存本地范围之外的变量值。例如document是全局对象，只要用它就会一直搜索到全局作用域，可以把这个全局对象保存起来。
3.修改作用域。with(document)虽然让document对象速度变快，但会让局部变量变慢。
try-catch的catch也是，建议将catch内所有东西交给函数处理。原因：catch会改变作用域，运行后作用域会返回原来，在里面定义的变量在运行后就变最慢的了。如：`try{}catch(ex){handleError(ex);}`这样就不需要访问catch内的局部变量了。
动态作用域：这2个还有函数的（）都属于动态作用域，他无法事先知晓标识符代表谁，优化引擎可能失去作用。
4.闭包：saveDocument(id)这样的全局函数访问平时根本访问不到的局部变量就是闭包。
```
function assignEvents(){
	var id = "xdi9592";
	document.getElementById("save-btn").onclick = function(event){saveDocument(id);
};}
```
内存泄漏：这里是对的，document没保存在变量中，实在要(多个document)结尾赋值null解除引用。document随函数关闭而结束。尤其是IE7/8
闭包作用域搜索顺序：闭包函数->函数->全局。这里的性能可以用全局变量保存局部变量解决。
5.原型链越深越慢，原型方法比实例方法慢。尤其是IE7/8
6.window.location.href 点号越多越慢，如果实例没有该属性会搜索原型链更慢。一定不要重复搜索对象(大于2次都要保存局部变量)。

第三章 DOM编程
一.访问或修改DOM元素
1.尤其是循环中document.getElementById('here').innerHTML +='a';这里有2次,1读1写。解决：直接量自己循环加好再和DOM相加。
2.在IE678上innerHTML插入节点比DOM插入快，现代游览器相反。尤其是更新大块页面时用innerHTML。克隆又比创建快。
3.凡是HTML集合，都是动态更新的，动态查询很慢。解决：将集合和length属性缓存。遍历数组比遍历集合快。速度顺序：缓存集合当前元素>缓存集合>全局
4.IE遍历DOM时，用nextSibling比childNodes快100倍。children比childNodes快100倍。
5.querySelectorAll或某库中的CSS选择器比传统搜索稍快。因为它返回的是类数组，不是HTML集合。传统搜索是获取集合再过滤再存数组。

二.修改样式会重排和重绘
游览器下载后解析DOM树和render tree渲染树排版。渲染之后是绘制。
1.CSS改宽高->重排->重绘。改颜色->重绘
2.重排：插删DOM、位置/尺寸/文本/图片/游览器窗口改变。突然出现滚动条甚至重排整个页面。
3.获取布局信息会刷新队列，尤其是在修改样式时，例如offset/scroll/client-Top/Left/Width/Height getComputedStyle/currentStyle。要查就放在一起查，不要东一点西一点。推荐cssText+=统一修改，或者修改类名。
4.减少重绘重排方法(更新数据)：方法一：批量克隆拆除元素到文档片段->修改样式->批量插入
```
var f=document.createDocumentFragment();
插入DOM到片段
div.appendChild(f);
```
方法二：父盒子display=none->DOM插入父盒子->父盒子display=block
方法三：克隆节点->插入DOM到克隆节点->克隆节点替换老节点old.parentNode.replaceChild(clone,old)。
5.减少重绘重排方法（动画）：动画从页面顶端移动到底部会引发整个渲染树。绝对定位，使动画元素离开文档流。动画结束时再回到文档流。
6.慎用:hover，尤其是大片页面
三.事件
1.事件托管：在祖先元素上绑定事件，回调中判断目标元素是否为自己想要的就行了。

第四章 算法和流程控制
1.for in 循环会遍历实例和原型属性，比其他循环慢7倍。
2.forEach函数循环慢8倍。
优化循环方法：
1.减少循环体。
2.减少循环次数。达夫设备算法可优化处理超过1000次的循环.
```
var i = a.len % 8;
while(i){p(a[i--]);}  //处理余数
i=Math.floor(a.len/8); 
while(i){p(a[i--]);p(a[i--]);p(a[i--]);p(a[i--]);p(a[i--]);p(a[i--]);p(a[i--]);p(a[i--]);} //处理整除
```
3.i--比i++快，因为减为0直接判假，不用比大小。`for(var i=len;i--;)``while(i--)``do{}while(i--)`
多于2个条件，switch比if/else快。
优化判断条件方法：
1.常用条件放首位。2.判断大量数值时使用嵌套条件，无限对半分解。3.查表法：判断大量离散值，将值导入数组或对象比switch快。
递归的调用栈限制：ie受内存限制，其它受js栈限制。
栈溢出：火狐-InternalError,谷歌苹果-RangeError,ie-弹出对话框。
递归模式：1.自己调用自己。2.a调用b，b调用a。
优化递归：1.用循环代替递归避免栈溢出。2.制表法保存前期结果，把计算过的值存在数组或对象。判断参数不存在执行下一步，存在则输出该值。

第五章 字符串和正则表达式    
4种字符串连接：str="a"+"b";str+="b";str=["a","b"].join("");str.concat("b","c");
优化连接：`str+="a";str+="b";`比str+="a"+"b"好。后者会先在内存里创建临时字符串并赋值。
简写优化:`str=str+"a"+"b"`效果相同，但str必须放在首位，在内存中首位以后都只执行复制可避免复制数量不断增长的字符。（仅IE无效，IE8会记录各字符引用统一复制。IE7每次连接都会复制,+=次数越多消耗会指数级增长,IE7使用join最快。）火狐的字符串连接属于编译器常量。IE和谷歌用concat都很慢。
正则优化的部分这里没看？

第六章 响应接口
UI更新和js运行都会组成队列。
游览器对恶意代码的限制：调用栈限制和长时间限制。时间限制会弹出对话框：是否关闭该脚本。
如果js运行了几秒钟肯定是有问题。单一js运行时间最大不超过100毫秒。
如果因为某种原因，js运行超过100毫秒，应暂停且让位给UI更新。
方法：将关于UI或样式更新的代码放在setTimeout(，250)中，插入你要运行的函数内部末尾。定时器最小值不得低于25毫秒。
关于数组的循环中：运行时间过长可能是数组太大或循环体太大。如果不需要同步或按顺序可使用定时器优化。
```
function processArray(items,process,callback){
    var todo = items.concat(); //返回数组副本
    setTimeout(function(){      //延时插入线程队列
        var start=+new Date();
        do{ process(todo.shift()); }//处理并删除数组首项
        while(todo.length>0 && (+new Date()-start<50){ //避免将任务分解得过小
            setTimeout(arguments.callee,25); //递归循环
        }else{callback(items);}
    },25);} 
```
可以将函数分解为几个小函数并分别存在数组内，定时。
用+new Date相减可得代码运行时间，最好不超过50毫秒。时间短的定时器，同一时间最好只有1个。
工人线程：与UI线程分离，可放耗时间的分析代码如解析JSON数据/数学运算/数组排序。超过100毫秒优先考虑这个。
var worker=new Worker("code.js"); //创建工人线程，code.js包含线程代码
worker.onmessage=function(event){
  var jsonText=event.data;//接受数据
  var jsonData = JSON.parse(jsonText); //解析JSON
  worker.postMessage(jsonData); //发送数据
} 
importScripts("a.js","b.js") //工人线程中阻塞式加载js

第七章 Ajax
请求数据5法：XHR 动态脚本 MultipartXHR iframes comet
1.ajax步骤:url->new xhr-> xhr.onreadystatechange->xhr.readyState===4->xhr.getAllResponseHeaders响应头->xhr.responText->xhr.open->xhr.setRequestHeader->xhr.send
XHR不能跨域。IE8+支持readyState===3的流状态。
GET只发一次请求，POST两次。URL或参数长超过2048才用POST。
2.动态脚本插入可以跨域。
步骤：创建script->设置src或直接调用回调函数->插入DOM
数据必须在回调函数内,不能访问头，不能POST，不能设置请求超时或重试,控制权限一样（小心外域黑客）
function jsonCallback(json){var data=('('+json+')');}
jsonCallback({"status":1,"colors":["#fff","#000","#ff0000"]});
3.多余部分XHR：只有1次请求，不仅支持base64图片还有css/js/html文件.速度快4-10倍
步骤：new xhr->xhr.open->xhr.onreadystatechange->4->xhr.responseText->xhr.send
缺点：不能缓存，所以适合加载不重用的js/css
```
var req=new XMLHttpRequest();
req.open("GET","a.php",true);
req.onreadystatechange=function(){
    if(req.readyState==4){handler(req.responseText);
}};
req.send(null);
```
JS
```
function handler(image){
    var imageData=image.split("\u0001"); //删除分割符，还原数组
    var imageElement;
    for (var i=0,len=imageData.length;i<len;i++){
        imageElement=document.createElement('img'); //创建标签
        imageElement.src='data:image/jpeg;base64,'+imageData[i]; //src插入base64地址
        document.getElementById('container').appendChild(imageElement);}} //插入DOM
```
PHP
```
$images=array("a.jpg","b.jpg","c.jpg"); //数组
foreach($images as $image){ //类似for in,每次循环都导入赋值1个项
  $image_fh=fopen($image,'r'); //打开图片文件
  $image_data=fread($image_fh,filesize($image)); //读取
  fclose($image_fh); 
  $payloads[]=base64_encode($image_data); }// 编码图片
$newline=chr(1); //1编码成转成unicode
echo implode($newline,$payloads); //合成字符，分隔符为
```

由于响应数据很大，应该在readyState 3处理，修改函数1写法；
```
var req=new XMLHttpRequest();
var tt,last=0;
req.open('GET','a.php',true);
req.onreadystatechange=readyStateHandler;
req.send(null);
function readyStateHandler{
    if(req.readyState===3 && tt===null){
        tt = window.setInterval(function(){get();}, 15);} //定时器
if(req.readyState===4){clearInterval(tt);} //清除定时器
function get(){
    var length = req.responseText.length;
    var packet = req.responseText.substring(last,length);//获取下标之间的字符
    processpacket(packet); //每15毫秒收到多少处理多少
    last = length;}
```
4.当你只需要发送数据给服务器时：XHR/灯标。
XHR捕获用户错误并发送：XHR比GET快
```
function xhrpost(url,params,callback){
    var req=new XMLHttpRequest();
    req.onerror=function(){
        setTimeout(function(){
            shrpost(url,params,callback); //捕获错误就调用xhr
        },1000);}
req.onreadystatechange=function(){
    if(req.readyState===4){
        if(callback && typeof callback==='function'){
            callback();}}};
req.open('POST',url,true); //不限数量，IE的GET有限制
req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
req.setRequestHeader('Content-Length',params.length);
req.send(params,join('&')); //发送
```
灯标：速度飞快，但GET发送数据有限。
```
var params=["step=2","time=123"]; //数据
var image=new Image();
image.src="a.php"+"?"+params.join('&'); //GET,既不创标签，也不插入DOM
image.onload=function(){ //检测服务端的情况
    if(this.width==1){//成功}
    else if(this.width==2){//重试}
};
image.onerror=function(){//错误时}
//发送204 No Content可让客户端不等待响应
```
数据格式:
