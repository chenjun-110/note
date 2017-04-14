```
//判断值真假
var assert = function(value, msg) { 
	if ( !value )
		throw(msg || (value + " does not equal true"));
};
//判断值相等
var assertEqual = function(val1, val2, msg) {
	if (val1 !== val2)
		throw(msg || (val1 + " does not equal " + val2));
};
```
Model数据:完全独立，它只包含数据和数据相关的逻辑。绝对不能和视图代码耦合。
```
//错误示范：user数据过多，要多个destroyUser。函数命名会冲突。
var user = users["foo"];
destroyUser(user);
//正确示范：user数据要是一个实例，实例上有destroy。多态。
var user = User.find("foo");
user.destroy();
```
控制器C：监听V传来的事件，然后从服务器抓取数据，然后把数据包装成模型实例。
```
//简易控制器:
var Controller = {}; //命名空间
(Controller.users = function($){ //users控制器：监听视图点击触发
	var nameClick = function(){}; 
	$(function(){$("#view").click(nameClick)});
})(jQuery);
```
简写原型形式：`Person.fn = Person.prototype; Person.fn.run=fuc`原型上添加方法更方便
实现类似jq的扩展插件方法：它真正的价值是添加模块。
```
//把对象的属性添加到构造函数上：
klass.extend = function (obj) { 
	var extended = obj.extended;
	for (var i in obj) {
		klass[i] = obj[i];} 
	if (extended) extended(klass)
};
//把对象的属性添加到原型上：
klass.include = function (obj) {
	var included = obj.included;
	for (var i in obj) {
		klass.fn[i] = obj[i];} 
	if (included) included(klass)
};
var Person = new klass;
Person.extend({
	fnd: function(){},
	exists: functions(){},
	extended: function(klass){//传入则触发。
		console.log(klass, " was extended!");}
});//include同理
```
jq把参数转为数组：`jQuery.makeArray(arguments)`
js把参数转为数组：`Array.prototype.slice.call(arguments, 0)`
apply实现委托：`console.log.apply(console, args)` args数组可能被处理过
ES3无干扰实现ES5的bind():
```
if (!Function.prototype.bind) {
	Function.prototype.bind = function (obj) {
		var slice = [].slice,
		args = slice.call(arguments, 1),
		self = this,
		nop = function () {},
		bound = function () {
			return self.apply( this instanceof nop ? this : (obj || {}),
				args.concat(slice.call(arguments)));};
		nop.prototype = self.prototype;
		bound.prototype = new nop();
		return bound;
	};
}
```
匿名函数实现私有属性：无闭包~
```
(function(){
	var findById = function(){}; //匿名函数保护的私有变量
	Person.find = function(id){ //给全局Person添加方法
		if (typeof id == "abc")
			return findById(id);};
})();
```