####基础--面向对象
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
call实现借用方法：`(function(){ Array.prototype.push.call(arguments,3); })(1,2)` 借用方法在左边，操作对象放1参。这里的对象获得了push方法，可以push属性值到对象内。对操作对象有要求：要能存取属性，lengh属性可读写(低版本游览器要显式设置该属性)。因为number类型没有length属性，func类型length属性只读，都不能做操作对象。
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
})()```
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




