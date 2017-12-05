#### gcc
默认生成.out: gcc main.c 
自定义后缀： gcc main.c -o main 
打开警告： gcc -Wall main.c
链接数学库： gcc main.c -lm 链接libm.so库。   gcc默认-lc链接libc.so库
C99标准编译： -std=c99
断点调试：gcc -g main.c -> gdb main.out -> start -> l列出源代码 -> `b 行数`加断点/`break 行数 if a!=0`条件断点 -> c自动执行并在断点处停止 -> n下一步 step/finish进入退出函数 bt调用栈 `p 变量`和`i locals`打印值 `set var 变量=值`或`p 变量=值`中途修改变量值 `delete/disable/enable breakpoints 编号`删除禁用断点 run从头开始连续执行  回车重复上个指令 
#### Linux
安装路径：/usr/bin/gcc-4.8
vim改源文件：/etc/apt/sources.list 阿里云源16.04的可用 源和安装版本必须相同
装不了软件时，慎用：Unable to locate package update
```
apt-get clean
rm -rf /var/lib/apt/lists/*
apt-get clean
apt-get update 更新源
apt-get upgrade 更新已安装的包
```
有多个gcc版本时指定gcc`sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 100`
aptitude install libqt4-dbus=4.4.3-1
软连接：`ln -s a b` 硬链接：`ln a b` 软连接不能删源文件，硬链接可以。
##### shell
返回上个程序的返回值：echo $?
####
C程序从main函数的第一条语句开始执行
数据类型：
  1. `char`本质是ASCII编码也是整数，只不过取值范围比`int`型小，所以统称为整型
  2. '0'~'9'的ASCII码是十六进制的30~39
  3. 函数：不写返回类型表示int型，不推荐。
  4. char字符 int整型 float浮点 double  long double 类型表明多大的存储 char占1字节
隐式转换:
  1. `minute/60.0` 左边的minute也转成`double`型
  2. `'a'+1`转换，是累加ASCII编码，不是拼接！

局部变量通过函数传参代替用全局变量
块级作用域：任何地方遇到{}包裹的块，局部变量都不会污染外部。

#### 语法
```

```
printf("",值) %c字符型、%d整型、%f浮点型、%s字符串数组
字符串转义： `\t`水平制表符和按下Tab键的效果相同，用于在终端下定位表格的下一列。 windows的行分隔`\r\n`,Linux的行分隔`\n`。`%%`表示%
变量
  变量/函数声明： void a(void)如果函数定义调用之后，编译器需要通过声明知道。
  定义会分配存储空间。
  全局变量：必须在编译期能被计算出来，不能被赋值表达式，局部变量可以。 全局变量声明未赋值就是整型0，字符型'\0'，浮点型0.0
表达式：*/的优先级高于+- 从左到右计算 多等号先算右等 如果一个表达式的值为void，就不能把它当作另一个表达式的一部分来用。
引号：""表示以'\0'结尾的char型数组，''表示一个char型变量。
比较：
  优先级：相等性运算符的优先级低于关系运算符。!高于*/%，高于+-，高于>、<、>=、<=，高于==、!=，高于&&，高于||
  没有===，只有==
  左右类型要相同。
  编译期识别else总是和最近的if配对
  浮点型是不能精确比较相等不相等的
--i返回减1之后的值，而i--返回减1之前的值
结构类型：可以嵌套声明
```
enum type { RECT, POLAR }; //RECT=0 POLAR=1
struct complex_struct { double x,y; enum type z;  }; //声明
struct complex_struct z = { 3.0, 4.0 }; //常量定义 变量定义需要在局部。
// 取变量z的成员z.x z.y
void print_time(int hour, int minute)
{
	printf(" %d : %d ", hour, minute);
}
```
数组：
  声明：`int a[4]；` 4个整数组成的数组
  定义：`int a[] = {2,4,6}；`编译器识别为3位数组  `int arr[3]={};`指定3位数组 `char str[10] = "Hello";` 
  多维数组：`int a[3][2] = { 1, 2, 3, 4, 5 };`一维三项二维二项 类似js的[[1,2],[3,4],[5,0]]。 
```
  int a[][2] = { { 1, 2 },{ 3, 4 },{ 5, } }; 定义二维二项数组，一维项数由编译器决定为3。
```
  特点：不能互相赋值，不能做参数和返回值。
  值先加再赋值到数组 {++arr[a[i]];} 
常量：预处理期间，`#define ONE 1`