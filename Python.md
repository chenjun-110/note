在环境变量/pip/创建pip.ini 
```
[global]
index-url = http://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host = mirrors.aliyun.com```
更新源：python -m pip install --upgrade pip
pip install numpy
声明模块：`# Filename: support.py` 对应 `import support`

赋值：a, b = 0, 1 等价js于 [a, b] = [0, 1] 
**numpy**
sum() axis=0列和 axis=1行和

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