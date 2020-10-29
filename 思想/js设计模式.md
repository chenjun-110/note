[TOC]
#### 基础--面向对象
静态类型：确定变量类型。编译时发现类型错误，且优化性能。
动态类型：只关注对象的行为，不关注对象本身。只要你有相同的方法属性就是同类。面向接口编程：某对象有push、pop方法就是栈，某对象有length、下标存取、slice、splice就是数组。意思就是只要接口能实现相同行为，就是同类。
继承：分实现继承和接口继承，一般是前者。
**多态**：给不同的对象发送同一个消息，其他对象会作出不同的反应。目的是执行代码(不变)和对象(可变)分离。类中的方法可被继承的对象执行。多态解决了大量的判断对象并执行相应行为的条件句。

```
//假设谷歌和百度有相同的show()渲染地图，那么应该将函数封装成只需要对象进入，执行都是show()。
var renderMap = function(map){
	if (map.show instanceof Function){ //判断是否拥有该方法
		map.show();  //任何人都可以调用你
}}; //这样做再增添对象也没事，可变部分都作参数吧！show不变就留在里面(就算方法名不一样也可以用适配器模式)，map变就作参数。
renderMap(google);
renderMap(baidu);
```
多态在设计模式中的应用：命令模式：解耦命令调用者和命令接收者。组合模式：忽略组合对象和叶节点对象。策略模式：分离算法和对象。
**封装**：目的是隐藏信息。
数据封装：ES6有let、Symbol创建私有属性。一般使用函数闭包创建。
细节封装：对象不关心封装对象的内部实现。只要接口不变。
类型封装：隐藏对象类型，如工厂模式，组合模式等，js不需要。
变化封装：设计模式分类：创建型模式：封装的是创建对象的变化。结构型模式：封装对象之间的组合关系。行为型模式：封装对象的行为变化。
**原型模式**：本质是克隆对象。ES5`Object.create(实例)`。ES3;

```
Object.create = Object.create || function(obj){
	vaf f = function(){}; //新建构造函数
	f.prototype = obj; //为新函数指定原型
	return new f(); //返回实例
}
```
js是个由原型或克隆搭建起来的世界。js的根对象是Object.prototype，它是个空对象。new操作背后都是先克隆它。创建没有原型的对象：Object.create(null)
问题：大部分的对象都是继承自Object.prototype，需要手动指定 A.prototype=obj;
new运算过程：P20
总结：设计模式是对语言的不足补充，不如学习更好的语言。只是js仍占主流，期待js的进化。
**this**:绑定基于执行环境，非声明环境。
this的指向：
  1.对象调用含this方法->该对象。
  2.函数调用(包括直调和间调)`get=my.get_this(); get();`->window。
  ps:回调函数声明步骤：在事件函数内部声明匿名函数并赋值-->调用变量。回调中的this一般指向window，严格模式为udf，所以要在某函数中保存this。
  3.构造函数->实例
  ps:构造函数如果显式return对象，那么this不会指向new实例。rerurn的是非对象数据，this才正常。
  4.call和apply可以动态改变this指向。
this常见问题：
  getId = document.getElementById;getId( 'div1' ); 它内部实现由this的参与，作普通函数调用会抛错。解决：用apply锁定document作用域
```
document.getElement=(function(func){
	return function(){return func.apply(document,arguments);} //锁定作用域，导入参数。
})(document.getElementById)
```
func.apply(null,[1,2,3]); //null的this指向window或null。
apply第1个参数是this指向，2参是数组。call是包装在apply上面的语法糖，1参也是this指向，只是为了表示形参和实参的对应关系。
事件函数内的回调this失调，也可用func.call(this)修复。
类数组变成数组：`[].slice.call(arguments)`，常见类数组还有HTML集合。
删除并返回首元素：[].shift.call(arguments)
合成参数：[].concat.call(args,[].slice.call(arguments))
call实现借用方法：`(function(){ Array.prototype.push.call(arguments,3); })(1,2)` 借用方法在左边，操作对象放1参。这里的对象获得了push方法，可以push属性值到对象内。对操作对象有要求：要能存取属性，lengh属性可读写(低版本游览器要显式设置该属性)。因为number类型没有length属性，func类型length属性只读，都不能做操作对象。例如:obj2.getName.call(obj1);//obj1借用了obj2的方法
call实现继承：
```
var A = function(name){this.name=name;};
var B = function(){A.apply(this,arguments);};
B.prototype.getName = function(){return this.name;};
var b = new B('sven');
b.getName();//'sven'
思路：b调用含this的原型链方法->b的构造函数把b的this锁定在a->'sven'参数就进入了
```
**闭包**：
```
var func = function(){
	var a = 1;  //利用好该环境被保存的特性
	return function(){
	a++;
	var b=1;
	b++;
	console.log(a);
	console.log("b:"+b)}};
var f=func(); //f引用函数
f(); //多次调用，a的环境被保存，b的return环境被销毁!
```
利用闭包保存环境可实现异步代码不受for循环销毁影响：
```
for （var i=0,len=nodes.length; i<len; i++){
	(function(i){
		nodes[i].onclick = function(){console.log(i);}
	})(i)   //没有闭包，i一直是最大值
}; //这里把for循环提到闭包外层，每次循环的i变量进入异步代码保留了下来。
```
闭包封装全局变量：既可以永久存在，又不污染环境。逻辑代码放return函数，全局变量放主函数。
```
var mult=(funtion(){
	var cache = {}; //原全局变量
	var calculate = function(){};  //原全局函数，如果它只在本程序复用，不在别的程序就这么封装。
	return function(){}
})()
```
闭包实现img的http请求不丢失：原来的img是局部变量，而http请求是异步的，局部img被销毁后，http自然就中断了。
```
var report = (function(){
	var imgs = [];  //不销毁 
	return function(src){
		var img = new Image(); //会销毁
		img.push(img); //保存到数组
		img.src = src; //发送http
	}
})(); //必须要自执行，不执行report的值是整个函数，执行是return函数。不执行report()的值是返回函数，执行是调用return函数。虽然值是赋上去了但是前者没有闭包环境。换句话说闭包会保存闭包内的全局函数。
```
闭包和面向对象的关系：对象方法保存过程，闭包在过程中用环境保存数据。闭包和面向对象和构造函数只是写法不同。
命令模式：把命令接收者(逻辑执行代码)保存在闭包环境，只return出接口。命令发起者(调用者)通过接口调用命令。具体的命令又另外保存在一个地方。共3个封装，1个调用。
闭包和内存：环境内的局部变量和全局变量是一回事，销毁就是Null。IE的循环引用则是把引用变量置为null。
**高阶函数**
条件：1.函数可做参数：可分离变化的业务逻辑 2.函数可做返回值
回调函数：如果函数中有格格不入的逻辑，可以把它变成函数参数传入。如此可保证余下的逻辑复用。例如ajax的callback就是只处理数据不参与请求，所以作回调函数参数。例如Array.prototype.sort()。
api:判断数据类型：toString.call(obj) 转换字符串：obj.tostring()
```
var isType = function(type){ //赋值时传参不同，调用就不同。
	return function(obj){ //直接调用返回函数
		return Object.prototype.toString.call(obj) === '[object ' +type+ ']'; //把可变的type作参数，
}}； //这样弄把原本3个函数合1了。
```
返回函数：1个return就直接调用，2个return要带参数赋值再调用变量。
AOP面向切面编程：把和业务逻辑无关的分离包括日志、安全、异常处理等。再动态织入。
```
Function.prototype.before = function( beforefn ){
	var __self = this; // 保存原函数func的引用
	return function(){ // 返回包含了原函数和新函数的"代理"函数
		beforefn.apply( this, arguments); // 执行新函数，修正 this
		return __self.apply( this, arguments );}}; // 执行原函数
Function.prototype.after = function( afterfn ){
	var __self = this;
	return function(){
		var ret = __self.apply(this, arguments); //arguments只是传递不限数量的参数，别想多了。
		afterfn.apply( this, arguments ); 
		return ret;}};
var func = function(){console.log(2);};
func = func.before(function(){console.log(1);}).after(function(){console.log(3);});
func();//1 2 3按顺序。before先执行自己的参数，再执行return的。after先执行调用者，再执行自己的参数。
```
柯里化：传入参数并不执行而是保存在闭包环境，根据调用方式(返回函数的条件句)决定是否执行。
反柯里化：不再依赖call借调，封装成通用方法,复制成有相同功能的方法，调用更方便。
```
Function.prototype.uncurrying = function () {
	var self = this; //数组原型方法
	return function() {
		var obj = Array.prototype.shift.call(arguments); //obj是arguments
		return self.apply(obj, arguments);};}; //arguments调用数组原型方法
var push = Array.prototype.push.uncurrying();  //把uncurrying的返回函数赋值。
(function(){ push(arguments,4); console.log(arguments);})(1,2,3);  //输出： [1, 2, 3, 4]

```
#### 设计模式
##### **单例模式**：

适合只出现一次的对象。调用n次，也只出现1次。登录框、全局缓存。
定义：一实例，全局可访问。重复调用返回原有实例。
代理单例：把管理单例的逻辑用代理类分离出去，和原类组合能实现单例，不组合原类能实现多例。
全局变量：`var a={}` 它就是单例模式，满足了唯一性，访问性。缺点是污染命名空间。
解决：1.命名空间：全局变量都封装在全局对象里。2.动态命名空间：。3.用闭包封装__私有变量。
惰性单例：用一个变量来标志是否创建过对象，如果是，则在下次直接返回这个已经创建好的对象。	

```
var getSingle = function(fn){ //fn传入需要单例的逻辑函数
	var result; //单例变量
	return function(){return result || (result=fn.apply(this,arguments));}
}
```
##### **策略模式**：

定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。分离算法的使用和实现。
定义解释：定义一系列的算法，把它们各自封装成策略类，算法被封装在策略类内部的方法里。在客户对 Context 发起请求的时候， Context 总是把请求委给这些策略对象中间的某一个进行计算。
貌似变量函数比声明函数适用范围广。
思路：策略类封装了具体的算法，并负责具体的计算过程。 第二个部分是环境类接受客户的请求，随后把请求委托给某一个策略类。说明环境类要维持对某个策略对象的引用。

```
//根据绩效和工资算奖金
var Bonus = function(){
this.salary = null; // 原始工资
this.strategy = null; // 绩效等级对应的策略对象
};
Bonus.prototype.setSalary = function(salary){
this.salary = salary; // 设置员工的原始工资
};
Bonus.prototype.setStrategy = function(strategy){
this.strategy = strategy; // 设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus = function(){ // 取得奖金数额
return this.strategy.calculate(this.salary); 
// 把计算奖金的操作委托给对应的策略对象,calculate就是具体算法，每个对象原型的calculate是不一样的！
};
```
反思：变化的调用者用构造函数实例封装，变化的被调用者封装在调用者对象的原型上。如此可避免条件过多和逻辑函数过多。
以上是传统面向对象版，来个Js简洁版。
```
var strategies = {
	"S": function( salary ){return salary * 4;},
	"A": function( salary ){return salary * 3;},
	"B": function( salary ){return salary * 2;}
};//把条件参数封装在属性
var calculateBonus = function( level, salary ){ //发出计算奖金的请求，根据参数返回不同结果，正是多态。
	return strategies[ level ]( salary );
};//把逻辑封装在属性值，逻辑复杂的可以用回调传参。
```
缓动函数算法：
```
var tween = { //t已消耗时间、b原位置、c终点、d总持续时间
	linear: function( t, b, c, d ){return c*t/d + b;},
	easeIn: function( t, b, c, d ){return c * ( t /= d ) * t + b;},
	strongEaseIn: function(t, b, c, d){return c * ( t /= d ) * t * t * t * t + b;},
	strongEaseOut: function(t, b, c, d){return c * ( ( t = t / d - 1) * t * t * t * t + 1 ) + b;},
	sineaseIn: function( t, b, c, d ){return c * ( t /= d) * t * t + b;},
	sineaseOut: function(t,b,c,d){return c * ( ( t = t / d - 1) * t * t + 1 ) + b;}
};
```

```
var Animate = function( dom ){
	this.dom = dom; // 进行运动的 dom 节点
	this.startTime = 0; // 动画开始时间
	this.startPos = 0; // 动画开始时， dom 节点的位置，即 dom 的初始位置
	this.endPos = 0; // 动画结束时， dom 节点的位置，即 dom 的目标位置
	this.propertyName = null; // dom 节点需要被改变的 css 属性名
	this.easing = null; // 缓动算法
	this.duration = null; // 动画持续时间
};

```
##### **代理模式**：

适用于操作前进行某种处理。
定义：当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做出一些处理之后，再把请求转交给本体对象。
小明通过B送花给A，B会监听A的心情。
保护代理：B会帮A过滤不合适的请求。实现B来控制对A的访问。适合控制不同权限的对象对目标的访问，难点在识别对象权限。
虚拟代理：假设花是很消耗性能的操作，就让B来控制是否new Flower。
单一职责原则：一个类/对象/函数应该只有一个引起变化的原因，如果原因(职责)过多会变化巨大。
图片占位图预加载：这个简单的功能之所以用2个对象，还是因为单一职责原则的解耦。如果用1个对象写，myImage就要既设置src又预加载，因为预加载这个功能可删可不删，所以实行解耦。

```
var myImage = (function(){ //本体对象
	var imgNode = document.createElement( 'img' );
	document.body.appendChild( imgNode );
	return {setSrc: function(src){imgNode.src = src;}
}})();
var proxyImage = (function(){ //虚拟代理对象
	var img = new Image;
	img.onload = function(){myImage.setSrc(this.src);} //网络图加载成功则显示
	return {
		setSrc: function(src){
			myImage.setSrc('loading.gif'); //显示占位图
			img.src = src; //网络图让隐藏图片加载
}}})();
proxyImage.setSrc('http://imgcache.qq.com/music/photo/k/000GGDys0yA0Nk.jpg');
```
接口一致：代理和本体的调用接口必须一致。1.用户无论调用哪个都要是相同的结果。2.代理本体可相互替换。
合并HTTP请求：
```
var synchronousFile = function( id ){console.log( '开始同步文件， id 为: ' + id );}; //本地对象
var checkbox = document.getElementsByTagName( 'input' );
for ( var i = 0, c; c = checkbox[ i++ ]; ){ //批量绑定点击事件
	c.onclick = function(){if ( this.checked === true ){proxySynchronousFile( this.id )
;} 
}}; //如果点击框被勾选则发送请求
var proxySynchronousFile = (function(){           //虚拟代理对象
	var cache = [], // 保存一段时间内需要同步的 ID
		timer; // 定时器
	return function( id ){
		cache.push( id );
		if ( timer ){return;} // 保证不会覆盖已经启动的定时器
		timer = setTimeout(function(){
			synchronousFile( cache.join( ',' ) ); // 2秒后向本体发送需要同步的 ID 集合
			clearTimeout( timer ); // 清空定时器
			timer = null;
			cache.length = 0; // 清空 ID 集合
		}, 2000 );
}})(); //思路：2秒内重复点击会push数组->发送的时候合并数据->清除数组->发送。 2秒外就不存在重复点击了，因为数据被发送完毕了清空数组也没事了。 定时器等待过程中所有数据都被保存到数组定时器发送时合并数组。
```
miniconsole.js惰性加载中的虚拟代理:没加载该js前，用个代理把用户输出的语句保存在全局数组，加载js后再惰性重写代理对象并调用语句。
缓存代理：存储之前的运算，如果参数相同则不用重复计算直接调结果。也可用于ajax分页数据，重点是异步数据得用回调。
```
var proxyMult = (function(){ //这里如果传个参数，就可以复用于多种运算函数了。
	var cache = {};
	return function(){
		var args = Array.prototype.join.call(arguments, ',' );
		if (args in cache){return cache[args];}  //如果传参存在于对象属性，则不计算返结果
		return cache[args] = mult.apply(this, arguments ); //mult函数是运算函数，保存结果
}})(); //该代理对象主要是判断参数是否相同，和存储旧结果。不和运算函数耦合。
```
防火墙代理：控制网络资源的访问，保护主题不让“坏人”接近。
远程代理：为一个对象在不同的地址空间提供局部代表。
智能引用代理：取代了简单的指针，它在访问对象时执行一些附加操作，比如计算一个对象被引用的次数。
写时复制代理：通常用于复制一个庞大对象的情况。写时复制代理延迟了复制的过程，当对象被真正修改时，才对它进行复制操作。

##### **迭代器模式**：

定义：顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
内部迭代：如$.each和Array.prototype.forEach。优点是方便。缺点是规则是死的。
外部迭代：例如ES6的迭代器。必须显示请求下个元素。特点：循环操作是放在外面的。
迭代类数组：只要它有length和能下表访问就能迭代。
迭代对象：for-in字面量语句。
倒序迭代器：把循环的i调成i--即可。
终止迭代器：循环中判定条件break即可。
迭代函数内的条件逻辑：

```
var iteratorUploadObj = function(){ //判断游览器，使用不同的函数
	for ( var i = 0, fn; fn = arguments[ i++ ]; ){
		var uploadObj = fn(); //每个条件执行一次
		if ( uploadObj !== false ){return uploadObj;}}}; //返回没return false的函数(最后的条件)
var uploadObj = iteratorUploadObj(条件1(), 条件2(), 条件3());
```
**发布-订阅模式**：
作用：1.异步编程中是一种替代回调函数的方案。2.通信时，A对象不用再显示调用B对象了。
手动触发DOM事件：IE:fireEvent 其它：dispatchEvent
自定义事件：指定发布者->为发布者添加用于存放回调函数和订阅者的缓存列表->发布时遍历缓存列表依次调用回调函数。
只订阅某一类型消息：订阅时把类型参数设为索引，回调设为值。发布时只执行该索引的回调。
例子：只有登录才ajax渲染登录后的界面。显示用户名、头像。
不好的做法是：登陆成功执行回调，缺点：是执行具体渲染的方法名不能被改，如果要添加的话必须翻出这段回调。导致渲染模块和登录模块耦合。观察者模式的登录模块就不需要关心渲染模块。
全局发布-订阅：通过中介，发布者发送到中介，中介发送到订阅者。订阅者可以不关心发布者是谁，只关注消息。
```
var Event = (function(){ //把Event这个名字换成别的，就知道发布者是谁了，订阅也用那个名字的对象。
	var clientList = {},listen,trigger,remove;
	listen = function( key, fn ){
		if (!clientList[key]){clientList[key] = [];} //如果找不到就是初次订阅。创建数组。
		clientList[key].push(fn);  //把回调函数添加进数组
	};
	trigger = function(){
		var key = Array.prototype.shift.call(arguments), //取出消息类型key
		    fns = clientList[key];   //取出消息类型的回调集合value
		if (!fns || fns.length === 0){return false;}  //如果没订阅消息就不触发！
		for(var i = 0,fn;fn = fns[i++];){fn.apply(this,arguments);}  //依次触发回调
	};
	remove = function(key, fn){
		var fns = clientList[key];
		if (!fns){return false;}  //如果没被订阅就取消操作
		if (!fn){fns && (fns.length = 0); //如果操作时没传具体回调，就删除所有回调。
		}else{
			for (var l = fns.length - 1;l >=0;l--){ 
				var _fn = fns[l];
				if (_fn === fn){fns.splice(l, 1);} //如果搜索到的回调和传参回调相同，就删除key对应的具体回调
}}};
	return {
		listen: listen,
		trigger: trigger,
		remove: remove
	}
})();
Event.listen('squareMeter88', function(price){ // 小红订阅消息
	console.log('价格= ' + price); });         // 输出： '价格=200'
Event.trigger('squareMeter88', 2000); // 售楼处发布指定类型的消息,这个2000传到了trigger的fn.apply(this,arguments）内。
```
上面这个对象可用于模块间的通信。缺点是：无从得知发布者是哪个模块。
离线消息：ajax发布消息时，如果监听部分没加载好也就没注册事件，应该把消息缓存，注册时发送给它(只能1次)。
消息名冲突：全局事件的消息种类过多，可能注册时会命名冲突，可以内部加命名空间方法，该方法内部也有注册删除触发等方法。
观察者缺点：过度使用会难以跟踪bug。有些事件一直不发生，则纯属浪费。

##### 命令模式：

发出请求后不关心接收者是谁和背后的处理。适用于菜单有n多子菜单功能，可以让每个功能单独派人开发。
例子：如果某程序员只负责绘制很多按钮，触发程序由别人写。如何绑定onclick事件？
解一：传统面向对象写法。理解思路即可。

```
var setCommand = function(button,command){
	button.onclick = funtion(){command.execute();}
};       //command是负责执行的实例，execute是实例原型上调用命令的方法。
var refreshcommand=function(r){this.r=r;}; //构造
var command = new refreshcommand(obj); //实例-obj有refresh()
refreshcommand.prototype.execute=function(){this.r.refresh()}; //原型
```
解二：
```
修改上面，不使用new，用闭包代替构造函数。
var refreshcommand = function(r){
	return {execute:function(){r.refresh();}}}//没绑原型
var command = refreshcommand(obj);
```
把一个动画的所有操作都封装在同一对象，方便把要用的值保存属性。
撤销：canvas难以悔棋，可以保存之前的命令到列表中，清除画布重新绘制(循环列表)。
队列：一个动画结束后可以通过：回调函数、发布-订阅模式来执行下一个动画。
宏命令：一组命令的集合。把命令push至数组，循环执行。把多个命令都保存在多个同名方法下，循环调用只需传对象即可。
傻瓜命令：命令不传参，无论谁调用都执行。	

##### 组合模式：

类似宏命令，组合对象包括一组叶对象。它只负责请求，不负责控制访问。
多态：难点在保证有同名方法。适用于不想用条件分别判断对象的情况。
优点：减少代码量。缺点：可读性差。
如果组合对象包含子叶对象和子组合对象。如果误给叶对象add需要设置抛错。
例子：扫描文件夹

```js
var Folder = function(name){ //文件夹
	this.name = name;
	this.files = [];  };
Folder.prototype.add = function(file){this.files.push(file);}; //add进队列
Folder.prototype.scan = function(){                //扫描整个文件夹
	console.log( '开始扫描文件夹: ' + this.name );
	for ( var i = 0, file, files = this.files; file = files[i++];){
		file.scan();
    }};   //依次执行队列
var File = function(name){this.name = name;};  //文件
File.prototype.add = function(){throw new Error('文件下面不能再添加文件');};
File.prototype.scan = function(){console.log('开始扫描文件: ' + this.name);};  //扫描单个文件

var folder = new Folder('学习资料');
var file1 = new File('JavaScript 设计模式与开发实践');
folder.add(file1);
folder.scan();
```
组合对象：不是父子关系，是聚合关系。对叶对象执行的方法要一致。不适用双向映射关系(执行多次)。适合职责链模式。

##### 模板方法模式：

泛化思想：子类实现中的相同部分被上移到父类中，而将不同的部分留待子类来实现。
例子：泡咖啡：煮水->水冲咖啡->倒咖啡->加糖、牛奶。泡茶：煮水->水冲茶叶->倒茶->加柠檬。 
提炼抽象父类：煮水->水冲饮料->倒饮料->加调料。 子类继承抽象父类。

```
var Beverage = function(){};
Beverage.prototype.boilWater = function(){console.log( '把水煮沸' );};
Beverage.prototype.brew = function(){}; // 空方法，应该由子类重写
Beverage.prototype.pourInCup = function(){}; // 空方法，应该由子类重写
Beverage.prototype.addCondiments = function(){}; // 空方法，应该由子类重写
Beverage.prototype.init = function(){  //它就是模板方法！因为：1、指定了执行顺序。2.指定了算法框架。
	this.boilWater();
	this.brew();
	this.pourInCup();
	this.addCondiments();
	if(this.hook()){this.Hook()};  //钩子方法：子类控制模板步骤的手段。
};
var Coffee = function(){};
Coffee.prototype = new Beverage(); //接下来重写方法即可。再调用init()。
```
抽象类：没有子类的抽象类是无意义的。所以它不能被实例化。
问题：如果定义子类忘记重写某一个方法，调用init()会有问题。
解决：1.把抽象类的空方法改成默认抛错，逼你重写。Beverage.prototype.brew=function(){throw new Error('子类必须重写 brew 方法');};
2.模拟接口检查。
适用：1.架构师搭建项目框架。2.构建UI组件：步骤：1.初始化div->2.ajax->3.数据渲染到div->4通知用户渲染成功。像这种有顺序的行为都可以抽象到父类模板里，父类甚至可以写完1和4，子类只重写2和3。
好莱坞原则：公司(父类)打电话给求职者(子类)。模板方法模式、发布订阅模式、回调函数都是子类没有对自己的控制权。
js版模板方法：

```
var Beverage = function( param ){
	var boilWater = function(){console.log( '把水煮沸' );};
	var brew = param.brew || function(){throw new Error( '必须传递 brew 方法' );};
//只要传入对象有brew方法即可视为重写
var F = function(){};
	F.prototype.init = function(){
		boilWater();
		brew();
		pourInCup();
		addCondiments();};
	return F;};
var Coffee = Beverage({brew: function(){console.log( '用沸水冲泡咖啡' );}}); 
var coffee = new Coffee();
coffee.init();  //不用继承一样能向下控制顺序和算法框架.除了这种,还有高阶函数可实现.
```
##### 享元模式--没看懂

解决了大量对象占内存。尤其是循环new对象时，要考虑下。
内部状态：可以被对象们共享的属性。储存在对象内部。不依赖于具体场景且通常不变。有几个状态就有几个对象。
外部状态则相反，取决于具体情况。
难点在如何区分内部状态和外部状态。剥离它们，把外部状态放在对象外面。
对象池：需要使用对象时，如果对象池里没有空闲对象，则创建一个新的对象，有就从池内取。可以最小化创建DOM对象。

```
var toolTipFactory = (function(){
	var toolTipPool = []; // toolTip 对象池
	return {
		create: function(){
			if ( toolTipPool.length === 0 ){ // 如果对象池为空
				var div = document.createElement( 'div' ); // 创建一个 dom
				document.body.appendChild( div );
				return div;
			}else{ // 如果对象池里不为空
				return toolTipPool.shift(); // 则从对象池中取出一个 dom
	}},
	recover: function(tooltipDom){return toolTipPool.push(tooltipDom);} // 对象池回收 dom
	}})();
```
通用对象池：适用于频繁生成DOM/对象。
```
var objectPoolFactory = function( createObjFn ){ //创建对象的函数-传入。
	var objectPool = [];
	return {
		create: function(){
			var obj = objectPool.length === 0 ?
			createObjFn.apply( this, arguments ) : objectPool.shift();
			return obj;},
		recover: function( obj ){objectPool.push( obj );}}};
```
动态创建iframe的对象池：
```
var iframeFactory = objectPoolFactory( function(){
	var iframe = document.createElement( 'iframe' );
		document.body.appendChild( iframe );
	iframe.onload = function(){
		iframe.onload = null; // 防止 iframe 重复加载的 bug
		iframeFactory.recover( iframe ); // iframe 加载完成之后回收节点
	}
	return iframe;
});
var iframe1 = iframeFactory.create();
iframe1.src = 'http:// baidu.com';
var iframe2 = iframeFactory.create();
iframe2.src = 'http:// QQ.com';
setTimeout(function(){
	var iframe3 = iframeFactory.create();
	iframe3.src = 'http:// 163.com';
}, 3000 );
```
##### 职责链模式：

可用于判断兼容性，处理条件、管理顺序队列。
定义：使多个对象都有机会处理请求，解耦请求的发送者和接收者，将这些对象连成一条链，并沿着这条链传递该请求，直到有对象处理它为止。
缺点：过长的职责链消耗性能。链尾必须有出口。
例子：如果有个3层的嵌套条件orderType、pay、stock。每个条件至少2到3个值，根据条件的不同输出不同结果，势必代码臃肿。
解决：1.初级办法：把orderType条件的3个值封装成3个函数，内部在判断其它2个条件，不满足就调用其它函数。缺点是要添加新结果只能重写3个函数内部。2.用职责链节点：便于添加新传递节点。同步传递。

```
var Chain = function(fn){ //职责链节点
	this.fn = fn;
	this.obj = null;
};
Chain.prototype.setNext = function(obj){return this.obj = obj;}; //设置传递节点
Chain.prototype.pass = function(){
	var ret = this.fn.apply(this,arguments);
	if (ret === 'next'){return this.obj && this.obj.pass.apply(this.obj, arguments);} //&&，1假返1，1真返2。
	return ret;};  //return出‘next’就表示没满足条件跳到下个函数。
 //。。。此处省略new操作
chainOrder500.setNext( chainOrder200 ); //参数就是要传递的下一个函数。
chainOrder200.setNext( chainOrderlast ); 
chainOrder500.pass(1,true,500); //从第1个函数开始传递。修改调用者可手动指定链传递的开始位置。
```
3.异步职责链：setTimeout调用前面的return &&。
4.AOP形式职责链：
```
Function.prototype.after = function(fn){
	var self = this;
	return function(){
		var ret = self.apply(this, arguments); //调用自己 
		if (ret === 'next'){return fn.apply(this, arguments);} //调用下一个
		return ret;  }};
var order = order500yuan.after( order200yuan ).after( orderlast ); //设置
order( 1, true, 500 );
```
作用域链、原型链、事件冒泡都可以用这个做。

##### 中介者模式

问题：对象和几十个对象有引用关系时，面向对象反而会降低可复用性。改一个对象要照顾到所有它通知的其它对象。
解决：所有对象只引用中介者对象。将关系多对多转换为一对多。
例子：没有指挥塔，飞机需要和所有飞机通信。
各个对象都只调用中介对象。中介对象再内部自己识别。
难点：中介者对象通常很巨大。虽解耦了它人但难以维护的反而是自身。所以不要过度设计，真正出现对象维护困难再采用它。

##### 装饰者模式:

用于讲究顺序或增加新功能
定义：不改变对象，在程序运行时为对象添加功能。
继承的缺点：超类和子类的强耦合。
实现：把待扩展的对象存在新对象的属性里。新对象就可以调用旧对象的一切了。没有继承关系且形成请求链(包装链)，是聚合对象。新对象的同名方法调用旧对象的同名方法再扩展，使客户不用担心修改继承可能会影响子类的问题。

```
var plane = {fire: function(){console.log( '发射普通子弹' );}}
var a = function(){};
var b = function(){};
var fire1 = plane.fire;  //保存最初的fire
plane.fire = function(){fire1();a();}
var fire2 = plane.fire;  //保存被包装过1次的fire
plane.fire = function(){fire2();b();}
plane.fire();
```
解决函数覆盖的问题：担心会覆盖或重写别人写的window.onload。
```
window.onload = function(){alert(1);}
var _onload = window.onload || function(){};  //保存原函数的引用
window.onload = funtion(){
	_onload();   //在临摹这种写法时需注意this指向。
	alert(2);};
```
前面AOP函数作用和这差不多。修改before的函数内部条件判断首个return可阻止其它return，可实现只有返回值满足条件才继续执行请求链。
开发框架的时候，个性化功能应使用装饰链，可避免框架条件预测客户需求过多。

##### 状态模式

如果状态值只有2个，直接用if-else。但是有很多个呢？
把每个状态都封装成类。并把请求委托给状态对象。
定义：允许一个对象在其内部状态改变时改变它的行为。

```js
var Light = function(){
	this.offLightState = new OffLightState(this); // 持有初始状态对象的引用 
	this.weakLightState = new WeakLightState(this);   //状态2
	this.strongLightState = new StrongLightState(this);  //状态3
	this.superStrongLightState = new SuperStrongLightState(this); //状态4
	this.button = null;
};
Light.prototype.setState = function(newState){this.currState = newState;};
OffLightState.prototype.buttonWasPressed = function(){  //必须有的方法
	console.log( '弱光' );   //输出效果
	this.light.setState( this.light.weakLightState ); };//切换下一个状态
Light.prototype.init = function(){  //初始化创建按钮
	var button = document.createElement('button'),self = this;
	this.button = document.body.appendChild(button);
	this.button.innerHTML = '开关';
	this.currState = this.offLightState; // 设置默认初始状态
	this.button.onclick = function(){self.currState.buttonWasPressed();} // 定义用户的请求动作
};
var OffLightState = function(light){this.light = light;};  //状态对象
var light = new Light();
light.init();
```
思路：把每个状态对象赋值到属性->点击按钮就切换状态对象(如何切换？调用1个所有状态都有的同名方法，把新状态赋值到currState)
优点：状态过多会让对象巨大，把状态逻辑分离出去。添加状态方便。缺点：可读性差，逻辑分散。
优化：如果状态改变很频繁，就一开始创建好所有状态对象。如果不频繁，则需要的时候再创建。
js版状态机：

```js
var Light = function(){
	this.currState = FSM.off; // 设置当前状态
	this.button = null;  };   // 按钮
Light.prototype.init = function(){
	var button = document.createElement( 'button' ),
	  self = this;
	button.innerHTML = '已关灯';
	this.button = document.body.appendChild( button );
	this.button.onclick = function(){
		self.currState.buttonWasPressed.call( self ); // 把请求委托给 FSM 状态机
	}};
var FSM = {
	off: {
		buttonWasPressed: function(){
			console.log( '关灯' );
			this.button.innerHTML = '下一次按我是开灯';
			this.currState = FSM.on;}},
	on: {
		buttonWasPressed: function(){
			console.log( '开灯' );
			this.button.innerHTML = '下一次按我是关灯';
			this.currState = FSM.off;}}};
var light = new Light();
light.init();
```
##### 适配器模式

定义：解决两个软件实体间的接口不兼容的问题。
实现：1.第一种是修改原来的接口源码。2.适配器把原接口转换成标准接口。

#### 设计原则

1.单一职责原则：对象的变化、方法的变化、应只有一个影响的因素。一个对象/方法只做一件事。
注意：如果影响的因素总是同时变化，则不需要分离。
优点：更小颗粒有利于单元测试和复用。
缺点：难写，增强了对象之间的联系。
2.最少知识原则：最小化对象之间的联系。
例如外观模式
缺点：可能会出现庞大的第三者对象。
3.**开放封闭原则**：类、函数应该是可扩展的，但不能被修改。所有设计都是朝这个方向。不修改旧代码是比较稳定的。
例如装饰者模式、AOP。
多态性：如果看到大量的if-else或switch-case就得思考如何用多态重构它们。
放置挂钩、使用回调、
接受第一次愚弄：最初编写代码的时候，先假设变化永远不会发生，这有利于我们迅速完成需求。当变化发生并且对我们接下来的工作造成影响的时候，再回过头来封装这些变化的地方。然后确保我们不会掉进同一个坑里。
4.接口：是对象能响应的请求的集合。
面向接口编程：传统是面向超类编程、面向抽象编程(抽象类/模板方法模式)。因为js的动态类型，一般需要对接口传参进行类型检测。js不需要依靠超类
利用鸭子类型检测接口：

```
var isArray = function( obj ){
	return obj &&
		typeof obj === 'object' &&  //检测对象
		typeof obj.length === 'number' &&  //再检测长度
		typeof obj.splice === 'function'  //最后检测方法
};
```
##### 重构

函数：如果函数需要加很多注释、过长。说明要重构。
提炼函数：把逻辑封装成新函数，命名要好。
合并条件内的重复：把重复的放在条件外部最后，反正是要执行的。
提炼条件：如果条件判断可读性差、又长。把它重构成函数，取个好名字。
循环合并条件：

```
var createXHR = function(){
	var xhr;
	try{xhr = new ActiveXObject( 'MSXML2.XMLHttp.6.0' );
	}catch(e){try{xhr = new ActiveXObject( 'MSXML2.XMLHttp.3.0' );}catch(e){xhr = new ActiveXObject( 'MSXML2.XMLHttp' );}}
	return xhr;};
var xhr = createXHR();
//修改如下
var createXHR = function(){
	var versions= [ 'MSXML2.XMLHttp.6.0ddd', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp' ];
	for ( var i = 0, version; version = versions[ i++ ]; ){
		try{return new ActiveXObject( version );}catch(e){}   }};
var xhr = createXHR();
```
提前退出条件：嵌套条件一般要看完整个条件，可读性差。用单行if判断不满足的直接return。不用读下面的语句了。一行行读条件比嵌套好。
参数对象：代替过长参数
```
原
var setUserInfo = function( id, name, address, sex, mobile, qq ){
	console.log( 'id= ' + id );
	console.log( 'name= ' +name );
	console.log( 'address= ' + address );
	console.log( 'sex= ' + sex );
	console.log( 'mobile= ' + mobile );
	console.log( 'qq= ' + qq );
};
setUserInfo( 1314, 'sven', 'shenzhen', 'male', '137********', 377876679 );
改
var setUserInfo = function( obj ){
	console.log( 'id= ' + obj.id );
	console.log( 'name= ' + obj.name );
	console.log( 'address= ' + obj.address );
	console.log( 'sex= ' + obj.sex );
	console.log( 'mobile= ' + obj.mobile );
	console.log( 'qq= ' + obj.qq );
};
setUserInfo({
	id: 1314,
	name: 'sven',
	address: 'shenzhen',
	sex: 'male',
	mobile: '137********',
	qq: 377876679
});
```
减少参数：如果参数是可以计算出的，就不要传了。
少用三目：简单的用三目，长逻辑用if可读性好些。
链式调用：方法调用结束返回对象本身。 缺点：调试困难。
```
var User = function(){
	this.id = null;
	this.name = null;
};
User.prototype.setId = function( id ){
	this.id = id;
	return this;
};
User.prototype.setName = function( name ){
	this.name = name;
	return this;
};
console.log( new User().setId( 1314 ).setName( 'sven' ) );
```
或
```
var User = {
	id: null,
	name: null,
	setId: function( id ){
		this.id = id;
		return this;
	},
	setName: function( name ){
		this.name = name;
		return this;
    }
};
console.log( User.setId( 1314 ).setName( 'sven' ) );
```
避免大型类：用策略模式。
return退出循环：比用break退出当层，break标记退出顶层好。如果循环之后还有语句直接放在return里。return a(i);
