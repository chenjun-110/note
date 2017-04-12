DOM Leve1:映射文档结构。
DOM Leve2:视图 时间 样式 遍历。
DOM Leve3:XML
IE8-支持1级 IE9+支持3级。H5兼容了BOM
script标签属性：`async`异步脚本。`defer`文档解析后再执行脚本。
**特殊符号**：XHTML脚本不支持<号:1.用`&lt;`代替 2.CData片段`//<![CDATA[...code...//]]>`该片段可包含任意字符。在不支持XHTML的文档注释掉cdata标记可平稳退化。
文档声明：所有游览器对不带声明用混杂文档模式。标准模式：h5 strict，准标准模式：Transitional Frameset。

####第3章：基础概念
标识符：首字符可是`h _ $`。驼峰书写。函数变量属性参数名。
js引擎严格模式：在函数头部使用`"use strict";`(IE10+)
分号：;能增加代码性能。避免压缩错误。
关键字：![关键字](http://i.imgur.com/1rYGgYr.png)
保留字：![保留字](http://i.imgur.com/BnJtUV9.png) strict模式下eval和`arguments`也不能作标识符。
未声明的变量赋值在strict会错误。
typeof操作符：6种数据类型：boolean、string、number、function、undefined:变量未赋值/初始化。对象/null对象的值是object.
null:null==undefined 变量最好初始化为`null`,方便if是否被引用 +0==-0
Boolean():对if(条件)非常重要。true:true 非空字符 非0数 对象。 false:false 空字符 0 NaN null undefined。
Number:非十进制都会被转化为十进制。浮点数计算有误差不要`条件`检测。
isNaN():能转换成非数的返true。false:"10" 10 true转1。用于对象时会首先调用valueOf()原始值-->toString()测试返回值。
Number():+操作符会调用此。`null转0` 字符/undefined转NaN 数转十进制 true转1.
parseInt():ES5中不支持解析无前导0非十进制，需进制参数。parseFloat:忽略前导0，不能解析非十进制。
\u03a3的length为1
String():可把`任意值`转换字符：首先toString()-->null->"null"/undefined->"undefined"。toString可按进制转且`不能`转null/udf。
`Object`:它是所有对象的基础，所有对象都会继承它的7属性方法。Constructor保存当前对象、hasOwnproperty检测属性是否存在、propertyIsEnumerable检测属性能否for-in、isPrototypeOf检测对象是否为另一对象的原型、toLocaleString、toString、valueOf。 BOM DOM为宿主对象可能不继承。

操作符：
**一元**：可用于`字符/布尔/对象`,"a"-NaN "8"-8 true-1 对象要调用valueOf-toString检测`return`转成数值为止。++a/--a相当于赋值。前置在求值过程中从左至右被赋值，后置++当时不会赋值，求值完毕才赋值。+a/-a等同于调用`Number()`，-a转负数。总之一元加减既能算术也能转换数据类型。
**位符**：32位有符号整数：32位0正1负，31位2的幂。求值负数是正数的二进制反码`+1`。表示负数仍为"-正数码"。无符号整数只有正数。对`NaN和Infinity`位操作值为`0`。
`~`:返回二进制反码==负数-1。使用位符计算速度更快。`^`:只能有1个为真。&:tt真。|:ff假。a<<1左移 a>>1右移 a>>>1无符号右移会动负数的32位。以上都是操作二进制的。
**布尔符**：把任意值转化为布尔值。
`!!`等价于Boolean()。
`&&`：如果有个操作数不是布尔值，返回的不一定是布尔值。![&&](http://i.imgur.com/2v1Ge0B.png)
与是短路操作符，只要第1个为false/nullNanudf都返第1个。对未声明的求值会出错。
`||`：也是短路操作符，只要第1个有结果就返第1个。
![||](http://i.imgur.com/ZnBY6ji.png)
可以利用这一特性进行备选赋值：第1个为null、NaN、udf都返第2个；`var abc = ac || bc`
**乘性符**：乘法、除法、求模(余数)。
![*](http://i.imgur.com/EZtX9OV.png)。
![/](http://i.imgur.com/cDsKeQL.png)。
![%](http://i.imgur.com/4POSUSf.png)
**加性符**：加、减。
![+](http://i.imgur.com/tJ6wQYB.png)`+`从左至右的，如字符前2个是数则会运算，后两个是数则拼接字符串，如果后2个用()包起来也会运算。
![-](http://i.imgur.com/zVgR6Zw.png)
**关系符**：< > <= >=。
![关系](http://i.imgur.com/DDtygqV.png)
大写字母编码全部小于小写字符编码。优先转数。
```
var result = "Brick" < "alphabet"; //true
B的编码66，a的编码97
var result = "23" < "3"; //true "2"编码50，"3"51
var result = "23" < 3; //false 字和数比较会转为数
var result = "a" < 3; //false "a"转为NaN
var result = NaN < 3; //false 
var result = NaN >= 3; //false 
NaN和任何数比较都是false

```
**相等符**：相等和不相等--先转换再比较，全等--仅比较
`== ！=`如果两个操作数是对象，则比较他们是不是`同一个`对象。如果一个是对象一个不是，则转换对象valueOf()再比较。字符和数字转数字。NaN不等任何值。null==undefined.
`=== !==`少用相等多用全等是好习惯。
条件符：`var max = (num1 > num2) ? num1 : num2;`
复合赋值符：+= -= *= /= %= <<= >>= >>>=
逗号符：声明多变量，赋值是最后一项。`var num = (5,1,4,8,0); //nume的值为0`
语句：
if语句：if(t1) c1 else if (t2) c2 else c3
do-while语句：后测试循环用于至少要运行1次的代码。
while语句：前测试循环，不常用一般用for代替。
for语句：拥有初始化变量和`定义循环后代码`的能力的前测试循环。由于js没有块级作用域，`循环内部`定义的局部变量可被循环外部访问。for的三个表达式都是可选的但要保留`分号`。for(;;)是无限循环。for(;i<9;)==while(i<9)
for-in语句：`for(var a in b）`每循环一次,b对象的属性名都会赋值给a。顺序随机。值不能为null/undefined。
label标签：`start:for(;;){}`这里的start可被break start、continue start引用。break是退出循环，continue是跳过当前循环执行继续下一级循环。嵌套循环例子：下。
with语句：暂时改变作用域，减少重复输入。影响性能不推荐，可把`重复部分赋值`给变量代替。例子：下。
switch语句:表达式等于value时执行代码。好处是省略写出if的条件前缀。case的值可以是变量或表达式。`switch(){case value: break; default: ;}`

函数:
return语句：后的任何代码都不执行。推荐要么return始终有返回值要么始终没有，对调试代码好。return;返回`undefined`值。strict模式函数名参数名不能为eval/arguments且不能有同名参数。
参数：参数在函数内部本质是`数组`,可通过`arguments[n]`访问。参数名仅是方便，可以用arguments代替或同时使用。arguments.length由`传参`决定非参数名。没有传参的参数名会赋值`undefined`。内部可赋值argu来`单向`修改参数名值，反之赋值参数名不能修改argu。在strict模式中不能内部重写arguments。
重载：同名函数会覆盖，可用条件判断模拟函数名重载。
####第4章：变量、作用域、内存。
变量：2种，基本类型，引用类型。
基本类型：Undefined Null Boolean Number String。(栈内存)
引用类型：js不能直接操作内存对象，只能操作对象的引用。(堆内存)Boolean Number String都有对应的引用类型。
```
var person = new Object(); 引用类型都是Object实例
var name = "Nicholas"; 基本类型
可以给引用类型赋值属性方法。基本添加后值是undefined。
```
复制变量：基本类型创建对象副本和本体独立，引用类型创建指针副本相互关联（属性方法共用）。所以传参的时候引用变量可能会被函数改变。对象按值传递。
```
function setName(obj) {
    obj.name = "Nicholas";//person赋值给obj指向同一对象 
    obj = new Object();   //新局部变量对象引用
    obj.name = "Greg";}   //新对象属性，结束销毁。
var person = new Object();
setName(person);
alert(person.name); //"Nicholas"
```
typeof只能判断是不是Object。instanceof可以判断哪种引用类型。`object instanceof constructor(new Object/Array/RegExp)`返true.

环境变量对象：每个执行环境都是一个变量对象，所有当前变量和函数都保存在变量对象中，代码执行后变量对象销毁。web中window是最外层的变量对象，关闭网页后被销毁。
`作用域链`：环境之间的父子关系。子可访父的变量和函数，父不可访子。顺序：前端当前环境变量对象(函数)-->父环境-->祖父环境-->后端全局变量对象。标识符解析是按照这个顺序`向上`查找的。
延长作用域链：with语句内部变量可能泄露成全局变量、try-catch语句的e只能被内部访问(IE8-catch的错误对象可被外部访问)
没有块级作用域：if条件和for循环内部定义的局部变量都可被`父环境`访问。
垃圾回收策略：标记清除、引用计数（IE8-的BOMDOM存在循环引用弊端，例子：下）。
解除引用：给父环境变量或全局变量赋值`null`。让其脱离执行环境，不是立即回收，是下次回收。应及时解除不在使用的引用。
####第5章：引用类型
创建Object实例：1.person=new Object() 2.对象字面量表示法：用于定义大量属性的对象。person={}等价于前者。
`var person = {name : "Nicholas", age : 29};`
访问对象属性：1.person.name 2.`person["name"]`方括号属性可用变量访问。
传递大量参数：`func_a({name:"a",age:29})`这种方式可不需要命名参数。
创建Array实例：1.colors=new Array(3) 2.数组字面量
`var colors = ["red", "blue", "green"]`数组中未赋值的项值为undefined.可通过修改length值删除添加值。`colors[colors.length]="black"`==push常用的添加最后项值
检测数组：if(`Array.isArray(value)`)最终确认是否为数组(IE9+)。instanceof在`多个`全局环境下无效。
转换方法：toString,valueOf会把数组的每个字符串`拼接`成1个用逗号隔开。alert会在后台调用toString。join("|")修改`默认逗号`分隔拼接。如果数组中有null/udf调用上述方法显示空字符`,,,,`。
栈：后进先出。`push()`推入项到数组末，`pop()`在末尾删除项并返回项值。
队列：先进先出。`unshift()`推入开头项到数组并返回length(IE7返回udf值)。shift()`删除开头`项并返回项值。
重排序：`reverse()`反转数组顺序。sort()升序排列：后台调用toString比较字符编码，`数字也转`。sort可接受1个比较函数的参数用于排序数字，函数例子：下。
创建数组副本：`concat()`末尾添加多个新项返回新数组。slice(n，N)剪切返回`新数组`，1参从n到末尾，2参是n到N-1。n为`负数`则用长度+n。
splice(n,0,""):2参数代表删除且返回被删值。3参数代表插入和替换，第2个参数是被删数量，位置是`1参+1`。例子：下。
位置：indexOf()从前往后搜索下标值。lastIndexOf()从后往前搜索索引值。indexOf(n,n)查找第2个n索引。没有返-1；indexOf("",n)从n起点开始搜（IE9+）
`数组迭代`：item数组项值、index该项位置、array数组对象。以下迭代方法运行带这3参的给定函数；`every`(function(item,index,array){})每项返true，是对数组中的每一项运行给定函数，如果该函数对每一项返回true。`some`()任一返true。`filter`()返回true项数组。`map`()返回return值数组。`forEach`无返回只迭代。（IE9+）
缩小：`reduce()`和reduceRight()返回值会作为前一项与后项发生关系。4参：prev前一值、cur后一值、index索引、array数组对象。`reduceRight`(function(prev,cur,index,array){})从后至前遍历数组。
日期：new Date()后台：会调用`Date.parse("")`它接受字符串参数。也会调用`Date.UTC()`,月从0开始。由参数格式决定调用方式。IE9+的`Date.now()`可算时间间隔。IE8-的+new Date()也行。
```
var sD1 = new Date(Date.UTC(2000,0)); 
//2000年1月1日8点 ·GMT时间·会+8时
var sD2 = new Date(2000,0); //0点 ·本地时间·
var sD3 = new Date(2005,4,5,17,55,55);
//05年‘5’月5日17点55分55秒
var sD4 = new Date("May 25,2004");
//后台调用Date.parse()解析字符串
var start = +new Date()/Date.now(); //(IE8)(IE9)
    coding.. 
var stop = +new Date()/Date.now(); //+号返回毫秒
    result = stop - start; 
```
RegExp类型：1.字面量法`var expression = / pattern / flags`2.构造函数`new RegExp("","g")`
flags:g查找所有匹配字符，i不区分大小写，m多行查找。gi查找不分大小写的所有匹配字符。
需转义的符号：`()[]{}\^$|?*+.` 转义符：`\`，构造函数里要使用双重转义符"\\"
IE8-的字面量创造的正则实例在循环中只一次。IE9-字面量和构造函数一样每次循环都创造一个新的正则。
全局模式下每调用exec()一次，.index和.lastIndex和[0]都会变化一次，查找下一个项。非全局不变因为只查找1个。exec()是专门针对捕获组设计的。test("")检测字符串匹配返回布尔值。其余例子：下；
```
var text = "mom and dad and baby";
var pattern = /mom( and dad( and baby)?)?/gi;
var matches = pattern.exec(text);
alert(matches.index); //0 从前往后的匹配索引
alert(matches.input); //"mom and dad and baby"匹配到的所有字符
alert(matches[0]); //"mom and dad and baby" 数组中第1项是与整个模式匹配的字符
alert(matches[1]); //" and dad and baby" 第1个捕获组
alert(matches[2]); //" and baby" 第2个捕获组
```
函数：把函数赋给变量可以不需要函数名。构造函数法`var sum=new Function("num1","num2","return num1+num2");`函数名仅是指向函数对象的指针。
```
var anotherSum = sum; // 不带括号代表访问指针
alert(anotherSum(10,10)); //20
sum = null; // 解除引用
alert(anotherSum(10,10)); //20 sum解除没销毁函数```
```
alert(sum(10,10));//不会出错
function sum(num1,num2){...}```
声明式函数类型会在进入执行环境时把函数提到源代码顶端。`var sum=func(num1,num2){}`的函数表达式则不会。
函数名可作参数传入函数中（不能有圆括号）.
递归：递归函数通常要用到函数名，`arguments.callee`可以代替函数名避免函数名变动仍生效。(strict不可用)
`this`引用的是函数的据以执行的环境对象。`caller`属性返回引用的源代码（strict不可用）
属性：函数的length返回的是`命名参数`的个数.。prototype保存着引用类型所有实例方法。`apply(this,arguments)`继承另一个对象的属性方法，1参是作用域(函数名)，2参是参数数组。`call(this,)`功能同上传参非数组。`bind(obj)`（IE9+）功能同上，但这种用法要赋值所以能在任意地方调用vv=func.bind(obj);vv();。例子：下。
`foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments)==this.foo(arg1, arg2, arg3)`
基本包装类型：基本引用类型区别是前者的对象只在执行瞬间。obj=new Object("text")构造函数会根据传参类型返回该类型的实例,obj属于String包装类型的实例。
Boolean:`new Boolean(false)`创建的是对象返true。typeof返的是object不是boolean。instanceof Boolean
Number：`toString(n)`把数转为进制数再转字符。`toFixed(n)`把数转为小数再转字符，适合处理货币值。(IE8的0.5~0.94的四舍五入是0)`toExponential(n)`数转e指数法转字符，n为小数位。`toPreoision(N)`数按最适合的格式转字符(后台调用前2个方法)，N为数位。
String:字符基本类型的length为字符长度。
取字方法：`charAt(n)`返回指定索引的1个字符。`charCodeAt(n)`返回指定索引的1个字符的编码,`fromCharCode()`编码转字符。(IE8+)可以用`字变量[n]`代替charAt.`slice(n)/substring(n)/substr(n)`都是索引取字只是参数不一样`trim()`删除字符前后空格(IE9)。以上不会修改原字符。
`toLocaleUpperCase()/toLocaleLowerCase()`转换大小写 `match(//)`和exec()相同只是括号里放正则，返回数组。`search(//)`返回的是索引值。`replace("被替","替")`1参可为正则，2参可为$n字符序列或函数；该函数有3参：匹配项、位置、原字符。
`concat()`拼接符。`split(",",n)`分隔符；把1个字符串分隔成数组，1参可用正则，2参数组数量。
localeCompare比较字符串返回1 0 -1:
```
var stringValue = "yellow";
alert(stringValue.localeCompare("brick"));//1
alert(stringValue.localeCompare("yellow"));//0
alert(stringValue.localeCompare("zoo"));//-1```
动态生成HTML方法：`anchor(name)`创建a标签，`link(url)`创建a标签，等等。
内置对象：Global,Math不需要实例化。
Global对象拥有所有全局属性方法。构造函数和特殊值也是它的属性。
URI方法：URL方法能编码所有Unicode字符，不要使用escape编码ASCII字符。`encodeURI()`编码整个URL，只编码URL的空格。`encodeURIComponent()`编码URL某段，编码任何特殊字符`decodeURI()`解码encodeURI处理的编码。`decodeURIComponent()`解码任何编码。 
`eval("")`此方法内部定义的代码拥有外部相同的作用域链。能阻止函数提升到环境顶部。能解析运行任何字符串形式的代码，可用于处理JSON数据。
Math对象：Math.max()返回最大值。Math.min()返回最小值。`Math.max.apply(Math/null, array)`获数组参数能力,null没有对象调用max方法。
`Math.ceil()`向上舍入 `Math.floor()`向下舍入 `Math.round()`四舍五入 `Math.random()`0~1随机数 `Math.floor(Math.random()*总数+最小值）`随机数范围
####第6章：面向对象
数据属性的4个特性：configurable:true能否删除属性、能否修改特性或访问器属性。enumerable:true能否循环。writable:true能否修改属性值。value:undefined属性值
`Object.defineProperty(,,)`修改属性特性；1参对象，2参属性名，3参描述符对象。调用该方法不指定的话前3个属性默认false。
```
var person = {};
Object.defineProperty(person,"name",{
    writable:false, //不能修改属性值
    configurable:false, 
                //不可配置不能改回。只可改writable。
    value:"Nicholas"});
delete person.name;
alert(person.name); //"Nicholas"
person.name = "Greg";
alert(person.name); //"Nicholas"
```
访问器属性：没有数据,4个特性：configurable能否修改为数据属性其余同上，enumerable能否循环。get读取函数，set写入函数，默认undefined。访问器属性只能通过Object.defineProperty(,,)定义。
```
var book = {
    _year:2004, //_只能通过对象方法访问的属性
    edition: 1 };
Object.defineProperty(book, "year", { //注意属性名
    get: function(){return this._year;},
    set: function(newValue){
        if (newValue > 2004){
            this._year = newValue;
            this.edition += newValue - 2004;}}});
book.year = 2005;
alert(book.edition); //2 设置一个属性导致其他属性变化。
```
创建访问器属性的2个方法：`__defineGetter__()`和`__defineSetter__()`下例方法等价上例Object方法：
```
book.__defineGetter__("year",function(){
    return this._year;});
book.__defineSetter__("year",function(newValue){
    if (newValue > 2004){
        this._year = newValue;
        this.edition += newValue - 2004; }}）；```
同时定义数据和访问属性的方法：`Object.defineProperties(,)`1参对象，2参描述符。
读取属性特性的方法：`Object.getOwnPropertyDescriptor(,)`1参对象，2参描述符中的属性名。
```
var book = {};
Object.defineProperties(book, { //定义多属性
    _year:{value:2004},
    edition:{value:1},    //数据属性
    year:{                //访问器属性
        get:function(){return this._year;},
        set:function(newValue){
            if (newValue > 2004){
              this._year=newValue;
              this.edition += newValue - 2004;}}}});
var des = Object.getOwnPropertyDescriptor(book,"_year");          //读取数据属性
var def = Object.getOwnPropertyDescriptor(book,"year");           //读取访问器属性
alert(des.value);        //2004
alert(def.value);        //"undefined"
alert(des.configurable); //false 使用方法默认false
alert(def.enumerable);   //false 不用方法默认true
alert(typeof des.get);   //"undefined"
alert(typeof def.get);   //"function"```
工厂模式：通过传参大量创建对象。函数内部有var o=new Object且参数与对象属性关联,return o。
构造函数模式：自定义构造函数。如new Person,内部`this.属性，没有return`。构造函数首字母要`大写`。优点：比工厂强的是能把它的实例标识成特定类型，可用constructor或instanceof检查。任何函数只要通过new都可以做构造函数。
问题：不要内部创建函数，因为每建1个实例就会创建1个函数。
解决：而要通过赋值函数名，函数在构造外部定义。
```
function Person(name, age, job){
   this.name=name;
   this.age=age;
   //this.sayName = function(){alert(this.name);};
   //创建函数方法，不好
   //this.sayName = new Function("alert(this.name)")
   //等价于上面声明函数，不好，创建的各个函数不相等
   this.sayName = sayName;} //赋值指针比创建函数，好
function sayName(){alert(this.name);} //外部定义方法
var person = new Person("Greg",29）；```
问题：如果方法太多就要定义很多全局函数方法。
解决：原型模式。
prototype属性：指向一个原型对象(包含所有实例属性、方法)。给原型添加的属性方法能被构造函数的所有实例共享。
原型对象自带属性:Person.prototype.`constructor`指向Person构造函数。实例指向原型的属性`__proto__`。实例指向原型链的属性constructor。
检测是否关联方法：只要对象和原型对象存在关联，Person.prototype.`isPrototypeOf`(obj)会返true。等价ES5(`Object.getPrototypeOf`(obj)==Person.prototype)返true
实例中定义的属性值会覆盖原型属性值。
判断属性归属：obj.`hasOwnProperty`("")如果属性只属于实例返ture。in符："x" `in` obj返true表示对象有这属性无论原型或实例。合在一起用判断属性是否属于原型；`function hasprototypeProperty(obj, name){return !obj.hasOwnProperty(name) && (name in obj)}`
提取属性数组：`Object.keys(obj)`obj.__proto__为原型按照顺序返回原型的`可枚举属性`字符串数组，obj为实例返回实例的。`Object.getOwnPropertyNames()`返回`所有属性`字符数组。这2个方法可用来替代for-in(IE9+)
```
var o = {
    toString:function(){
        return "My Object";}};
for (var prop in o){
    if (prop == "toString"){ 
        alert("Found toString");}} //找不到
//IE早期bug如原型属性不可枚举，则实例属性也会被屏蔽```
字面量封装原型属性：注意constructor将默认不指向构造函数
```
function Person(){}
var friend1=new Person()//这里实例不会继承重写原型方法
Person.prototype = { //切断构造函数和最初原型的联系
    constructor : Person, //不设置会默认指向Object
    name : "Nicholas",
    age : 20,
    job : "Software Engineer",
    sayName : function(){alert(this.name);}};
var friend2=new Person()//这里实例会继承重写原型```
问题：因为原生constructor是不可枚举的。可用Object.defineProperty()修改枚举性。重写原型会破坏原型赋值动态性，因为实例指向最初原型，构造函数指向重写原型。
原生引用(Object/Array/String)类型的方法也可以定义在原型上。(不建议，可能命名冲突或意外重写原型）
单独使用原型模式的问题：属性值如为数组，共享不好。不能传参
解决：组合使用构造函数模式和原型模式(最常用)，构造函数定义基本属性让实例互不干扰，原型定义constructor属性和通用函数方法。
动态原型模式：把原型方法封装在构造函数内部。优点是封装。注意不要重定义方法,仅初始化运行1次够了，也不要使用字面量。
```
function Person(name,age,job){
    this.name = name;
//公有属性 this指向实例，而非构造函数。
    var age = age;
//私有属性 只能被构造函数访问或实例的constructor属性访问
    Person.job = job;
//静态属性 只能同上，实例不能直接访问。
    if (typeof this.sayName !="function"){
//该判断的作用是避免调用构造函数创建实例时二次创建函数
        Person.prototype.sayName = function(){
            alert(this.name);};}}
//字面量法会使第1次创建的实例会找不到sayName，网友解决：
    if (typeof this.sayName !="function"){
        Person.prototype = {
            constructor:Person,
            sayName:function(){alert(this.name);}};
        return new Person(name,age,job);}```
寄生构造函数模式:就是用new调用的工厂模式。return的对象和原型`没有关联`，没有返回值才返回实例。一用于给原生构造函数添加新功能又不修改原生对象。
```
function SpecialArray(){
    var values = new Array();
    values.push.apply(values, arguments);//添加值
    values.toPipedString = function(){ //添加方法
        return this.join("|");};
    return values;} 
var colors = new SpecialArray("r","e","d")```
稳妥构造函数模式：不用this和new符。内部不定义属性数据，只定义访问属性的方法(属性值由传参决定)。其余和工厂一样。
继承：
原型链：让原型对象成为另一个类型的实例，层层继承，原型就有2个指针，1个指向构造函数，1个指向原型对象。
`A.prototype = new B()` 构造函数A的原型继承B所有属性方法。A的原型是B的实例。A实例的constructor属性指向B的原型
搜索过程：A实例-->A原型--B原型和实例
原型链的原型和实例在instanceof和isPrototypeOf检测true。 
子级原型属性方法可覆盖父级原型同名属性方法。
单用原型链问题：子类型原型会继承超类型实例属性，数组变动影响继承。超类型构造函数传参会影响子类型对象。
解决：借用构造函数：子类型构造函数内部调用超类型构造函数。
```
function SuperType(name){
    this.name=name; }//父类型实例的属性
function SubType(){
    SuperType.call(this,"Nicholas"); 
//内部借调继承父类型属性。可以向父类型传参且不影响子类型
    this.age=29;}    //子类型实例的属性
var instance = new SubType();
alert(instance.name);//"Nicholas"
alert(instance.age); //29```
优点：子类型实例保存父类型属性的副本，修改父类型或传参都不会影响到子类型。只继承父类型构造函数。
单独借调问题：没有原型链，子类型无法继承父类型原型。
解决：组合继承，上面例子：`原型链+内部借调`即可。(最常用)
原型式继承：只想让对象共享另一对象的属性可使用这种轻型化方法。注意引用类型属性如数组会共享。
```
function obect(o){ 
    function F(){} //创建构造函数F
    F.prototype = o; //传入对象成为F的原型
    return new F();}  //返回F的实例```
ES5用`Object.create()`封装上面函数,1参对象2参描述符属性
```
var person = {
    name:"Nicholas,
    friends: ["Shelby"]};
var person1 = Object.create(person，{ //(IE9+)
    name:{value:"Greg"} });//描述符覆盖了原型属性
person1.friends.push("Rob");
var person2 = Object.create(person);
person2.friends.push("Barbie");
alert(person1.name); //"Greg"
alert(person.friends);//"Shelby,Rob,Barbie"
实例会继承原型，但实例操作原型的数组会改变原型的值```
寄生式继承：作用增强原型式继承，添加额外属性方法。
```
function createAnother(o){
    var clone = Object.create(o); //取得继承关系
    clone.sayHi = function(){alert("hi");}; //增强
    return clone;
var person1 = createAnother(person); //person沿用上例
person1.sayHi();  //"hi"```
寄生式组合继承(最完美)：改进组合继承的原型链，保留借调构造函数。该继承对完美继承引用类型值。组合继承的问题是调用了2次构造函数，第1次是创建原型链关系，第2次借调构造函数。
```
function inheritPro(subType,superType){
 var pro = object(superType.prototype);//创建原型副本
 pro.constructor = subType;//原型副本指向子构造函数
 subType.prototype = pro;} //子构造函数指向原型副本```
用上面这个inheritPro函数代替组合继承里的`SubType.prototype = new SubperType();`就能避免父构造函数二次调用的问题，再配合子类型构造函数内部借调`SuperType.call(this.name);`就能实现完美的寄生组合继承
####函数表达式：
函数有个非标准的name属性可以返回函数名。(IE不支持)
函数表达式：类似于变量赋值，可创建匿名函数。
函数声明：因为函数声明提升的缘故，别把它置于if条件中。
递归：在严格模式下不能使用arguments.callee。于是用下例的f()函数成同样的结果,好处是fact函数赋值给别的函数，自己赋为null依然生效。
```
var fact=(function f(num){
    if (num <= 1){
        return 1;
    } else {
        return num * f(num-1);}});```
作用域链：本质是指向变量对象的指针列表。
闭包:闭包函数有权访问另一个函数作用域中的变量。
闭包的初衷是在外部能读取局部变量，于是把内部函数做return值返出来。再就是让局部变量始终占内存。减少全局变量。
设计闭包：如果需要知道闭包细节才能用好的话，这个闭包是设计失败的
创建闭包：当内部函数被外部引用赋值就产生了。当return值是函数。
把局部变量赋值给全局变量，在外部操作全局变量就能修改局部变量。
```
function createF(){
    var result = new Array();
    for (var i=0;i<10;i++){
        result[i]=function(){
            return i;};} 
    return result;}//每个值都是10
alert(createF()[5]());//10 注意调用：1()调函数2[]调数组3()调匿名```
因为每个函数都保存着createF()的活动对象，引用的是同一个变量i。当createF()返回时i的值是10。闭包只能取得包含函数中任何变量的最后一个值
解决：匿名函数自执行：`(function(){})()`(将匿名函数当成一个表达式)(传递一个参数)。如果匿名函数自执行赋值给变量，那()可以去掉`v=function(){}()`。自执行可以模拟块级作用域也就是for变量不影响外部变量。因为匿名函数自执行可不引用自动执行，执行完毕会销毁作用域，减少闭包内存，内部加一些if可独立运行。
```
function createF(){
    var result = new Array();
    for (var i=0;i<10;i++){ 
        result[i]=function(num){
            return function(){return num;};}(i); 
    }//(i)是匿名函数的参数num=i,这里表达式括号可以去掉            
    return result;}//[0,..,9]
alert(createF()[5]()); //5```
this:分为函数调用模式（this绑定全局对象window）和方法调用模式（this绑定调用方法的主体）。对象调用函数时this指向调用对象。匿名函数执行环境有全局性。全局变量保存匿名函数时this指向window。构造函数中直接运行构造函数this指向window，new实例时this指向实例。call/apply中this指向传入对象。return值是匿名函数时this指向window.
```
var name = "The Window"; //全局变量
-----------------------------------------  
var object1 = {name : "My Object",
  getNameFunc : function(){
    return function(){return this.name;};
    }};//return值为函数，this绑定window。
alert(object1.getNameFunc()());//"The Window"
------------解决办法:this赋值法------------   
var object2 = {name : "My Object",
 getNameFunc : function(){
  var that = this; //this赋值给变量，闭包访问的是变量。
//this指向object2，不要再return值中用this，要取哪个对象的变量应在对象调用的那个函数内部的this保存在变量里。
  return function(){return that.name;};
    }}; //函数返回后that仍引用object2
alert(object2.getNameFunc()()); //"My Object"
//this和arguments相似都要保存到闭包能访问到的变量中。
-----------------------------------------  
var object3 = {name : "My Object",
      getName : function(){
        return this.name;}};
object3.getName(); //"My Object" 正常调用
(object3.getName) (); //"My Object" ()让this得到维持
(object3.getName=object3.getName) (); //"The window"
赋值让this失去维持。意思是为object3设置getName方法,返回值是函数本身。()()就是执行这个函数，环境是全局。```
维持：如果内部函数在外部函数退出后仍没退出，则内部函数就维持了外部函数的局部数据。
赋值表达式：赋值表达式的返回值是等号右边的值，连续赋值表达式的值自然就是最右值了，而且只会计算一次。
```  
var a = {n:1};
a.x = a = {n:2};//a.x的a指向{n:1}，a指向{n:2}
var A = B = 5;//B是全局变量，A是局部变量```
内存泄露：IE8-的DOM循环引用问题
```
function ass(){
    var ele = document.getElementById("some")
    var id = ele.id; //这步很重要，引用保存于变量
    ele.onclick = function(){
        alert(id);}; //只访问变量，不访问外部函数引用
    ele = null }     //这步很重要，把引用解除```
私有变量：只有特权方法能访问到私有变量和私有函数。
问题：只有构造函数模式能用特权方法，该模式每创建1个实例会复制私有变量副本。
解决：静态变量。
```
(function(){
    var pri = 10; //静态变量
    function prf(){return false;} //局部函数
    Myobject = function(){}//如果声明构造函数就是局部函数。因此用函数表达式赋值给全局变量。
    Myobject.prototype.pm = function(){ //特权方法
        pri++;//原型方法可共享
        return prf(); })();
因为静态变量不是构造函数内部的，所以不会被实例创建副本。而实例的原型方法能通过作用域访问静态变量。```
模块模式：单例模式：只有1个实例的对象。通过这个对象统一操作数据。每次调用获得的是同一实例。
```
var application = function(){
  var components = new Array(); //私有
  components.push(new BaseComponent()); //初始化
  return {  //返回对象,设置特权/公共方法
    getComponentCount:function(){ //返回数据长度
        return components.length;},
    registerComponent:function(component){//添加数据
        if(typeof component == "object"){
            components.push(component);}}};}();```

####BOM
**window对象**
delete操作符不能删除var定义的全局变量。但可以删除window.xxx定义的全局变量。
`<frameset>标签`：top.frames[0]比window.frames[0]更能代表游览器窗口，因为top指向最外层。parent对象代表父框架，没有框架的话parent指向top。每个框架都有独立的window对象，会影响到跨框架使用instanceof符。self对象始终指向本框架的window。
窗口定位：
```
var leftPos = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX;  //后者火狐
var topPos = (typeof window.screenTop == "number") ? window.screenTop : window.screenY;  //后者火狐
screenLeft游览器距离左屏像素，screenTop游览器距离上屏像素。
这个例子的价值在于思路；用typeof检测、用三目运算设置兼容性。number这个值可以在调试工具里查看的到。
```
窗口移动：window.moveTo(x,y)移动窗口和window.moveBy(x,y)相对移动窗口。要注意框架名是用window还是top。貌似谷歌移不动。
窗口调整：resizeTo(x,y) resizeBy(x,y)用法同上，都可能被禁用。
窗口尺寸：outerWidth、outerHeight游览器尺寸，innerWidth、innerHeight视口尺寸。document.documentElement.clientWidth视口尺寸(不包括滚动条，移动端常用)。
```
var pageWidth = window.innerWidth,pageHeight = window.innerHeight;
if (typeof pageWidth != "number"){
    if (document.compatMode == "CSS1Compat"){
//document.compatMode判断当前浏览器采用的渲染方式。BackCompat：标准兼容模式关闭。CSS1Compat：标准兼容模式开启
        pageWidth = document.documentElement.clientWidth;
        pageHeight = document.documentElement.clientHeight;
    }else{
        pageWidth = document.body.clientWidth;
        pageHeight = document.body.clientHeight;
//浏览器客户区高度、滚动条高度、滚动条的Left、滚动条的Top等等都可以参考上面的兼容代码写法。
```
弹出窗口：
`<a href="a" target="b"></a>等价于window.open("a","b","c","d")`b的值=target值可为_self _parent _top _blank。c设置窗口如何显示具体查手册。open出来的窗口可使用各种命令，不会被禁用。弹出窗的opener对象指向打开它的原始窗口框架。如果不需要两个window之间通信，可以设置opener=null。
如果弹窗被游览器内置程序屏蔽window.open返null。如果是第三方则会抛错，因此需要try-catch处理一下。
```
var blocked = false;
try { var w = window.open("","_blank");
      if (w == null){ blocked = true;}
}catch(e){ blocked = true;} //不管哪种都正确显示屏蔽信息
if (blocked){alert("The popup was blocked")}
```
超时调用：setTimeout属于全局，内部的this非严格模式指向window。1参类似eval可执行字符串但最好是函数，2参时间只是添加js队列的时间不是执行的时间。clearTimeout可在超时之前停止调用。
间歇调用：setInterval,取消clearInterval。后面间歇调用可能在前面的间歇调用之前启动，所以一般不用这个，而是用条件+超时调用模拟这种效果。
对话框：出现的时候所有代码是暂停的且不受css控制。alert() confirm()确认取消 prompt()确认取消输入 print()打印 find()查找
**location对象**
location的属性：![](http://i.imgur.com/sdTfLlQ.png)
查询字符串参数：
```
function get(){
var qs=(location.search.length>0 ? location.search.substring(1) : ""),//取出url中?后的所有字符
args = {},
items = qs.length ? qs.split("&") : [],//拆分为数组
item = null,name=null,value=null,i=0,len=items.length;
for (i-0;i<len;i++){
    item=item[i].split("=");//数组细化
    name=decodeURIComponent(item[0]);//解码
    value=decodeURIComponent(item[1]);
    if (name.length){args[name]=value;}
}
return args;}```
每次修改location属性(hash除外)，页面都会刷新并新增历史记录。
如果使用location.replace()转址的话，会替换当前记录。
location.reload()优先从缓存刷新，location.reload(true)从服务器刷新。之后的代码可能不会执行了。
**navigator对象**
非IE的navigator.plugins[0].name存储插件名。navigator.plugins.refresh(true)更新页面和插件集合，没有true只更新插件集合不刷新。
检测非IE插件：
```
function notIE(name){
    name=name.toLowerCase();
    for (var i=0;i<navigator.plugins.length;i++){return true;}}
    return false;}
```
检测IE插件：
```
function IE(name){ //name是插件名
    try{ //创建未知COM会抛错，所以用try-catch.
        new ActiveXObject(name); //实例化COM对象
        return true;
    }catch (e){
        return false;}}
```
上面两种方法通常都结合起来用来测试一种插件。
注册RSS默认程序：火狐有navigator.`registerContentHandler`(MIME类型,url?feed=%s,名字)，RSS的MIME有三种application/rss+xml、application/atom+xml、application/vnd.mozilla.maybe.feed。url是程序的地址不是RSS的。
注册邮件默认程序：navigator.`registerProtocolHandler`("mailto或ftp","url?cmd=%s","名字")
**screen对象**
它的属性各个游览器不一样。功能是返回屏幕的宽高像素等。
![](http://i.imgur.com/gMwAcv4.png)
![](http://i.imgur.com/22jmK8T.png)
**history对象**
history.go(n) n=-1后撤一页 n="url"转到记录里有的地址
history.back()后撤 history.forward()前进
length保存所有历史数量，==1表示用户刚打开。
####客户端检测
原则：先设计通用方案，再使用特定游览器增强方案。
能力检测：1.检测属性是否存在，不存在换另一种。一般先检测最通用的属性。2.有的时候可能有同名属性，值却不同，所以还要typeof属性更好。IE8中有些DOM方法如document.creatElement是COM对象返"object",IE9纠正了所有DOM都是"function"。
```
function isHostMethod(object,property){
    var t = typeof object[property] //检测属性
    return t=='function' || (!!(t=='object' && object[property])) || t=='unknown'; } //关注下这个return写法。本函数用于检测xhr对象，因为IE的ActiveXObject实例执行函数open会抛错。
```
3.所有检测都一次性检测完。把检测属性返回的布尔值存在变量，后面调用这个变量能节省资源。`var a = !!(property1 && property2 && property3);`
实际开发中，应该把能力检测作为下一步方案的依据，而不是判断是什么游览器。
怪癖检测:利用游览器的bug识别。
IE8以下如果某实例属性与枚举的原型属性同名，该实例属性会消失。
```
var has = function(){
    var o = { toString : function(){} };
    for (var prop in o){
        if (prop=="toString"){return false;} }
    return true; }();
```
用户代理检测：优先级在前2者之后。
该字符串可通过navigator.userAgent访问，并作为响应首部发送给服务器。
格式：产品名/版本号。IE7没有Trident引擎，IE8兼容IE7有，作用是区分是否为兼容模式。Gecko是火狐引擎。平台：xp是Windows NT 5.1，vista是Windows NT 6.0，win7是Windows NT 6.1，win8是Windows NT 6.2。
(9.32-9.34这章暂时用不到跳过没看！)

####DOM
IE8的DOM都是COM对象。
**Node类型**：
所有节点类型都继承自Node类型，节点类型在非IE里有12个Node.xxx数值常量组成。
nodeType:元素节点的`nodeName`是标签名，`nodeValue`是`null`。取值前要`先`nodeType是否等于1。
childNodes:节点的childNodes属性保存着节点列表。有2种访问写法`childNodes[0]`或`childNodes.item(1)`。
children:只保存元素子节点列表
转数组：Array.prototype.slice()可以把arguments对象转成数组，同理对节点列表也有效(IE8不行)。
```
function converToArray(nodes){ //作用：节点列表转数组
    var array = null;//创建变量
    try {
        array = Array.prototype.slice.call(nodes,0);//转数组，IE8无效。
    } catch (ex) {
        array = new Array();
        for (var i=0;i <nodes.length; i++){
            array.push(nodes[i]);}} //IE8的折中办法，类似怪癖检测。
    return array;}```
parentNode:childNodes列表共用一个父节点。列表之间属于同胞节点用previousSibling(第1个是null)和nextSibling(最后是null)属性访问。
firstChild/lastChild:只有1个子节点时指向同一节点，没有子节点时值都是null。
hasChildNodes():有子节点就返true。比查询childNodes数量方便。
ownerDocument:属性指向文档节点（document对象）。
appendChild():添加子节点到最后。把页面中已存在节点添加到某节点内时，原节点会`消失`。insertBefore():用于同胞节点。
replaceChild():被替换的节点会`消失`。removeChild():删除节点。另外，在没有子节点的节点调用上面的方法会错误。
cloneNode():true深复制会复制整个节点树但`不复制属性`，副本是个‘孤儿’。IE8不会为空白符创建节点。IE有个bug会复制事件处理程序，建议复制前先移除事件。
normalize():把子节点的空白文本节点删除，把相邻文本节点合并。
importNode():可跨文档克隆节点
defaultView 指向本框架(非IE)，parentWindow 指向本框架(IE Opera)
iframe.contentDocument指向框架内容的文档对象(非IE)，iframe.contentWindow.document(IE)
isSameNode() 2节点是同1个返true isEqualNode()2节点属性子节点都一样返true
setUserData()设置数据 getUserData()获得数据
**Document类型**
document节点的子节点有各种类型：1 7 8 10。它是HTMLDocument的实例。
documentElement：属性访问子节点中的html元素。也可使用childNodes[n]访问。
body:属性指向body元素。
doctype:指向文档声明标签。各游览器实现不一样。html外面的注释节点也有差异。具体查看255页。
title:窗口标题。URL:地址栏。domain:域名，不能改成别域下网址，把内部的不同子域框架设置成相同域名就可以js通信，不能改回。referrer:前域名。这3个属性都保存在请求头。
getElementById:IE8bug-不区分大小写,IE7bug-表单元素name属性和id同名且在前面会`返回表单`元素。
getElementsByTagName:返回一个HTMLCollection对象。可通过[n]或item(n)访问，该对象访问name标签：`namedItem()`或`["name"]`。实际上[]后台调用就是那2个方法。IE-"*"会返回注释节点。
anchors:带name的a标签集合。links:带href的a标签集合。
forms:form标签集合。images:img标签集合。
document.implementation.hasFeature()检测是否支持某DOM功能。搭配能力检测使用。
写入:`document.write("<script type=\"text/javascript\" src=\"file.js\">" + "<\/script>");`/script必须单独写,且必须转义。
createElement():IE7中直接写完整的html标签更好。IE7动态创建有bug:iframe的name无效，reset()无效，type=reset无效，同name单选不绑定。
readyState属性：2个值（loading/complete），完全代替onload事件。
compatMode属性：CSS1Compat/BackCompat,标准模式/兼容模式。
head:指向head元素，IE11。
charset:返回字符编码
implementation的方法：createDocumentType()创建新文档节点，createDocument()创建新文档。createHTMLDocument()创建完整文档格式。hasFeature():是否支持DOM模块 isSupported()功能类似
**Element类型**
tageName和nodeName:大写的标签名，XML中是小写。建议使用时先转换大小写。
属性：id title lang dir className都继承自HTMLElement。
getAttribute:取得特性，可取自定义属性值。但是style和类似onclick有问题，所以一般都只用自身属性取值。
setAttribute:特性名自动转小写。用属性设置自定义时不会转为特性，IE7会转。set在IE7里无法设置class和style特性。
节点的attributes属性返回一个对象，该对象有4个操作特性的方法，不常用，通常用前面的，需要遍历特性时才有用到。getNamedItem()、removeNamedItem()、setNamedItem()、item()。attributes[0或"id"].nodeValue/nodeName特性值/名。另外specified只有存在的特性才是true（原因：IE7会把没设置过的特性也遍历出来）。
```
此函数是遍历节点的所有特性保存到数组再转为字符串。
function outputAttributes(element){
    var pairs = new Array(),attrName,attrValue,i,len;
    for (i=0, len=element.attributes.length;i<len;i++){
      attrName = element.attributes[i].nodeName;
      attrValue = element.attributes[i].nodeValue;
      if (element.attributes[i].specified) { //判断属性是否存在，功能类似ele.hasAttribute("")
        pairs.push(attrName + "=\"" + attrValue + "\"");}}
    return pairs.join(" ");}
```
childNodes[i]:遍历ul元素时IE仅读取li元素，其它游览器会读取li之间的空白符。所以遍历时必须用nodeType检测。
dataset.xxx:访问data-xxx属性。IE11。
插入标记：
innerHTML:在指定节点下插入`子`节点代码;不支持的标签有：table head html style col colgroup frameset tbody thead tfoot tr title。
outerHTML:功能1-在指定节点下插入节点代码,与上不同的是会替换自身。功能2:-把节点代码转成字符串返回(包括节点自己)。
insertAdjacentHTML():1参必须是下列4个值：beforebegin在前面插入同胞元素。aferend在后面插入同胞元素。afterbegin在开头插入子元素。beforeend在末尾插入子元素。
性能问题：在用前面3个方法删除了某DOM时，该DOM的事件和对象引用仍然占内存。最好手工删除事件和对象属性。但是在大量创建DOM时用这3个属性会非常快速，因为它会创建游览器C++级别的解析器。
innerText:生成一个文本子节点，并编码特殊符号，利用这点可以净化HTML标签如：`div.innerText=div.innerText`。textContent属性和这个类似。
outerText:直接调用功能同上，赋值则会覆盖自身，调用元素被删除。参考前面。
scrollIntoView():容器滚动触发，true节点出现在视口顶部，false节点出现在底部。
contains():判断节点是否为节点的后代，返true。
compareDocumentPosition():判断节点之间的关系返回掩码。1无关。2节点之前。4节点之后。8包含。16被包含。多重关系掩码相加。
```
本函数用于判断节点是否为节点的后代。
function contains(refNode,otherNode){
    if (typeof refNode.contains == "function" && (!client.engine.webkit || client.engine.webkit >= 522)) //能力检测contains方法和版本号
        {return refNode.contains(otherNode);}
    else if (typeof refNode.compareDocumentPosition == "function") //能力检测这个方法
        {return !!(refNode.compareDocumentPosition(otherNode) & 16);}
    else {
        var node = otherNode.parentNode;
        do { //递归向上查找
            if (node === refNode) {
                return true; //退出函数
            } else {
                node = node.parentNode;//文档书顶端的父节点是null。
            }
        } while (node !== null); 
        return false;} //退出函数
```
**Text类型**
nodeValue或data属性：访问文本值，仅限text类型。
方法：appendData添加文字，deleteData,insertData,replaceData,`splitText`把1个节点分成2个，`substringData`提取字符串。
父元素调用`normalize()`合并相邻文本节点。
Comment类型
document.createComment()创建
CDATASection类型
继承自TEXT类型。拥有除splitText之外所有方法。
document.createCDataSection()创建区域
目前游览器通常把它解析成注释。
DocumentType类型
文档声明不能动态创建，该对象保存在document.doctype。IR不支持
name：文档类型名。entities:描述的实体对象。notations:描述的符号对象。publicId和systemId是声明信息。 
**DocumentFragment类型**
document.createDocumentFragement()
该文档片段对象没有标记，但可作‘仓库’使用。继承所有Node方法。把文档片段appendChild给节点，片段本身不会显示，内容会显示。适用于将多个节点插入，减少文档渲染次数。
**Attr类型**
```
var attr = document.createAttribute("align");
attr.value = "left";
element.serAttributeNode(attr); //特性设置给节点
alert(element.attributes["align"].value) //"left"
alert(element.getAttributeNode("align").value) //"left",该方法相较下面会返回特性节点。
alert(element.getAttribute("align")); //"left"```
不过一般操作特性都用那3种常用方法getAttribute/set/remove。
**DOM操作技术**
动态脚本：
```
本函数的作用是动态创建嵌入式脚本
function load(code){
    var script = document.createElement("script");
    script.type = "text/javascript";
    try {script.appendChild(document.createTextNode(code)); }//非IE文本节点
    catch (ex){script.text = code;} //IE文本节点
    document.body.appendChild(script);}
load("funtion sayHi(){alert('hi');}");//和eval()差不多
```
外联脚本设置script.src属性即可。
动态样式：
```
本函数的作用是动态创建内联样式
function load(css){
    var style = document.createElement("style");
    style.type = "text/css";
    try{style.appendChild(document.createTextNode(css));} //非IE
    catch (ex){style.styleSheet.cssText = css;} //IE
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(style);}
```
IE的bug：cssText值会空会导致崩溃，这个属性重复设置同1个style也会崩溃。
动态表格：table元素有一些属性和方法能增删改查表格元素，语义化稍强。或者用传统创建-插入方法也行。
理解DOM的关键就是理解DOM性能。用最少的DOM操作做最多的事，比如把查询存在变量。
####DOM扩展
**新增选择符API**,IE8+：
querySelector():可以取‘第1个’元素/#id/‘第1个’.class/元素.class/父元素 子元素。没有返回null。
querySelectorAll():用法同上参数是选择符，区别是取的集合。
matchesSelector():如果调用元素与选择符匹配返true。加兼容性前缀。IE9+:msMatchesSelector() 火狐3.6+:mozMatchesSelector() 谷歌:webkitMatchesSelector()。所以使用此函数得封装一下。
**新增元素遍历属性**，IE9+：
childElementCount:返回子元素个数（不包括文本节点和注释）
firstElementChild:firstChild元素版
lastElementChild:lastChild元素版
previousElementSibling:previousSibling元素版
nextElementSibling:previousSibling元素版
**类扩充**：
getElementsByClassName():IE9+。可取多类元素。方便给统一类添加事件。
classList属性：保存节点所有class名的数组。不再需要重写className了。IE不支持。该属性有几个方法。
add():添加类  remove():删除类
contains():某类存在返true
toggle():存在就删除，不存在就添加类
**焦点**
document.activeElement 返回焦点元素，默认body。
document.hasFocus()    判断是否获得焦点
**文档模式**
默认情况下通过文档类型声明设置文档模式。
`<meta http-equiv="X-UA-Compatible" content="IE=xxx">`
xxx的值可为：
Edge:最新，忽略类型声明。
EmulateIE9:如果有声明，则以IE9渲染，没有以IE5渲染。
9:强制IE9渲染，忽略类型声明。
document.documentMode：返回IE文档模式版本号。
####DOM2/3

**命名空间**
XHTML支持XML命名空间，命名空间用xmlns属性指定`<html xmlns="http://www.w3.org/1999/xhtml">`或`<xxx:html xmlns:xxx="">`内部所有元素名和属性名加xxx:前缀。
`<svg xmlns="http://www.w3.org/2000/svg" version="1.1">`命名空间让svg标签不属于文档而属于空间。
Node类型关于空间的属性：localName:节点名 prefix:前缀 namespaceURI:命名空间URI
isDefaultNamespace():参数是默认命名空间URI返true。
lookupNamespaceURI():返回指定前缀的命名空间。
lookupPrefix():返回URI的前缀。
createElementNS():创建命名空间的元素节点
createAttributeNS():创建命名空间的特性
getElementsByTagNameNS():返回命名空间的标签集合
getAttributeNS getAttributeNodeNS特性节点 hasAttributeNS removeAttributeNS setAttributeNS setAttributeNodeNS getNamedItemNS removeNamedItemNS setNamedItemNS 这些方法都有NS，1参都是命名空间URI。
**style**
cssText:css的字符串，可读可设 
getPropertyValue()返回属性值 
getPropertypriority()判断属性是否强制！important。  removeProperty()删除属性 
setProperty()设置属性
也可以使用[]和item()遍历属性名。length:css数量
计算样式是只读的，不能设置。不能读取综合简化属性。:
`（非IE）a=document.defaultView.getComputedStyle(div,null)//null可以是伪元素` a.backgroundColor `(IE) a=div.currentStyle` 
**cssRules**
document.styleSheets返回样式表集合对象
sheet属性/styleSheet(IE):从link标签或style返回CSSStyleSheet对象。
样式对象有cssRules[n]，每条规则对应1个{},他有几个属性(ie大部分不支持)。cssText：当前规则，和style.cssText的区别是信息更多但不能重写 。selectorText当前规则的选择器 style保存{}属性数组，修改这个会修改所有应用元素样式。parentRule导入规则 parentStyleSheet所属样式表
样式对象有个方法可以插入css规则：insertRule(cssText,0) || addRule(selectorText,cssText,0)(IE8)最多添加4095条规则。
```
跨游览器向样式表插入规则
function insertRule(sheet,selectorText,cssText,position){
    if (sheet.insertRule){
        sheet.insertRule(selectorText + "{" + cssText + "}",position);
    } else if (sheet.addRule){
        sheet.addRule(selectorText, cssText,position);}}
```
删除规则：deleteRule(n) ||removeRule(n)（IE）
**元素大小**
offsetHeight、offsetWidth:元素高、元素宽(包括边框)
offsetLeft、offsetTop:和包含元素的偏移
offsetParent：指向包含元素，不一定是父元素，是最近且具有大小的祖先元素。
所有偏移量都是只读的计算值，避免重复访问。
clienWidth、clientHeight:元素高、元素宽（不包括边框，因此不算滚动条）document.documentElement.clientHeight 浏览器可视部分高度(可变)，document.body.clientHeight 浏览器所有内容高度（固定）
scrollHeight、scrollWidth:元素实际高宽
前2组属性在各游览器表现不同：火狐都是实际尺寸。谷歌/Op/苹果c是实际尺寸，s是视口尺寸。标准IE的c是视口尺寸，s是实际尺寸。
所以，要取文档实际尺寸需要最大值：Math.max(document.documentElement.xxx)。 IE兼容模式是document.body
scrollLeft、scrollTop:滚动距离。这个属性document.documentElement，谷歌中要document.body。两个值必有一个为0，所以取两值之和。
如果没有文档声明，这些值还会有变化，参考我收藏的网址。
getBoundingClientRect():返回保存元素和视口的距离的对象。在IE7中，默认坐标从(2,2)开始计算，
**深度优先遍历** IE不支持
document.createNodeIterator()：遍历（深度优先）
previousNode()、nextNode()上/下一个节点
例子下；
document.createTreeWalker():用法和上面一样，区别是
parentNode()跳到父节点、firstChild()跳到首个子节点、lastChild()跳到末尾子节点、nextSibling()跳到下个节点、previousSibling()跳到上个节点。
filter参数除了返回NodeFilter.FILTER_ACCEPT(进入节点)和 NodeFilter.FILTER_SKIP(跳过节点从子树开始)还有NodeFilter.FILTER_REJECT(跳过节点树)
**DOM范围**
document.createRange() 创建范围
属性：startContainer范围起点、startOffset范围起点的偏移、endContainer范围终点、endOffset范围终点的偏移、commonAncestorContainer祖先节点。
方法：selectNode()选择节点及子节点。selectNodeContents()选择子节点。前者起终祖先是父节点，起偏是父节点的子节点索引。后者是起终祖先是自己。setStartBefore()/setStartAfter()设置范围起点、setEndBefore()/setEndAfter()设置范围终点。setStart()/setEnd()设置范围。deleteContents()删除范围。extractContents()删除范围并返回文档片段，片段内容可appendChild哦。cloneContents()创建范围副本返回片段，也可插入别处。insertNode()向范围内插入新节点。surroundContents()环绕范围插入节点。collapse()折叠范围。compareBoundaryPoints()检测多个范围的起终点。cloneRange()复制范围。detach()清理范围，接着就可以解除引用了。
IE8不支持DOM范围，但支持文本范围：
createTextRange();
属性：htmlText全部内容、text文本内容、boundingWidth范围宽度
findText()查找文本。moveToElementText()选择节点及子节点。parentElement()祖先节点。move()折叠范围并移动。moveStart()、moveEnd()设置范围起终点。expand()规范化范围。collapse()折叠范围。compareEndPoints()检测多个范围的起终点。isEqual()2个范围是否相等。inRange()范围是否被包含在范围里。duplicate()赋值范围。
####事件
IE8是专有事件，IE9实现了DOM2级事件。
IE事件冒泡流：元素->文档。网景事件捕获流：文档->元素，IE9及其它是从window开始捕获。
DOM2事件流：捕获->目标接收事件->冒泡。DOM2规定捕获阶段不包括目标，但IE9及其它都包括，这导致捕获和冒泡都能操作事件。
HTML标签内的事件代码如果是HTML语法需要转义&"<。
event变量指向事件对象，this指向目标元素。外部函数的this指向window,需要在函数内部使用with`with(document){with(this){alert(value)}}`this指向document。标签上直接写的属性没被加到标签对象的属性里去。
标签事件可能有时差问题，可用try-catch隐藏错误提示。
DOM0级也就是事件绑定是在元素作用域运行的，this指向目标元素。是在冒泡阶段进行的。删除事件是btn.onclick=null;
DOM2级的addEventListener既可以捕获阶段true触发，也可以冒泡阶段false触发，还可以对同一个元素多次触发。 删除事件removeEventListener(),但无法移除匿名函数。为了保证是同一个事件，所以处理事件函数可以赋值给变量，而不是声明。
IE事件：attachEvent()和detachEvent()，点击事件是onclick而不是上面的click。这和DOM0级方法不同的是这属于全局作用域,this指向window。?|
兼容方案：用之前都要先用一下getEvent(event)方法
```
var EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);} //DOM2事件
        else if (element.attachEvent){
            element.attachEvent("on"+type,handler);} //IE事件
        else {element["on"+type]=handler;}}, //DOM0事件
    removeHandler:function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);} //DOM2删除事件
        else if (element.detachEvent){
            element.detachEvent("on"+type,handler);} //IE删除事件
        else{element["on"+type]=null;}}, //DOM0删除事件

    getEvent:function(event){return event ? event : window.event;}, //event对象
    getTarget:function(event){return event.target || event.srcElement;}, //目标元素
    preventDefault:function(event){
        if(event.preventDefault){event.preventDefault();} //阻止默认
        else{event.returnValue = false;}}, //IE阻止默认
    stioPropagation:function(event){
        if(event.stopPropagation){event.stopPropagation();} //停止冒泡
        else {event.cancelBubble = false;} }, //IE停止冒泡
    getRelatedTarget: function(event){ //获取移入移出事件的关联元素
        if (event.relatedTarget){return event.relatedTarget;} //非IE
        else if (event.toElement){return event.toElement;} //IE的被移出元素
        else if (event.fromElement){return event.fromElement;} //IE的移入元素
        else {return null;}          },
    getButton: function(event){ //获取被按压的鼠标键
        if (document.implementation.hasFeature("MouseEvents","2.0")){return event.button;}
        else {
            switch(event.button){
                case 0: case 1: case 3: case 5: 
                case 7: 
                    return 0;
                case 2: case 6: return 2; case 4: return 1;}}},
	getshubiao:function(e){  //这个是自己写的，可能要加滚动条高宽
		if(e.x){return e.x + e.y}  //IE鼠标坐标
		else {return e.pageX + e.pageY} //火狐
	},
    getCharCode: function(event){   //获取键码
        if (typeof event.charCode == "number"){return event.charCode;} //IE9
        else {return event.keyCode;} },
};    
btn.onclick = function(event){event = EventUtil.getEvent(event);};//使用方法

```
该方案没有考虑IE作用域和DOM0级方法只能添加一个事件。
**event对象**包含一切与事件相关的数据。
属性:target是目标元素，currentTarget是监听元素===this，少用this更好。preventDefault()取消事件的默认动作。stopPropagation()停止冒泡，用于在触发子元素事件又不触发具有相同事件的父元素。stopPropagatioin()停止捕获和冒泡。
思路：用switch-case判断type可以处理多个事件。
IE中用DOM0级需要用window.event取得event对象。
属性:srcElement目标元素，returnValue取消事件默认动作，cancelBubble停止冒泡。
不冒泡的事件要在执行前绑定。不冒泡事件要直接绑定到元素上。
**内存和性能**
事件委托：在DOM树高层添加事件,减少同类型事件数量。回调用switch-case确定元素对象做出反应。
移除事件：在不需要该事件的时，尽量移除。在删除或替换页面元素时多考虑。删除目标元素会阻止事件冒泡。IE8卸载时会滞留事件对象，所以只要是load添加的事件最好都在unload中移除，但是unload会导致不缓存页面。
**模拟事件**
document.createEvent() 创建event对象 
DOM2参数：UIEvents UI事件，MouseEvents 鼠标事件，MutationEvents DOM变化事件，HTMLEvents HTML事件。DOM3参数去掉复数s即可，HTML事件被分解，添加键盘事件KeyboardEvent 
dispatchEvent() 触发事件，能冒泡
鼠标事件有个方法能初始化事件各项属性 initMouseEvent() 接受15个参数，详查406页。每种事件初始化方法不同。
模拟点击：
```
var btn=document.getElementById("myBtn");
var event = document.createEvent("MouseEvents"); //创建鼠标事件
event.initMouseEvent("click",true,true,document.defaultView,0,0,0,0,0,false,false,false,false,0,null);//初始化事件
btn.dispatchEvent(event); //触发```
模拟同时按shift键和A键：
```
if (document.implementation.hasFeature("KeyboardEvents","3.0")){ //DOM3和DOM2键盘事件不一样
    event = document.createEvent("KeyboardEvent");
    event.initKeyboardEvent("Keydown",true,true,document.defaultView,"a",0,"Shift",0);} //初始化事件对象
btn.dispatchEvent(event);//触发```
火狐中键盘事件是KeyEvents,初始化是initKeyEvent()，参数见p408。
模拟DOMNodeInserted事件：（子节点被插入时）
```
var event = document.createEvent("MutationEvents"); //创建变动事件
event.initMutationEvent("DOMNodeInserted",true,false,someNode,"","","",0);
target.dispatchEvent(event);```
模拟focus事件：
```
var event = document.createEvent("HTMLEvents"); //创建HTML事件
event.initEvent("focus",true,false); //初始化focus
target.dispatchEvent(event);```
模拟自定义事件：IE9+
```
EventUtil.addHandler(document,"myevent",function(event){ //绑定myevent事件
    alert(event.detail);});
if (document.implementation.hasFeature("CustomEvents","3.0")){
    event = document.createEvent("CustomEvent"); //创建自定义事件
    event.initCustomEvent("myevent",true,false,"Hello world!"); //初始化为myevent事件
    div.dispatchEvent(event);}```
模拟点击事件：IE8
```
var event = document.createEventObject(); //创建事件对象
event.screenX = 100; event.screenY = 0; event.clientX = 0; event.clientY = 0; event.ctrlKey = false;event.altKey = false;event.shiftKey = false; event.button = 0; //只能手动初始化
btn.fireEvent("onclick",event); //触发事件 同时添加srcElemtn和type属性。```
####第14章 表单脚本
HTMLFormElement继承自HTMLElement，特有属性有：acceptCharset-字符集 action-请求的url elements-表单内所有控件集合 enctype-编码 length method name reset()-域重置为默认 submit() target-请求和响应的窗口。
`document.forms["name"]` 获取表单就靠name属性
提交：type="submit"表单提交前form会触发submit事件。`form.submit()`也可提交表单，但不会触发submit事件。
禁止重复提交：1.提交后禁用提交按钮。2.onsubmit的`prevetnDefault()`可阻止提交。通过监听提交事件做到的。某些游览器click事件先于submit，所以第2种方法较好。
重置：type="reset"和`form.reset()`重置表单都会触发reset事件。
`form.elements[n/"name"]` 表单内所有元素,有多个相同name元素返回集合。
各组件的form属性指向form元素。
焦点：onload后的`focus()`或H5的autofocus属性可以吸引注意力,禁止用在隐藏元素上。非表单元素设置`tabIndex=-1`也能调用focus（）。blur()
事件：失焦-触发blur：常用于恢复颜色 焦点-触发focus：常用于修改颜色 input/textarea失焦且修改value和select修改选项-触发change:常用于验证数据。 onblur和onchange顺序在不同游览器上不同。
value属性:修改value值时不要用DOM方法，而是`input.value`直接用。
选中：手选文本或调用`select()`选择文本-触发select事件。
获取选中：IE9+的H5属性可取得文选区开头和结尾的偏移量。`textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);`setSelectionRange(n,n+1)功能类似。 IE8的`document.selection.createRange().text;`不过它保存的是整个文档的选中，需配合onselect使用.IE8的js选中比较繁琐，步骤：createTextRange()->collapse(true)->moveStart()->moveEnd()->select();
要看到选中效果必须获得焦点。
屏蔽字符：监听keypress事件并阻止默认。可把文本框变为只读。
```
//监听keypress,屏蔽非数字字符，屏蔽上下左右键、屏蔽ctrl组合键
var charCode = EventUtil.getCharCode(event);
if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && ！event.ctrlKey){ 
	EventUtil.preventDefault(event);}
```
剪贴板事件：copy cut paste复制剪切粘贴时 beforecopy beforecut beforepaste复制剪切粘贴前。IE都会触发，其他游览器的before只在上下文触发。阻止默认只能用在前者。
访问剪贴板数据：IE `window.clipboardData`可在任何时候访问。 其他游览器 `event.cliboardData`只在剪贴板事件中访问。
clipboardData：getData()取得数据，参数为数据格式:IE是"text"和"URL",其他是MIME类型。setData()1参也是数据格式，2参是value，成功返true。还一个clearData()。
自动切换焦点：步骤：先判断target.value.length==target.maxLength->再遍历表单元素并判断form.elements[i]==target->跳转焦点form.elements[i+1].focus();记得监听keyup。
H5验证：required属性-不能提交空表单。检测`"required" in document.createElement("input");` pattern属性是正则-用来约束输入字段的。
checkValidity()检测表单或表单输入有效返true。validity属性有9个布尔属性能告诉你无效的具体位置-P430。
禁用验证：novalidate-表单标签属性 formnovalidate-表单元素标签属性
<select>的属性方法:add(new,old)插入新<option>,multiple为true允许多选，options[]为<option>集合，remove(n)移除选项，selectedIndex选中项索引，多选只存首项，不选为-1，size选项可见行数。value的值一般等于选中项的value，不选为"",多选为首项，未指定时IE8返"",IE9+返text。
<option>的属性：index索引，label,selected为true是已选，text文本，value。注意：操作数据不需要DOM方法，直接用默认属性。选项的change事件不需要失焦只需改值。
`select.options[select.selectedIndex]`访问已选项 `selected=true`可用来设置多选。
创建option标签：1.DOM创建插入 2.创建new Option(text,value) 插入末尾add(new,undefined)//IE不支持appendChild。要插在其他位置只能方法1。
移除option标签：1.select.removeChild(select.options[0]) 2.select.remove(0) 3.select.options[0]=null 。
移动选项：appendChild()妙用：传入为文档已有元素会先移除它再插入并重置索引。
重排选项：用insertBefore()。
**富文本**：可编辑状态:1.frames[].document.designMode="on" 2.`contenteditable`标签属性,适用所有元素。
设置功能：document.execCommand(命令,false,值) P409
检测功能：queryCommandEnabled("") 命令可用返true。
富文本选区：window/document(IE).getSelection() p442 它有很多属性方法操作当前选择文本和DOM范围。例如：toString()取得选择文本，getRangAt(0)取得选区范围。另外range.text也可取得选择文本
文本高亮：1.DOM范围：`range.pasteHTML("<span>"+range.htmlText+"</span>")` 2.选区范围:`range.surroundContents(span)` 把文本放入高亮标签即可。这里的range1是创建范围，range2是富文本创建范围。
提交：`target.elements[].value=frames[].document.body.innerHTML`因为富文本采用的是框架不会自动提交，所以需要隐藏表单控件并监听submit事件。要点：只要记住是把值传到隐藏表单value提交即可。
####第15章 Canvas
取得2d上下文 ：cava_div.getContext("2d") ，老游览器没有这个方法需判断存在。
截屏cava :cava_div.toDataURL("image/png") ，返回url再传给image.src即可。注意画布图像必须同域名。
width和height表示水平向右和垂直向下的可用像素数。
描边和填充 ：context.strokeStyle context.fillStyle ，值可以是字符串、渐变对象、模式对象、任何格式的颜色/默认#000。
矩形 ：fillRect()、strokeRect()、clearRect()。 x，y，宽，高 clearRect可删除矩形图区
绘制路径之前： beginPath()
绘制弧线： arc() 
从上点接着绘制: ->弧线 arcTo() ->曲线 bezierCurveTo() ->直线 lineTo() ->二次曲线 quadraticCurveTo() ->矩形路径 rect()
移动绘图游标： moveTo() 不画线，画完一个图必须用这个画下一个。
绘制路径完毕： closePath()
填充路径：fill() 路径描边：stroke()。 只有这样才能显示在画布上，这里使用的颜色是strokeStyle、fillStyle来的。
剪切路径： clip()
判断某点是否位于路径上 ：context.isPointInPath(x,y)
绘制文本：fillText() strokeText() 这里使用的颜色是strokeStyle、fillStyle来的。还有font textAlign textBaseline等context属性。
测量文本： context.measureText().width
变换： rotate() scale() translate()改变原点 transform() setTransform()
保存设置：save() 每次调用就保存到栈
恢复设置：restore() 每次调用返回上一级，不会删除图像。
绘制图像：drawImage(img,x,y) 可将image标签或另一cavas标签画到画布里
阴影：shadowColor shadowOffsetX/Y shadowBlur
渐变：createLinearGradient() 设置色标addColorStop()最少调用2次 createRadiaGradient() 想象2个圆桶开口的圆锥体，移动小圆桶位置达到类似旋转圆锥体。
```
function createRectLinearGradient(context,x,y,width,height){
    return context.createLinearGradient(x,y,x+width,y+heght);
}//这样就能在fillRect()里使用相同的坐标，不用担心渐变色显示不全。
```
模式：createPattern(img/cava/video,"repeat-x") 类似平铺
图像数据：getImageData()获取画布数据，putImageData()把数据应用到画布。data属性是数组，每4个是1个像素的红、绿、蓝、透明值。第5个是下1个像素的红。步骤：1.通过修改data数组2.并回写数据getImageData().data=data再3.应用putImageData()即可。例如：彩色变黑白，是取红绿蓝的平均值赋值给红绿蓝。必须同域名。
全局透明度： globalAlpha=0设置后后续所有操作都会应用该透明度。
合成：globalCompositeOperation属性 destination-over后画在下 lighter重叠高亮 copy后画替换先画 xor重叠执行"异或" 还有其他属性，该函数主要是处理后画与先画之间关系的。
**WebGL**是canvas的3D上下文，它基于OpenGL2.0。
类型化数组：`new ArrayBuffer(20)` 访问byteLength属性得出内存里保存了20B字节。
数组缓冲器视图：`new DataView(buffer,字节偏移，字节数)` 偏移量在`byteOffset`属性,字节数在`byteLength`属性,`buffer`属性指向数组缓冲器。
读写时要根据相应数据类型：8种方法。get/set+Int/Uint/Float+8/16/32() view.getInt8()是读取有符号8位整数。
不同数据类型内存不一样：无符号8位整数要1B，32位浮点数要4B。16位用2B。如果保存的第1个占2B，第2个保存的偏移量就是2。如果用8位取存的16位，那就只会取前8位2进制。
类型化视图：继承自DataView的进化版，可简化操作二进制。`Int/Uint+8/16/32+Array()`：8位二补整数或8位无符号整数 `Float32/64Array()`：32位IEEE浮点数。
占位：20B的ArrayBuffer可保存20个8位、10个16位、5个32位、2个64位。Uint8Array.`BYTES_PER_ELEMENT`属性值是1，该属性表示类型化数组每个元素需要多少字节。Float32Array是4。
```
var int8s = new Int8Array(buffer,0,10*Int8Array.BYTES_PER_ELEMENT);
//10个元素空间。
var uint16s = new Uint16Array(buffer,int8s.byteOffset+int8s.byteLength,5*Uint16Array.BYTES_PER_ELEMENT);
//注意这里的属性运用，1参是buffer，2参是偏移，3参是5个元素空间。
```
```
//常用方式,不用手动newArraybuffer了，传参自动new。
var int8s = new Int8Array(10); 创建一个数组保存10个8位整（10B），如果字节数不够，赋值时实际保存值变成值的模。
var int8s = new Int8Array([10,20,30,40,50]) 传数组参保存5个8位整（10B）
var sub = int8s.subarray(2,4);在大视图的基础上创建小视图。
```
获取WebGL上下文
```
if (cavadiv.getContext){ //检测是否支持canvas上下文方法
    try{ //某些游览器对gl会抛错，所以用try_catch封装。
    var gl = cavadiv.getContext("experimental-webgl",{alpha:false});
    } catch(ex){} //啥都不做
    if (gl){...}}
```
上下文初始化属性：alpha:Alpha通道缓冲区，depth:16位深缓冲区，stencil:8位模板缓冲区，antialias:抗锯齿，premultipliedAlpha:绘图缓冲区有预乘Alpha值，preserveDrawingBuffer:绘图完成后保留缓冲区。以上都是布尔值，一般默认。
常量：OpenGL的GL_COLOR_BUFFER_BIT在WEB中是属性gl.COLOR_BUFFER_BIT。
命名：后缀f是浮点数，i是整数，v是数组。gl.uniformf()表示接受4个浮点数。gl.uniform3iv()表示接受一个可有3个值的整数数组。
准备：绘图前要用颜色清除绘图区gl.clearColor(0,0,0,1);gl.clear(gl.COLOR_BUFFER_BIT);
视口：gl.viewport(0,0,cava.width,cava.height) 定位视口原点在cavas的左下角，而视口内部的原点在视口中心。在视口外面绘图会被剪掉。
```
var buffer = gl.createBuffer();创建缓冲区
gl.bindBuffer(gl.ARRAY_BUFFER,buffer); 缓冲区绑定到当前3d上下文
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([0,0.5,1]),gl.STATIC_DRAW); 用数据填充缓冲区，3参常量还有gl.STATIC_DRAW数据只加载一次，多次绘图使用。gl.STREAM_DRAW数据只加载一次，几次绘图使用。gl.DYNAMIC_DRAW数据动态改变多次使用。
gl.deleteBuffer(buffer); 删除缓冲区
```
错误：WebGL不会自动抛错，必须手工调用gl.getError()返回一个常量；gl.NO_ERROR无错，gl.INVALID_ENUM参数错误应为常量，gl.INVALID_VALUE无符号数传了负值，gl.INVALID_OPERATION当前状态不能操作，gl.OUT_OF_MEMORY内存不足，gl.CONTEXT_LOST_WEBGL丢失当前上下文。有多个错误时要循环调用直至返回无错。
顶点着色器：把3D顶点转换为需要渲染的2D顶点。片段着色器：计算每个像素的颜色。
着色器传值：通过2个关键字Attribute和Uniform。方法是main()。
顶点着色器传值例子
```
<script type="x-webgl/x-vertex-shader" id="vertexShader">
attribute vec2 aVertexPosition; //定义有2个元素x,y的数组 1是关键字 2是数据类型 3是名字
void main(){ //着色器语言是GLSL可在WebGL使用。
    gl_Position = vec4(aVertexPosition,0.0,1.0);
}</script>//顶点着色器把顶点赋值给特殊变量，vec4创建4个元素(其它坐标)把2D坐标转为3D坐标
```
片段着色器传值例子
```
<script type="x-webgl/x-fragment-shader" id="fragmentShader">
uniform vec4 uColor;
void main(){gl_FragColor = uColor;}</script>
```
上面的type属性乱写的，游览器无法识别，我们只需要读取它的text属性取得GLSL字符串。
```
var vertexShader = gl.createShader(gl.VERTEX_SHADER);创建着色器对象并传入着色器类型
gl.shaderSource(vertexShader,vertexG1s1);
gl.conpileShader(vertexShader); 编译着色器
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER); 片段着色器
gl.shaderSource(fragmentShader,fragmentG1s1);
gl.compileShader(fragmentShader);

var program = gl.createProgram();
gl.attachShader(program,vertexShader); 把着色器对象封装入变量
gl.attachShader(program,fragmentShader);
gl.linkProgram(program); 链接进入着色器程序
gl.useProgram(program); WebGL使用着色器程序

var uColor = gl.getUniformLocation(program,"uColor"); 返回对象表示Uniform变量在内存里的位置，传入颜色值
gl.uniform(uColor,[0,0,0,1]); 传值给搜索到的Uniform变量
var aVertexPosition = gl.getAttribLocation(program,"aVertexPosition"); 搜索Attr变量，传入顶点信息
gl.enableVertexAttribArray(aVertexPosition);启用Attr
gl.vertexAttribPointer(aVertexPosition,itemSize,gl.FLOAT,false,0,0);传值并绑定缓冲区供顶点着色器使用。
```
调试：
```
//检测着色器编译
if (!gl.getShaderParameter(vertexShader,gl.COMPILE_STATUS)){
    alert(gl.getShaderInfoLog(vertexShader));} //返回错误消息
//检测链接
if(!gl.getProgramParameter(program,gl.LINK_STATUS))
```
绘图：gl.drawArrays(形状常量，顶点偏移，顶点数)或gl.drawElements()前者用在数组缓冲区，后者用在元素数组缓冲区。形状常量有7个。
纹理：gl.createTexture() 设置像素格式gl.pixelStorel(gl.UNPACK_FLIP_Y_WEBGL,true) 清除当前纹理gl.bindTexture() 使用image需要实例化并onload。
读取像素：readPixels(x,y,宽，高，图像格式，数据类型，类型化数组)
####第16章 H5脚本编程
**跨文档消息**：XDM对内嵌框架传递消息。postMessage("消息"，"接收方域名")
发送
```
var iframeWindow = document.getElementById("myframe").contentWindow; //框架属性
iframeWindow.postMessage("A secrect","http://www.wrox.com"); //发送
```
接收：会触发onmessage事件。
```
if (event.origin == "http://www.wrox.com"{   验证域名
    processMessage(event.data); 处理接收的数据
    event.source.postMessage("Recived","http://p2p.wrox.com"); 发送回信
```
postMessage有些游览器1参只支持字符串，如果要发送结构化数据就先JSON.stringify(),接收方调用JSON.parse()
**拖放**
事件顺序：
被拖元素：`dragstart->drag->dragend`。1按下鼠标键并移动 2拖动过程中持续触发 3拖动停止无论是否成功
放置元素：`dragenter->dragover->dragleave或drop` 1拖进放置目标 2再放置目标范围内移动持续触发 3拖出放置目标或成功放置
自定义放置目标：阻止某元素的dragenter和dragover默认行为即可。火狐drop的默认行为是打开拖动的url
event.`dataTransfer`的方法和属性 :
  方法：setData(MIME类型,字符串) getData("") 只能在drop事件读取到。`addElement(ele)`为拖动添加元素 `clearData(format)`清除某格式的数据。`setDragImage(ele,x,y)`图像显示在拖动光标下方,xy是光标在图像里的坐标。
  属性：`dropEffect`="none"不可放置、"move"拖动元素移动到放置目标、"copy"拖动元素复制到目标、"link"放置目标打开拖动元素URL。这里改变的仅是光标样式需配合dragenter事件处理。`effectAllowed`的值和前者差不多，需配合dragstart事件处理。`types`数据类型，IE10+。
H5标签属性：draggable="true"表示可拖动，IE10+。
**媒体**
事件：有25种。
属性：27种。 P487。
play() pause() 
检测游览器支持格式和解码器：!audio.canPlayType("audio/mpeg")
隐藏音频：调用new Audio("a.mp3"); 监听canplaythrough调用play()。不用插入文档。
**历史状态管理**
URL参数列表变化触发hashchange事件。
添加状态到历史状态栈：history.pushState({状态对象：""}，状态标题，URL) 可载入上次Ajax无刷新页面
前进后退按钮触发popstate事件。event.state保存着传入的状态对象，第1个页面没有状态值为null。
重写当前状态：history.replaceState({},"","url") 只能改变同域名。
####第17章 错误调试
IE:工具栏->高级->显示每个脚本错误的通知
```
try{ xxx();}
catch(error){ //必须取名字
alert(error.message);} //message属性所有游览器通用
```
错误对象属性：IE还有包含错误数量的number。火狐有fileName/lineNumber/stack栈跟踪信息。苹果有line行号、sourceId错误代码、sourceURL。
finally子句：无论出错与否，甚至忽略return，finally必然会执行。try{}catch(e){}finally{}。IE7bug必须要有catch句存在。
错误类型：Error 基类型,自定义错误及其他错误都继承自它。
EvalError：没有吧eval()当函数调用。
RangeError:传数值参时超过了限制范围。
ReferenceError:访问不存在的变量时。
SyntaxError:eval的字符串代码语法错误，eval之外语法错误直接会停止执行。
TypeError:访问不存在的变量时。传参类型不对。变量保存的是不支持的类型。
URIError:URI格式错误。
如何获取错误类型：instanceof操作符。try{..}catch(error){if(error instanceof TypeError){}}
适用范围：js库源码无法自行修改，用try-catch阻止错误报告。
throw:抛出信息。throw new TypeError/../RangeError("信息") 可脱离try-catch单独使用，消息里写一些函数只支持的传参类型之类的，尤其是编写大型库的时候会有很多地方调用这个函数，多用这个可提高代码维护性。try-catch用于阻止默认，throw用于检查bug。
自定义错误类型：
```
function CustomError(message){
	this.name = "CustomError"; //错误类型的名字
	this.message = message;}
CustomError.prototype = new Error(); //让自定义继承基类型
throw new CustomError("my message");
```
onerror事件：苹果不支持。只能用DOM0级捕获。且没有event对象。它应作为最后一道防线。IE触发事件依然保留数据事件内可以访问，火狐会销毁数据。
```
window.onerror = function(message,url,line){ //支持3个参数，一般只用1参
	alert(message);
	return false; }//这里相当于try-catch，拦截自己都不知道的错误。
```
常见错误：1.类型转换：用if(typeof x == 'string') 比 if(x) 好，担心x是非正常值比如0。2.数据类型：if(x != null/udf)这习惯不好。不要用typeof检测对象属性，就算检测成功也只能说明该对象有这个属性，万一对象调用的是没检测的属性方法呢，应直接用instanceof检测参数的数据类型。3.通信错误：URL错误：只能有1个问号，有2个的话用encodeURIComponent()转码"="后面的。如果是服务器响应数据错误IE会报错。
致命错误：1.主要功能无法运行。2.错误明显影响用户操作。3.会发生后续错误。致命错误需要给用户提示刷新。非致命错误建议try-catch拦截或给出小提示。
集中在服务器保存错误日志：
```
function logError(sev,msg){ //错误日志函数
	var img = new Image();  //img标签可跨域，比XHR兼容性好。
	img.src = "log.php?sev=" + encodeURIComponent(sev) + "&msg=" + encodeURIComponent(msg);
} //把错误级别和错误消息通过参数GET给服务器保存。
try{ ... }
catch(ex){logError("nonfatal","错误：" + ex.message);} //消息应带上下文便于复查
```
兼容写法的console.log: 支持IE7
```
function log(message){
	var console = document.getElementById("debuginfo");
	if (console === null){
		console=document.createElement("div");
		console.id="debuginfo";
		console.style.background="#dedede";
		console.style.border="1px solid silver";
		console.style.padding="5px";
		console.style.width="400px";
		console.style.position="absolute";
		console.style.right="0px";
		console.style.top="0px";
		document.body.appendChild(console);}
	console.innerHTML += "<p>" + message + "</p>";}
```
IE错误：
1.操作终止：IE7。IE8是HTML Parsing Error。页面加载前修改DOM。解决：用insertBefore把新元素插到body最前面。或者把修改DOM的方法放在body最后面执行。
2.无效字符：invalid character可能是把Unicode字符当成常规字符使用了。
3.未找到成员：对象销毁后继续赋值。例如闭包中的event对象，事件结束了但闭包仍在引用。
4.未知运行时错误：用innerHTML/outHTML把块元素插入到内联元素时。访问表格属性时。
5.语法错误：没分号，没花括号，<script>的src指向的是类似HTML代码的非js文件。
6.系统无法找到指定资源：js中的URL超过2083个字符。游览器的URL超过2048个字符。
####第20章 JSON
语法：
1.json可使用js用的值，但不支持undefined;也不支持变量、函数、实例。
2.json的字符串必须双引号。
3.js对象的属性加引号也正确。json属性或数组都不需要声明。
4.json不加分号
5.json数组和js写法一样。{"a":["b",3]}
数据保存在对象里，比保存带DOM特性上取值时方便多了。
解析JSON:IE7的ES3使用eval()解析，有shim库JSON-js解决安全问题。
IE8+用全局对象
`JSON.stringify()`：把js对象序列化为json。格式紧密没有空格和缩进，函数和原型和值为undefined的属性都会忽略。2参过滤器：json只会保存过滤数组内指定的字符串属性，而过滤函数有2个参数；
```
var book={"title":"a","authors":["a c z"],edition:3,year:2011};
var jsonText = JSON.stringify(book,function(key,value){ //过滤器的函数形式，数组形式为["title","edition"],不过滤为null。
	switch(key){ //键值互相对应
		case "authors":
			return value.join(",") //数组变字符串
		case "year":
			return 5000;		//修改值
		case "edition":
			return undefined;   //JSON识别不出故删除该键值对。如果他是次级对象则值会null。
		default:
			return value;}}); //其他属性都用原来值
```
3参为缩进，数字形式为每级别缩进n格(最大为10)，字符串形式则变成缩进符。
序列化顺序：1.如果对象内部有名为`toJSON()`的方法，会直接调用该方法。2.有过滤器的传参是从toJSON()返的值来的，该方法的就按上面的来。3.有3参的执行格式化。
`JSON.parse()`：把json解析成js。
```
var book = {"title":"a","authors":["a c z"],edition:3,year:2011,releaseDate:new Date(2011,11,1)}; //这是js对象
var jsonText = JSON.stringify(book); //对象转json的时候Date对象变成字符串了。
var bookCopy = JSON.parse(jsonText,function(key,value){
	if (key == "releaseDate"){
		return new Date(value); //还原函数里新建了对象，不这样做Date对象永远是字符串
	} else {
		return value; //其他不还原，原来值。
	}}) //所以如果json中有方法的话，需要在解析的时候把方法对象还原。
```
####第21章 Ajax与Comet
new HMLHttpRequest(); IE7+
1.启动请求准备发送：xhr.open("get","xx.php",false)  准备发送还没发送。xx是当前路径可使用绝对路径。false同步。
2.发送：xhr.send(null) 参数为发送数据。
3.判断HTTP状态： (xhr.status >= 200 && xhr.status < 300) || xhr.status ==304 
当前活动阶段：readyState值每变化一次都会触发readystatechange事件。0-还没open(),1-已open()没send(),2-已send()没响应。3-收到部分响应.4-完成。
4.监听活动阶段。xhr.onreadystatechange=function(){if(xhr.readyState==4)}  这里用this不兼容
取消异步请求：xhr.abort() 之后会停止事件禁用属性，之后应该xhr=null;
设置自定义请求头部字段：`xhr.setRequestHeader`("tou","value")    需在open之后send之前调用。少重写默认头。
获取响应头字段：getResponseHeader("tou") 获取完整响应头：getAllResponseHeaders()
GET请求：名称和值经常有格式问题，需要encodeURIComponent()转码。如果有参数的话，open之前先处理下url。
模仿表单发送：open之后setRequestHeader("Content-Type","application/x-www-form-urlencoded")。这么设置头的好处是数据会进入$_POST超全局变量内。
表单序列化：`new FormData`(form_div) 序列化之后可直接传给send()发送，不需要设置请求头。IE不支持。data.append("name","value")
超时事件：`xhr.timeout`=1000; xhr.ontimeout=function(){} 1秒后终止响应,仅IE8+,终止时可能readystatechange正在执行，访问status会抛错，需把该属性try-catch拦截。
修改响应MIME类型：overrideMimeType()
接收响应时会持续触发onprogress事件，event有3个属性：lengthComputable进度信息是否可用、position已接收的字节、totalSize预期字节。利用这3个属性可创建进度条。
**跨域**
CORS: IE8 设置自定义请求头Origin:http://www.nczonline.net 返回匹配响应头Access-Control-Allow-Origin:http://www.nczonline.net 头部不匹配时服务器驳回请求。不含cookie。
XDR对象：XDR和xhr的区别：不会收发cookie,只能设置请求头的Content-Type,不能访问响应头和状态码，只支持GET/POST,只能异步。其它xhr支持的xdr也支持。
`new XDomainRequest`(); IE8+独有。       xdr.onload->xdr.open("get","url")仅有2参->xdr.send(null)
xdr.onerror= 如果没有Access-Control-Allow-Origin响应头会触发错误事件
设置请求头：`xdr.contentType`="application/x-www-form-urlencoded"
其它游览器的XHR原生支持CORS跨域：xhr.open("get","http://www.some.com/page/",true); URL路径使用绝对路径即可。与XDR不同的是可以访问status和statusText属性也支持同步。相同的是：setRequestHeader失效，没有cookie,访问响应头返空字符。注意写法：跨域时用绝对，本地用相对路径，以免混淆。
Preflight请求：支持自定义头，各种文档格式，各种请求方法。IE不支持。发起条件：设置了自定义头或Content-Type为application/xml 或 text/xml的POST请求。
```
Preflight请求会发送HTTP OPTIONS请求头。
请求方：
Origin:http://www.nczonline.net 
Access-Control-Request-Method:POST  //询问服务器是否支持请求方法
Access-Control-Request-Headers:NCZ  //询问服务器是否支持自定义头，逗号分隔
响应方：
Access-Control-Allow-Origin:http://www.nczonline.net  //支持该域
Access-Control-Allow-Methods:POST,GET     //支持该方法
Access-Control-Allow-Headers:NCZ       //支持该请求头
Access-Control-Max-Age:1728000   //Preflight请求缓存时间
Access-Control-Allow-Credentials: true   //支持cookie IE不支持 如果请求设置了xhr.withCredentials=true;但又没这个响应会触发错误事件/status为0/responseText为空字符串
```
检测是否支持CORS：if("withCredentials" in xhr) else if(typeof XDomainRequest != "undefined") else{xhr=null}
**其它跨域**
1.window.name保存的值，页面只要不是_blank的跳转，就会一直存在。
2.location.hash：a.html创建src为b.html的iframe->b.html创建src和a.html同域的c.html的iframe->c.html可以改变同域祖父的hash,b.html可以改变c.html的hash。
3.动态script
4.document.domain:主页和iframe页都设置一样，就可以互相操作了。
5.postMessage:必须是子域，子域调用window.postMessage('text',父url)。父域用message事件的data属性接收。a.com创建b.com域下的iframe->通过iframe向b.com传信息。
**其它跨域方法**
1.动态创建Image:设置src可单向传参，通过监听onload和onerror知道是否成功。常用于广告跟踪点击量。缺点：只能GET,无法获取响应文本数据。
2.JSONP:根据script.src的附带参数，服务器返回相应的json数据。例如callback({"name":"Nicholas"})，由回调函数和数据组成。
```
function handleResponse(response){
	alert("你的IP是"+ response.ip +",位于"+ response.city +","+ response.region_name);}
var script = document.createElement("script"); //动态创建
script.src = "http://freeg.net/json/?callback=handleResponse"; //响应数据接收完成就会调用handleResponse()
document.body.insertBefore(script,document.body.firstChild);
```
var show = function(data) { console.log(data) }这是你的回调函数
(function() { var json = { a: 1, b: 2}; show(json); })();这是服务端返回给script标签的代码
思路：通过src传参，服务器验证，服务器返回js脚本，服务端自执行函数定义保存了数据的局部变量，再调用客户端的回调函数。
缺点：不可用于不安全的域，error事件只有IE9+捕获，只支持GET。
3.Comet:服务器实时推送数据到页面。
短轮询流：页面定时发送请求。服务器立刻发送数据无论是否有效。长轮询：页面发送请求，一直保持连接直到有数据发送，发送完关闭页面又发送请求。
HTTP流：页面发送1个请求，连接不关，定时向页面推送数据。
```
function cc(url,progress,finished){
	var xhr = new XMLHttpRequest(),received=0;
	xhr.open("get",url,true);
	xhr.onreadystatechange = function(){
		var result;
		if (xhr.readyState == 3){
			result = xhr.responseText.substring(received); //只取最新数据
			received += result.length; //计数器
			progress(result); //回调函数
		} else if (xhr.readyState == 4){
			finished(xhr.responseText); //最终回调函数
		}};
	xhr.send(null);
	return xhr;
}
cc("xx.php",fuc1(),fuc2());
```
SSE:Comet的简化版。服务器响应MIME必须是text/event-stream。断开连接时可自动重连。IE不支持。适用单向读取服务器数据。
  new EventSource("xx.php")
readyState属性值为：0-正在连接，1-连接已打开，2-连接已关闭
事件：建立连接时触发open，从服务器收到新事件触发message,无法建立连接触发error。
数据：保存在message的event.data。服务器在数据前加id:前缀，如果连接断开source会发送含Last-Event-ID的请求头。
关闭连接：source.close();
Web Sockets:只能在支持Web Sockets协议的服务器上运行。url会变成ws://或wss://。
优点:能传递微量数据，适合移动设备的低网速。
  new WebSocket("绝对url.php")  //不受同源策略影响
readyState属性值为:0-正在连接，1-连接已打开，2-正在关闭连接，3-连接已关闭。
发送数据：send() 只能发送字符串，所以要参数调用JSON.stringify()
事件/数据：同上SSE，除了这还有close事件：连接关闭时触发，且有event属性：wasClean连接是否关闭，code状态码，reason服务器消息。
关闭连接：socket.close(); 调用后readyState值变2再3。
安全：
CSRF:跨站点请求伪造。也就是骗过服务器权限验证。POST/验证url来源/验证cookie都不行。
防御手段：1.SSL连接请求 2.验证码 
####第22章 高级技巧
类型检测问题：value instanceof Array；Array是window属性，如果value在别的框架返false。难以判断JSON对象是否是原生。
解决：因为数组的构造函数和全局作用域无关，所以用toString
```
function isArray(value){return Object.prototype.toString.call(value) == "[object Array]"
var isNativeJSON = window.JSON && Object.prototype.toString.call(JSON) == "[object JSON]"
```
作用域问题1：构造函数被人没用new符调用会导致this指向window。
解决：锁定调用环境。适用于多个jser在一个作用域下开发。
```
function Person(name){
	if (this instanceof Person) {this.name = name;} //检测实例是否属于构造函数
	else {return new Person(name);} //不是就返回实例
}```
问题2：另一函数cc内部用Person.call(this,2)因为Person的this不指向自己的实例所以无法获取name属性。
解决：cc.prototype = new Person();
惰性载入函数问题：游览器兼容代码执行多次。
解决：1.执行时return重写当前函数。2.加载时var自执行判断条件return函数赋值给var。3.
函数绑定问题：回调函数调用另一个对象的方法时，方法内的this指向了回调函数而非对象。
解决：1.保存this的环境 2.回调用闭包调用方法。ES5已经有bind()函数了。IE9+。适用于事件回调程序和定时器。
```
function bind(fn,context){
	return function(){return fn.apply(context,arguments);}
} //fn是context的内部方法，fn的this会指向context函数。
```
函数柯里化：柯里化的过程是分步传参，逐步缩小函数的适用范围，逐步求解的过程。高阶函数是指操作函数的函数，它接收一个或者多个函数作为参数，并返回一个新函数。此外，还依赖与闭包的特性，来保存中间过程中输入的参数。
```
function curry(fn){
	var args = Array.prototype.slice.call(arguments,1); //参数数组用slice截取除首项后面的参数。
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments); //截取全部参数
		var finalArgs = args.concat(innerArgs); //连接数组
		return fn.apply(null,finalArgs); //相当于直接调用fn(finalArgs); 担心fn不支持数组形式的参数，则用apply传入数组参数。
	}}
function add(num1,num2){return num1+num2}
var a=curry(add,5);  //传入一个函数和一个参数，args删除了add函数只保留后面的参数[5]
a(3); //[3]会进入第1个return的arguments
```
带绑定作用域的柯里化：修改curry函数，第1行改curry(fn,context),第2行的1改为2，第6行的null改为context。修改后的curry从第3个参数起才是参数。
防篡改：担心同事重写原生对象。ES5用下面的方法间接操作defineProperty-数据属性、访问属性。
不可扩展对象：Object.preventExtensions(obj)可阻止添加新属性方法，但可修改和删除已有属性。Object.isExtensible(obj)检测扩展性。
密封对象：Object.seal(obj)可阻止添加新属性方法，可阻止delete删除属性。但是已有属性值可以改。Object.isSealed(obj)检测密封性。
冻结对象：Object.freeze(obj)不可添加、删除、修改属性。Object.isFrozen()检测冻结性。设计框架常用。
高级定时器：如果代码执行时间过长，setInterval()添加下一个队列时就会跳过。setTimeout(function(){...;setTimeout(arguments.callee,i)},i)这种写法不会只有在代码运行完后才添加下一个定时器。
脚本长时间运行弹框：通常是过长、过深函数嵌套调用或长循环导致的。如果处理不要求同步，数据不要求顺序，可采用setTimeout数组分块处理。适用于时长超过50ms的函数。
```
function chunk(array,process,context){
setTimeout(function(){
	var item = array.shift() //返回并删除数组的首项
	process.call(context,item); //同步处理这个项，如果在全局作用域，可context参可不写或写null。
	if (array.length>0){setTimeout(arguments.callee,100);} //检测并异步处理下一个项
},100)} //假设每个项大概要100ms。
```
自定义事件：事件本质上是观察者模式。主体对象能独立运行，观察者能监听并注册回调函数。
```
function EventTarget(){this.handlers = {};} //事件处理程序
EventTarget.prototype = {
	constructor:EventTarget, //指向构造函数
	addHandler:function(type,handler){//注册(事件类型，回调函数)
		if(typeof this.handlers[type] == "undefined"){this.handlers[type] = [];} //没有type属性就定义数组
		this.handlers[type].push(handler); //有type就向数组push回调函数
	},
	fire:function(event){//触发(有type属性对象)
		if(!event.target){event.target = this;} //设置target属性，如果没有目标元素就定义调用者为目标
		if(this.handlers[event.type] instanceof Array){ //如果event.type属性是数组的话
			var handlers = this.handlers[event.type];   //把该属性保存
			for(var i=0,len=handlers.length;i<len;i++){
				handlers[i](event); //之前注册push的回调函数传入event对象
			}
		}
	},
	removeHandler:function(type,handler){//注销
		if(this.handlers[type] instanceof Array){  //同上区别：检测的是type属性
			var handlers = this.handlers[type];
			for(var i=0,len=handlers.length;i<len;i++){
				if(handlers[i] === handler){break;} //如果type属性某项等于回调函数就退出保存索引i
			}
			handlers.splice(i,1); //删除type的回调函数
		}
	}
};
```
使用方法：
```
function handle(event){console.log(event.message);} //回调
var target=new EventTarget();
target.addHandler("message",handle)
target.fire({type:"message",message:"hello"}); //对象必有type属性
target.removeHandler("message",handle);
```
继承：
```
function Person(name,age){
	EventTarget.call(this);
	this.name = name;
	this.age = age;
}
Person的原型=EventTarget；
Person.prototype.say = function(message){
	this.fire({type:"message",message:message}); //调用say就相当于触发message事件。
}
```
适用于：
判断类名存在：if(div.className.indexOf("class")>-1)
单例对象用模块封装事件：P621
```
var dragdrop=function(){
	var dragging = null; //声明目标元素
	function handleEvnt(event){}; //声明事件
	return { 						返回对象
		enable:function(){}, //enable方法是注册事件
		disable:function(){} //删除事件
	}
}();
```
####第23章：离线应用和客户端存储
所有本地缓存方式都是不加密的。
检测是否联网:navigator.onLine
事件：离线变在线 online 。 在线变离线 offline
1.应用缓存：用描述文件写要离线使用的资源。IE不支持
描述文件和页面关联：<html manifest="/offline.appcache"> 该文件MIME类型：text/cache-manifest。
applicationCache对象:status属性：0无缓存，1缓存未更新，2正下载描述文件并更新，3正下载指定资源，4缓存已更新，5描述文件不存在无法使用缓存。
事件：7种。
app.update() 检查描述文件是否更新，肯呢个触发cached或updateready。 app.swapCache()启用新缓存
2.Cookie原理：服务器首先对任意请求响应Set-Cookie:name=value,之后所有请求都会有Cookie:name=value。
限制：cookie是和域名绑定的。IE6每个域名最多20个cookie,IE7火狐50个,苹果谷歌无限制，超过会删除旧cookie。一个域名的cookie最大4095B。
组成：名字-不分大小写，必须URL编码。值-字符串必须URL编码。域-子域名也有效。路径-域名的后面，可设置除了该路径其他路径不能发送cookie。失效时间-默认会话结束时，可设置GMT时间。安全标志-设置后，cookie只能用SSL连接https发送。以上，分号空格隔开，在Set-Cookie。请求时发送的只有name=value。
expires=new Date()   expires.setTime(expires.getTime() - 1000);
设置：`document.cookie=encodeURIComponent("name")+"="+encodeURIComponent("value")+"; expires="+expires.toGMTString()+"; path="+path+"; domain="+domain+"; secure"` 返回名值对。 被赋值时不会覆盖而是添加。
获取：document.cookie.substring(name索引,document.cookie.indexOf(";",name索引))。 用decodeURIComponent()解码name和value。
没有删除cookie的直接方法，是通过设置同名name有效时间到过去删除的。
子cookie格式：name=n1=v1&n2=v2&n3=v3; 可绕开cookie数量限制。 获取它用split('&'),再循环split('=')即可。
3.IE用户数据：
限制：每个文档最多128K,每个域最多1MB。必须同域/同路径/同协议。不可多人共享。好处是不会过期。
首先设置div样式： style="behavior:url(#default#userData)"
```
div.setAttribute("name","Nicholas"); //存储数据
div.save("book");  //保存到名为book的数据空间
几天后..
div.load("book");  //载入数据
div.getAttribute("name");
div.removeAttribute("name");//删除数据，只能这样才释放空间
```
4.Web Storage：解决了cookie持续回发数据至服务器的问题，可存储跨会话，大量数据。
两种对象：sessionStorage和globalStorage。 IE8+
方法：clear()删除全部，getItem(name)获取值，key(index)获取值,removeItem(name)删除值，setItem(name,value)设置名值对。
属性：length 名值对数量。 IE8属性：remainingSpace 剩余存储空间大小
sessionStorage：对象在会话关闭消失，但数据可跨越刷新，甚至崩溃重启(IE不行)。存储读取可用setItem/getItem也可用点号。是Storage类型的实例。谷歌苹果IOS安卓最大2.5MB，IE8+Op最大5MB。
写入方式：IE为异步，火狐谷歌为同步。IE要好点。
IE8的强制写入：写入前调用begin()，写入后调用commit()。前者是暂停其它写入，后者是强制写入。适用于存储大量数据时。
globalStorage：适合跨会话存储。适合长期保存用户偏好。只要用户不清除缓存。
```
存储：globalStorage["wrox.com"].name="Nicholas";  //需指定域名，[""]这种形式会导致所有人都能访问。["net"]会导致所有.net的域名都可访问。
获取：var name = globalStorage["wrox.com"].name;
```
同源：不同协议/端口是不能访问的。不确定域名的指定location.host。
localStorage:取代globalStorage。是Storage类型的实例。
限制：必须同域名，子域名不行。也遵守同源。每个来源(协议、域、端口)最大5MB,IOS安卓最大2.5MB。
兼容写法：
```
function getLocalStorage(){
	if(typeof localStorage == 'object'){
		return localStorage;
	} else if(typeof globalStorage == 'object'){
		return globalStorage[location.host];
	} else {throw new Error("LocalStorage不可用");}
}
```
事件：对对象的任何修改都触发storage事件。event属性：domain,key,newValue,oldValue。谷歌不支持？
5.IndexedDB：异步，可保存对象。同源。火狐限制50MB,谷歌5MB。但谷歌的本地文件可以访问数据库，火狐不行。
兼容：IE10加ms-前缀，火狐加moz-,谷歌加webkit-,兼容用||隔开window.indexedDB。
操作是请求方式。验证请求就把返回对象保存到变量并注册onerror/onsuccess事件。
```
var request = indexedDB.open("admin"); //传入数据库名，新建或打开。
request.onerror=function(event){ event.target指向request对象。
	event.target.errorCode}; //错误码，有11种。P644
request.onsuccess=function(event){
	database = event.target.result; }//数据库实例对象
var request = database.setVersion("1.0"); //设置版本号为1.0
request.onerror=...
request.onsuccess=function(event){
	database.version}
```　
创建对象存储空间：类似数据表。`var store = db.createObjectStore("users",{keyPath:"username"});`这里的username就是对象的属性也就是键。
store.add(obj)插入新对象 store.put(obj)更新对象
创建事务：`var transaction = db.transaction();`操作数据都是通过事务完成的。传参如为"users",只读方式加载users存储空间所有数据。可用数组传入多个存储空间。
兼容接口：`var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;` 前者是IE10+火狐4+
事务的第2个参数：IDBTransaction.READ_WRITE(可读写)/VERSION_CHANGE(可修改)/默认只读
进入存储空间：`transaction.objectStore()` get(key)取值 delete(key)删值 event.target.result.firstName取得值
创建游标：`store.openCursor(范围，方向)` 游标不会提前收集结果，只会根据命令一项项移动。event.target.result取得空间下一个对象的实例，没有为null。实例有属性：direction:游标方向,0-默认下一项，1-下一不重复项，2-上一项，IDBCursor.PREV_NO_DUPLICATE上一不重复项。key:对象的键。value：实际对象。primaryKey:游标使用的键(对象键/索引键)。cursor=event.target.result检索结果,cursor.key+JSON.stringify(cursor.value)。重写游标值：先赋值value.password再保存cursor.update(value)。删除游标项：cursor.delete()。游标移动：cursor.continue(key)/cursor.advance(项数)。
创建键范围：`var IDB = window.IDBKeyRange || window.webkitIDBKeyRange` 前者IE10+火狐。IDB.only(key)取单个键。IDB.lowerBound("007",true)游标范围从007下个对象开始至末尾，无2参从007开始。IDB.upperBound()用法同前从开头开始。IDB.bound(a,b)从a到b的范围。以上，创建后传给openCursor即可。
创建游标方向：`var IDB = window.IDBCursor || window.webkitIDBCursor;`IDB.常量，参考direction属性。
指定索引：`store.createIndex(索引名，索引属性名，{unique:false});` 3参该键不唯一 获取索引值：store.index(名)，索引对象index.get()
,主键index.getKey():它的event.result.key是索引键/event.result.value主键。获取所有索引的数组：store.indexNames。删除索引：store.deleteIndex(索引名)
并发问题：a标签页设置版本会影响b标签页。database.onversionchange=function(){database.close();} b标签页关闭数据库  用setVersion()的返回对象a标签页应注册onblocked事件：其他标签页已打开数据库会触发。
####第24章 最佳实践
大部分的工作都是维护他人代码，写好维护性代码有利于团队效率。这是爱好者和职业人的区别。
特点：可理解性、直观简单性、可适应性：数据的变化不会导致重写。可扩展性：核心功能未来可扩展。可调试性。
**可维护性**：
1.代码书写约定：风格有面向对象式、声明式、函数式。
可读性：相同的缩进方式、函数注释(用途、算法、事先假设、参数意思、返回值)、大段代码前注释功能、复杂逻辑和算法必须注释、hack注释。
命名：函数用动词(get/play)、返回布尔值函数(is开头)。不要担心长度，后期可压缩。变量用名词(表示数据类型)：o对象、s字符串、i整数、f浮点数、b布尔型。
2.松散耦合：对象引用对象，只能经常重写。
HTML和js解耦: innerHTML动态创建的大量HTML，出现布局问题难以追错。内联script。属性事件。解决：用隐藏html代替动态生成。用Ajax请求html,从js转移到后端生成。
css和js解耦: 如要修改样式可能js和css都要改。解决：js修改e.className代替e.style。
应用逻辑和事件处理程序解耦： 难以分清错误是应用逻辑还是事件。 解决：事件处理程序从事件对象提取信息传送到处理逻辑的函数。也就是把修改样式之类的逻辑代码封装成函数，事件程序里只留一个调用函数的地方。这样的好处是可以不依赖事件独立测试逻辑代码，有力于创建单元测试和自动化流程。注意：不要把event对象传出，而是event的数据。事件只处理事件，逻辑只处理逻辑。
3.实践：1.不要修改别人创建的对象，应该创建新对象搭配使用或者继承原对象才修改。2.减少全局量：把原本在全局环境下的声明都移动到某个对象中，通过调用对象属性和方法来使用，实现单一全局量，全局量内用于存放功能函数的对象叫`命名空间`，一级级分类别细分。3.不要和null比较。4.数据用常量代替，常量保存在某个对象内。实现数据和逻辑分离。适合：重复值，固定值，url，未来经常改变的值-可只关注数据不用再去分析逻辑代码。
**性能**:
作用域：window对象有几百个属性，所以全局声明的对象包括document都要缓存使用
类型速度排序：常量对快>查找数组/变量>对象属性。 解决：对象属性嵌套过深，应把前面缓存，1个点号代表1次查找。
优化循环：1.减值迭代 2.简化终止条件 3.简化循环体 4.用后测试循环 5.多次调用代替循环 6.不要解析字符串代码 7.原生方法 8.switch语句 9.位运算
优化语句数量：一条语句比多条快。1.var的逗号 2.插入迭代值：value[i++]比value[i];i++快 3.字面量比new快
优化DOM：1.最小化现场更新：文档碎片统一插入。 2.用innerHTML：它是内部创建DOM 3.事件代理 4.少调用HTMLCollection:标签名、childNodes、attributes、document.forms/images。
**部署**：
每个对象或自定义类型应存放在单独的js文件。这样可提高维护性。部署时需合并、缩短函数变量名、去掉注释、jslint、http压缩。
####第25章 新兴的API
1.重绘UI：requestAnimationFrame() 传参为动画逻辑函数
循环间隔：60Hz显示屏每秒重绘60次，1000ms/60=17ms。
时间精度：IE8计时器精度为15.625ms。IE9+谷歌是4ms。火狐苹果是10ms。甚至游览器会限制后台标签页的计时器。
CSS动画强的地方就是精确的循环间隔。raf也是如此。
moz下次重绘时间码：`var startTime = mozAnimationStartTime` 首次设置要在raf的回调之外。
ms(IE10+)/
谷歌raf：2参指定DOM元素、限制重绘区域。webkitCancelAnimationFrame()取消之前计划的重绘      
2.判断标签页是否在后台：typeof (document.hidden ||document.msHidden || document.webkitHidden) != "undefined"
document.visibilityState 
页面从隐藏到显示或反过来都会触发ms/webkit+visibilitychange事件 IE10+ 
3.定位API:navigator.geolocation对象。 IE9+
请求用户共享定位：getCurrentPosition() 1参成功回调函数，2参失败回调函数，3参选项对象
  成功回调的参数为Position对象，它有2个属性：1.coords对象：它有3个属性：latitude纬度，longitude经度，accuracy经纬度精度(米)。2.timestamp对象
  失败回调的参数的对象有2个属性：message：出错的文本信息。和code：错误类型-1拒绝共享-2位置无效-3超时
  选项对象：{enableHighAccuracy:true,timeout:5000,maximumAge:25000}使用最准确的位置，超时等待时间为5000ms,2次取坐标值时间间隔-Infinity只取1次坐标。
watchPosition()用法类似。但它多返回一个用于监控数值。返回值传给clearWatch()可取消监控。
4.文件API:IE10+ 
type="file"元素有files[n]属性:name文件名，size大小，type类型MIME。
文件异步读取：new FileReader()
方法：readAsText()纯文本读取，readAsDataURL()读取并保存到url，readAsBinaryString()读取并保存到字符串，readAsArrayBuffer()读取并保存到缓冲器 。以上都数据都保存在reader.result属性。
事件：load/error事件：错误码reader.error：-1未找到-2安全错误-3读取中断-4不可读-5编码错误。/progress：每50ms触发1次事件
读取文件思路：获得表单div->注册change事件->声明目标元素的files属性->判断如果文件tpye是image就用readAsDataURL->其它用readAsText->注册error事件输出信息和错误码->注册progress事件输出读取进度->注册load事件根据result输出。
只读取部分内容：moz/webkit+slice(start,len) 在new后面，read方法前面调用。返回对象传给read方法。适用于只读取文件头部。
对象URL：window.webkit/+URL.createObjectURL() 把file对象的数据引用在url中。解除引用：window.webkit/+URL.revokeObjectURL(url)。IE10+
从桌面拖放文件：drop事件的event.dataTransfer.files
文件上传：1.直接把数据传给send()，缺点是不在文件内。2.IE不支持
```
var droptarget = document.getElementById("droptarget");
function handleEvent(event){
    var info = "",
        output = document.getElementById("output"),
        data,xhr,files,i,len;
    EventUtil.preventDefault(event); //阻止默认
    if(event.type == "drop"){
        data = new FormData();  //关键
        files = event.dataTransfer.files; //获取拖放数据
        while(i<len){
            data.append("file" + i,files[i]); //file0是名，file[0]是数据
            i++;
        }
        xhr = new XMLHttpRequest();
        xhr.open("post","FileAPIExample06Upload.php",true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                alert(xhr.responseText);
            }
        };
        xhr.send(data); //发送
    }
}
EventUtil.addHandler(droptarget,"dragenter",handleEvent);
EventUtil.addHandler(droptarget,"dragover",handleEvent);
EventUtil.addHandler(droptarget,"drop",handleEvent);
//PHP的$_FILES接收。
```
Web性能计时API：window.performance有2个属性：1.navigation对象：重定向次数和类型 2.timing对象：各种时间戳，例如查询DNS用时，上个页面unload用时，重定向用时，连接服务器用时，请求用时，readyState到loading/interactive/complete用时，DOMContentLoaded用时，load用时。具体API查看P696。 IE10+和谷歌
Web Workers: 无阻塞运行js IE10+。
创建：new Worker("xx.js") 下载xx.js文件
运行：worker.postMessage() 参数为字符串或对象
事件：message:数据保存在event.data。 error:worker内的js只要发生错误都会触发error事件。event.filename文件名/lineno行号/message错误信息 
终止：页面调用worker.terminate() 或内部调用selef.close() 终止后台js和事件
限制：后台js无法访问DOM，无法更改样式。
作用域：this和self指向worker本身，它就是全局对象，所以和页面通信时注册message事件的是self，且该对象和页面的worker对象不是一个对象。它内部的对象是阉割版。
内部顺序加载js：importScripts("a.js","b.js")
共享worker:多标签共用，仅谷歌苹果支持
####ES6
常量：const代替var 初始化后不能修改值
块级作用域：1.let代替var for循环内部产生局部变量，循环后销毁。2.`let (a=1,b=2){alert(a+b)}` ab变量作用域仅限let语句内。3.`var c=let前面`
剩余参数：取消arguments对象。`function sum(a1,a2,...an){}` 三点+标识符。an表示参数数组可被引用。
分布参数：`sum(...[1,2,3])`调用时可传数组形式的参数了：三点+数组。类似sum.apply(this,[1,2,3])
默认参数：`function sum(a1,a2=0){}` 调用时如果没有传入第2个参数则使用默认值
生成器：循环内yield代替return 每次循环都返回一个生成器。 生成器每调用一次next()输出下次循环的返回值，最后一次调用会抛出StopIteration错误,用try-catch的finally执行剩余语句。调用close()会退出yield语句执行其它语句。
迭代器：`new Iterator(obj)` 实例每次调用next()返回1个数组["属性"，"值"]。没有下一项也会抛错。迭代数组的话每次返回["索引"，"值"]。如果传入2参true，就只返回索引。如要迭代自定义类型需先定义方法__iterator__()，它返回包含next()方法的对象。
数组领悟：`array = [value for each (variable in values) condition]` 依次循环旧数组values->执行过滤条件condition->计算数组过滤值value->所有结果赋值给新数组。仅火狐支持，要使用这个功能需script的type属性值为"application/javascript;version=1.7"
解构赋值：把数组的值分别赋值给变量；
```
var [a,b] = ["1","2"] //相当于var a="1",b="2"
var [,b]] = ["1","2"] //相当于var b="2"
[b,a] = [a,b]  //a b变量互换值
var p ={name:"chen",age:"25"};
var {name:a,age:b} = p;  //相当于var a="chen",b="25"
var {age:b} = p; //相当于var b = "25"
//总结：[]方括号形式可把数组值赋值变量，{}花括号形式可把对象属性值赋值给变量。
```
代理对象：想让别人只使用该对象的部分方法，其它方法不公开，可以创建代理对象。`Proxy.create(obj)` obj有7种基本捕捉器方法和6种派生捕捉器方法。
代理函数：同上，`Proxy.createFunction(obj,function(){},function(){})` 2参是调用自身的捕捉器函数，3参是调用构造函数的捕捉器函数。
映射：`new Map()` map.set(name,value)用来保存数据。get(name)获取数据。delete(name)删除。has(name)判断数据是否存在。
集合：`new Set()` 只有键没有值。set.add(name)添加键。也有has()、delete().
WeakMap:`new WeakMap()` 键必须是对象，如果对象被解除引用将自动从它里面删除。map.set(obj,value)把对象添加进该结构。
结构类型：`var Size = new StructType({width:uint32,height:uint32});`Size的2个属性都应该保存无符号32位整数。而且该结构类型还能当构造函数用，但是必须传值`var boxSize = new Size({width:80,height:60});`
数组类型：`new ArrayType()` 可限制数组值的类型
类：它只是一种语法糖
```
class p{
    constructor(name,age){ //相当于构造函数
        public name = name; //实例属性相当于构造函数的this.name=name;
        private age = age;  //私有属性
        get a(){return b}
        set a(value){b = value} //相当于getter和setter
    }
    sayName(){alert(this.name);} //类下定义的属性方法都在构造函数p的原型上。
}
```
继承:`class e extends p` e类继承p类。 `class e prototype b` b对象是e类的原型
模块：模块内的变量函数类都是默认私有的不会污染全局对象。公开用export。导入用import。
```
module mymodule{
    export let obj={}; //公开属性
    export function hello(){alert("hello")} //公开方法，可被外部环境或模块调用
}
import obj from mymodule; //导入obj
import * from mymodule; //导入所有公开成员
import {obj,hello} from mymodule; //导入的好处是把模块成员拿到当前环境，不必引入整个模块
mymodule.hello; //不导入直接调用模块公开方法
module mymodule from "xx.js" //下载xx.js并加载mymodule模块
import obj from "xx.js" //下载xx.js只加载公开方法
```
####严格模式
IE10+
"use strice";   放在全局作用域中，整个脚本都将执行严格模式。
1.必须声明变量。
2.delete不能对变量使用。
3.不能用保留字命名。
对象：
4.不能给只读属性赋值。
5.delete不能对不可配置属性操作。
6.不能对不可扩展对象添加属性。
7.对象内属性不可重名。
函数：
8.形参不可相同。
9.arguments成员和形参独立。
10.不能访问argument.callee和argument.caller。
11.声明函数只能在全局作用域或函数内部，不能在if内。
12.eval内部的变量会在eval结束后销毁，不再创建。
13.eval和arguments不能声明，不能被重写，不能++，不能用来命名，不能用于try-catch例外名。
14.this值null和udf不再转换为全局对象。
15.删除with句和八进制字面量，所以parseInt()解析八进制会当做十进制。
####库
通用
YUI：组件、按需载入
Prototype：类、继承
MooTools：精简、优化
Dojo Toolkit：按需载入
jQuery：DOM、专注业务逻辑(简洁)
MochiKit：文档完善、测试完善
Underscore.js：是对jQuery的补充
快速开发
Backbone.js：构建于Underscore.js基础上迷你MVC库、优化单页面应用
Rico：Ajax、动画、样式
qooxdoo：传统面向对象、GUI、编译器
动画库
script.aculo.us：Prototype的插件
moo.fx：Prototype和MooTools的插件、精简
Lightbox:图像浮动层特效、依赖Prototype和script.aculo.us
加密
JavaScript MD5：MD4/MD5/SHA-1安全散列函数
JavaScrypt：MD5、AES加密算法
压缩器
JSMin：基于C语言、移除空白和注释
Dojo ShrinkSafe：移除空白(不包括换行)和注释、替换局部变量
YUI Compressor：同上并换行
单元测试
JsUnit：测试后发送结果到服务器
YUI Test：可测试任何代码 模拟鼠标键盘 结果输出在页面上
DOH：
qUnit：可测jQuery 也可测js
文档生成器
JsDoc Toolkit：注释输出为自定义HTML格式 模板
YUI Doc：专属YUI、py环境、可输出属性方法
AjaxDoc：专属.NET
安全执行环境
ADsafe：
Caja：允许多脚本在同一页面安全执行
效验器
JSHint：比JSLint强
JavaScript Lint:














----------
代码区
第3章：
嵌套循环:
![break label](http://i.imgur.com/hVUum9A.png)
![continue label](http://i.imgur.com/n7KHTJY.png)
with语句：减少重复输入但影响性能，可存于变量。
```
with(document.forms[0]){  //括号替代等号左右两边都行。
        如果变量在当前和全局环境找不到，
        那就属于添加的变量对象document.forms[0]。
  name.value = "lee king";  
  address.value = "Peking";  
  zipcode.value = "10000";  
}  等价于-->
document.forms[0].name.value = "lee king";  
document.forms[0].address.value = "Peking";  
document.forms[0].zipcode.value = "10000";  
折中办法：存于变量。
var form = document.forms[0];  
form.name.value = "lee king";  
form.address.value = "Peking";  
form.zipcode.value = "10000";  
```
switch语句：省略重复条件。
```
swit.ch (i) {          //i参数
    case 25:         //替代if (i==25)
        alert("25");
        break;       //退出语句。
    case 35:         //替代else if (i==35)
        alert("35");
        break;       //没有break会继续往下执行。
    case 45:         //替代else if (i==45)
        alert("45");
        break;       //有意不加break必须加注释。
    default:         //相当于else
        alert("Other");
var num = 25;
switch (true) {      //表达式可以为布尔值
    case num < 0:    //value可以不为常量          
        alert("Less than 0.");
        break;
    case nume <= 0 && num <= 20:
        alert("Between 0 and 20.")
        break;
    default:         //每个case都会返一个布尔值
        alert("More than 20.");
```
第4章：
IE8-的循环引用：
```
var element=document.getElementById("abc");
var myObject=new Object();
myObject.element=element;//IE8的DOM是C++COM写的。
element.abc=myObject;//双方都赋值给对方的属性。
解决办法：
myObject.element=null;
element.abc=null; //赋值为null，切断引用联系。
只要用ie的DOM就要注意避免。标记清除没这个问题。
```
sort()的比较函数（升序）：降序修改1 -1。
```
function compare(value1,value2) {
    if (value1 < value2){
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}
//对于valueOf返回数字可用下面更简单的。
function compare(value1, value2){
    return value2 - value1;}
```
splice()：功能最好的操作数组方法。添加、删除。
```
var colors =["red","green","blue"];
var removed = colors.splice(0,1); //删除首项
alert(colors); //green,blue
alert(removed); //red
removed=colors.splice(1,0,"yellow","orange");
alert(colors); //green,yellow,orange,blue
alert(removed); //空
removed = colors.splice(1,1,"red","purple");
alert(colors); //green,red,purple,orange,blue
alert(removed); //yellow 删除项后值
```
正则的几个属性：
![RegExp](http://i.imgur.com/I4UN1rD.png)
return函数返回值的例子：指定比较函数去排序指定的属性。需要把属性当参数传入进比较函数。
```
function createComparisonFunction(propertyName){
  return function（object1,object2){
    var value1=object1[propertyName];
    var value2=object2[propertyName];
    if (value1 < value2){
    } else if (value1 > value2){
    } else {
      return 0;
    }
  };
}
var data=[{name:"Zachary",age:28},{name:"Nicholas",age:29}];
data.sort(createComparisonFunction("name"));
alert(data[0].name); //Nicholas
data.sort(createComparisonFunction("age"));
alert(data[0].name); //Zachary
```
this:引用的是环境对象。
```
window.color = "red";  //全局
var o = {color:"blue"};
function syColor(){
    alert(this.color);
}
sayColor();           //"red"
o.sayColor = syColor;//指针，仍是同一函数
o.sayColor();         //"blue" 
```
apply(obj,args):继承另一对象的属性方法。
call(obj,):功能同上，只是传参要一个个列出来。(obj可用函数指定的变量名。)
bind(obj):(IE9+)特点可在任意地方调用创建的函数。
foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments)==`this.foo(arg1, arg2, arg3)`
```
function sum(num1, num2){
    return num1 + num2;
} //2个函数传入参数相同哦。
function callSum1(num1, num2){
    return sum.apply(this, arguments);
} //1参是作用域，2参是数组。
function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]);
} //不一定放在返回值里，sum.apply()也可以生效。
alert(callSum1(10,10)); //20
alert(callSum2(10,10)); //20

function callSum(num1, num2){
    return sum.call(this, num1, num2);
} //传参非数组
alert(callSum(10,10)); //20```
```
window.color = "red";
var o = {color:"blue"}; //貌似只能这么定义，不懂。
function sayColor(){
    alert(this.color);
}
sayColor.call(o); //blue 继承了o对象的属性 o对象借用外部方法

var osc = sayColor.bind(o); //创建osc对象 这是个函数
osc();            //blue 该对象能随时运行。```
循环调用indexOf():
![](http://i.imgur.com/iGMZcjI.png)
replace():match模式匹配项，pos匹配项位置，originalText原始字符串。如果正则有多个捕获组，1参要化为多个：第1个捕获组匹配项，第2个...
```
function htmlEscape(text){
  return text.replace(/[<>"&]/g, function(match, pos, originalText){
    switch(match){
        case "<":    //当匹配项==<时替换。
            return "&lt;";
        case ">":
            return "&gt;";
        case "&":
            return "&amp;";
        case "\"":
            return "&quot;";
}}};}
alert(htmlEscape("<p class=\"greeting\">Hello world!</p>"));```
Math的属性：Math.E常量e的值，Math.LN2-2的自然对数，Math.LOG2E-以2为底e的对数，Math.LOG10E-以10为底e的对数，Math.PI-圆周率，Math.SQRT2-2的平凡根。
![Math方法](http://i.imgur.com/Ym2QDKC.png)
利用随机数取数组值：
```
function selectFrom(lowerValue,upperValue){
  var choices=upperValue - lowerValue + 1;
  return Math.floor(Math.random()*choices + lowerValue);}
var num = selectFrom(2,10);
alert(num); //介于2和10之间的数

var colors = ["red", "green", "blue", "yellow", "black", "purple", "brown"];
var color = colors[selectFrom(0, colors.length-1)];
alert(color); //数组中任何一个字符串```

第6章：
网上找的闭包例子：
```
function foo(x) {
    var tmp = 3;
    return function (y) { //return值是函数才是闭包
        alert(x + y + (++tmp));
    }
}
var bar = foo(2); // bar现在是一个闭包
bar(10); //16
bar(10); //17
```
```
var db = (function() {
// 创建一个隐藏的object, 这个object持有一些数据
// 从外部是不能访问这个object的
var data = {};
// 创建一个函数, 这个函数提供一些访问data的数据的方法
return function(key, val) {
    if (val === undefined) { return data[key] } // get
    else { return data[key] = val } // set
    }
// 我们可以调用这个匿名方 返回这个内部函数，它是一个闭包
})();
db('x'); // 返回 undefined
db('x', 1); // 设置data['x']为1
db('x'); // 返回 1
// 我们不可能访问data这个object本身 但是我们可以设置它的成员
```

深度遍历
```
本函数遍历div1中的li中的内容。
var div = document.getElementById("div1");
var filter = function(node) {
    return node.nodeName.toLowerCase() == "li" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
} //前者常量是应该访问li，后者是拒绝非li。
var iterator = document.createNodeIterator(div, NodeFilter.SHOW_ELEMENT, filter, false); 
var node = iterator.nextNode();//调用一次就跳一步
while (node !== null) {
    console.log(node.firstChild.nodeValue);
    node = iterator.nextNode(); //终点是null
}
```
![常量参考](http://i.imgur.com/Bk5ywqv.png)