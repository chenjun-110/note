### 写入html输出流

```<script>  
document.write("<h1>XXXX</h1>");
document.write("<p>XXXXx</p>");  
</script>
```

#### 2.事件反应：
`<button type="buttom" onclik="alert('welcome！')">点击这里</button>`
#### 3.改变内容：
 ```<script>
function myFunction(){
x = document.getElementById("id名"); //找到元素
x.innerHTML = "新内容"；}             //改变内容
</script>
 ```
#### 4.改变图片src:
```
<script>
function changeImage(){
element = document.getElementById('//ID名')
if （element.src.match(" ")）
	{element.src=" "；}
else    
    {element.src=" ";}
}</script>
```
#### 5.改变样式

```<script>
function myFunction(){
x = document.getElementById("ID名")//找到元素
x.style.color = " "; //改变样式
}</script>
<button type="button” onclick="myFunction()"> </button>```
####6.验证输入是数字
​```<script>
function myFunction(){
var x = document.getElementById("").value;
if(x == ""||isNaN(x) {alert("NOT NUMERIC");}
}</script>```

请使用 document.write() 仅仅向文档输出写内容。
如果在文档已完成加载后执行 document.write，整个 HTML 页面将被覆盖。
document.getElementById("  ").innerHTML="  "

\对代码行进行折行：
​```document.write("Hello \
World!");```

有两种类型的**注释**：
1. 单行注释以双斜杠开头（//）
2. 多行注释以单斜杠和星号开头（/**）*，以星号和单斜杠结尾（*/）
注释用于阻止其中一条代码行的执行（可用于调试）

###变量：
1.在函数中使用var关键字进行显式申明的变量是做为局部变量，而没有用var关键字，使用直接赋值方式声明的是全局变量。
2.声明**无值**的变量其值实际上是undefined。清空变量值是null。`var car=null`　　 
3.如果重新声明 JavaScript 变量，该变量的值**不会**丢失。
4.使用变量时，好的编码习惯是始终存放相同类型的值。
5.**Camel标记法：**首字母是小写的，接下来的字母都以大写字符开头。`var myTestValue = 0, mySecondValue = "hi";`
**Pascal标记法：**首字母是大写的，接下来的字母都以大写字符开头。`var MyTestValue = 0, MySecondValue = "hi";`
**匈牙利类型标记法：**在以 Pascal 标记法命名的变量前附加一个小写字母（或小写字母序列），说明该变量的类型。`var iMyTestValue = 0, sMySecondValue = "hi";`前缀：数组－ａ，布尔型－ｂ，浮点型－ｆ，函数－fn，整数－ｉ，对象－ｏ，正则－re，字符串－ｓ，变型（任何类型）－ｖ；
6.如果您把值赋给尚未声明的变量，该变量将被自动作为全局变量声明。即使它在函数内执行。`carname="Volvo";`

对象属性寻址方式：
​```name=person.lastname;
name=person["lastname"];```
###特殊的值
尽管所有整数都可以表示为八进制或十六进制的字面量，但所有**数学运算**返回的都是十进制结果。
对于**浮点**字面量的有趣之处在于，用它进行计算前，真正存储的是字符串。
数值集合边界：Number.MAX\_VALUE 和 Number.MIN_VALUE.当计算生成值超过集合被赋值Number.POSITIVE\_INFINITY,小于集合被赋值Number.NEGATIVE\_INFINITY。
Number.POSITIVE\_INFINITY 的值为 Infinity。Number.NEGATIVE\_INFINITY 的值为 -Infinity。
**isFinite()方法**：判断一个数是否是无穷的。
​```var iResult = iNum * some_really_large_number;
if (isFinite(iResult)){
alert("finite");
}
else {
alert("infinite");
}```
NaN表示非数。
​```alert(isNaN("blue")); //输出true
alert(isNaN("6666")); //输出false```
**字符字面量：**\n换行 \t制表符 \b空格 \r回车 \f换页符 \\\反斜杠 \'单引号 \"双引号 \0nnn八进制字符n(0~7) \xnn十六进制字符n(0~F) \unnnn十六进制字符Unicode(0~F)

**toString()**转换字符，转数返回默认都是十进制。`.toString(2)`把数转为2进制
**parseInt()和parseFloat()**：转换数（只能解析String类型）
​```var iNum1 = parseInt("12345red");	//返回 12345
var iNum1 = parseInt("0xA");	//返回 10
var iNum1 = parseInt("56.9");	//返回 56
var iNum1 = parseInt("red");	//返回 NaN
var iNum1 = parseInt("AF", 16);	//返回 十六进制175
var iNum1 = parseInt("010", 10); //有前导0错误返回8进制须定义
var fNum1 = parseFloat("12345red");	//返回 12345
var fNum1 = parseFloat("0xA");	//返回 NaN x无效字符
var fNum1 = parseFloat("11.22.33");	//返回 11.22
var fNum1 = parseFloat("0102");	//返回 102 忽略前导0
```
**强制类型转换：**
1.Boolean()值是空字符、0、undefined、null返回false。
2.Number()
> Number(false)返回0 Number(true)1 Number(undefined)NaN Number(null)0 Number("1.2.3")NaN Number(new object())NaN 

3.String()和toString()区别
​```var s1 = String(null); //"null"
var oNull = null;
var s2 = oNull.toString(); //错误```

new运算符用来创建对象实例
####Number 对象
**toFixed()**：保留小数位
​```var oNumberObject = new Number(68);
alert(oNumberObject.toFixed(2)); //输出"68.00"```
**toExponential()**:返回科学计数法
​```var oNumberObject = new Number(68);
alert(oNumberObject.toExponential(1)); //输出"6.8e+1" 1表示保留1位小数```
**toPrecision()**:返回指数形式
​```var oNumberObject = new Number(68);
alert(oNumberObject.toPrecision(1)); //输出"7e+1" 1表示显数位数，四舍五入为70```

----------

####String 对象
**charAt() ：**返回的是包含指定位置处的字符的字符串
**charCodeAt()：**返回的是包含指定位置处的字符的字符代码
​```var oStringObject = new String("hello world");
alert(oStringObject.charAt(1)); //输出"e"
alert(oStringObject.charCodeAt(1)); //输出"101",即e的代码```
**concat()**:合并多个字符串
​```var oStringObject = new String("hello ");
alert(oStringObject.concat("world")); //输出:"hello world"
alert(oStringObject + "world"); //输出"hello world"```
数组.join（）把n个字符形成一个字符串
**indexOf()和lastIndexOf():**返回的都是指定的子串在另一个字符串中的位置，如果没有找不到子串，则返回-1。indexOf()是从字符串开头开始检索字符串，lastIndexOf()是从字符串结尾检索子串最后出现的位置。
​```var oStringObject = new String("hello world!");
alert(oStringObject.indexOf("o")); //输出"4"
alert(oStringObject.lastIndexOf("o")); //输出"7"```
**localeCompare()：**用本地字母顺序比较字符串，String对象在传参之后，反回正数。在传参之前，返回负数。
​```var oStringObject = new String("yellow");
alert(oStringObject.localeCompare("brick"));		//输出 "1"
alert(oStringObject.localeCompare("yellow"));		//输出 "0"
alert(oStringObject.localeCompare("zoo"));		//输出 "-1"```
**slice()和substring()**:返回的都是要处理的字符串的子串
​```var oStringObject = new String("hello world");
alert(oStringObject.slice("3")); //输出"lo world"切掉前3位
alert(oStringObject.substring("3"));//同上
alert(oStringObject.slice("3", "7")); //输出 "lo w"保留3-7位 substring("3","7")相同
alert(oStringObject.slice("-3")); //输出"rld"保留后3位
alert(oStringObject.substring("-3"));//输出 "hello world"负数识别为0
alert(oStringObject.slice("3,-4")); //输出 "lo w"保留3到-4位
alert(oStringObject.substring("3,-4"));//输出 "hel"等于（"0,3")保留前3位```
**toLowerCase(),toLocaleLowerCase(),toUpperCase(),toLocaleUpperCase()**:字符转换大小写

----------
**instanceof**和**typeof**运算符的区别：识别对象类型。instanceof方法要求开发者明确地确认对象为某特定类型。
​```var oStringObject = new String("hello world");
alert(oStringObject instanceof String); // 输出 "true"```

**访问对象的属性**：*objectName.propertyName*
**访问对象的方法**：*objectName.methodName()*
对象废除：如果一个对象有两个或更多引用，则要正确废除该对象，必须将其所有引用都设置为 null。
关键字**this**指向调用该方法的对象。

如果 a 大于 b，则上面的代码将退出函数，并不会计算 a 和 b 的总和。
​```function myFunction(a,b)
{
if (a>b)
  {
  return;
  }
x=a+b
}```
**valueOf() 方法和 toString() 方法。这两个方法返回的都是函数的源代码，在调试时尤其有用。**

----------

####运算符
赋值运算符x+=y 就是x=x+y
算数运算符x=++y就是x=y+1
用于字符串的 + 就是把两个或多个字符串变量连接起来。如果把数字与字符串相加，结果将成为字符串。
一元运算符：
> 
1. delete `delete o.name;`删除对象属性
2. void 对任何值返回undefined。
3. ++i/--i 前增量/前减量。发生该运算符会修改变量值。计算之前赋值。
4. i++/i-- 后增量/后减量。计算之后才赋值。
5. +i/-i   一元加/一元减。都能把字符转换成数字，后者还能转成负数。

位运算符：
> 
1. ~ 求负减1（整数转二进制反码再转浮点数输出）
2. & 符AND（11得1,11/10/01得0）
3. | 符OR（00得0,11/10/01得1）
4. ^ 符XOR（10/01得1，11/00得0）
5. << 有符号左移运算 >> 右移运算（保留32位的正负）
6. >>> 无符号右移（不保留32位符号）

逻辑运算符：返回的一定是Boolean值。
> 
1. ！ 符NOT（false:对象 除0以外数字，查看Boolean值用！！）
2. && 符AND（tt得true,tf/ft/ff得false。对象布尔得对象 对对得对象2，nn得null，NN得NaN，tu得错，f undefined得flase"见flase就返回"）
3. || 符OR（tt/tf/ft得t,ff得f,对对得对1，fn得null,fN得NaN,fu得错,tu得t（见ture返回））

等性运算符
==相等/！=不等：null==undefined NaN!==NaN f==0 t==1(字符会转化整数进行比较)
===全等/！==非全等：比较前不会类型转换

条件运算符
`variable = boolean_expression ? true_value : false_value;`
`var iMax = (iNum1 > iNum2) ? iNum1 : iNum2;`表达式声明如果 iNum1 大于 iNum2，则把 iNum1 赋予 iMax。但如果表达式为 false（即 iNum2 大于或等于 iNum1），则把 iNum2 赋予 iMax。

----------
​```switch (expression)
  case value1: statement;
    break;
  case value2: statement;
    break;
  default: statement;```
**switch**条件语句如果 expression 等于 value，就执行 statement。
For循环：
​```for (语句 1; 语句 2; 语句 3)
  {被执行的代码块}```语句1在循环（代码块）开始前执行
语句2定义运行循环（代码块）的条件
语句3在循环（代码块）已被执行之后执行
**For/In**循环：
​```for (x in person)
  {
  txt=txt + person[x];
  }```
**do-while**语句是后测试循环，即退出条件在执行循环内部的代码之后计算。这意味着在计算表达式之前，至少会执行循环主体一次。`do {i += 2;} while (i < 10);`
**while**语句是前测试循环。这意味着退出条件是在执行循环内部的代码之前计算的。
`while (i < 10) 
{i += 2;}`

**break** 语句用于跳出循环。
可跳回标签。
​```var iNum = 0;
outermost:
for (var i=0; i<10; i++) {
  for (var j=0; j<10; j++) {
    if (i == 5 && j == 5) {
    break outermost;
  }
  iNum++;
  }
}
alert(iNum);	//输出 "55"``` i走50次 j走5次 结束循环
**continue** 用于跳过循环中的一个迭代。
​```var iNum = 0;
outermost:
for (var i=0; i<10; i++) {
  for (var j=0; j<10; j++) {
    if (i == 5 && j == 5) {
    continue outermost;
  }
  iNum++;
  }
}
alert(iNum);	//输出 "95"``` 走到55次 跳过后5次 走完所有

**错误测试**：```
try
{
              //运行代码
if() throw " " //throw返回值赋予err
}
catch（err)
{
err.description //错误描述
}```
onerror=handleErr //遇到错误会调用onerror
function handleErr(msg,url,l){ //msg错误信息，l错码行数。
return ture/flase}
####Browser对象
**window**对象：操作窗口
alert() 显示带有一段消息和一个确认按钮的警告框。
r=confirm("") if(r==ture)显示带有一段消息以及确认按钮和取消按钮的对话框。
prompt() 显示可提示用户输入的对话框。
**Navigator**对象：操作插件
navigator.appName返回游览器名字
navigator.appVersion返回游览器版本和平台
parseFloat()从左往右解析到非数停止
navigator.appCodeName 游览器代码名
navigator.platform 系统平台名
navigator.cookieEnabled 检查是否启用cookie
navigator.userAgent 用户代理
**Screen**对象：操作显示屏幕
**History** 对象：操作游览器历史
history.back()后退，history.go(-2)后退2次
**Location** 对象：操作URL
window.top.location=" " 跳出框架

#####验证表单必填项：
``function validate_required(field,alerttxt)
{
with (field)
{
if (value==null||value=="")   //tt/tf/ft得true
  {alert(alerttxt);return false}
else {return true}
}
}``
#####验证邮箱合法性：
@ 不可以是邮件地址的首字符，并且 @ 之后需有至少一个点号。
``function validate_email(field,alerttxt)
{
with (field)
{
apos=value.indexOf("@") //@位置
dotpos=value.lastIndexOf(".")
if (apos<1||dotpos-apos<2) //tt/tf/ft得true
  {alert(alerttxt);return false}
else {return true}
}
}``

#####验证错误后将输入焦点移至对象上：
``function validate_form(thisform)
{
with (thisform)
  {
  if (validate_required(email,"Email must be filled out!")==false)
    {email.focus();return false}
  }
}``
表单验证：``<form action=" " onsubmit=" " method="get/post">``
**action=**当提交表单时，向**何处**发送表单数据。
**onsubmit=**js事件会在表单中的确认按钮被点击时发生。

###DOM
**改变输出流**：`document.write();`
**改变HTML内容**
y=document.getElementById("main").getElementsByTagName("p") 
获得id是main的div的中的p元素。y[0].innerHTML是改第一个元素p.
getElementsByTagName和getElementsByName返回的都是集合，所以需要索引。
createElement("BUTTON") 大写。
createTextNode("") 赋值文本(value值)

**改变HTML属性**:`document.getElementById(id).attribute = new value`
**改变HTML样式**：`document.getElementById(id).style.property = new style`

**button/input**的区别：`前者<button>OK</button>。后者<input type="button" value="OK" />`
**事件**:

- onclick 点击鼠标触发
- onload onunload 加载卸载页面
- onfocus 输入字段获得焦点时
- onchange 离开输入字段触发
- onmouseover onmouseout 鼠标移到元素 鼠标移出元素
- onmusedown onmouseup 鼠标按下 鼠标抬起
- onkeyup 按键触发
- onsubmit="return check()" 提交触发(check返flase不交)
函数调用图片用 document.图name.src=""
**创建HTML元素：**
1. 创建新元素`var para=document.createElement("p");`
2. 创建属性节点`var node=document.createTextNode("txt")`
3. 把节点追加入新元素 `para.appendChild(node);`
4. 找到父元素`var element=document.getElementById(id);`
5. 把新元素追加入父元素`element.appendChild(para);`
**删除HTML元素:**
1. 找到父元素 `var parent=document.getElementById(id);`
2. 找到要删除的子元素`var child=document.getElementById(id);`
3. 从父元素删除子元素`parent.removeChild(child);`
4. 另一种方法:利用parentNode找到父元素
``var child=document.getElementById(id);
child.parentNode.removeChild(child);``

把私有方法变成公有方法：赋予新对象方法。
**this.changeName=changeName**;
字符串：
match()查找字符，找到就返回字符，找不到返回null。
replace(/s/,"y")替换字符,y替换字符中的s。

日期：
var d = new **Date()**;
weekday[d.getDay()] 显示星期几，需定义weekday数组
setTimeout('code',500)刷新代码500毫秒一次。
clearTimeout()可取消由setTimeout()设置的timeout。
d.getHours()/getMinutes()/getSeconds()获得时、分、秒
数组：
function sortNumber(a,b){return a - b};返回正负
array.sort(sortNumber)根据正负排序数组

####正则表达式：
str.match(/\d+/g): /d+匹配数字，g匹配多个，m多行匹配
str.match(/w3school/i)：匹配字符，i忽略大小写
[abc] 查找方括号之间的任何字符
[^abc] 查找不在方括号之间的字符
. 查找单个字符
n+ 查找所有n
\w+ 查找所有单词

####window
所有游览器通用的显示窗口的高度和宽（用“||”）
``var w=window.innerWidth //现代游览器
|| document.documentElement.clientWidth //IE5.6.7.8
|| document.body.clientWidth; 
var h=window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;``
- screen.availWidth-可用的屏幕宽度（视口）
- screen.availHeight-可用的屏幕高度
- location.assign() 加载新的文档。
- location.pathname 返回URL的路径名。
- location.href 返回当前页面的 URL。
- history.back() - 与在浏览器点击后退按钮相同
- history.forward() - 与在浏览器中点击按钮向前相同
- r=confirm() if (r==true)确认取消框，点确认返true,取消flase
- if (!confirm()) 感叹号取flase,点取消执行下面代码
- prompt("提示"," ") 提示输入框

escape()函数进行编码，它能将一些特殊符号使用十六进制表示.
unescape()是解码函数

Math.random（）随机数<1
**图像映射** usemap建立图像和映射的联系。
``<a href="/example/map">
  <img src="/i/map.gif" ismap="ismap" usemap="#map" />
</a>
<map name="map">
  <area coords="0,0,49,49" href="link1.html">
  <area coords="50,0,99,49" href="link2.html">
  <area coords="0,50,49,99" href="link3.html">
  <area coords="50,50,99,99" href="link4.html">
</map>``
火狐打开本地图片路径前加file:///还把\换成/。
保存脚本代码扩展名为.js 
引用脚本script type="text/javascript" src=".js"
在head部分中的JavaScripts会在被调用的时候才执行。（先加载）
在body部分中的JavaScripts会在页面加载的时候被执行。（后加载，用于鼠标跟随）

----------
**工厂函数**是函数可被多次调用并创建不同的实例。
``function showColor() { //外部定义方法
  alert(this.color);   }
function createCar(sColor,iDoors,iMpg) {
  var oTempCar = new Object;
  oTempCar.color = sColor;
  oTempCar.doors = iDoors;
  oTempCar.mpg = iMpg;
  oTempCar.showColor = showColor; //如内部定义方法会创建多个函数
  return oTempCar;
}
var oCar1 = createCar("red",4,23);
var oCar2 = createCar("blue",3,25);``
**继承**
apply():
``function ClassB(sColor, sName) {
    //this.newMethod = ClassA;
    //this.newMethod(color);
    //delete this.newMethod;
    ClassA.apply(this, new Array(sColor)); 数组
    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}``
call():
``function ClassB(sColor, sName) {
    //this.newMethod = ClassA;     赋值
    //this.newMethod(color);       调用
    //delete this.newMethod;       删除
    ClassA.call(this, sColor);  //对象冒充继承，sColor是父类属性      
    this.name = sName;
    this.sayName = function () {
        alert(this.name);
    };
}``
创建类的最好方式是用构造函数定义非函数属性，用原型定义函数方法。
继承机制，用对象冒充继承构造函数的属性，用原型链继承 prototype对象的方法。
**混合的构造函数/原型方式**：创建继承所有方式
``function ClassA(sColor) {  //构造函数定义属性
    this.color = sColor;
}
ClassA.prototype.sayColor = function () { 
    alert(this.color);       //原型定义方法
};
function ClassB(sColor, sName) {
    ClassA.call(this, sColor);   //对象冒充继承父sColor属性
    this.name = sName;
}
ClassB.prototype = new ClassA(); //原型链继承父方法
ClassB.prototype.sayName = function () {
    alert(this.name);
};``

**动态原型**：比混合方式好在；方法只定义一次，效率稍高。
``function Car(sColor,iDoors,iMpg)
{
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
  if (typeof Car._initialized == "undefined") //判断该类是否创建了showColor方法。
{                     
    Car.prototype.showColor = function() 
    {alert(this.color);};	
    Car._initialized = true;
}  
}``
衡量代码性能的方法：d2.getTime() - d1.getTime()
**StringBuffer类**：连接字符串性能优于str+="world"
``function StringBuffer () {
  this._strings_ = new Array();
}
StringBuffer.prototype.append = function(str) {
  this._strings_.push(str);
};
StringBuffer.prototype.toString = function() {
  return this._strings_.join("");
};``

**HTML DOM**
var para=document.createElement("p") 创建段落节点
var node=document.createTextNode("is");创建文本节点
para.appendChild(node) 添加子节点到父节点
element.insertBefore(para1,para2);插入子节点到某元素之前
parent.replaceChild(para,child);替换子节点
parent.removeChild(child); 删除子节点
child.parentNode.removeChild(child);删除子节点
onclick="this.innerHTML=''" 点自己改文本
x.value=x.value.toUpperCase() 改表单值大写 x抓取id
x.firstChild.nodeValue       获取首个子节点的文本
x=event.clientX/y=event.clientY 返回坐标
x=event.screenX/y=event.screenY 返回坐标（相对于屏幕）
event.button 识别鼠标键，返回0左键1中键2右键
event.type 返回事件类型
event.keyCode 返回按键编码
event.target 返回触发节点
document.documentElement  全部文档
document.body.innerHTML  返回文档的主体
document.URL/document.referrer 返回文档URL/加载URL
document.domain 返回域名
document.open("text/html","replace") 打开新文擦除旧文
document.anchors/images.length 获得锚/图的数量
document.forms[0].name 返回第1个表单名
.tagName 返回标签名
document.getElementById("id").action/.type/.id/.disabled=ture/.checked=ture返回属性:表单提交地址/类型/id/禁用/选择框打勾
/.reset/submit/focus()/blur()/select/src重置表单/提交/获得焦点/失去焦点/全选文本/替换源
选择框name是coffee;定义`coffee=document.form[0].coffee`;就能调用coffee[i]或coffee.length了。
`<input type="checkBox" onclick="if (this.checked) {convertToUcase()}">`勾上选择框才执行函数
函数参数可调用input中的name，值是value。
option返回下拉菜单数组`x.options[i].text`获取选项值输出
.selected=ture 
selectedIndex返回下拉菜单被选项的索引号
tabindex="1/2/3" 控制Tab键导航 用于表单内
tabIndex 用于HTML DOM
maxlength=" " 表单输入最大长度
.elements[x.tabindex].focus()输入跳转
accessKey="" 设置快捷键跳转Alt+""
window.location.reload()重新加载
window.open("url","",width=,height=)打开新窗口
scrollbars=yes 启用滚动条
document.getElementById("子元素id").form.id 获取父元素表单id
tableObject.rules="none|groups|rows|cols|all" 可设置或返回表格的内部边线
deleteRow()删除表格行 createCaption()设置表格标题
cellPadding= 内边距 cellSpacing= 内外间距
insertRow() 插新行 insertCell() 插新格
tableObject.vAlign="top|middle|bottom|baseline" 单元格内垂直排列
.cells属性-单元格

window.scrollBy(x,y)页面指定滚动
window.createPopup()创建弹出小窗(IE)
scrollTop是页面上面被隐藏的部分：`scrollTop=document.documentElement.scrollTop ||document.body.scrollTop;`
offsetTop就是用于定位且不可写入的top值
实例保存在堆内存heap,引用保存在栈内存stack.变量也保存在栈中。
summary适合发现DOM泄露，comparison适合发现内存泄露。
如果随着时间Memory成阶梯或陡峭攀升有可能是内存泄露。

## Ajax
**onreadystatechange事件回调函数处理响应数据**：当 readyState 等于 4 且状态为 200 时，表示响应已就绪。同步不使用。
readyState属性值存有XHR状态信息： 0: 请求未初始化 1: 服务器连接已建立 2: 请求已接收 3: 请求处理中 4: 请求已完成，且响应已就绪
status属性值：200: "OK"，404: 未找到页面
```
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
    }
  }```

**responseText**是XMLHttpRequest对象的属性。获得字符串响应数据。
``document.getElementById("id").innerHTML=xmlhttp.responseText;``
如果是XML文件 就使用**responseXML**属性：
``document.getElementById("id").innerHTML=xmlhttp.responseXML;``
如果是async=false,把该执行代码放在send()之后。
**open（method,url,async)**method=GET/POST,async=true(异步）/false(同步)
```
xmlhttp.open("GET","demo_get.html",true); //简单请求
xmlhttp.send();

xmlhttp.open("GET","demo_get.html?t=" + Math.random(),true); 
//向URL添加ID，避免读缓存
xmlhttp.open("GET","demo_get2.html?fname=Henry&lname=Ford",true); 
//用GET发送信息，在URL添加。```
“？”就是url地址跟参数列表的分隔符。从“？”开始，后面就会被认为是参数列表了。t是自己设置的参数名。

**setRequestHeader(header,value)**:为请求添加HTTP头。header规定头名字。value规定头值。对POST是必须的。
```
xmlhttp.open("POST","ajax_test.html",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");表示请求包含URL编码的表单
xmlhttp.send("fname=Henry&lname=Ford");```
send()里面规定需要发送的数据。

.childNodes[0] 返回第一个节点
.childNodes[1].nodeValue 返回第一个节点值
若执行多个Ajax，需把url和回调函数作为参数，在外部另起函数设置。
`x=xmlhttp.responseXML.documentElement.getElementsByTagName("CD")`从XML文件的响应数据中的根节点查找CD标签

`document.getElementById('p1').innerHTML=xmlhttp.getAllResponseHeaders()`返回头信息，（）带参数可返回指定信息
loadXMLDoc(url,cfunc)参数cfunc代表函数


####JSON
```
var txt = '{
"employees" : [' + '
{ "firstName":"Bill" , "lastName":"Gates" },' + '
{ "firstName":"George" , "lastName":"Bush" },' + '
{ "firstName":"Thomas" , "lastName": "Carter" }];
}'```
三个对象（在花括号中）,数组（在方括号中）

`var obj = eval ("(" + txt + ")");`必须把文本包围在括号中。eval处理后就能调用obj属性了。、
`obj = JSON.parse(txt);`功能等价上面。Firefox3.5 IE8 Chrome Opera10 Safari4支持。

----------


##操作css属性
1、对于没有中划线的css属性一般直接使用style.属性名即可。
如：obj.style.margin，obj.style.width，obj.style.left，obj.style.position等。
2、对于含有中划线的css属性，将每个中划线去掉并将每个中划线后的第一个字符换成大写即可。
如：obj.style.marginTop，obj.style.borderLeftWidth，obj.style.zIndex，obj.style.fontFamily等。
操作float特殊用法：
`buttons[i].style["cssFloat" in P元素.style? "cssFloat": "styleFloat"] = "left";`兼容赋值float:left
因为float是JS的保留字不能直接操作。IE用法：obj.style.styleFloat 非IE：obj.style.cssFloat
**获取CSS样式：**返回所有样式
`var style = window.getComputedStyle("元素", "伪类");`如果不是伪类，设置为null。只读获取方法，不能设置。(IE9+支持)
`element.style`能读能写。
element.currentStyle近似于getComputedStyle （只支持IE)
**声明样式属性**：getPropertyValue getAttribute
前者(IE9+支持) 后者(IE6+支持)
`window.getComputedStyle(element, null).getPropertyValue("float");`属性名：不支持驼峰 小写
`style.getAttribute("backgroundColor");`属性名：驼峰写法
不要方法直接写属性名也行但是属性名在各游览器中不同如：cssFloat/styleFloat。`var display = this.currentStyle? this.currentStyle.display: window.getComputedStyle(this, null).display;`

replace(字符1,字符2) 替换字符2->1
setAttribute(key,value) 设置属性

##兼容
谷歌是new Date('2013-10-21')，Safari是new Date('2013/10/21');

####特效
文件上传：
<input type="file" name="file" onchange="fuc()"/>
```
oFReader = new FileReader();
oFReader.readAsDataURL(input.files[0]);
oFReader.onload = function (event) {path = event.target.result;}; 
```

```