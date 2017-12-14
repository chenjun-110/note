原子 – Redis的所有操作都是原子性的，意思就是要么成功执行要么失败完全不执行。单个操作是原子性的。多个操作也支持事务，即原子性
cmd运行`redis-server.exe redis.windows.conf`再cmd运行`redis-cli.exe -h 127.0.0.1 -p 6379 `
配置：config set k v  config get k
基数：集合内的重复值化为唯一值的集合
#### 数据类型
string：最基础，可以包含任何数据
hash：对象
list：按插入顺序(最后push的在第一位)排序的string列表,弹出超时是列表为空则阻塞等待。
set：重复插入无效 string唯一无序集合 哈希表添删查复杂度都是O(1) 取数据是乱序的哦
zset：唯一有序集合

#### 操作
成功返回 1 失败返回 0
string：`set k v` /  `get k` / `del k`
  截取`getrange k 0 3`
hash：`hmset obj k1 v1 k2 v2` /  `hget obj k` `hgetall obj` `hdel obj k1`
list：`lpush arr v` /  `lrange arr 0 10`
  插入末位`rpush arr v` 移出首元素`blpop arr 100` 移出末元素`brpop arr 100` 移出a首位到b首位`brpoplpush arr brr 100` 索引取值`lindex arr 0` 
set：`sadd arr v` / `smembers arr`
  差集`sdiff s1 s2` 交集`sinter s1 s2` 并集`sunion s1 s2` 随机移出元素`spop s1`
zset:`zadd arr 0 v` / `zrangebyscore arr 0 10`按分数优先排序
HyperLogLog：`pfadd arr v` / `pfcount arr`
类型`type k` 序列化`dump k` 存在`exists k` 过期秒`expire k 60` 改名`rename k K` 等

#### 
订阅：`subscribe any` 发布`publish any "test"`
事务：开始`multi` 取消`discard`/执行`exec` 不能回滚，exec所有都会生效。 乐观锁`watch k`其它客户端修改会导致本客户端事务exec失败,另外exec会放弃所有watch,解除单个是`unwatch`
LUA脚本：`eval ""`
持久化：AOF不丢失数据，
  RDB`save/bgsave` 生成dump.rdb文件 恢复：该文件在redis目录即可。
密码：`config set requirepass 123` `auth 123`