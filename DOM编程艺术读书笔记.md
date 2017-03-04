语法
<!--在script中和//都是单行注释。
变量名允许$ _ 数字。
驼峰格式：删除空格和-，后面单词首字母大写。是函数名方法名属性名命名首选。变量名小写 函数名驼峰
弱类型：可把字符和数字赋值给相同变量。
转义符：\
关键字：Array() Object()  new
a=Array()等价于a=[] a={}代表对象
如果if语句代码只有一条，可去掉{}写在同一行。`if (1 > 2) alert("abc");`
条件中不要使用=，赋值成功总是true。
（false==""）总是true，尽量使用=== ！==。
if (!(n > 10 || n < 5)) 等价于n在5~10。
while () {} 循环
do (code) while {} 循环 至少执行一次
函数1 return 才能被函数2调用哦！
对象分为自定义对象、内建对象、宿主对象。
BOM：window对象的属性和方法。(navigator screen history location)
DOM:document对象的属性和方法(element attribute event)
css自带继承
getElementsByTagName:即使只有1个元素，返回的也是长度为1的数组。getElementsByTagName("*")获取目标中所有元素节点。

onclick="function(this);return false;" false表示阻止默认行为发生，单独执行函数。
childNodes 获取所有子节点，空格和换行符也算子节点。
nodeType 返回数字。1元素、2属性、3文本。
nodeName="IMG" 返回大写节点名
P标签的文本其实是属于它的子节点。因此P.childNodes[0].nodeValue获得文本值。
等价：firstChild=childNodes[0]   lastChild=childNodes[.childNodes.length-1]

`<p>This is <em>my</em> content.</p>`文本节点数量为2,This is 和 content.

window.open(url,name,features)弹出新窗口,features是多种参数。
`javascript:function()`点击链接触发函数。等价于onclick
平稳退化：在限制js的游览器上仍具有使用功能。例如href值设为真实url,不要为#或伪协议。`<a href="http://www.baidu.com" onclick="this.href;return false">`
getElementById(id).event=action 绑定事件到元素上。好处是分离js代码。
element.addEventListener(event, function, useCapture)绑定事件(IE9+)
window.onload = 打包函数  没触发文档就绪，有可能getElementsByTagName抓取元素不完整。
从Id祖先元素里搜索Tag更好。
```
window.onload=prepareLinks;  文档就绪
function prepareLinks(){  打包函数
if(!document.getElementsByTagName) return false;
                          检测游览器方法是否可用
  var links=document.getElementsByTagName("a");抓a
  for (var i=0; i<links.length; i++){ 遍历a
    if(links[i].getAttribute("class") =="popup"{
      links[i].onclick=function(){ 匹配类名且绑定事件
        popUp(this.getAttribute("href")); 抓元素url
          return false;}}}} 阻止默认
function popUp(winURL){
window.open(winURL,"popup","width=320,height=480");}
```
对象检测：识别游览器是否支持某DOM。
if(!getElementById) return false; 方法名不能带(),带()检测的是方法的结果。
性能：不要重复使用DOM方法。要把它存在变量中，节约性能，多函数调用就保存全局变量。或者直接把数组元素当参数。HTML标记越多DOM树越大。

addLoadEvent（function）自定义文档就绪的打包函数：
```
function addLoadEvent(func){  
  var oldonLoad = window.onload;    
  if(typeof window.onload!='function'){识别是否有函数
     window.onload = func;  }  
  else{  
      window.onload = function(){   再绑定
         oldonload();               原函数
         func();      }   }  }      新函数
```  
主要代码没通过if检测就return false退出，附属代码放在if(){...}return true内没通过返回true。一个函数得有false和ture2个出口，false可自身调用退函也可做返回值，ture仅作为返回值为外部调用。links[i].onclick=function(){return !showPic(this)}
三元操作符等价于if/else语句赋值变量。
if(id.getAttribute("title") ==> if(id.getAttribute!=null) 属性不存在则为null。条件是函数的话，会执行函数，有结果就true没有false。
键盘事件执行和点击相同功能：links[i].onkeypress=links[i].onclick;其实onclick支持回车点击。

innerHTML比document.write好，后者要在body中插入脚本。(XHTML不支持)
appendChild插入节点树的办法就是成为子节点。
document.createElement("p")创建元素节点（自带nodeName=P、nodeType=1属性）
document.`createTextNode`("Hello world")创建文本节点(自带nodeValue属性)
变量名可与属性值同名。
把新元素插入现有元素前面parentElement.`insertBefore`(newElement,targetElement) 元素的parentNode属性就是父元素。 insertBefore比appendChild好。
由于DOM没有insetAfter方法。可以target.`parentNode`.insertBefore(new,target.`nextSibing`)。没有下一个就用appendChild。

函数赋值给对象的时候不要加（）。因为加了（）是执行函数，不加是引用函数本身。

循环形成数组for：var defs=Array() `defs[key]=value` get到的两个变量可以赋值到defs数组上。
循环遍历数组for/in：for(key in defs)把键值对一个个提出来。调用->key变量代表defs的属性名。`defs[key]代表value`。

IE6不支持abbr解决方案：
1.abbr替换acronym。会牺牲语义化不好。
2.html命名空间(`<html:abbr>abbr</html:abbr>`)。不通用
3.js平稳退化,对于补充内容ie仍能显示基本功能。推荐。if(abbr[i].childNodes.length<1) `continue`;空节点开始下一次循环。
有些游览器会把`换行符`当做文本节点。多用nodeType检查。
getElementsByTagName("*")获取的是元素节点,检查如果没有元素节点应跳出循环。
accesskey快捷键

nodeName属性是字符串，style属性是对象
style的DOM方法只能搜索内联样式，head和css文件无法搜索，但可以赋值覆盖。
DOM设置css同设置html一样只做辅助增强。除非css设置难度很大就用js辅助设置。例如寻找h1下个元素节点：
```
function gerNextElement(node){
  if(node.nodeType==1){ 元素节点
    return node;} 返回节点结束递归
  if(node.nextSibling){ 递归循环找到元素节点为止！
    return getNextElement(node.nextSibling);}
  return null;} 结束递归```
因为空格也算node所以这里要用递归寻找兄弟元素节点。
用true/false做跳行赋值： 隔一布一
```
odd=false;
for(var j=0; j<rows.length; j++){
  if(odd==true){ //odd=0; if(odd%2==0)也行
    rows[j].style.backgroundColor="#ffc"
    odd=false;} 
  else{odd=true;}} 进入下个循环，本次不赋值。
```
如果变量要在父级调用，得把var放在父级函数声明。
elem.className是替换，想追加class得拼接字符串：elem.className +=" intro"
函数抽象：用参数替换具体的值，可使函数变通用。

setTimeout(func,num) 延迟 clearTimeout(sTo) 清除延迟 parseInt(str)返整数 parseFloat(str)返小数
局部变量赋值给属性：作用域永久存在。既不同于局部变量无法赋值也不同于全局变量多重赋值，可以用if检测是否被赋值执行。
Math.ceil()上取整 Math.floor()下取整 Math.round()取整
为实现特效的标记，考虑到有些游览器不支持，可由js生成标记。
Modernizr库：验证游览器是否支持h5c3.
addEventListener()绑定事件
str.indexOf(stR) 返回位置
window.location.href 返回当前url
urlstr.split("#")[1] 裁掉#字符返回数组。1，#后字符。
str.replace("a","b") b替换str中a
form.elements返回表单元素数组(非所有节点)document.forms
hasChildNodes() 是否有子节点
encodeURIComponent 值转换为后端ASCII字符(+、=、 、？)
join('&') 把数组变为1个字符串
str.match(/regexp/) 匹配并返回这些字符,无返null
`responseText.match(/<article>([\s\S]+)<\/article>/)`其中（）部分为捕获组match[1]
谷歌Closur Compiler在线压缩js代码
库能提高效率摆脱基础代码让人更注重业务逻辑。移动端用精简库。少数库是模块化可动态加载单功能文件。注意库的许可范围。
`<script>!window.jQuery && document.write(unescape('%3Cscript src="scripts/jquery-1.4.3.min.js"%3E%3C/script%3E'))</script>`CDN出问题备用脚本



