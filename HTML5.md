兼容（IE6-8）H5使用百度的html5shiv包：
```
<head><!--[if lt IE 9]> 
<script src="http://apps.bdimg.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
<![endif]--></head>
```
载入后，初始化新标签的CSS：浏览器对无法识别的元素会作为内联元素自动处理。
```
article,aside,dialog,footer,header,section,footer,nav,figure,menu
{
display:block
}
```
为IE添加新元素标签`<my>`： (ie8及以下不支持)
`document.createElement("my")`

老游览器兼容语义元素：除了figcaption不是块，其它都是。
```
header, section, footer, aside, nav, article, figure
{
display: block;
} 
```
IE兼容渲染语义元素CSS：head脚本加载HTML5 Shiv
```
<!--[if lt IE 9]>
<script src="html5shiv.js"></script>
<![endif]--> 
```
#### meta
`<meta http-equiv="X-UA-Compatible" content="IE=Edge">`
X-UA-Compatible它告诉IE8采用何种IE版本去渲染网页。IE=edge告诉IE使用最新的引擎渲染网页，IE=EmulateIE7 使用IE7渲染，chrome=1则可以激活Chrome Frame。
name:
  1、Keywords(关键字)
`＜meta name ="keywords" content="服务器,VPS主机,厦门云主机租用,服务器租用托管，厦门服务器租用托管"＞`
  2、description(网站内容描述)
`＜meta name ="description" content="厦门凌众科技是十年老牌IDC提供商(lingzhong.net.cn)"＞`
  3、author(作者)
  4、robots(机器人向导)参数
   > all：文件将被检索，且页面上的链接可以被查询； 
   none：文件将不被检索，且页面上的链接不可以被查询；(和 "noindex, no follow" 起相同作用) 
   index：文件将被检索；（让robot/spider登录） 
   follow：页面上的链接可以被查询； 
   noindex：文件将不被检索，但页面上的链接可以被查询；(不让robot/spider登录) 
   nofollow：文件将不被检索，页面上的链接可以被查询。(不让robot/spider顺着此页的连接往下探找) 
  5、Copyright (版权) 6、Generator (编辑器) 7、revisit-after (重访) 

`<meta content="always" name="referrer">`
always:不改变http header中的referrer的值。
never:删除 http head中的referer.
origin:只发送 origin 部分；
default: referer置为空
`<meta name="theme-color" content="#000">`
网址栏状态栏设置颜色
#### canvas
`context=canvas.getContext('2d') `返回2d环境
`gradient=context.createLinearGradient(x,y,x1,y1);`创建线型渐变对象(xy/x1y1左右坐标)
`context.createRadialGradient(x,y,r,x1,y1,r1);`创建圆形渐变对象。前xyr圆1，后xyr圆2。从圆1向圆2扩散。
`addColorStop();`添加渐变色属性{0~1渐变开始的位置（stop,color）}

`fillStyle="#0000ff/gradient"` 填充样式
`strokeStyle=#000/gradient;` 笔触样式

`fillRect();` 画填充矩形(x,y,width,height)
`strokeRect();`画笔触矩形(x,y,width,height)

`fillText();`画实心文本(text,x,y,maxWidth)
`strokeText()`画空心文本(text,x,y,maxWidth)

`beginPath();` 开始或重置路径。
`moveTo(0,0);`画直线起点  `lineTo(1,1);`画直线结点(可多次) 
bezierCurveTo() 画贝塞尔曲线
`closePath();` 结束路径
setLineDash([2, 5]);画虚线
`arc(x,y,r,sAngle,eAngle,counterclockwise)`画弧线(整圆角是2*Math.PI,默认false顺时针)
`stroke()；` 绘制路径

`font="italic small-caps bold 12px arial"`设置字体（多种属性）
`lineWidth=5;`设置线宽

`drawImage()`画布上绘制图像、画布或视频.
两种语法：1.(img,x,y,width,height) 2.(img,sx,sy,swidth,sheight,x,y,width,height)裁剪。sx正值从左裁图左移，负值右裁右移。sy正值从上裁图上移，负值下裁下移。swidth,sheight裁后图永远撑满盒子。
getBoundingClientRect() 获取元素距离页面的偏移，利用它获得canvas的鼠标座标。

技巧：
  把某些绘制封装在函数内，开头调用save(),结尾restore()，不会影响之前。
  解决粗线条矩形空隙：lineCap="round" lineJoin="round" 
  两点距离计算公式：Math.sqrt(Math.pow((loc1.x-loc2.x),2)+Math.pow((loc1.y-loc2.y),2)) d = √[(x₁-x₂)²+(y₁-y₂)²]
  线宽随速度变化公式：max线宽-(v-minv)/(maxv-minv) * (max线宽-min线宽) 
  解决平滑过度线宽：上次线宽占2/3，当次线宽占1/3。
  重置画布：先clearRect()->再调用初始化背景函数。

触控事件：多点触控存在数组内e.touches[0] touchstart-touchmove-touchend
----------

`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" >`svg命名空间
`<math xmlns="http://www.w3.org/1998/Math/MathML">`数学标记语言

**拖动事件**
`draggable="true"` 设置元素可拖动，链接图片默认可拖。
ondrop ：拖动元素放置在目标区域时触发。
ondragenter ：拖动进入目标时触发。
ondragover ：拖动元素在目标区域拖动时触发。
ondragleave ：离开触发。
ondragstart/ondragend ：开始/结束拖动时触发。
ondrag ：元素正在拖动时触发。
`event.preventDefault()`取消事件默认行为。设置允许放置元素，默认不允许。
drop事件的默认行为是以链接形式打开。设置后可览器对数据的默认处理。
event.dataTransfer拖拽数据传递对象
**DataTransfer的API**
- dataTransfer.setData(format, data) 添加自定义数据格式
- data = dataTransfer.getData(format) 获取自定义的数据格式
- dataTransfer.clearData([format]) 清除自定义的数据格式及其数据。
- dataTransfer.dropEffect[=value] 拖拽效果 =“none”, “copy”, “copyLink”, “copyMove”, “link”, “linkMove”, “move”, “all”, and “uninitialized”。
- dataTransfer.items 拖拽的数据集合
- dataTransfer.setDragImage(element,x,y) 拖拽替换跟随
- dataTransfer.addElement(element)
- dataTransfer.types
- dataTransfer.files 拖拽的文件列表对象。

event.target 返回触发该事件的节点
2.appendChild(1) 1追加到2里作为2的子节点

**定位**
navigator.geolocation.getCurrentPosition(showPosition,showError) 获取定位
position.coords.latitude/longitude 返回定位坐标的经度/纬度
```
switch(表达式){ //抛出，表达式会和常量匹配。
case 常量1：
    代码；
    break;
case 常量2：
    代码；
    break;
default:
    代码；}```
error.code
error.PERMISSION_DENIED 用户拒绝对获取地理位置的请求。
error.POSITION_UNAVAILABLE 位置信息是不可用的。
error.TIMEOUT 请求用户地理位置超时。
error.UNKNOWN_ERROR 未知错误。
Google Map API :`<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>`  
watchPosition() - 返回用户的当前位置，并时刻移动时的更新位置
clearWatch() - 停止 watchPosition() 方法

----------

####video audio
controls 显示播放控件
autoplay 自动播放
preload="auto" 预加载 默认auto 取消none 只加载元数据大小metadata
poster="url" 下载时显示的图像
src 如需在IE和Safari播放视频, 必须MPEG4文件。如想在所有浏览器播放视频 - 可在video元素使用source元素。 source可链接到不同的视频。浏览器将使用第一个可识别的格式.
loop 循环播放
muted 静音
id.paused 布尔值 判断是否暂停
id.play()/.pause() 播放 暂停
id.width=  设置大小

track标签用于source标签之后:规定字幕文件或其他包含文本的文件.default默认 kind文本类型 label文本标题 srclang文本语言 

####表单
**input type=" " **
1. color 拾色器
2. data 年月日选择器
3. datatime-local 年月日时分选择器
4. email 检测email合法性
5. month 年月选择器
6. number 限定数字输入域(max min step value)
7. range 限定数字滑动域(max min step value)
8. time 时分选择器
9. url  检测url合法性
10. week 年周选择器
11. image 图片式提交(支付接口不推荐使用，会返坐标值)
12. hidden 隐藏
input标签type里面的两个唯一可以提交的就是submit和image，button需要JS事件配合。
属性

**input属性**
- accept=" " 规定上传文件类型，配合type="file". 参数任何MIME类型都行。
- autocomplete 提示曾输入文本(on off)
- autofocus 加载后获取焦点
- checked 预选定，配合checkbox和radio。
- form 绑定form标签的ID
- formaction 设置action的url
- formenctype 规定编码，配合method="post"
- formmethod 设置请求方式get/post
- formnovalidate 取消合法性验证
- formtarget 窗口响应(_blank _self _parent _top framename name名)
- height/width 配合type="image"
- multiple 可选多个文件,配合type="file/email"
- pattern 正则表达式验证。配合title=""不合法的提示文本
- placeholder 占位符
- readonly 只读
- required 输入值不能为空
- src 背景图片url 配合type="image"
- list 指定datalist的ID
- for 绑定相关元素id

**form**
datalist 自定义提示文本
keygen 加密密钥(rsa dsa ec)
textarea 文本域
optgroup 组合option。label=" "属性选项标题
label标签 abel元素内点击文本，就会触发绑定控件
fieldset 组合元素。 legend 标签元素标题

accept-charset属性规定提交时的字符编码。多个，H4逗号分隔，H5空格分隔。

**object标签**：嵌入图像、音频、视频、Java，applets，ActiveX，PDF以及Flash。

----------
####存储
Number(localStorage.clickcount)本地存储鼠标点击次数(永久存储)
session.Storage 会话存储(不长期存储)

打开数据库：参数(库名，版本，描述，大小，回调)
`var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);`
控制事务执行提交或者回滚：db.transaction()
执行实际的 SQL 查询:executeSql()
####web缓存
启动应用缓存：
`<html manifest="demo.appcache">`
编写manifest文件：
```
CACHE MANIFEST      此标题下列表文件会缓存
# 2012-02-21 v1.0.0 这是注释行
/theme.css          三个文件
/logo.gif
/main.js

NETWORK:            与服务器连接，不会缓存
login.php

FALLBACK:           没网的话会用第2个文件替换第1个资源
/html/ /offline.html```
一旦缓存除非删除或更新manifest，否则不会改变。可以通过修改注释重新缓存。
####web work ：后台JS子线程
编写worker.js后台文件
postMessage(i)发送data数据到主线程或子线程
创建web work对象
`w = new Worker(url)` 
例子：
```
<script>
var w;
function startWorker(){
if(typeof(Worker)!=="undefined"){
  if(typeof(w)=="undefined")
    {
    w=new Worker("demo_workers.js"); 创建web work对象
    }
  w.onmessage = function (event) {   接收worker数据
    document.getElementById("result").innerHTML=event.data;
  };
}
else{
document.getElementById("result").innerHTML="Sorry, your browser does not support Web Workers...";}
}
function stopWorker(){
w.terminate();                       终止web worker
}
</script>```
worker.js无法访问windowDOM，但可用self、location、close、importScripts、XMLHttpRequest、setTimeout、setInterval、addEventListener/postMessage。

----------
####语义化标签
`<nav>`     导航
`<aside>`   和附近内容相关
`<article>` 可脱离上下文完整段
`<section>` 标题，区段。
`<hgroup>`  组合多个section标题
`<header>`  section标题的页眉
`<address>` 描述文章所有者信息 可换行 斜体
`<audio>`   音频
`<command>` 单复选按钮
`<datalist>`列表
`<figure>`独立流内容`<figcaption>` 标题
`<q>` 引用 不缩进 有引号
`<blockquote>` 引用 缩进 
`<del>/<ins>` 描述文档修正 删除线/插入线
`<embed>` 外部程序 
`<object>`嵌入多媒体 `<param>`给object设置参数
`<output>` 计算结果输出
`<colgroup>` 表格样式组合 `<col span="2" style="">`设置前2列样式 `<caption>`表格标题
`<thead>/<tfoot>/<tbody>`表格页头页脚页身 可忽视顺序
`<code>` 代码

####实用标签
`<abbr title="">` 缩略词
`<head><base href="" target="">` 给所有链接设置默认url和打开。
`<bdo dir="rtl">` 文本方向
`<details>` 开启关闭的交互式控件 `<summary>`控件标题
`<hr>` 水平线
`<meter>` 磁盘控件度量衡 `<progress>`进度条
`<mark>` 高亮
`<ruby>字<rt>zi` 拼音注释
`<sup>/<sub>` 上标/下标






> ```
> 注释：根据H5规范，<b> 标签应该做为最后的选择，只有在没有其他标记比较合适时才使用它。
> HTML 5 规范声明：标题应该用 <h1> - <h6> 标签表示，
> 强调文本应该用 <em> ，
> 重要文本应用 <strong>，
> 被标记的或者高亮显示的文本应该用 <mark> 。
> 可以有多个头足标签。 <header> 标签不能被放在 <footer>、<address>、<header> 元素内部。```
> ```

标题栏图标：
`<link rel="icon" href="" type=""> `
收藏夹图标：
`<link rel="shortcut icon" href="" type="">`

&nbsp代表空格，本质是字符。
data-* 自定义属性：下面用dataset添加data-my属性 data-birth-date属性(杠变驼峰)
```
var test = document.getElementById('test');
        test.dataset.my = 'Byron';
        test.dataset.birthDate = '19890615';```

audio音频方法
```
paused返回true说明正在播放，返回false说明正在暂停。
play()播放 pause()暂停 load()重载 fastSeek()指定播放时间 addTextTrack()添加文本轨道 canPlayType()检测游览器是否支持音频类型 
```

```

```

```

```

```

```