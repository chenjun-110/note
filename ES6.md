《ES6入门》笔记--阮一峰
最初发布时间：2015.6   每年6月发布
ES6：包括ES2015.2016.2017

**模块语法**
区别：
 1. CommonJS用于服务器：let { stat, exists, readFile } = require('fs'); 原理是加载整个fs对象并运行查找fs对象属性。
  11. 不能动态更新(对象的getter方法可以取到模块内部被修改的值)，输出的是值的拷贝缓存。多次调用require只会返回第一次生成的缓存。
  12. module.exports是一个包含各接口的对象。module是个模块对象。
  13. 只要模块内有import/export语法，Node就视为ES6模块。
  14. 顶层this指向当前模块。
  15. ES6加载CMD模块：
    151. 查找顺序(不指定)：`import './foo'` 先搜索foo.js->./foo/package.json->./foo/index.js。`import 'baz'`搜索node_modules文件夹下的baz.js->baz/package.json->baz/index.js没结果就返回上级node_modules目录继续。
    152. `module.exports={} 等价于 export default {}` 所以用ES6语法，import a from ''/import {default as a} from ''即可
    153. `import * as a from ''` 这个a.default对象==module.exports==exports==default。 ES6引用CMD模块行为和ES6模块有点小区别。
    154. CommonJS 模块的输出缓存机制，在 ES6 加载方式下依然有效不会动态更新。
  16. CMD加载ES6模块：所有export接口都会赋值为require对象的属性，动态更新失效。
  17. 循环加载：require('a')的写法比require('a').foo好
 2. AMD用于游览器。
 3. import不会引用整个模块，它不是对象。动态更新。输出的是值的引用。
---node.js中的CommonJS语法---
```
exports.setName=setName;
exports.printName=printName;
var test=require('./test');  // test代表exports
test.setName('Byron');
test.printName();
```
`module.exports=Student;`  //Student是个对象/构造函数
`var Student=require('./test');`
  //等价于，因为module.exports和exports对象指向同一变量。         
`exports.Student=Student;`
`var Student=require('./test').Student;`
----end-------
ES6
```
export default a 
import s from 'demo' //导入default没有花括号，名字随意。 
```
特点：
  1. 模块顶层this指向undefined。
  2. 模块顶层变量，外部不可见。
  3. 自动严格模式。
  4. 不同模块加载的是同一个的引用。
  5. 循环加载：先执行的a.js遇到import会停止执行->执行完b.js->最后执行a剩余a.js
export：
  1. 用法：export输出单个变量/函数/类，多个变量用`export {a,b,c}`括号框起来。 输出单个时必须关键字声明，不声明就用{}包裹。
  2. 别名：`export {A as a, B as b, B as c}` 可取多个别名
  3. 输出的变量必须存在。
  4. 必须书写在模块顶层。
  5. default:`export default a` 不用声明a，因为这是把a变量的值赋值给default变量。`export default function(){}` 只能用一次
import:
  1. 位置：相对、绝对路径。仅单模块名必须有配置文件。
  2. 别名：同上。
  3. import有代码提升。编译期加载，不能放置在代码块内，无法实现require按需/条件加载。提案`import().then()`可以。
  4. import './a' 仅执行，不输值。
  5. 整体加载：`import * as all from './a' ` 星号会加载所有export变量并传给在all对象的属性。注意：all对象不能改变以便静态分析。星号会忽略default变量。
  6. default：引入时任意名字。`import a,{b} from 'A' `a指向default。
提案import():
  1. 运行期加载，类似require句法。它是个对象。
  2. 解构输出接口变量：import().then(({e1,e2,default:e3})=>{})
  3. 输出接口对象：Promise.all([import(a),import(b)]).then(([mo1,mo2])=>{})
复合写法：
  1. export { foo, bar } from 'my_module'; 先加载这俩，再输出这俩。
  2. export { es6 as default } from './someModule'; 先加载{es6},再输出为default。
技巧：
  1. 大量零散常量：新建放置常量的文件夹，存放各模块化的常量js，新建index.js->用复合写法把零散常量输出，各模块仅加载index.js获取所需常量即可。
加载：
  1. async 下载完执行，无顺序
  2. defer 渲染完执行 等价于 type="module"
  3. 游览器内联模块type="module"内部可以用import加载模块：需要URL .js后缀不能省略 可用export


**let**：作用域
 1. 只在{let a=1;}代码块内有效，在for循环内有效(注意：循环体的let和条件的let作用域不同，条件是父作用域)。
 2. var变量提升：声明前可调用变量，值为`udf`。let会报错。 var在if和for条件或循环体内会溢出。
 3. let会形成封闭作用域，全局变量将失效！let之前也不能修改同名全局变量值，
 4. 检测封闭变量会报错，而非udf。`{{{let a}}}`代码块可任意嵌套，内可访外，外不访内。
函数：
 1. 函数参数设默认值也有封闭作用域，赋值依顺序未声明会报错。
 2. 在if内声明函数，ES5会跳出if，ES6会形成封闭作用域、if之前无法调用与全局同名的函数。前者条件形同虚设，后者游览器不兼容。尽量采用函数表达式以避免。
const: 不可更改
 1. 作用域和let完全相同：{}、封死作用域、不提升、不可声明同名变量。
 2. const只能保证引用关系不变，不能保证内存地址变化。如对象、数组的数据仍可变动。应用冻结`const foo = Object.freeze({});`
 3. 可读性好，性能比let高，函数式思想只新建不改变值
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
对象简写：
  1. 只写变量a={name},自动赋值{name:1}
  2. 返回对象：c=(a,b)=>{return {a,b}} //c(1,2)返回{a:1,b:2} 形参为属性，传参为值的对象。


**解构赋值**：等号右边的值不是对象或数组，就先将其转为对象。
 数组格式：`[a, [[b], c], ,d=5,...e] = [1, [[2], 3],4,undefined,6,7];` 顺序必须对应。
   1. [a,b,c] = F(); 只要右侧有Iterator接口、或Generator函数也行。 
   2. 有默认值的必须严格等于undefined才生效。如果d=F(),d能取到值就不会执行F();
   3. [x,y,z] = "ABC" 字符串被转换成类数组，所以生效。
 对象格式：`let {foo=1, bar:b=2,c=3} = {foo: "A", bar: "B", c:undefined};` 无序但名字必须对应。必须要声明！
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
**箭头函数**：简化回调
	1. 函数体多余一条语句，要{    return}包裹。 ()=>({})是返回对象，()=>{}是执行语句。
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
  3. writable、configurable属性必须为true。
  4. 代理对象this指向Proxy代理对象。所以无法取到外部属性。某些原生对象如new Date的this不一，就无法代理(必须绑定作用域)。
  5. 适合WEB接口，不用为每种数据作适配，统一写到Proxy里拦截。
handler：
	1. get:({}，属性，receiver），读取属性前执行函数。
	2. set：拦截某属性的赋值操作。适合赋值时验证数据，还有数据绑定，禁止操作私有属性等。
	3. apply:({}，this,对象的参数)，拦截对象调用自身/call/apply。
	4. has:({},属性), in符
	5. construct：({},参数,新{}), new符，必须返回对象
	6. deleteProperty：({},属性)，delete符，返回false/抛错就阻止。
	7. defineProperty:拦截了Object.defineProperty，return false阻止添加修改属性。
	8. ownKeys 拦截遍历属性，忽略不存在/Symbol属性/否定enumerable,return []要遍历的属性列在[]内。[]里必须返回不可配置不可拓展的属性。
	9. Proxy.revocable 可取消代理实例，适合带权限的访问代理。
	10. getOwnPropertyDescriptor 拦截描述符、getProto
	11.  拦截原型、isExtensible 拦截拓展、preventExtensions 拦截扩展、setPrototypeOf 拦截原型。。。
**Reflect**
目的：封装了语言内部方法。比如：Reflect.defineProperty将代替Object.defineProperty
Proxy对象和Object的方法，Reflect对象都有相同的默认行为，因此Proxy内部可以调用Reflect没修改过的相同API。
特点：同名方法里Reflect会报错，Object不会(返回false/udf)。
方法：
    1. get:如果读取属性是getter，它内部的this指向receiver对象非目标对象！
    2. set:(target, name, value, receiver),如果设置属性是setter,this指向receiver！注意Reflect.set会触发Proxy.defineProperty拦截。
    3. getPrototypeOf：读取__proto__属性，对应Object.getPrototypeOf(区别：参数非对象Object会转为对象，Reflect会报错)。
    4. setPrototypeOf：同上，Reflect的会报错。
    5. `Reflect.apply(Math.min, Math, ages)`代替`Math.min.apply(Math, ages)`。`Reflect.apply(Object.prototype.toString, 1, [])`代替`Object.prototype.toString.call(1)`
    6. ownKeys:代替getOwnPropertyNames、getOwnPropertySymbols之和。
    7. has deleteProperty construct getOwnPropertyDescriptor isExtensible preventExtensions 同上
**Promise**
用法：`p = new Promise((resolve, reject)=>{resolve()});  p.then((v)=>{v();}).catch();`
特点：
  1. 对象状态不被外界影响：Pending（进行中）、Resolved（已成功）、Rejected（已失败）。
  2. 状态改变，就会状态凝固：Pending变Resolved、Pending变Rejected。
  3. 无法中途取消。
  4. new Promise内的代码会立即执行，then是等待同步任务后执行。
  5. 任何时候都能取结果：then/catch任何时候都能拿到P的值。(和Event不同)
  6. 频繁事件用stream模式是比部署Promise更好。
resolve：
  1. resolve()触发和.then的1参关联。
  2. resolve的参数会传递到then的回调参数v内。
then：
  1. 如果return的是另一Promise，则可链式调用.then监听它。
  2. 尽量不在它内部定义Reject，使用catch。
  3. 本轮事件循环的末尾执行。
catch:
  1. 等价于then(null,fuc)。它默认返回P对象。
  2. 如果then内抛错，promise内抛错，reject(e)，catch内抛错, 则进入catch。
  3. 2种状态只存在1个，resolve或throw/reject。
  4. 顺序：p.then().catch()，如果p失败-catch捕获p,如果p成功-catch捕获then返回的promise。
  5. 冒泡：错误会传递直到被catch捕获。
  6. try-catch:区别是不设.catch，node没事(谷歌报错)。只能捕获异步错误，不能捕获同步错误。
  7. promise内部用setTimeout抛错无效，它离开了promise。Node的unhandledRejection事件可监听未捕获的reject错误。
  8. 
Promise.all:  
  1. 格式：([p1,p2])参数都是promise的实例，把多个P实例包装成新P实例。
  2. 状态：参数只要有1个reject，状态就是reject，首个reject参数的返回值传递给它.catch。参数都是fulfilled，状态才是fulfilled，[参数的返回值]组成数组传递给它.then。
  3. 参数要有Iterator接口。
  4. 适用于等待promise参数都返回结果了，再触发all。
Promise.race:用法同上，区别是参数实例状态只要有1个变化，它就变化并凝固。
Promise.resolve:
  1. 参数不是对象，等价于new Promise(resolve=>resolve(x)),参数传进resolve转为P对象。
  2. 参数为有同名then方法的对象，转换时立即执行该方法。
  3. 不带参数，本轮“事件循环”的结束时返回一个Resolved状态的Promise对象。执行顺序在setTimeout(,0)之前。
Promise.reject：返回一个rejected状态的Promise对象，特点同上，参数有then方法的对象抛错的话，catch捕获的是then而非原参。
.done: 防止回调链尾部错误未捕捉。
```
Promise.prototype.done = function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      setTimeout(() => { throw reason }, 0); // 抛出一个全局错误
    });
};
```
.finally:2种状态都一定会执行的回调。
```
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};
```
Promise.try：
  1. 目的：让同步代码同步执行，异步代码异步执行。
  2. 代替了`(()=>new Promise(resolve=>resolve(f())))()`和`(async()=>f())().then().catch()`
  3. 包装过的代码抛的同步/异步错误都能被catch捕获。
**Iterator接口**
目的：通用为各种数据结构遍历
遍历器对象：一定有next方法，return一个带数据的对象{value:1,done:true} done为true通常表示遍历结束。
原生带接口的数据结构：数组、类数组的对象、Set和Map结构。可被for..of循环。
默认部署：在数据结构的［Symbol.iterator］属性方法是个返回遍历器对象的函数。`arr[Symbol.iterator]().next();`
手动部署：
```
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;}
  [Symbol.iterator]() { return this; } //被for..of识别
  next() {                               //遍历对象必须有的next方法，for..of会循环该方法。
    var value = this.value;
    if (value < this.stop) {
      this.value++;     //遍历顺序规则
      return {done: false, value: value};}
    return {done: true, value: undefined};}}
function range(start, stop) {return new RangeIterator(start, stop);}
for (var value of range(0, 3)) {console.log(value);}
```
while遍历：
```
var $iterator = ITERABLE[Symbol.iterator]();
var $result = $iterator.next();
while (!$result.done) {
  var x = $result.value;
  // ...
  $result = $iterator.next();
}
```
类数组对象(有数值键名和length属性)：`obj.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];`直接引用数组的接口很方便，也可用Array.from。
底层默认调用Iterator接口：解构赋值、扩展运算符、yield*、函数(传数组参数)等。
覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。比如修改value值可以扰乱遍历输出。
return方法：for...of提前退出触发(报错/break/continue)
throw方法：配合生成器使用。
for..of：
  1. 内部调用[Symbol.iterator]()。
  2. `obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);`这样遍历obj等于遍历arr。
  4. 对于数组：for...in遍历的是键名，for...of遍历的是(仅数值索引)的键值。
  5. 对于Map：for ([k,v] of m)可以遍历键值。返回值是数组。顺序为添加顺序。
  6. 供for..of使用:`entries()`键值对，keys()键名，values()键值。
  7. 对于对象：for...in遍历的是键名。for...of报错：1.`Object.keys`获得键名进而obj[k]获得键值。2.Generator包装对象。3.Generator赋值到[Symbol.iterator]。
  8. for..of解决的问题：不会像for-in无顺序还遍历非数字键和原型键。不会像forEach中途无法break退出。比for简洁。 
  9. 对于Generator：for..of只能遍历yield,不包括return。如果格式:yield [k,o[k]]，那可以解构赋值for([key,value] of g()){console.log(`${key}: ${value}`);}
**Generator状态机**
用法：
```
function* helloWorldGenerator() {
  yield 'hello';    //状态
  yield 'world';
  return 'ending';  //遍历终点{value: "ending", done: true}
}
var g = helloWorldGenerator(); //返回遍历器对象 .next()遇到yield会停止
```
yield：
  1. yield表达式的值就是value的值。
  2. 该表达式是惰性求值，只在next到来时计算。
  3. yield在Generator内部不能放在其它函数的回调函数内部(for循环可以，forEach不行)。单纯作参数是可以的。
  4. yield在另一表达式内，要包裹`(yield)`
  5. next()遇到yield停止，yield之前的未执行的会执行，已执行的不执行。
yield*: +遍历器对象。
  1. 功能：在a生成器内部调用b生成器，next()也会按顺序执行b的状态。
  2. next无视b的return。获得返回值需要`a=yield* gg();`
  3. 等价于for (var v of gg) {yield v;}
  4. yield*后面：跟的既可以是遍历器对象，也可以是带Iterator接口的数据结构。
  5. 嵌套数组：yield* g(arr[i])，通过递归迭代。
next:
  1. `var reset = yield i`每次执行到yield i就结束了，reset永远不会有值。如果next(a)带了参数，参数会作为yield的上一次返回值，reset就被初始化为a了。这样可以动态改变Generator行为。
  2. next()无参数，那上一阶段的yield表达式值为undefined
```
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';}
```
throw:
  1. 遍历器对象调用throw会被Generator内部未执行的catch捕获，如果catch执行过了就抛出到外部。
  2. g.throw()被内部catch捕获后，会自动执行一次后面的next()。
return:
  1. g.return(a)终结生成器，返回{ value: a, done: true }
  2. 如果内部有try-finally,g.return行为会进入finally句执行一次next()。finally句外部的yield都会失效。return值将移动到finally句末尾。
技巧：
  1. 延迟执行：Generator函数只在调用next()才执行，赋值给变量不执行。
  2. 遍历：obj[Symbol.iterator]=function*(){} 作迭代接口用。yield为返回值。
  3. 正常的F函数无法当对象实例，如果把*F绑定在空对象上，F内部的this.x会赋值到obj上/原型上。`F.call(obj)`或`F.call(F.prototype)`
  4. 状态机：无限循环切换yield。`var clock = function* () {while (true) {console.l('Tick!');yield; console.log('Tock!');yield;}};`
  5. 异步：把g.next()放在yield表达式回调中执行，可以异步执行g函数剩下的部分。记得通过next参数把数据传回g函数内。
**异步编程**
协程的定义：一个线程或函数执行到一半，可以暂停并切换到执行另一线程或函数。协程是以多占用内存为代价，实现多任务的并行。对js异步的好处是，抛错的时候能找到原始调用栈。
回调函数：就是把函数分成2个函数，第1个执行完关闭上下文后再执行回调函数(1的返回值可能要传入回调参数)。缺点是横向发展可读性差。
Promise：把横向代码改为纵向链式调用。解决了可读性。它只是语法糖。
批量执行异步方案：
  1. Thunk函数:原生js是传值调用即传参时会计算参数。Thunk把参数用函数封装，就能传参时不计算。适用于自动执行异步Generator函数(普通循环执行只适合同步)。npm install thunkify。只要yield后面是Thunk函数就可。
  2. co模块：
批量异步的原理：
  1. 回调函数。将异步操作包装成 Thunk 函数，在回调函数里面交回执行权。
  2. Promise 对象。将异步操作包装成 Promise 对象，用then方法交回执行权。
**async**
特点：
  1. 语法糖：内置执行器，不再需要Thunk、co模块即可批量异步。
  2. 返回值是Promise。
  3. await不能插在普通函数的回调内。可以在for循环内。
```
async function() f{await g();return}
f().then(); //then会接收return值为参数
```
技巧：
  1. 顺序：不reject不return(中断)的话必须等async内部的await都执行完才会执行then回调。
  2. 防止中断：try-catch包裹await可以忽略该异步是否失败，不会中断后面的await。或者把.catch写到await表达式内`await g().catch()`。(await表达式抛错会中断async)
  3. 如果异步成功就退出循环，如果异步失败就再次执行。
```
async function test() {
  for (i = 0; i < 3; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
}
```
  4. 多个await的异步没有继发关系，最好同时执行。`await Promise.all([a(),b()])`或者不放在await内。
**Class**
用法/语法糖：代替构造函数,参数传给constructor,方法传给原型(无需function关键字，无需逗号)。super指向父类构造函数。
```
let a = "to"；
class Point { 
  constructor(x,y){ //构造函数,React组件上的属性会进入x参数
    this.x=x
  }
  static b(){} //静态方法，相当于Point.b--实例继承不了b
  tostring() {}  //原型方法Point.prototype.tostring
  [a]() {}  //用a变量命名的原型方法
  Object.assign(Point.prototype, {  //可使用该方法复制可枚举属性/方法到原型
	  toString(){},
	  toValue(){}
  }
  get c(){} //c属性的getter
  set c(v){}
  * [Symbol.iterator]() {  //可供外部for..of遍历该类的实例
    for (let arg of this.args) {
      yield arg;
    }
  }

  x=x;         //ES7写法，等价于this.x=x,特殊的是就这有分号。需要babel.
  static c=3;  //ES7写法，静态属性，ES6只能外部设置Point.x=3。
  #d;          //ES7写法，私有属性
}
let m = new class{}('x')； //立即执行实例 
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);              // 必须调用父类的constructor(x, y)，创建this
    this.color = color;
  }
  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```
特点：
  1. 不可枚举:class内的定义的(原型)方法，都不可枚举。而直接通过prototype定义的是可枚举的。
  2. constructor方法默认reutrn this。修改return Object.create(null)值new出来就不是实例了。
  3. 不存在变量提升：防止子类继承父类时，父类没定义。
  4. 默认严格模式，不用use strict。
  5. super：
    51. 子类constructor的参数流入super,调用父类constructor设置属性并把属性和值传回子类。super相当于把父类的构造属性继承到子类中。子类的实例同时也是父类的实例。
    52. super内部的this是指向子类的。this相当于(B的父类是A)：`A.prototype.constructor.call(this)` 
    53. super():子类的constructor中必须显示调用super()创建this。如果没有该方法则默认设置。
    54. super.x(constructor中):super指向父类`A.prototype`,注意this指向子类自身(同名属性要注意)。super.x=3等价于this.x=3
    55. super.x(static中):super指向父类`A的static`，而非A.prototype。
  6. __proto__和prototype:实例查属性是通过`__proto__`找到类的`prototype`上。(b是实例，B是子类，A是父类)因为`b.__proto__=B.prototype;`，所以`B.prototype.__proto__=A.prototype；`，`B.__proto__ = A;`。由此推出：修改`b.__proto__.__proto__`可以影响实例a。
  7. call:baseinstance.showMsg.call(instance);阅读为“将instance当做baseinstance来调用，调用它的对象方法showMsg”。如果baseinstance是构造函数，那调用的是函数外部的showMsg属性，如果是实例，调用的是构造函数内部的this.showMsg。
  8. extends：可继承原生类Boolean()Number()String()Array()Date()Function()RegExp()Error()Object()。ES5不行。
  9. static:不会被实例继承。static关键字就是直接在构造函数上添加的属性。编写class时，static不能用于属性，仅方法。静态属性只能外部赋值。ES7可解决。
  10. new.target:返回new调用的当前构造函数。
技巧：
1. 私有方法：
```
const bar = Symbol('bar');
const snaf = Symbol('snaf');
export default class myClass{
	foo(baz) {this[bar](baz);}  //公有方法
	[bar](baz) {return this[snaf] = baz;}  //私有方法
}
```
2. 绑定this：class方法如果解构出来单独用，需要处理this指向。
```
方法一：把原型方法挂在同名构造属性上。
constructor() {this.printName = this.printName.bind(this);}
方法二：箭头代替bind。
constructor() {
    this.printName = (name = 'there') => {this.print(`Hello ${name}`);};
  }
方法三：Proxy劫持。
function selfish (target) {
  const cache = new WeakMap();
  const handler = {
    get (target, key) {
      const value = Reflect.get(target, key);
      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }
      return cache.get(value);
    }
  };
  const proxy = new Proxy(target, handler);
  return proxy;
}
const logger = selfish(new Logger()); //实例
```
3. 让函数只能被new调用：
```
function Person(name) {
  if (new.target === Person) {
    this.name = name;
  } else {
    throw new Error('必须使用new生成实例');
  }
}
```
4. 只能用于继承的类：不能new
```
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}
```
5. Mixin模式:合并多个类。constructor内的无法继承
```
function mix(...mixins) {
  class Mix {}
  for (let mixin of mixins) {   //把每个类拿出来
    copyProperties(Mix, mixin);
    copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
}
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {  //把每个类的每个属性拿出来
    if ( key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key); //把每个属性克隆进Mix类
      Object.defineProperty(target, key, desc);
    }
  }
}
class DistributedEdit extends mix(Loggable, Serializable) {
  // 使用
}
```
**@修饰器**
```
@testable  // 修饰Person类
class Person {
  @readonly  // 修饰name方法
  @nonenumerable
  name() { return `${this.first} ${this.last}` }
}
```
特点：同一方法有多个修饰器，顺序：装饰器函数闭包的按顺序，return的按倒序执行。
第三方模块：core-decorators.js

**代码规范**
1. 多用const，少用let,抛弃var。
2. 静态字符串用单引号或反引号。动态字符串使用反引号。抛弃双引号。
3. 多用对象的解构赋值。
4. 多行定义的对象，最后一个成员以逗号结尾。定义对象用简写。
5. 对象静态化，添加属性用Object.assign，直接添加属性只适用对象已存在的属性。
6. 简单函数用箭头函数代替function回调，代替bind
7. 函数如有配置参数，应是对象格式，放末位。
8. import代替require，default只单独用，有多个接口时就不用。放弃星号。函数接口首字母小写。对象接口首字母大写。
9. class代替原型
10. eslint插件检查代码风格。

**fetch**
```
var u = new URLSearchParams(); //参数
u.append('a', 'b');
u.append('c', 'd');
fetch('https://api.flickr.com/services/rest?' + u,{method:"POST",headers:{""：""},body:""}).then().catch()
```
设置头:
```
var reqHeaders = new Headers();
reqHeaders.append("","") 
reqHeaders.set("","")
//或者
var reqHeaders = new Headers({"":"", "":"", "":""});
```
reqHeaders前缀：
  1. has("Content-Type"):检索存在
  2. get():取值
  3. getAll():取值，数组
  4. delete():删除值
`var Req = new Request(url,{}) //用法和fetch一样`
Req前缀：
  1. .mode: "same-origin"禁止跨域  "no-cors"允许CDN脚本、图片跨域(Response不可读)  "cors" 跨域(遵守CORS协议)
  2. credentials:"omit"默认不带，"same-origin"，"include"带。cookie是否能跨域得到
`new Response("",{})` 1参是body
Response
  1. .type: "basic": 正常的同域请求. "cors":跨域请求。 "error": 网络错误。 "opaque":no-cors跨域资
  2. body:支持很多类型，只能读取一次，bodyUsed值变为true。
  3. text():读取body 返回promise
  4. json():相当于`JSON.parse(response.text())` 返回promise
缺点：暂时不能读取进度条。
兼容：原生不兼容IE
  1. 由于 IE8 是 ES3，需要引入 ES5 的 polyfill: es5-shim, es5-sham
  2. es6-promise fetch-detector fetch-ie8
  3. 可选：如果你还使用了 jsonp，引入 fetch-jsonp
  4. 可选：开启 Babel 的 runtime 模式，现在就使用 async/await
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
精确判断对象类型：`Object.prototype.toString.call(arr)`可替代typeof符。



**ES6代码收藏**：
生成DOM节点的函数
```
const dom = new Proxy({}, {
  get(target, property) {
    return function(attrs = {}, ...children) {
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);  //设属性
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child); //设文本
        }
        el.appendChild(child);     //非字符串就追加
      }
      return el;
    }
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);
```
赋值时验证数据：
```
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对于age以外的属性，直接保存
    obj[prop] = value;
  }
};

let person = new Proxy({}, validator);
person.age = 100;
person.age // 100
person.age = 'young' // 报错
person.age = 300 // 报错
```
禁止操作_私有属性：
```
var handler = {
  get (target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set (target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  }
};
function invariant (key, action) {
  if (key[0] === '_') {throw new Error(`Invalid attempt to ${action} private "${key}" property`);}  //判断属性名下划线，抛错会结束拦截方法。throw一个异常会退出这个函数的调用堆栈，直到其上级堆栈有捕获为止。如果都没有捕获，那么程序退出。
}
var target = {};
var proxy = new Proxy(target, handler);
proxy._prop  // Error: Invalid attempt to get private "_prop" property
proxy._prop = 'c'  // Error: Invalid attempt to set private "_prop" property
```
简单观察者模式：
```
const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});
function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;}

//使用方法：
const person = observable({name: '张三', age: 20});
function print() {console.log(`${person.name}, ${person.age}`)}
observe(print);
person.name = '李四';
```
异步加载图片：
```
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) { //新建时会立即执行
    var image = new Image();
    image.onload = function() {
      resolve(image);  //参数为成功回调
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url)); //参数为失败回调
    };
    image.src = url;
  });
}
```
5秒内无结果就触发reject：
```
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
p.then(response => console.log(response));
p.catch(error => console.log(error));
```
Iterator做指针结构：每调用一次内部指针移动到下个实例
```
function Obj(value) {
  this.value = value;
  this.next = null;}
Obj.prototype[Symbol.iterator] = function() {
  var iterator = {next: next};
  var current = this;
  function next() {
    if (current) {
      var value = current.value;
      current = current.next;
      return {
        done: false,
        value: value};
    } else {
      return {
        done: true};}}
  return iterator;}
var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);
one.next = two;
two.next = three;
for (var i of one){console.log(i);}
```
Generator包装js对象：遍历对象
```
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);
  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}
let jane = { first: 'Jane', last: 'Doe' };
for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
```
对象添加遍历接口：
```
function* objectEntries() {
  let propKeys = Object.keys(this);
  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}
let jane = { first: 'Jane', last: 'Doe' };
jane[Symbol.iterator] = objectEntries;
for (let [key, value] of jane) {  //解构赋值
  console.log(`${key}: ${value}`);
}
```
yield*遍历嵌套数组:
```
function* iterTree(tree) {
  if (Array.isArray(tree)) { //非数组成员转成yield状态输出
    for(let i=0; i < tree.length; i++) { //嵌套数组成员就递归几次，深度优先。
      yield* iterTree(tree[i]); //嵌套成员递归
    }
  } else {
    yield tree;
  }
}
const tree = [ 'a', [['b','b.1'], 'c'], ['d', 'e'] ];
for(let x of iterTree(tree)) {
  console.log(x);
}
```
yield*遍历二叉树(嵌套对象)：  感觉make分发格式有待改进，[1]位嵌套无法遍历，且只能判断前3项。对格式要求严格。
```
function Tree(left, label, right) {//二叉树的构造函数， 三个参数分别是左树、当前节点和右树
  this.left = left;
  this.label = label;
  this.right = right;
}
function* inorder(t) { // 递归提取嵌套对象并输出，所以左树和右树要用yield*遍历
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}
function make(array) { // 生成二叉树
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2])); 
}  
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);
var result = [];
for (let node of inorder(tree)) { 
  result.push(node);
}
```
同步形式的异步Ajax:
```
function* main() {
  var result = yield request("http://some.url");
  var resp = JSON.parse(result);
    console.log(resp.value);
}
function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);  //执行剩余部分，把数据传给result。
  });
}
var it = main();
it.next();
```
同步控制流管理：Generator > Promise > 嵌套回调
```
Promise.resolve(step1) //promise同步的分步控制。
  .then(step2)
  .then(step3)
  .then(step4)
  .then(function (value4) {}, function (error) {})
  .done();
//下面是靠递归的Generator控制流。。
function* longRunningTask(value1) {  //任务化分为步骤
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
  } catch (e) {    
  }
}
scheduler(longRunningTask(initialValue));
function scheduler(task) {
  var taskObj = task.next(task.value);  //下一步
  if (!taskObj.done) {   //递归至下一步
    task.value = taskObj.value
    scheduler(task);  
  }
}
////下面是靠循环的Generator控制流。。
let steps = [step1Func, step2Func, step3Func];  //任务化分为步骤
function *iterateSteps(steps){
  for (var i=0; i< steps.length; i++){
    var step = steps[i];
    yield step();
  }
}
let jobs = [job1, job2, job3];    //把项目划分为任务
function* iterateJobs(jobs){
  for (var i=0; i< jobs.length; i++){
    var job = jobs[i];
    yield* iterateSteps(job.steps);
  }
}
var it = iterateJobs(jobs);
var res = it.next();
while (!res.done){  //保证iterateJobs执行完毕->保证iterateSteps执行完毕（深度优先）
  var result = res.value;
  res = it.next();
}
```
Thunk函数转换器：解决传参不计算参数、不执行回调。
```
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// ES5版本
var Thunk = function(fn){
  return function (){
    var args = Array.prototype.slice.call(arguments);
    return function (callback){
      args.push(callback);
      return fn.apply(this, args);
    }
  };
};

// ES6版本
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};

var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);
```
批量异步：取得上个异步值传入下个函数 Promise
```
function logInOrder(urls) {
  // 远程一个个读取所有URL
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // 按次序输出
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}
```
批量异步：取得上个异步值传入下个函数 async
```
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```



函数表达式：运行速度：`+function(){;}()`>`1 && function(){;}()`>`(function(){;}())` IE9速度都一样。
