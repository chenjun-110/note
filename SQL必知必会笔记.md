表：存储同类型的数据。
列：每列有数据类型限制分类信息。
主键列：一列/一组列 
  作用:标识每行
  特点：每行必有主键值、不可修改、不可复用。

注释：`#注释一行` `/* */`
检索单列：`select 列名 from 表名；`  检索多列：`select 列名,列名 from 表名；`
检索单列的去重值：`select distinct 列名 from 表名；`
检索单列前5行：`select 列名 from 表名 limit 5；`  `limit 5 offset 5`limit行数，offset是偏移，第1行的offset是0。`limit 3,4`3是偏移4是行数。
排序：
  检索单列并排序：`select 列名 from 表名 order by 列名；` 
  检索多列并排序：`select 列a,列b from 表名 order by 列b,列a；`先按列b排序，列b的相同值再按列a排序。`order by 1,2`先按检索出的1列排序再按2列排序。
  降序：`order by 列a desc,列b`先按列a降序，列a的相同值再按列b排序。
  特点：大小写排序要再数据库设置。order by必须在句尾。
过滤：
  检索多列并过滤：`select 列a,列b from 表名 where 列a = 值；`取出列a相同值的行
  where操作符：= < <= >= !=或<>不等 !不小于 !>不大于 `between 5 and 10`5-10之间 `is null`空
  检索多列并过滤：`select 列a,列b from 表名 where 列a = 值 and 列b = 值；` 多重条件
  求值顺序：`where (列a = 值 or 列a = 值) and 列b >= 10` 如果没有分组括号，会先取and符大于10再求or。圆括号 > and > or
  逻辑操作符：`and`都成立，`or`都成立或只成立一个，`where 列名 in ('a','b')`值等于a/b/ab，和or一样比or性能高。`where not 列=值 `否定条件
通配符：
  like基本用法: `where 列 like '值%'` fish%:fish起头的值 %fish%:关键字是fish %：除了null以外所有 f%h:f起头h结尾(如果不行试试 f%h% 因为匹配需要完整值，不能只匹配一部分) 
  其它通配符：`%`任意次 `_`一次
  性能：通配符匹配开头最慢
计算字段：计算字段不实际存在于数据表中，被select创建作为一列返回。但一般来说，在数据库上完成格式转换比在客户端中要快。
  列拼接：`select concat(列a,'_',列b) form 表` 非Mysql用+/||连接。`concat(trim(列))`去掉字符两边空格、ltrim消左/rtrim消右。
  别名：