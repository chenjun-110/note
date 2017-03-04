小写标签和属性（必加引号）。
不鼓励使用 name 属性，应该使用 id 取而代之。
"/" 符号前添加一个额外的空格。
语言属性格式：`<div lang="no" xml:lang="no">Heia Norge!</div>`
强制类型声明：STRICT（严格类型） TRANSITIONAL（过渡类型）:包含不赞成使用的元素。FRAMESET（框架类型）：此外还包含框架。
```
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">```
####[点击验证XHTML网址](http://validator.w3.org/check?uri=http%3A%2F%2Fwww.w3school.com.cn%2Fxhtml%2Findex.asp)
 html、head、title 和 body 元素必须存在。
id 值必须以字母或者下划线开始；