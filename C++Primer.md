[TOC]

看书的小人：基础 书:可跳过的细节区 放大镜：重点 黑体字：新术语 楷体字：术语 GNU编译器4.7.0 
g++ main.cpp -o main
./main
报错：expected是语法错误。invalid conversion是类型赋值错误。declared是声明错误（没声明或命名空间错误）
和js语法区别：
  1. 没有===，只有==
  2. 函数声明没有关键字。声明函数：`int main{}` int是返回值

序：学C++的一个境界是把自己想象成编译器。工作中只用到C++的少数特性，但C++库是用了很多特性的，所以要完整的学习它。编程语言的竞争本质上是抽象设计的如何。C是对硬件的抽象，C++的成功在于它和C在同一抽象层。
编程风格：纯C 基于对象 面向对象 泛型 基于组件。之所以支持这些风格，因为足够抽象。11优化了面向对象写法，减少了过度技巧。
每一个具体的技术领域读四五本书即可：<C++标准程序库> <Effective C++> <Linux多线程服务端编程>

###第一章
每个程序必须有main函数。
流：字符按时间顺序生成或消耗。
编译器：不同编译器后缀不同 .cc .cxx .cpp .cp .C 。
命令行
  编译：`编译器 name.cc` 在win中转为 .exe ,Unix转为 .out 。
  文件重定向：`name.exe <a.txt> b.txt`
执行：win-`name`或者`.\name`.\表示当前目录。 Unix-`name.out`或`./name.out`
获得返回值：win-`echo %ERRORLEVEL%` Unix-`echo $?`
引用：
  `#include <标准库名>` | `#include "class_a.h"`
iostream库：
 1. 输入对象`cin` 输出对像`cout cerr clog`
 2. `std::cout << "name:" << std::endl;` << 把字符串写入ostream对象并返回该对象，再结束当前行并把缓冲区数据刷入输出流至设备。 std是标准库的命名空间`using namespace std;`可免写`std::`。
 3. `std:cin >> a >> b` >> 从输入流对象读取值赋值给ab变量。
 4. `std:cout << "name: " << a << "and" << b << "is" << a + b << std::endl;`

while循环适合循环次数是未知数。`while (cin >> v){}` 不断把输入值存进变量来，因为检测的是cin对象，只会在报错/输入错误/文件结束符Ctrl+Z才会判定为false，if条件句同理。
类：
 类声明对象 `class_a a;`
 相同对象可以+相加，对应各属性值的和,返回对象仍属于该类。
 可以=赋值
 点号.只能访问public
###第2章 变量和内置类型
类型：规定数据的内容和运算方式。cpp支持自定义类型。
内置类型：空类型、算术类型：整型（char、bool）、浮点型。
存储：1字节=8比特(0/1)   1字=4/8字节=32/64比特
无符号类型：加前缀unsigned (int),大于等于0。
带符号类型：int short long  long long,负数 0 正数。前缀signed。遵从正负值均衡分布。
c++标准规定至少为8比特的char。`unsigned char`可以表示0-255。`signed char`可能表示未-128-127,具体看编译器。
最佳实践：
  明知值为非负，unsigned
  整数运算unsigned int最大是65535，超过用long long。根据数值大小适当选取类型及是否带符号！
  不要用char做算术运算，做就必须指定是否带符号，因为各机器实现不同。
  浮点运算用double。性能比float快且精度高。
  不同类型相互运算，通常向字节大的转。
隐式转换：
  非0数赋值给bool变量，值转为1。0转0。bool赋值给int，值只会是1/0。
  `int a=4.9`//a=4 小数被向下取整，`double b=a`//b=4.0多个0。

###### 如何选择内置类型
![cpp如何选择内置类型-2020-10-29-22-45-41](http://img.996lucky.top/markdown_cpp如何选择内置类型-2020-10-29-22-45-41.png)
###### 算术类型
![cpp算术类型-2020-10-29-22-46-10](http://img.996lucky.top/markdown_cpp算术类型-2020-10-29-22-46-10.png)