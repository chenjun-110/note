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
 1.只在{let a=1;}代码块内有效，在for循环内有效(注意：循环体的let和条件的let作用域不同，条件是父作用域)。
 2.var变量提升：声明前可调用变量，值为`udf`。let会报错。
 3.let会形成封闭作用域，全局变量将失效！let之前也不能修改同名全局变量值，typeof检测封闭变量会报错，而非udf。`{{{let a}}}`代码块可任意嵌套，内可访外，外不访内。
函数：
 1.函数参数设默认值也有封闭作用域，赋值依顺序未声明会报错。
 2.在if内声明函数，ES5会跳出if，ES6会形成封闭作用域、if之前无法调用与全局同名的函数。前者条件形同虚设，后者游览器不兼容。尽量采用函数表达式以避免。
const: 不可更改
 1.作用域和let完全相同：{}、封死作用域、不提升、不可声明同名变量。
 2.const只能保证引用关系不变，不能保证内存地址变化。如对象、数组的数据仍可变动。应用冻结`const foo = Object.freeze({});`

完全冻结对象：Object.freeze对属性值是对象的无效。
```
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach( (key, i) => {
    if ( typeof obj[key] === 'object' ) {constantize( obj[key] );}
});};
```

全局对象:
 1.let/const/class声明的不属于全局对象属性，var/function仍属于。
 2.游览器的window，Node的global，WebWorker的self 指向全局。考虑到一处代码多处运行可作兼容处理：
```
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');};
```

**解构赋值**：等号右边的值不是对象或数组，就先将其转为对象。
 数组格式：`[a, [[b], c], ,d=5,...e] = [1, [[2], 3],4,undefined,6,7];` 顺序必须对应。
   1.[a,b,c] = F(); 只要右侧有Iterator接口、或Generator函数也行。 
   2.有默认值的必须严格等于undefined才生效。如果d=F(),d能取到值就不会执行F();
   3.[x,y,z] = "ABC" 字符串被转换成类数组，所以生效。
 对象格式：`let {foo=1, bar:b=2,c=3} = {foo: "A", bar: "B", c:undefined};` 无序但名字必须对应。
   1.真正被赋值的是b,不是bar。foo是foo:foo的简写。名字只是模式匹配，操作的是属性值!嵌套对象里理清哪个是模式很重要。
   2.先声明let foo; 再赋值`({foo}={foo:1});` 必须用圆括号。除了这形式，禁止在解构中用圆括号。
   3.利用该特性可以轻松把对象的属性值、方法转移到变量上。
   4.`arr=[1,2,3]; {0:a, [arr.length-1]:b}=arr;` 右侧是数组也ok，数组也是对象。
   5.{length : len} = 'hello';  类数组对象肯定有length属性。{toString: s} = 123;同理数字、布尔值可取到原型上的属性。
 函数格式：`function move({x=0,y=0}={}){return [x, y];}`  形参用数组或对象格式。
   这里的={}也是默认值，move()不传参也有值，返[0,0]。传参就对应解构赋值关系move({})，传参的对象解构优先级>默认对象。传参为undefined可手动触发默认值。 
适用于：交换变量值，函数return数组/对象批量取得返回值，简化提取JSON数据，设函参默认值可减少判断，加载模块指定方法。

模板字符串：用反引号`代替引号"。
  1.保留所有缩进，不需要手输`\n`换行，可配合`trim()`。
  2.变量/函数/计算式用`${}`包围，所以不需要+号连接！如果${}返回值不是字符串会调用toString。
  3.${}内部函数可嵌套模板字符串
  4.tag`Hello ${5+10} world ${5*10}`等价于tag(['Hello ',' world ',''], 15, 50); 特殊函数调用形式，注意区分是模板还是函数。

类数组转数组：Array.from(obj) 代替了 [].slice.call(obj)
  




es6-API介绍：
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















