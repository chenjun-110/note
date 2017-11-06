常用命令:
create database abc;(创建数据库)
show databases;(就可看到所有已经存在的数据库，以及刚刚创建的数据库abc)
use abc;(进入abc数据库下面)
show tables;(产看abc数据库下面的所有表,空的)
source G:\test.sql（导入数据库表）
show tables;(查看abc数据库下面的所有表,就可以看到表了)
desc pollution;(查看表结构设计)
select * from pollution;
exit(或者ctrl + c)退出mysql



基础：
区分大小写：库名 表名 表别名 变量。 不区分：列名 列别名

安装：
  my-default.ini:
```
[mysqld]
skip-grant-tables
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES 
bind-address = 0.0.0.0
port = 3306
basedir=E:/mysql-5.6.38
datadir=E:/mysql-5.6.38/data
max_connections=200
```
  mysqld -nt -install/-remove
  net start/stop mysql





















##视频教程
目录结构
bin可执行文件 data数据文件 docs文档 include包含的头文件  lib库文件 share错误消息和字符集
登陆：mysql -uroot -p -P3306 -h127.0.0.1
退出：exit; quit; \q;
上下键输入以前输入国的命令行
提示符：
\D 日期 \d当前数据库 \h服务器名 \u当前用户
语法规范：关键字和函数名大写，数据库名 表名 字段名小写，SQL分号结尾

创建数据库语法：`CREATE {DATABASE | SCHEMA} [IF NOT EXISTS] db_name [DEFAULT] CHARACTER SET [=] charset_name`{}必选项 []可选项 IF是忽略错误 
修改数据库语法：`ALTER {DATABASE | SCHEMA} [db_name] [DEFAULT] CHARACTER SET [=] charset_name`
删除数据库语法：`DROP {DATABASE | SCHEMA} [IF EXISTS] db_name`
查看数据库语法：`SHOW {DATABASE | SCHEMA} [LIKE 'pattern' | WHERE expr]`

数据类型：整型
TINYINT 2的7次幂 SMALLINT 2的15次幂 MEDIUMINT 2的23次幂 INT 2的31次幂 BIGINT 2的63次幂 UNSIGNED无符号位
浮点型：FLOAT[(M,D)] DOUBLE[(M,D)] M总位数 D小数位数  DECIMAL[(M[,D])] 
日期时间型：YEAR年 TIME时分 DATE年月日 DATETIME年月日时分 TIMESTAMP时间戳
字符型：
`CHAR(M)` M<=255，定长值，不足空格补齐。
`VARCHAR(M)` M<=65535，变长值。
`TINYTEXT` 2的8次方。
`TEXT` 2的16次方。
`MEDIUMTEXT` 2的24次方；
`LONGTEXT` 2的32次方；
`ENUM`（'',...）枚举值；
`SET`（'',...) 集合（最多64个）；

数据表是数据库的一部分
打开数据库语法：`USE db_name;`
创建数据表语法：`CREATE TABLE [IF NOT EXISTS] table_name(回车 column_name data_type,...);`后面可跟SELECT语句赋值。
查看数据表语法：`SHOW TABLES [FROM db_name] [LIKE 'pattern' | WHERE expr];`
查看数据表结构：`SHOW COLUMNS FROM tbl_name；`
插入记录：`INSERT [INTO] tb1_name [(col_name,...)] VALUES(VAL,...);`
记录查找：`SELECT expr,... FROM tb1_name;` * 可过滤字段
NULL,字段值可以为空，写入记录时可以不写值、赋值
NOT NULL （非空约束）,字段值禁止为空
AUTO_INCREMENT (自动编号)，需和主键一起使用
PRIMARY KEY (主键约束)，表内只能有1个 不为空 保证记录唯一性
UNIQUE KEY (唯一约束)，可多个 可为空 唯一性
DEFAULT (默认)，如果没有明确为字段赋值，则自动赋予默认值
FOREIGN KEY (外键约束)保持数据一致性完整性，
实现一对一或一对多关系。父表子表必用INNODB存储引擎，外键列和参照列长度和符号位必须相同。参照列会自动创建索引。语法：`FOREIGN KEY (子表项名) REFERENCES 父表名 (父表项名)`
外键约束：物理外键。只支持innodb，通常用逻辑外键。
CASCADE: 父表删除或更新会对子表同样设置。
SET NULL: 父表删除或更新行，设置子表为NULL。
RESTRICT或NO ACTION: 都是拒绝对父表删除或更新。

增删改查：
删除列：`ALTER TABLE tb_name DROP[COLUMN] col_name;`
添加单列：`ALTER TABLE tb_name ADD[COLUMN] col_name column_definition [FIRST|AFTER col_name];`FIRST添加到首列，AFTER某列之后
添加多列：`ALTER TABLE tb_name ADD[COLUMN] (col_name column_definition,...);`用逗号隔开，ADD和DROP可同时用
删除记录：DELETE FROM province WHERE id=3;删除当id=3的项
添加主键约束：
`ALTER TABLE tb_name ADD [CONSTRAINT[symbol]] PRIMARY KEY [index_type](index_col_name,...)`
添加唯一约束：
`ALTER TABLE tb_name ADD [CONSTRAINT[symbol]] UNIQUE [INDEX|KEY] [index_name] [index_type] (index_col_name,...)`
添加外键约束：
`ALTER TABLE tb_name ADD [CONSTRAINT[symbol]] FOREIGN KEY(列名) REFERENCES tb_name(列名)`
添加/删除默认约束:
`ALTER TABLE tb_name ALTER [COLUMN] col_name {SET DEFAULT literal | DROP DEFAULT}`
删除主键约束
ALTER TABLE tb_name DROP PRIMARY KEY 
删除唯一约束
ALTER TABLE tb_name DROP {INDEX|KEY} index_name 
删除外键约束
ALTER TABLE tb_name DROP FOREIGN KEY fk_symbol 
删除唯一约束/索引: ALTER TABLE tbl_name DROP INDEX 索引名;
修改列定义：
ALTER TALBE tb_name MODIFY [COLUMN] col_name column_definition [FIRST|AFTER col_name]
修改列名称：可带多个change
ALTER TABLE tb_name CHANGE [COLUMN] 旧名 新名 column_definition [FIRST|AFTER col_name]
数据表更名：
ALTER TABLE tb_name RENAME [TO|AS] new_tb1_name
`RENAME` TABLE tb_name `TO` new_tbl_name [,tbl_name2 TO new_tbl_name2]

插入记录一:可插多列,数字都要加引号
INSERT [INTO] tb_name [(col_name,...)] {VALUES|VALUE} ('...'),('...'),...;
插入记录二:只插单列，等于号赋值，可子查询 INSERT [INTO] tb1_name SET col_name={expr|DEFAULT},...
插入记录方式三：INSERT [INTO] tb_name [(col_name,...)] SELECT ...
修改记录（单表更新）：条件和赋值都是单等号
UPDATE [LOW_PRIORITY] [IGNORE] table_reference SET col_name1={expr1|DEFAULT}[,col_name2={expr2|DEFAULT}]...[WHERE where_condition]
可新多条记录；当省略WHERE条件时，所有记录的值将会更新
删除记录（单表删除）:
DELETE FROM tbl_name [WHERE where_condition]
查找记录:使用率80%
SELECT select_expr [,select_expr...]
[
FROM tbl_references
  [`WHERE` where_condition] 
  [`GROUP BY` {col_name | position} [ASC | DESC],...] （查询结果分组：会产生同名项有数量）
  [`HAVING` where_condition] 条件分组
  [`ORDER BY` {col_name | expo | position}  [ASC | DESC],...] 结果排序asc升序，desc降序
  [`LIMIT` {[offset,] row_count | row_count OFFSET offset}] 限制结果数量
]
ANY任意一个 ALL全部 IN'数组'范围
子查询就是括号里的：SELECT * FROM t1 WHERE col1 = (SELECT col2 FROM t2); 前者是外层查询
多表更新是指：参照另外的表来更新本表
`update tdb_goods(要更新的表) inner join tdb_goods_cates(参照表) on goods_cate=cate_name（更新的条件） SET 表A.x=表B.xx` SET是赋值
JOIN操作：tableA {[INNER|CROSS] JOIN | {LEFT|RIGHT} [OUTER] JOIN} tableB ON condition_expr
INNER JOIN：只显示左表及右表符合连接条件的记录，即交集
LEFT JOIN：显示左表的全部记录及右表交集的记录
RIGHT JOIN：显示右表的全部记录及左表交集的记录
表别名：select * from TableA as A inner join TableB as B on A.Key1 = B.Key1 有同名列必须用别名
多表查询的列可以不存在，只作显示用。条件才是查询的关键。左连接中如果左表有匹配，右表无匹配，可以显示字段但为NULL。如果设置了NOT NULL会停止下面的查询。（如果左右表匹配，两者的行数据会组合到一起以查询列显示？）
无限分类数据表：
查找所有分类及其子类的数目
`SELECT p.type_id,p.type_name,count(s.type_name) AS children_count FROM tdb_goods_types AS p LEFT JOIN tdb_goods_types AS s ON s.parent_id = p.type_id GROUP BY p.type_name ORDER BY p.type_id;`
ON s.parent_id = p.type_id;这是父子分类的关键
GROUP BY p.type_name 这是按数量的关键

自定义函数
1.函数体可以由合法的SQL语句构成；
2.函数体可以是简单的SELECT或INSERT语句；
3.函数体如果为复合结构则使用BEGIN...END语句；
4.复合结构可以包含声明、循环、控制结构。
语法1：普通版
```
CREATE FUNCTION f1(num1 SMALLINT UNSIGNED num2 SMALLINT UNSIGNED)    函数名，参数无逗号
RETURNS FLOAT(10,2) UNSIGNED 返回值类型
RETURN (num1+num2)/2; 返回值```
语法2：复合版
```
DELIMITER //  （将结束符修改为//）
CREATE FUNCTION f2(username VARCHAR(20))
RETURNS INT UNSIGNED   返回类型
BEGIN                  复合起点
INSERT test(username) VALUES (username); 分号
RETURN LAST_INSERT_ID(); 分号
END                    复合终点
//     函数结束符
```

存储过程：预编译集合，类似变量和函数。
优点：灵活，快速-存在内存里，减少网络流量-字节少。
语法：过程体和函数基本一致
```
CREATE
[DEFINER = { user | CURRENT_USER }]  设置用户
PROCEDURE sp_name([proc_parameter[,...]])参数
[characteristic ...] routine_body 特性
```
调用语法：CALL sp_name();
参数分3种：有逗号
 IN，调用存储过程时指定，不能返回。
 OUT，可以被存储过程改变，可以返回。
 INOUT，调用时指定，并且可被改变和返回。
特性：
 CONTAINS SQL:包含SQL语句, 但不包含读或写数据语句
 NO SQL:不包含SQL语句
 READS SQL DATA:包含读数据的语句
 MODIFIES SQL DATA:包含写数据的语句
 SQL SECURITY {DEFINERINVOKER}指明谁有权限来执行
例子：CREATE PROCEDURE sp1() SELECT VERSION();
删除存储过程：DROP PROCEDURE [IF EXISTS] sp_name
修改：只能修改注释、内容类型，不能修改过程体。
变量：
SET @a; 声明用户变量，只对当前客户端有效。
SET @@global.a; 声明全局变量/set GLOBAL 变量名
declare语句专门用于定义局部变量，仅存在BEGIN END中。DECLARE var_name[,...] type [DEFAULT value]

MySQL支持的存储引擎：
MyISAM InnoDB Memory CSV Archive
![分类](http://i.imgur.com/VUGPTNi.jpg)
- 共享锁（读锁）：在同一时间段内，多个用户可以读取同一个资源，读取过程中数据不会发生任何变化
- 排他锁（写锁）：在任何时候只能有一个用户写入资源，当进行写锁时会阻塞其他的读锁或者写锁操作
锁颗粒：- 表锁，是一种开销最小的锁策略- 行锁，是一种开销最大的锁策略
事务：保护数据的完整性
1.原子性（Atomicity）：确保工作单位内的所有操作都成功完成，否则，事务会在出现故障时终止，之前的操作也会回滚到以前的状态。
2.一致性（Consistency)：确保数据库在成功提交的事务上正确地改变状态。
3.隔离性（Isolation）：使事务操作相互独立和透明。
4.持久性（Durability）：确保已提交事务的结果或效果在系统发生故障的情况下仍然存在。
创建、修改存储引擎：
`CREATE TABLE table_name(...) ENGINE = engine;`
`ALTER TABLE table_name ENGINE [=] engine_name;`

运算符和函数：
聚合函数：仅返回1个值
AVG   平均数
COUNT 个数
MAX   最大值
MIN   最小值
SUM   求和
比较运算符：
[NOT] BETWEEN...AND...   [不]在范围之内
[NOT] IN()               [不]在列出值范围内
IS [NOT] NULL            [不]为空
字符函数：
concat:字符连接 
CONCAT_WS:使用指定的分隔符进行字符连接('|','a','b')
FORMAT:数字千分位格式化
LOWER:转换为小写字符 
UPPER:转换为大写字符
LEFT:获取左侧字符串 left('mysql',2)      my
RIGHT:获取右侧字符串 right('mysql',3)    sql
LENGTH:获取字符串长度
LTRIM:删除前导空格
RTRIM：删除后导空格
TRIM：删除前导和后导空格     
TRIM(BOTH/LEADING/TRAING '?' FROM '??MySQL???')
REPLACE:替换字符串  
REPLACE('??MyS?QL??','?','O'):OOMySOQLOO
SUBSTRING:对字符串进行截取 SUBSTRING('mysql',1,2):my
[NOT]LIKE:模式匹配  %相当通配符，代表任意个字符
_代表任意一个字符
数学运算符：
CEIL     向上取整
FLOOR    向下取整
DIV      整除
MOD或%   求模
POWER    求幂
ROUND    四舍五入(值,小数位数)
TRUNCATE 截取(数值，截取位数)
时间函数：
NOW      当前日期和时间   
CURDATE  当前日期   
CURTIME  当前时间
DATE_ADD 日期变化
DATEDIFF 日期差值  
DATE_FORMAT日期格式化("2008-5-23",'%Y%m%d %H%i%s')
信息函数：
CONNECTION_ID   连接ID
SELECT DATABASE 当前数据库
LAST_INSERT_ID  最后插入记录的ID号，如果是一次插入多条记录，得的是多条的第一条。必须是一个自动编号的字段
VERSION         版本的信息
USER            当前用户
加密函数：
MD5()：信息摘要算法，用于Web
PASSWORD()：密码算法，修改MySQL客户端密码：SET PASSWORD = PASSWORD('密码');

命令行
设置默认编码，wamp打开my.ini配置文件，
在[client]下添加：default-character-set=utf8  
在[mysqld]下添加：character_set_server=utf8 
在[mysql]下添加：default-character-set=utf8 

-D 打开指定数据库
-- 分隔符 
--prompt提示符登录前 登陆后prompt 
-h 服务器名
-u 用户名
-p 密码
-P 端口号
-V 版本信息
cls 清屏

SELECT VERSION(); 显示当前服务器版本
SELECT NOW();     显示当前日期
SELECT USER();    显示当前用户
SHOW WARNINGS;    查看警告
SHOW DATABASES;   查看数据库
SHOW TABLES;      查看当前数据库的所有数据表
SHOW INDEXES FROM 表名; 查看数据表索引
SHOW COLUMNS FROM 表名; 查看数据表的列
show function status; 查看所有自定义函数
DESC 表名;         同上
ON DELETE 删除
\G 以网格形式显示
SET NAMES gbk;    GBK显示


----------
PHP中的mysql
增：insert into 表（列1，...） values('值1'，...);
删：delete from 表 where id=n;
改：update 表 set 列1='值', 列2='值' where id=n;
查：select 列1，列2 as L2 from 表 where id>n;
数据库难在根据需求设计，语法不难。
phpmyadmin性能不如桌面端，但是能远程访问。
访问：http://localhost/phpmyadmin
设置步骤：
1.删除其它用户，仅留localhost
2.编辑权限-设置密码-登陆
PDO只用一套函数就能连接各种数据库。
Mysqli函数库虽然比Mysql好，但是没PDO好。
where id like'%n%' and name like '%a%' and price >= '1' 
条件模糊查询用`like+%%` 合并条件用`and`


WrodPress：
安装：把WrodPress文件夹放在服务器，访问文件夹设置。
注册：设置里勾选所有人注册--默认发送邮件功能会被服务器禁用--安装Easy WP SMTP--设置SMTP服务器
头像：安装WP user avatar插件