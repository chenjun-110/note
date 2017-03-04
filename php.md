http默认端口80
url？后面是参数
游览器接受不认识的文件是下载
服务器需要php解析器 游览器请求php-服务器解析php-发送结果
Linux源码包是模块定制安装 xampp是不可定制集成安装
Windows做服务器病毒多 appserv集成安装
ext文件夹是模块
http://localhost/找到本机文档根目录默认www文件夹的index.php。 /后面带文件名
修改apache或php.ini都要重启apache
php内嵌在html中:
`<?php   ?>`
`<script language="php"></script>`
输出：`echo " ";`==echo("")
变量：`$a=A;` 关键字可作变量名 驼峰 区分大小 未定义null
连续赋值都相等。`$a=(int)$b`把b强制转换成整数赋值，b不变
可变变量：`$$a;`=$A，值作名。
引用变量：`$b=&$a`b指向a.引用地址，仅变量有地址。
读取变量:`echo "{$name}这个人年龄有".($age)."岁了"` 字符变量用花括号，数字用引号+圆括号+点，数字在首位`{$i}`。如果数字要运算`".($i*$j)."`。
栈内存：空间小，速度快，保存的是定长数字，类。
堆内存：空间大，保存数组、对象。栈内存变量通过数字地址引用堆内存。
分号：功能代码必加，结构代码如if、class、function不加。
注释：`/** */`文档注释、`#`脚本注释
原始类型：boolean int float String Array Object Resource资源 Null 
布尔：false 0 0.0 "" "0" 空数组都是假
整数：最大数为2的31幂
小数：分单双精度float/double
浮点数：64位，计算不准，计算应用数学函数
字符串：
   转义符`\` 
   双引号：可解析{变量值}，''不可。
   单引号：只能转义'和\   占内存较小
   定界符：`<<<xx  xx;`=双引号 内部不用转义 格式很严格
`<<<'xx'  xx;`=单引号 定界符用于大量字符串。
常量：声明`define("名",值)`声明后不可改。没声明没加引号的字符串，性能很慢。 全大写 3参布尔值设置是否区分大小写 不能unset 全局性
魔术常量：位置不同值不同。如`__FILE__`文件路径 `__DIR__`文件目录
+：php中不能连接字符`1+1+"4+5+6"+1+1`js=24+5+611 php=8,因为字符串转换到4打止。
%：会把小数转为整数再求模
.：连接字符
++：$x="a"; ++$x的值是"b" js中值NaN
<>:和!=一样
and:和&&一样
or:和||一样
not:和!一样
xor:只有1个真为true
```
$a = 0;
$b = 0;
if($a=3 || $b=3){ 
       //  3||$b=3赋值给$a为true，因为||优先级高于=号
    $a++; //布尔值不参与运算
    $b++;} //b没通过条件赋值
echo $a.",".$b //1,1```
&:位运算与，用作if中可不短路。$a=3;$b=5;
    if($a>5 & $b++<100) if判断为false但$b++执行
|:按位或，同上相当于不短路的||。
反引号：执行反引号中的操作系统命令
@：忽略表达式的非致命错误信息
=>:数组下标指定
->:访问对象属性方法
运算符优先级：&超过&&超过?:超过=超过and
switch(变量）-case:变量类型只能是整型和字符串。不加break会执行并继续。变量与值只能恒等。
循环区别：switch-case用于单个值匹配分支。else if用于判断范围。

####表单
url提交:`<a href="test.php?name=chenjun&age=24">test</a>`把name变量age变量传给`$_GET`变量
用不同的参数值去到同一php文件的不同位置。
表单提交：`<form action="test.php" method="post">`把输入框的name属性也就是变量名传给`$_POST`变量
$_GET和$_POST是数组，取值`$_POST['age']`
`<select name="fuhao"><option value="+">+</option></select>`这里变量名是fuhao，值是'+'。
判断是刷新还是submit按钮:`if(isset($_POST['sub'])){}`传过来的数组里是否存在提交按钮的变量名。
提交后让输入值不重置：   php设置value值。
`<input name="num"value="<?php echo $_POST['num']?>" />`
提交后让选择项不重置：   php设置selected属性
`<option <?php echo $_POST['fuhao']=="+" ? "selected='selected'" : "" ?> />+</option>`
单数行改变样式：if($i%2==0)

####序列化
对象序列化：对象转字符串（不用看懂），保存属性和类名不会保存方法。返序列化：字符串转对象。优点：字符串可网络传输，可长期保存。
序列化语法：`$str=serialize($p);`
反序列化语法：`$p=unserialize($str);`
`__sleep`:自动调用，序列化时。返回数组，只序列化存在于数组的属性名，默认序列化全部属性。
`__wakeup`:自动调用，返序列化时。
---序列化数组是JSON格式。---
序列化数组：`$str=json_encode($arr)`
返序列化数组：`$arr=json_decode($str,true)`默认返对象。

####循环：
while(){break;} 
do{}while();  这个有分号结尾
for(;;){}     中间条件可内部if()break;代替
```
//九九乘法表
for($i=1; $i<=9; $i++) { //每行i值相同
    for($j=1; $j<=$i; $j++) { //每行j值递增<i
        echo "$j x $i = ".($j*$i)." &nbsp;&nbsp;";
    }} //".($j*$i)."注意运算格式分号、点、圆括 ```
goto：(php5.3+) 直接跳到自定义关键字处执行。goto到前文就是循环，goto循环只能用goto跳出来，否则死循环。性能超高，但是可读性差且和面向对象原则冲突。
```
if () {goto mz:}//跳过区1  ，执行2 3
else(){goto sg:}//跳过区1 2，执行3
//代码区1
mz:{ }//代码区2
sg:{//代码区3}```
break:退出循环 `break 2;`退出2层循环==break(2);
continue:跳过循环 `continue 2;`跳过外层循环

####函数：
return：return后面的代码不执行。可以不写。
函数名：驼峰命名 不区分大小写 可在被调用之前定义
参数：'.$a.' 不能少传
常量：define可全局使用。
局部变量：所有函数内部的变量都是新声明的变量。
全局变量：`global $a;`内部使用外部变量必须global关键字，不能用来赋值。或者使用`$GLOBALS['a']`全局变量数组。
全局数组：$_POST[]也是全局使用的。
静态变量：`static $a=1;`函数结束不会销毁。只会声明1次，第2次调用会忽略声明代码。一般只用于函数内部。在被调用函数之间共享。
参数：
引用参数：`function d($a,&$b`)引用参数会改变传参变量。函数内部变量改变和它有引用关系的外部变量也会变。自定义函数要改原值形参一定要有&。
默认参数：`function d($a="a",$b=3)`有默认参数的可不传值。默认参数必须摆在后面。
变量函数：`$a="函数名"; $a();`
匿名函数：和js的区别是必加分号；（php5.3+）
传参函数名：回调函数。
  1."函数名" ----变量函数
  2.array(new 类名(),"函数名") ---类中的函数方法
  3.array("类名"，"静态函数名") ---类中的静态函数方法
递归：调用自身，开辟内存新空间。
```
function test($n) {
		echo $n."<br>";
		if($n > 0)
			test($n-1); 
		else
			echo "--<br>";
		echo $n."<br>";	} //该代码在递归之后！
test(10); //2 1 0 -- 0 1 2
//实际上每次递归会开辟一个新空间，第2个echo会和第1个echo一起输出，第1次输出为 2 test(1) 2```

闭包：子函数能使用父函数的局部变量就叫闭包。
use关键字： `$var=function() use (&$a,$b){};`

####数组： 目的是批量操作数据。
创建数组：关联数组可以和索引数组共存
   1.`$a=array("one"=>"111",0=>"222","333")`
   2.`$a=["111",1=>"222"]`(php5.4+)
访问数组：$a['one']等于`$a{'one'}`$a[0] 字符串中解析用`[]`
key的强制转换："8"转8,"08"非十进制不转,8.7转8,true-1 false-0,null转""。
空key：`$a[]=i`空下标(从max下标)自动递增下标。负数可作下标。`$[][]=i`第一个【】递增
+：数组3=数组1+数组2 数组间相同下标，1覆盖2,不同下标合并
for遍历：效率高。问题：下标不连续，关联数组不能遍历。
foreach遍历：循环次数为数组长度，每遍历1次会将数组元素传给$value。（最常用）
  语法1：`foreach(数组 as $value）{}`
  语法2：`foreach(数组 as $key => $value）{}`
list()：将‘索引’数组中的元素转为变量。
  语法：`list($a,$b,...) = 数组`参数数量等于数组元素 空参代表不接收该元素。
each()：第1次调用处理数组的第1个元素，随调用递增到下个元素。返回数组包含4个元素:0(索引下标),1(索引值),key(关联下标),value(关联值)]。调用次数超过数组长度返回false。
  语法：`each(数组)`返回`[0,1,key,value]`
list-each遍历：`while(list($k,$v) = each($arr)){}`

####面向对象：
文件名：boy.class.php 二级名表示不希望别人访问
类calss：`self`指向本类
```
修饰符 class 类名 extends 父类 [接口1[接口2]]{
  [修饰符] $变量名;          // 成员属性  
  [修饰符] function 函数名(){} // 成员方法
    function 类名/__constrct(){} //构造方法
    function __destruct(){}  //析构方法}```
成员属性格式：不可有运算符。可被方法共享。
常用属性修饰符：public、protected、private、static
常用方法修饰符：同上多2个、abstract、final
实例化对象：`$o = new 类名();`
 访问属性：`$o -> 属性 = "";`
 访问方法：`$o -> 方法();`
$this:指向实例。
  `echo "{$this->name} <br>" `
  `echo $this->name."性别：男<br>" `
  `echo "名字：".$this->name.",性别：男<br>" `
  `$this->say(); `
类-构造方法：`__construct`创建实例时自动调用
功能：new class("cj")传参通过构造方法的$this赋值给实例。
类-析构方法：`__destruct`实例释放时自动调用，没有参数。
栈：变量存于后进先出栈，后定义的变量会先执行析构。
封装性：因为多数方法是为接口服务的，不封装的方法就是接口，可读性高。
`private`私有修饰符：无法被实例直接调用赋值，只能通过方法$this调用。
魔术方法：参数类型是变量。
 `__get()`:自动执行，实例直接调用私有时。会把被调的私有传参给1参。
 `__set(,)`:自动执行，实例直接赋值私有时。把被设置的属性和值传参给1参2参。优点是能对传值设定条件。
`__isset()`：自动执行，用isset判断私有时。参数值是判断的属性。
`__unset()`：自动执行，删除私有时。参数值是删除的属性。
私有，指的是：protected/private/不存在的属性。
继承性：
父类的private不能被子类方法访问
父类子类方法都能访问protected
重载：同名方法，子类覆盖父类。在子类同名函数内部写`parent::方法名();`带形参可引用父类方法所有内容，在此基础上再扩展。子类的修饰符权限只能大于父类。
关键字：
`instanceof` 判断是否属于某类
`final`修饰符：修饰类是不让类被继承，最终类。修饰方法是不能被子类方法覆盖，最终方法。
静态属性：`public static $a="1"`，所有实例共享。
访问静态属性：`类名::$变量`
静态方法不能访问非静态成员。因为不是通过对象调用的。
单例设计模式：一个实例。防止其他人盲目创建多个对象。
```
class Person {
    static $obj = null; //静态属性
    private function __construct(){} //私有构造
    static function getObj() { //静态方法
//只有第一次调用会创建对象，以后都是返回原对象。
       if(is_null(self::$obj)) 
            self::$obj = new self;
        return self::$obj;}
    function say(){echo "aaa<br>";}
$p = Person::getObj();//创建对象```
`const`修饰符：只修饰常量。(不需要define和$)
访问常量属性：`类名::常量`
`__toString`：自动调用，echo/print实例时。返回字符串。用于描述对象信息。
克隆对象：`clone $p`
`__clone`:自动调用，克隆对象时。$this指向副本。
`__call(,)`:自动调用，调用不存在的方法时。1参不存在的方法名 2参不存在方法的参数(数组)。将方法名存在数组中，用于组合功能类似的方法。
`__set_state($arr）`：自动调用，var_export输出对象时。返回值赋值给var_export。对象属性会传给$arr参数。用于和eval(var_export()) 配合灵活使用。
`__invoke`自动调用，直接调用实例时。$p();
`__callStatic`自动调用，调用不存在的静态方法时。同__call
```
function __autoload($classname){
    include strtolower($classname).".class.php";}```
在类外定义。自动调用，new不存在的类时。
动态加载方法：`类名::方法名();`就能动态加载类文件。

抽象类：`abstract class 类名{}`不能创建对象
抽象方法：`abstract function say();`没有花括号方法体。只能存在于抽象类中。子类·必须覆盖·所有抽象方法。
功能：抽象类是对子类的一种规范。
接口：声明`interface 类名{}`。属性是const常量，方法都是抽象方法，不需要abstrict。权限都是public。
功能：接口是对子类的一种规范。
继承接口关键字：implements代替extends
子类继承父类与多个接口： 
`class x extends x implements x,x,x{}`
参数：（类名 参数）代表用指定类的参数。
`__CLASS__`：代表类名。
`__NETHOD__`：代表本方法。
命名空间：解决常量名、函数名、类名的命名冲突。（5.3+）
命名语法：`namespace 空间名;`必须写在函数前。子空间`namespace 父名\子名;`可以把分号改成{}。第2个会覆盖第1个。
访问原来的同名函数：方法前加`\`或`\空间名\`。`namespace{ }`从子名访问原生空间`\父名\子名\`。
函数名/类名/常量名动态赋值给变量时需要调当前空间`\a\b();`或`__NAMESPACE__.'\b'();`。namespace也可指向本空间。
use别名：`use 空间名 as 新名;` 子空间`use 名;` 导入全局类：`use \类名;` 首字母大写。类调用不加\

字符串：
可通过`[n]`或`{n}`下标访问每个字符。
下标赋值只能赋值`单个`字符。
字符串解析数组:`{$a['']}`的作用==`.$a[""].`
字符串解析对象：`{$a->o}`

####正则 Perl的PCRE协议通用
定界符：常用$reg="//",除了字母数字"\"其它符号也可以。
原子：最小匹配单位。 . 所有原子
原子表：匹配范围`[]` -从哪到哪 ^除了 
元字符：修饰前面的单个原子。`{n}`出现次数
模式修正符：修饰模式的。与Perl兼容的需放在定界符中。
preg_split       — 正则表达式分隔字符串-数组
preg_match       — 正则表达式匹配单个-布尔
preg_match_all   — 正则表达式匹配所有-布尔
preg_grep          返回匹配成功的数组元素
preg_split         分割字符串
preg_replace_callback 搜索和处理后替换
preg_replace     — 正则表达式的搜索和替换 
如果1参搜索内容和2参替换内容都是正则数组的话，一 一对应替换。如果3参也是数组的话，返回的也是数组。
^abc 以abc开始
abc$ 以abc结束
`()` 改变优先级，组合小原子，独立子模式，反向引用：`\1`放在原子前，引用第1个括号和本括号匹配内容相同。`?:`写在括号开头，取消子模式，\n无法引用到。
`\n` 可用在替换内容引用
`*?`取消贪婪模式，所有次匹配0或1次。例如多个标签逐个匹配，不会匹配到超大标签。
`/.*/imsxU` 不分大小写 多行匹配 .可匹配换行 忽略空白 翻转贪婪模式
单引号不用转义符
####错误报告
ini_set("display_errors","On"); 动态改ini开启错误报告
网站上线后要关闭。ini_get获取设置值
文件顶部`error_reporting();`可改
E_ALL & ~E_NOTICE   抛出任何非注意的错误
E_ERROR | E_PARSE | E_CORE_ERROR
只考虑致命的运行时错误、新解析错误和核心错误
E_ALL & ~(E_USER_ERROR | E_USER_WARNING | E_USER_NOTICE)    报告除用户错误之外的所有错误
set_error_handler 用自定义函数处理错误 用于把错误报告生成在文档最后或跳出页面
配置php.ini:
error_reporting=E_ALL   向PHP发送错误
display_errors=off      不显示错误
log_errors=on           开启错误日志（位置）
log_errors_max_log=1024 每个日志最大长度
error_log=syslog        开启系统日志(设置错误文件位置）
日志文件：access.log访问日志 apache_error.log阿帕奇错误日志
try-catch: try和catch是一体的。
```
try{
    代码1;
    throw new Exception("信息");//抛出Exception的实例
    代码2;//不执行 $e=new Exception
}catch(Exception $e){ //Exception是系统的类
    echo $e->getMessage();//"信息"
    代码3;}```
抛出：throw new Exception可以在其它地方使用，抛出的信息都会回到catch语句中。比如throw放在某函数的条件判断下，一定是抛出的是某类的实例化对象这样才能传参进入catch。
自定义异常类：可以自定义Exception的子类替换cactch。用于自定义解决方法。

文件：
目录分隔符统一用"/",常量DIRECTORY_SEPARATOR
多路径分隔符：win是";" Lin是":",常量PATH_SEPARATOR
换行符统一用"\n",常量PHP_EOL
相对路径：`./ ../ ../../ ../../../`./写不写都是当前
根路径："/" 文档的根在服务器 PHP的根在操作系统

文件上传设置：method="post" enctype="multipart/form-data" 设置了enctype后上传文件会进入$_FILES
隐藏表单`<input type="hidden" name="MAX_FILE_SIZE" value="1000000" />`上传最大1MB，放在输入框之前
修改配置文件：
file_uploads=On 开启文件上传
upload_max_filesize=2M 文件上传大小限制
post_max_size=8M post文件限制（最大不超过1/2服务器）
upload_tmp_dir=NULL  上传文件存放的默认临时路径
$_FILES数组包含上传文件信息：name type size tmp_name(临时路径) error(0没错 1文件过大 2文件过大 3没传完 4没上传) 读取：`$_FILES['上传'][eror][n]` n是多文件索引

文件下载：`<a href="xx.rar">x</a>`游览器认识的会访问，不认识的就下载。认识的需调整头信息。
头信息：
`header("Content-Type:text/html");`文件类型.图片是images/jpeg
`header("Content-Disposition:attachment;filename={$文件名}");`文本描述是附件，游览器默认下载。
`header("Content-Length:");`文件大小

MySQL:
默认端口：3306
phpinfo();    查看扩展库
mysql_connect 连接数据库('主机'，'用户'，'密码')
mysql_error   错误信息
mysql_close   关闭数据库  
mysql_query($sql) 运行sql，返回结果集（sql不用分号，值可解析变量，都要用单引号。字符集最好不要在php设置）
mysql_select_db 选择默认数据库
mysql_affected_rows 取得前次操作的mysql行数（用于检测没有结果集的sql）
mysql_insert_id    获取最后插入的ID
mysql_fetch_row    处理结果集 返回索引数组
mysql_fetch_assoc  处理结果集 返回关联数组
mysql_fetch_array  处理结果集 返回索引数组和关联数组 
mysql_fetch_object 处理结果集 返回对象
mysql_num_rows     处理结果集 返回行的数量
mysql_num_fields   处理结果集 返回字段的数量（列就是字段）
mysql_field_name   处理结果集 返回字段名

PDO：是类库不是函数库。
配置文件的extension=php_pdo_mysql.dll 去掉前导分号就是开启mysql驱动
$pdo=new PDO($dsn，"用户名"，"密码")
$dsn="mysql:host=localhost;port=端口;dbname=库名"
可以使用try-catch抛错到PDOException类
设置异常模式 $pdo->setAttribute(错误处理，异常模式) 
PDO::ATTR_ERRMODE 错误处理
PDO::ERRMODE_EXCEPTION 异常模式
PDO::ERRMODE_WARNING 警告模式
也可实例->方法()调用：
PDO::exec  执行SQL 无结果集 返回影响行数
PDO::query 执行SQL 有结果集
事物处理：仅innodb引擎支持（多条SQL执行一个事，出现错误，所有SQL会失效）
  set autocommit = 0; 关闭自动提交(SQL语句)
  start transaction; 开启事物(SQL语句)
  rollback; 撤销(SQL语句)
  set autocommit = 1; 开启自动提交(SQL语句)
PDO::ATTR_AUTOCOMMIT 自动提交，0关1开 用setAttribute设置
beginTransaction() 开启事物
commit() 提交事物
rollback() 撤销所有操作
PDO::ATTR_AUTOCOMMIT 自动提交，运行完成后要开启
事物处理一般用于转账，出现错误回滚初始值。
SQL注入攻击：
delete from users where id='{$_GET['id']}'
用户输入`5' or 1='1` 因为1='1'返回条件真，删除所有数据。SQL语句有变量的需要预处理防止被攻击。
$stmt=$pdo->prepare 等待SQL，把语句放在服务器编译后等待,values(?)或values(:a,:b,:c),问号类似索引数组，冒号类似关联数组。
bindParam() 绑定参数到变量。(n,$a)把第n个?绑定到$a或("a",$a)
bindColumn  绑定列到变量
$stmt->execute() 执行等待的SQL
$stmt->fetch(PDO::FETCH_NUM) 返回行数量的数组
$stmt->fetchAll(PDO::FETCH_NUM) 返回所有信息的索引数组

MemCached 管理内存软件
默认端口：11211
安装exe：命令行memcached.exe -d install
查看开启的端口：netstat -a
查看ip地址:ipconfig
连接客户端：telnet IP地址 11211
查看客户端状态：stats
安装函数库：复制dll到php\ext下。ini文件去掉分号。
addServer 添加服务器(多个会均匀存数据，也就是分布式)

http协议：
建立TCP连接：http1.0每次仅发送1个请求,1.1可多个。
请求：请求行：GET/POST 请求头：Accept/Connection/Host/referer/User-Agent/Accept-Encoding 请求内容
响应：响应行：状态码  响应头：header(""); 响应内容：echo
关闭TCP连接
img标记会触发http请求,图片数量会增加请求次数
,超链接也会触发http请求

会话：跟踪同一个客户端的请求，共享变量。
Cookie信息是被头信息带过来的,请求的头会保存到$_COOKIE数组.
setCookie() 把变量放到客户端cookie，("变量名"，"变量值"，时间)变量名为a[n]是数组,a[]会覆盖不建议。
setCookie() 删除cookie是设置过去时间，值为空。退出登陆要删除所有cookie。
跳转页面：js中的location="a.php"能。php中的header("Location:a.php")能。
每个隐私页面都要判断是否登陆：isset（$_COOKIE[]）
$stmt->execute(array($POST[],md5($_POST[])))，查出数据就是登陆成功。
用list()=$stmt->fetch(PDO::FETCH_NUM)可把数据从数据库提出来保存在变量中，用来设置cookie。
游览器可以禁掉cookie，这时可以用session。区别是cookie保存唯一sessionID在服务端。
session_start() 每个页面都要先开启，头信息把PHPSESSID保存在客户端cookie和服务端session文本。
$_SESSION=array() 清空服务端session文件
setCookie 删除客户端cookie的session(session_name(),"",time()-3600,"/")
session_destroy() 销毁，删除服务端文件。
配置文件中session.save_handler=user是存储方式
session.save_path是存储路径



GD库：动态响应图，验证码，自动缩放图，水印。ImageMagick库会代替GD库。
`<img id="t"src="x.php" onclick="this.src='x.php?'+Math.random()" />`验证码点击刷新
`setInterval(function(){document.getElementById("t").src="x.php?"+Math.random();},1000);`表盘js每隔1秒请求1次动图地址，加随机数参数避免缓存
imagecreatetruecolor创建画布
imagedestroy        关闭画布
header("Content-Type:image/jpeg,") 保存
imagejpeg           输出
imagecolorallocate  设置颜色 rand(0,255)随机色
imagefill           填充
imageline           画线
imageellipse        画圆 imagefilledellipse填充圆
imagerectangle      画矩形
imagearc            画弧（用于验证码干扰线）
imagestring         画字
imagettftext        画字体字
imagechar           画水平字
imagesetpixel       画单一像素(用于验证码干扰点)
sin                 正弦
session_start       开启空间
imagecreatefrompng  在png中创建画布
getimagesize        图片信息
imagecopyresampled  复制图片修改大小
imagerote           旋转图片
表盘核心：时钟每秒角度变化360/60=6度.
验证码核心：$_SESSION['code']==$_POST['code']

超全局数组变量：
$arr = !empty($_POST) ? $_POST : $_GET;
请求数组参数：href="demo.php?action`[]`=add&action`[]`=mod&id=5&name=admin"  加[]的2个同名变量会合成1个数组
或者表单name属性传数组参数：`name="name[]"`,`name="name[one]"`,`name="name[0]"`

手册格式说明：`bool a (string &$a，mixed $b[,callback $c],$...,)` a函数返回布尔值，传参类型为引用变量类型、任何类型、函数类型(可选,"函数名"),传参个数随意。有标&的引用参数可以直接用且会改变原值，没标要赋值给变量调用变量生效。

常用API：   手册中所有数组和字符串函数要熟。
eval()      检查并执行PHP代码 将代码转为字符串可更灵活
empty()     内容空true 
unset()     解除变量引用（不重建索引）
isset()     存在true
floor       向下取整
round       四舍五入
字符串：
---输出---
echo        打印多个值，逗号隔开
var_dump()  打印(类型)
print_r( )  打印(值)
print       打印1个值
printf      格式化打印字符串（1参转换格式，2参变量）
sprintf     格式化返回
var_export  打印（2参true，返回合法代码）
---增删转改---
str_replace
rtrim       删除右边，默认空格，（$a," "）
ltrim       删除左边
trim        删除2边 （，"0..9a..z"）删除所有数字和小写
str_pad     添加    （$a,长度，"填充字符"，常量）常量为STR_PAD_LEFT左添加 STR_PAD_RIGHT右添加 STR_PAD_BOTH双添加
strtolower  字符串转小写 
strtoupper  转大写
ucfirst     首字母大写 
ucwords     每首字母转大写

explode     分割字符串(","，$str)(删逗号返数组)
implode     组合字符              数组转字符
----HTML字符串--
htmlspecialchars 转为实体，防止输入代码字符
                 在php.ini改magic_quotes_gpc=on
addslashes       给引号加转义符
stripslashes     删除转义符
strip_tags       删除html标签
nl2br            把\n转为<br>
md5              md5加密 最好多重加密md5(md5()."abc")
usort            排序
strcmp           二进制比较 (返回1 0 -1)
strcasecmp       二进制比较 (忽略大小写，单字符逐个比较)
strnatcmp        自然比较
strnatcasecmp    自然比较 (忽略大小写)
--a--
strrev        颠倒字符顺序
strien($a)    字符串长度类似js的.length()
substr        下标改为能赋值多个字符.2参切割
mb_substr     同上，支持汉字
number_format 转千分制，2参小数位   
strstr
strpos        

define()      声明常量
defined()     存在常量true
exit():==die()脚本只执行到此，连html代码都会终止

参数：
file_put_contents(1,2) 2生成到1文件里
func_get_args()        接收所有传参的数组
func_num_args()        接收所有传参数组的个数
call_user_func_array() 传参(任意数量)给指定函数
function_exists()      函数是否存在

资源：
opendir("./文件夹") 打开目录资源(.当前夹 ..上级文件夹)
readdir()   从目录里读取资源(多调1次，读下1个)
closedir()  关闭opendir
rewind      倒回文件目录（又可以重新遍历文件）
is_dir()    是否是目录 "./"当前文件夹
is_file     是否是文件
is_readble is_writable is_executable是否可读可写可执行
include("") 载入函数库文件路径==include ""(用于择机载)
include_once("") 同上，只载入1次避免重复函数，失败警告
require("") 同上上,区别：处理失败会致命错误(用于必载入)
file_put_contents 把x保存在xx文件里
file_get_contents   x提取从xx文件里
file_exists 文件是否存在
filetype    获取文件类型
filesize    获取文件大小
filectime fileatime filemtime 创建 访问 修改时间戳
basename    获取文件名
dirname     返回目录，删除文件名
pathinfo    返回目录信息有关数组
glob        返回目录下所有文件数组  `*.php`所有php
disk_total_space 磁盘总大小
pow         幂（用于被除得出TBGBMBKB）
disk_free_space  磁盘剩余大小
mkdir       创建目录
rmdir       删除空目录
unlink      删除文件
rename      重命名或移动资源
copy        复制文件
touch       创建文件    
ftruncate   截取文件资源
file_put_contents 写入文件
file_get_contents 读取文件
readfile    读文件
file        每行返回数组
fopen       打开文件资源
fwrite      写入文件
fclose      关闭文件资源
fgetc       每次读1个
fgets       每次读1行
fread       读自定义长
fseek       移动指针
ftell       返回指针位置
rewind      倒回指针
feof        指针是否在末尾
flock       锁定文件资源 
move_uploaded_file 将上传文件复制到指定目录


强制转换：
gettype() 返回类型
settype(变量，"类型") 强制转换类型
intval(),floatval(),strval()强制转换
(int) (bool) (float) (string) (array) (object)强制转换--用于赋值，(int)类似js的parse解析数字

判断：
is_bool() is_int() is_float() is_string() is_array() is_object() isresource() is_null() is_scalar()是否为标量 is_numberic()是否包含数字 is_callable()是否为函数
function_exists("") 函数存在true

错误：
error_reporting(E_ALL & ~E_NOTICE);显示所有错误并且除了注意

数组：(基本不用自定义，内置够用)
count()  数组长度--把该函数赋值给变量可优化。(调用多次)
key()            当前元素下标
current()        当前元素值
prev()           上一个元素(调用1次指针往上走1次)
next()           下一个元素(类似调用each()改变当前元素)
reset()          第一个元素
end()            最后的元素
array_slice      取出数组连续的一段
array_splice     删除并替换数组连续的一段
array_combine    组合数组（数组1作key数组2作值）
array_merge      合并数组
array_intersect  数组间交集
array_diff       数组间差集
array_push       压入栈---增末
array_pop        弹出栈---删末-先进先出
array_unshift    压入队列-增首
array_shift      弹出队列-删首-后进先出-重置key
array_rand       随机取出下标
shuffle          随机打乱数组
array_sum        求和
range            设置数组范围
array_fill       同上（可填充值）
http_build_query 把数组转换成url中的&格式

--键值对---
array_search     根据值返回key 
in_array         是否存在某值
array_key_exists 是否存在某key
array_values     返回所有值（重建数组索引）
array_keys       返回所有key
array_flip       调换键值位置
array_reverse    倒序值位置
--统计-----
count            数组长度 2参=1统计多维数组
array_count_values统计相同值个数
array_unique     删除重复值
--回调函数---
array_filter     过滤（函数内保留值return真）
array_walk       对每个元素应用函数(函数的1参值，2参key 
.                array_walk的3参传给匿名函数的3参)
array_map        函数应用每个元素(返回值是新数组的元素)
.                的1参null会合并数组2参数组1,3参数组2
--排序-----     
array_multisort  多个数组排序（数组间有行列对应关系） 
sort             值升序（不保留key，用于索引数组）
rsort            值降序
ksort            key升序
krsort           key降序
asort            值升序（保留key，用于关联数组）
arsort           值降序
natsort          自然排序（短字符排前，有数字按数字排）
natcasesort      自然排序（同上，不区分大小写）
usort            自定义比较函数值排序（-1 0 1）
uasort           自定义比较函数值排序（保留key）

超全局数组变量：9个。
$_SERVER 服务器变量(最常用)
$_GET    HTTP GET变量
$_POST   HHTP POST变量
$_COOKIE HTTP Cookies变量
$_FILES  HTTP文件上传变量
$_ENV    环境变量（不重要）
$_REQUEST 能接受所有请求(不重要，包括get post cookie)
$_SESSION Session变量
$GLOBALS 全局变量
setCookie() 设置cookie
session_start() 开启$_SESSION

错误：
E_ERROR         致命的运行时错误（阻止脚本执行）
E_WARNING       运行时警告(非致命性错误)
E_PARSE         从语法中解析错误
E_NOTICE        运行时注意消息(可能是或可能不是一个问题) 
E_CORE_ERROR    PHP启动时初始化过程中的致命错误
E_CORE_WARNING  PHP启动时初始化过程中的警告(非致命性错)
E_COMPILE_ERROR 编译时致命性错 
E_COMPILE_WARNING 编译时警告(非致命性错) 
E_USER_ERROR    用户自定义的致命错误 
E_USER_WARNING  用户自定义的警告(非致命性错误)
E_USER_NOTICE   用户自定义的提醒(经常是bug) 
E_STRICT        编码标准化警告(建议如何修改以向前兼容) 
E_ALL           所有的错误、警告和注意信息

时间：
time 获取时间戳（可运算）
mktime 从指定时间到现在的秒数
data 自定义时间格式·`(Y年m月d日 H:i:s,time()+8*60*60)`
date_default_timezone_set("PRC") 设置中国时区
date("H") 获取当前时
date("i") 获取当前分
date("s") 获取当前秒




