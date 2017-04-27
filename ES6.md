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