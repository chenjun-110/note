在环境变量/pip/创建pip.ini 
```
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = mirrors.aliyun.com
```
更新源：python -m pip install --upgrade pip
pip install numpy
声明模块：`# Filename: support.py` 对应 `import support`

选**32位的Python**,反正64位的系统上32位的Python也能很好的运行。一个重要的原因是当前有些有用的Pyhton第三方安装包不支持64位系统比如numpy、scipy等。

**语法**：

```
a, b = 0, 1  等价js于 [a, b] = [0, 1] 
lambda x:x+1 等价js于 x => x+1
```

for v in [] 
for i in range(10):
else:  //没有break的进到这
type()

格式化：
  1. `'{:.1f}'.format()` 保留1位小数
  2. {:b}转二进制 {:d}十进制 {:o}八进制 {:x}十六进制
  3. {:,}千分位逗号
  4. {:>8}右对齐，字符总宽设8，:>之间的为填充符。^、<、>分别是居中、左对齐、右对齐
  5. `'{a},{b}'.format(a=18,b='k')` 等同js于 `${a},${b}` 可传入对象，可用索引{0}表示format的0位参。

#### numpy

sum() axis=0列和 axis=1行和
np.log 以e为底的对数

#### pandas

特点：高性能数组计算以及电子表格和关系型数据库的数据处理，适用于数据分析
`import pandas as pd`
pd.series([1,2]) 一维的单列(类似数组)
  1. +-*%可直接作用于series列
  2. 多个列可合并：(s1>5)&(s2<10)
  2. apply() 类似js的fliter

pd.DataFrame({'a':series1,'b':series2}) 二维表结构 
  1. describe()汇总数据集分布的中心趋势，离散度和形状
  2. reindex([2, 0, 1])按指定索引排序 乱序排列：cities.reindex(np.random.permutation(cities.index))
  3. `dataframe[["total"]]`和`dataframe["total"]`不一样，feature列用前种。
pd.read_csv("./a.csv", sep=",") 导入表为DataFrame

#### keras

安装依赖：
numpy scipy tensorflow 
Microsoft Visual C++ 2015 Redistributable Update 3

修改keras.json的backend为tensorflow
import os
os.environ['KERAS_BACKEND']=tensorflow

Sequential 顺序神经乘模型
Dense 全连接层 
matplotlib.pyplot 可视化模块
model.add() 加神经层
model.compile() 
  loss='mse' 二次方误差函数
  optimizer='sgd' 优化器之乱序
model.train_on_batch([],[]) 循环手动训练 model.fit自动训练
model.evaluate([],[],batch_size=100) 测试100个
model.layers[0].get_weights() 返回w b

#### tensorflow

定义特征列tf.feature_column.numeric_column("total_rooms")
配置线性回归梯度下降
my_optimizer = tf.train.GradientDescentOptimizer(learning_rate=0.0000001)
my_optimizer = tf.contrib.estimator.clip_gradients_by_norm(my_optimizer, 5.0)
linear_regressor = tf.estimator.LinearRegressor(
    feature_columns=feature_columns,
    optimizer=my_optimizer
)
