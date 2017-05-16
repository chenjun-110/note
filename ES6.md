CMD用于服务器，AMD用于游览器。
---node.js中的模块语法---
```
exports.setName=setName;
exports.printName=printName;
var test=require('./test'); //test代表exports
test.setName('Byron');
test.printName();
```
`module.exports=Student;`  //Student是个对象/构造函数
`var Student=require('./test');`
  等价于，因为module.exports和exports对象指向同一变量。
`exports.Student=Student;`
`var Student=require('./test').Student;`
----end-------

ES6
```
export default a 
import s from 'demo' ```//导入没有花括号，名字随意。 


《ES6入门》笔记--阮一峰
最初发布时间：2015.6   每年6月发布
ES6：包括ES2015.2016.2017

let：作用域
 1. 只在{let a=1;}代码块内有效，在for循环内有效(注意：循环体的let和条件的let作用域不同，条件是父作用域)。
 2. var变量提升：声明前可调用变量，值为`udf`。let会报错。
 3. let会形成封闭作用域，全局变量将失效！let之前也不能修改同名全局变量值，typeof检测封闭变量会报错，而非udf。`{{{let a}}}`代码块可任意嵌套，内可访外，外不访内。
函数：
 1. 函数参数设默认值也有封闭作用域，赋值依顺序未声明会报错。
 2. 在if内声明函数，ES5会跳出if，ES6会形成封闭作用域、if之前无法调用与全局同名的函数。前者条件形同虚设，后者游览器不兼容。尽量采用函数表达式以避免。
const: 不可更改
 1. 作用域和let完全相同：{}、封死作用域、不提升、不可声明同名变量。
 2. const只能保证引用关系不变，不能保证内存地址变化。如对象、数组的数据仍可变动。应用冻结`const foo = Object.freeze({});`

完全冻结对象：Object.freeze对属性值是对象的无效。
```
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {constantize( obj[key] );}
});};
```

全局对象:
 1. let/const/class声明的不属于全局对象属性，var/function仍属于。
 2. 游览器的window，Node的global，WebWorker的self 指向全局。考虑到一处代码多处运行可作兼容处理：
```
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');};
```

**解构赋值**：等号右边的值不是对象或数组，就先将其转为对象。
 数组格式：`[a, [[b], c], ,d=5,...e] = [1, [[2], 3],4,undefined,6,7];` 顺序必须对应。
   1. [a,b,c] = F(); 只要右侧有Iterator接口、或Generator函数也行。 
   2. 有默认值的必须严格等于undefined才生效。如果d=F(),d能取到值就不会执行F();
   3. [x,y,z] = "ABC" 字符串被转换成类数组，所以生效。
 对象格式：`let {foo=1, bar:b=2,c=3} = {foo: "A", bar: "B", c:undefined};` 无序但名字必须对应。
   1. 真正被赋值的是b,不是bar。foo是foo:foo的简写。名字只是模式匹配，操作的是属性值!嵌套对象里理清哪个是模式很重要。
   2. 先声明let foo; 再赋值`({foo}={foo:1});` 必须用圆括号。除了这形式，禁止在解构中用圆括号。
   3. 利用该特性可以轻松把对象的属性值、方法转移到变量上。
   4. `arr=[1,2,3]; {0:a, [arr.length-1]:b}=arr;` 右侧是数组也ok，数组也是对象。
   5. {length : len} = 'hello';  类数组对象肯定有length属性。{toString: s} = 123;同理数字、布尔值可取到原型上的属性。
 函数格式：`function move({x=0,y=0}={}){return [x, y];}`  形参用数组或对象格式。
   这里的={}也是默认值，move()不传参也有值，返[0,0]。传参就对应解构赋值关系move({})，传参的对象解构优先级>默认对象。传参为undefined可手动触发默认值。 
适用于：交换变量值，函数return数组/对象批量取得返回值，简化提取JSON数据，设函参默认值可减少判断，加载模块指定方法。

模板字符串：用反引号`代替引号"。
  1. 保留所有缩进，不需要手输`\n`换行，可配合`trim()`。
  2. 变量/函数/计算式用`${}`包围，所以不需要+号连接！如果${}返回值不是字符串会调用toString。
  3. ${}内部函数可嵌套模板字符串
  4. tag`Hello ${5+10} world ${5*10}`等价于tag(['Hello ',' world ',''], 15, 50); 特殊函数调用形式，注意区分是模板还是函数。

类数组转数组： 代替[].slice.call(obj)
	1. `Array.from(obj)` 万能转
	2. `[...document.querySelectorAll('div')]`  点点点转数组，仅限有Iterator接口的对象。
筛选数组： 代替indexOf
	1. [-1,-2,1].find(n=>n<0) //-1  返回首个条件true的项
	2. [].findIndex() 返回首个条件true的项索引
	3. [].includes 判断参数是否在数组内

函数默认值： 代替了`if(typeof y === 'undefined') y='a';   y = y || 'a'; `
	1. 注意function m1({x=0,y=0}={})和function m2({x,y}={x:0,y:0})的区别，m2传入对象会覆盖默认对象，m1不会。
	2. 参数不在尾部，需传入undefined触发。
	3. 注意带默认值的函数length属性会失真。
	4. 默认值作用域通常不指向全局变量，除非该变量没被声明为形参。由此可以推出默认值的变量在函数体内设置会某些情况无效。
	5. 
```
var x = 1;
function foo(x, y = function(){x = 2;}) {
  x = 3;  //这x指向形参第1个x。 //如果var x=3; x就不会受条件作用域影响。且覆盖条件的x。 
  y(); //赋值x
  console.log(x);
}
foo();
x; 
```
严格模式：只要函数参数使用了默认值、解构赋值、或者扩展运算符，就不能显式指定严格模式。
**扩展运算符**：
	1. ...用于形参：多余参数序列转为数组。 
	2. ...用于传参：数组转为参数序列。 代替了`fuc.apply(null,arrgs)`
	3. ...用于数组项：代替了`concat`
	3. ...用于[...'abc']:字符串转为数组。可识别unicode，可解决ES5操作乱码问题。代替split('')
	4. ...用于数组追加数组：arr1.push(...arr2) 代替了`Array.prototype.push.apply(arr1, arr2);`
	5. ...用于Generator函数：返回遍历值的数组。
	6. ...用于对象剩余键值对会生成对象(浅拷贝-值对象引用-无原型)。
	 61. {x,...{y,z}}=o中x可以读取o的继承属性，yz只能读取o的自身属性。
	 62. ab={...a,...b} 先展开属性再合并对象，代替`Object.assign({}, a, b)` 如果展开对象里有getter会执行。
	7. ...用于数组剩余参数会生成数组。
箭头函数：简化回调
	1. 函数体多余一条语句，要{    return}包裹
	2. 返回值是对象，圆括包裹 id=>({a:1,b:2});
	3. `({a,b}) => a+' '+b` 等价于 `o => o.a+' 'o.b` 不用写对象名咯
	4. 注意：不能用arguments、yield、构造函数。也不能用call/apply/bind改变this。
	5. 箭头函数根本不存在自己的this! 它的this是外层对象的this。arguments、super、new.target都是外层函数的变量。
	6. 简写λ演算
绑定符：ES7,双冒号`obj::f(...arguments)` 代替了`f.apply(obj,arguments)`
存在符：ES7,a?.b 判断a是否存在,存在就调用a.b   
尾调用优化:即只保留内层函数的调用帧。如果尾调函数引用了父函数的变量，就会占内存，多层嵌套尾调会很占内存。所以把函数放在`return f(x)`处能减少内存。
尾递归：不会栈溢出。return f(n-1,n*t)比return n*f(n-1)写法强很多。
	1. 如果递归函数最后1步还有多余操作的话，可以在父函数多加几个形参。如果考虑到递归函数的可读性，可以外部嵌套父函数 / 柯里化把多参数转为单参数 / 设默认参数。 
	2. 注意：尾递归优化仅在ES6严格模式有效，低版本用蹦床函数把递归转化为循环。
```
function tco(f) { //f是要递归的函数
  var value,active = false,accumulated = [];
  return function accumulator() {
    accumulated.push(arguments);
    if (!active) {
      active = true; //状态变量
      while (accumulated.length) { //循环条件
        value = f.apply(this, accumulated.shift());
    }
      active = false;
      return value;  }};}
var sum = tco(function(x, y) { 
  if (y > 0) {
    return sum(x + 1, y - 1) //递归调用sum,但因为active=true
  }else {return x}
});
sum(1, 100000)
```

对象：
  1. 变量传入属性名，等同传入属性值`obj={foo}`等价于`obj={foo:foo}`
  2. 无func函数传入方法名 `obj={m(){}}`等价于`obj={m:funcion(){}}` 类似getter/setter。如果是Generator函数要`obj={* m(){}}`
  3. module.exports = { getItem, setItem, clear }; 类似如此传入函数名、变量名即可生成对象。
**Symbol类型**
数据类型：undefined、null、布尔值、字符串、数值、对象、Symbol
用法：`var s = Symbol();  o[s]=1; o={[s]:fuc}; o.a=Symbol();`   
调用：`o[s]; o[s]();` 不能用点号。
隐式转换：Symbol不是字符串，所以不能被+转换。可以被String(s)/s.toString()显式转。能转成布尔值。
适用于：
  1. 在其他人开发的对象上增加属性名(不用担心属性名覆盖)，每个Symbol是唯一的。
  2. 适合做常量值。
  3. 代替唯一变量，如条件里的比较字符串。
  4. 不能被常规方法遍历，适合既是公有方法，又只用于内部。
  5. 单例模式免覆盖 module.exports = global[s] = new A();
**Set结构**
特点：类似数组，但成员值唯一,顺序为插入顺序，键名等于键值。空{}不等于{}，NaN等于NaN。
`s = new Set(); s=new Set([1,2,3]); s=new Set(f()); `
1. 数组去重：`[...new Set(arr)]`
2. Set转数组：Array.from()
3. 并集：new Set([...a, ...b]); 交集：new Set([...a].filter(x => b.has(x)));
**WeakSet结构**
特点：特点/属性方法基本同上。成员值只能是对象(数字/Symbol不行)，不计入引用计数(对象成员可能会消失)，不可遍历。
`new WeakSet([ {},[] ]);`
1. 储存DOM节点，DOM被删除后，不会发生内存泄漏。
2. 临时引用一些东西
**Map结构**
特点：键名可为任意结构，值-值对应关系。
`m=new Map([ [key,v],[key,v] ]); m.set(obj,value); m.get(obj);` 参数可以是数组、Set、Map。
1. 设键名为['a']和['a']是不同的内存地址，赋值给变量再.get()才能保证是一个值。
2. map转数组：[...map.keys()]
3. 数组转map:new Map([[],[]])
4. map转对象：map键必须为字符串。`for ([k,v] of map){ obj[k]=v}`
5. 对象转map:`for(k of Object.keys(obj)){ map.set(k,obj[k])}`
6. map转JSON:1.先把map转对象->`JSON.stringify(obj)`2.转不了对象就转数组->`JSON.stringify([...map])`
7. JSON转map:1.对象型json：先转对象`JSON.parse(js)`->再转map。2.数组型json:`new Map(JSON.parse(js))`
```
const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3) );
map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v]) );
map.forEach(function(value, key, map) {
  this.report(key, value);  //this指向forEach的2参对象
}, reporter);
```
**WeakMap结构**
特点：键名只接受对象。键名不计入引用计数(键值正常引用)，不可遍历。
`new WeakMap();` 用法同上set/get/has/delete
适用于：
1. 不引用对象并在对象上存储数据,比如DOM
2. 作listener对象，对象消失则事件回调消失。
3. 给实例添加私有属性，随实例销毁。
**Proxy**
var proxy = new Proxy(target, handler);
特点：拦截并处理target对象的访问。重载了点运算符。
handler：get:function(操作对象，属性，receiver）{return 读取返回值} set/apply拦截作函数调用/construct拦截作new调用/还十几个拦截各种方法。。。
技巧：
  1. 把proxy实例设置为obj的属性。
  2. 把proxy设置为obj的原型，访问obj不存在的属性就拦截。
  3. 








#### es6-API介绍：
repeat() 复制字符串n次
padStart() 字符自动补全长度 'ab'->'ababx'
String.raw` ` 斜杠转义 
includes() 判断字符串是否在字符串中
/u修饰符，识别Unicode字符(因为普通正则的.{}都有特殊意义)
/y修饰符，第2次以后的匹配.
0b开头-十进制。 0o开头-八进制。
Number.isFinite / Number.isNaN 检测
Number.EPSILON 误差常量
Number.MAX_SAFE_INTEGER 2的53次方
Number.isSafeInteger 判断值是否在53次方内
Math.trunc 去除数的小数返回整数部分。
Math.sign/Math.signbit 判断正负
Math.cbrt  立方根。
Math.clz32 返回一个数的32位无符号整数有多少个前导0。可用<<运算符看效果。    
Math.fround 返回最接近这个小数的单精度浮点数。
Math.hypot 返回所有参数平方和的平方根。
2**3 幂运算符
Array.of 参数转数组
[].copyWithin 数组内的复制粘贴
[].fill 覆盖数组某些项
[].keys/values/entries 返回数组的遍历器对象
0 in [] 判断0位是否有值。避免出现数组空位。
Object.is 判断严格相等值，取代=== ==。解决了+0不等于-0，NaN等于NaN的问题。
Object.assign 合并对象，只拷贝自身属性，非继承/不可枚举属性。注意1.（嵌套对象中）浅拷贝的是对象的引用，原对象改变会影响合并对象。2.浅拷贝会有顶级同名属性覆盖的问题。3.数组会按键名覆盖。4.适用于为对象添加属性方法 Object.assign(this,{x,y},fuc(){})
**遍历属性**：按属性名顺序"数字->字符串->symbol"
1. for...in 遍历自身+继承(可枚举，不含symbol)
2. Object.keys 遍历自身(可枚举，不含symbol)
3. Object.getOwnPropertyNames 遍历自身所有(不含symbol)
4. Object.getOwnPropertySymbols 遍历自身的symbol 
5. Reflect.ownKeys 遍历自身所有(含symbol)
6. Object.values 遍历属性值(可枚举)
7. Object.entries 遍历自身属性和属性值(可枚举，不含symbol)
Object.setPrototypeOf 设置原型，代替了__proto__
Object.getPrototypeOf 返回原型
Object.getOwnPropertyDescriptor 返回某个属性的描述对象
Symbol() 每次调用返回都不一样
  for() 只创建1次Symbol值并登记到全局
  keyFor() 返回已登记symbol的参数
  hasInstance内部方法 调用instanceof触发
  isConcatSpreadable属性 调用concat触发，可不展开合并嵌套。
  species属性 调用new触发，更换构造函数
  match 调用match触发，返回该方法的返回值
  replace 调用replace触发，返回该方法的返回值
  search 调用search触发，
  split 调用split触发
  iterator  调用for of循环触发
  toPrimitive 值被转成原始类型触发，根据类型返回不同值
  toStringTag 调用toString触发，返回值通常表示对象类型。
  unscopables 调用with触发，作用域可设置不查找某个属性。
new Set().
  add 添加
  delete 删除
  has 判断值存在
  clear 清空Set
new Map()
  keys 键-遍历器
  values 值-遍历器
  entries 键值-遍历器
  forEach 













