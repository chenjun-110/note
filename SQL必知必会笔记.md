表：存储同类型的数据。
列：每列有数据类型限制分类信息。
主键列：一列/一组列 
  作用:标识每行
  特点：每行必有主键值、不可修改、不可复用、唯一。

注释：`#注释一行` `/* */`
#### 查询
检索单列：`select 列名 from 表名；`  检索多列：`select 列名,列名 from 表名；`
检索单列的去重值：`select distinct 列名 from 表名；`
检索单列前5行：`select 列名 from 表名 limit 5；`  `limit 5 offset 5`limit行数，offset是偏移，第1行的offset是0。`limit 3,4`3是偏移4是行数。
排序：
  检索单列并排序：`select 列名 from 表名 order by 列名；` 
  检索多列并排序：`select 列a,列b from 表名 order by 列b,列a；`先按列b排序，列b的相同值再按列a排序。`order by 1,2`先按检索出的1列排序再按2列排序。
  降序：`order by 列a desc,列b`先按列a降序，列a的相同值再按列b排序。
  特点：大小写排序要再数据库设置。order by必须在句尾。
过滤：
  检索多列并过滤行：`select 列a,列b from 表名 where 列a = 值；`取出列a相同值的行
  where操作符：= < <= >= !=或<>不等 !不小于 !>不大于 `between 5 and 10`5-10之间 `is null`空
  检索多列并过滤：`select 列a,列b from 表名 where 列a = 值 and 列b = 值；` 多重条件
  求值顺序：`where (列a = 值 or 列a = 值) and 列b >= 10` 如果没有分组括号，会先取and符大于10再求or。圆括号 > and > or
  逻辑操作符：`and`都成立，`or`都成立或只成立一个，`where 列名 in ('a','b')`值等于a/b/ab，和or一样比or性能高。`where not 列=值 `否定条件
  相同列名需指定表名：WHERE Orders.cust_id = Customers.cust_id
  组合查询：`union`关键字联结多条select语句，结果是多个查询的并集。查询列必须相同。`union all`不会去除重复行
通配符：
  like基本用法: `where 列 like '值%'` fish%:fish起头的值 %fish%:关键字是fish %：除了null以外所有 f%h:f起头h结尾(如果不行试试 f%h% 因为匹配需要完整值，不能只匹配一部分) 
  其它通配符：`%`任意次 `_`一次
  性能：通配符匹配开头最慢
计算字段：计算字段不实际存在于数据表中，被select创建作为一列返回。但一般来说，在数据库上完成格式转换比在客户端中要快。既不能影响用户体验，又不能影响高频并发性能。
  列拼接：`select concat(列a,'_',列b) from 表` 非Mysql用+/||连接。`concat(trim(列))`去掉字符两边空格、ltrim消左/rtrim消右。
  别名：`select concat(列a,'_',列b) as 列别名 from 表 as 表别名` 联表查询里表别名更易读
  计算：`select 列a+列b from 表` 运算符：+ - * / % 
函数：
  转大写`upper(列)` 转小写`lower(列)` 值长度的列`length(列)`
  数值函数：abs()绝对值 cos/sin/tan()余弦正弦正切 sqrt()平方根 exp()对数指数
  聚集函数：avg()列平均值 count()列总行数 max/min()列最大小值 sum()列值总和。 如果有where条件，聚集函数聚集的是条件处理后的值！
分组：相同列值为一组
  group by：`select 列a,列b from 表 group by 列b`
  having：`select count(*) from 表 group by 列 having count(*)>3;` having和where操作符一样，用于分组过滤聚集值。
子查询：
  上条查询结果用于下条查询的条件：`select user_id from gxr_vip where id in (select id from gxr_vip where year = 0)` 子查询的结果列的每个值代入in()逗号分隔
  特点：先执行子查询，再执行父查询 子查询结果只能是单列 
联表查询：
  关系表：一类一表，用共同值连接。
  联结：联结只存活在查询期间。
  笛卡尔积：没有where会导致表a一行配对表b所有行,总行数为a*b
  内联结：`SELECT Aa,Ba,Bb FROM 表A,表B WHERE 表A.id = 表B.id` where是联结的关键。
  联结多表：`SELECT Aa,Ba,Bb,Ca FROM 表A,表B,表C WHERE 表B.id = 表C.id AND 表A.id = 表B.id` where是联结的关键。
  自联结：单表看做多表。`SELECT * FROM 表A as a,表A as b WHERE a.id = b.id`
  外联结：
  性能：联结的表数越多越消耗。针对复杂查询多做实验比较联结表和子查询的效率，自联结比子查询快。首个过滤条件过滤的越多越好。


#### 插入
插入全行：
  1. `insert into 表名(列a,...列名) values(值a,...值)` 推荐，列a对应值a
  2. `insert into 表名 values(值a,...值)` 每列值都要写并按默认列顺序，不适合调整表结构
插入部分行：`insert into 表名(列a) values(值a)` 其余列值为默认值，前提是允许为空值。
查询再插入：`insert into 表a(列a) select * from 表b`