[TOC]

### 语法

函数参数传递方法四种（位置，关键字，默认值，包裹位置，包裹关键字传递）

```python
Dense(64, input_shape=(20,), activation='relu')#关键字传参
def run(*arr):  #参数被名为arr的tuple收集
def run(**obj): #参数被名为obj的dict收集
run(**obj)      #把字典解包 相当于关键字参数传递
run(*arr)       #把元组解包 此时相当于位置参数传递
```




