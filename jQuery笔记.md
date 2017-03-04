载入jQ:`<head><script type="text/javascript" src="jquery.js"></script></head>`
文档加载后激活函数：`$(document).ready()`==`$().ready()`==`$()`
点击触发：`$(selector).click()`
隐藏：`$(selector).hide(speed,callback)`
显示：.show
Google CDN:`<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>`
我本地JQ3：file:///C:/Users/Administrator/Desktop/%E6%95%99%E6%9D%90/jquery-3.0.0/jquery-3.0.0.min.js
jq取代$符号防冲突：`var jq=jQuery.noConflict()`
$(selector).html()输出内容
```
$.noConflict();
jQuery(document).ready(function($){ //这样可以再函数内部使用$，外部用单词```


one()只运行一次事件
after()被选元素后插入指定内容
select()框选文本事件
toggle()轮流事件
trigger()触发指定事件
parents()指定父元素
$("id").text(function(i,origText){}) 回调函数i是元素数组下标，origText是原文本值。
$("id").attr(function(i,origValue){}) 回调函数i是元素数组下标，origValue是原属性值。
remove()删除元素，会保留本元素，不保留绑定事件
detach()删除元素，保留所有数据。
用toggle()切换2个函数，添加删除父元素
```
$(document).ready(function(){
   $("button").toggle(
    function(){$("p").wrap("<div></div>");}
    , 
    function(){$("p").unwrap();}
                     );
});
```
选择器为$(this)不用打引号
$("div").find("*") 查找所有子元素
$("div").find("span")查找某个子元素
$("div").children() 查找下一级子元素
.class *{} 样式应用于所有子集
$("div p").first() 查找div的第1个p
$("p").eq(1) 查找p索引1
$("p").filter(".class") 查找带class的p
$("p").not(".class") 查找不带class的p 和filter相反
$.get(URL,callback);
$.post(URL,data,callback); ---data格式{name:" ",city:" "}
**jQuery ajax:**
.css("display","blcok") 显示
.css("display","none")  隐藏
**Ajax事件**
ajaxSend() 请求发送前
ajaxStart() 请求刚发送时事件
ajaxComplete() 请求发送完成事件
ajaxSuccess() 请求成功
ajaxError() 请求失败
$.ajaxSetup() 设置所有ajax默认项
$.get("url",{data},function(){}) 加载数据=``$.ajax({})``
$.getJSON() 加载JSON数据=``$.ajax({url: ,data: ,success: ,dataType=json})``
$.getScript(url,success()) 加载脚本=``$.ajax({url: ,dataType:"script",success: })``
$("#jQid").load("url #ajaxid") 加载指定id数据
$.param(obj) 序列化数组对象.text()解析成字符
decodeURIComponent($.param()) 序列化嵌套数组（解决[]乱码）
processData默认值为true，把对象序列化成字符串。process(data)估计也是。。
andSelf()合并
如果节点是元素节点，则 nodeType 属性将返回 1。
如果节点是属性节点，则 nodeType 属性将返回 2。
如果节点是文本节点，则 nodeType 属性将返回 3。
wrap("<div/>") 添加标签，/在后面
eq()索引匹配，正从0，负从-1开始。可匹配未来对象。
：even偶数索引，0也算 ：odd奇数索引
`$('li.item-ii').find('li') 等价于 $('li', 'li.item-ii')`
$('li').has('ul').css('',''); 匹配li后代有ul的元素
`三元运算符 (条件？true:false)`
.is('p') 判断集合是否有p标签，返回布尔值
`$('strong', this).length === 2`判断this是否有2个strong标签
map()遍历元素集合经过处理到新建集合。
each()遍历元素集合处理到原集合。
next()查找下一个兄弟元素，选择器没指定会查找下所有。
nextUntil(term3,"dd") 查找所有dd元素截止到term3。
nextUntil("dt") 查找所有同胞截止到dt。
offsetParent() 查找必须定位的最近祖先元素
slice(a,b) 如果省略b，则取包含a以后所有。
jQuery.hasData()判断元素是否被data设置过，返回布尔值。
get(index) 查找元素
index() 返回位置，没有为-1
size() 返回匹配数量
toArray() 返回数组个数
$("div > span") 查找div的一级子级span元素

####核心函数
1.`jQuery(selector, [context])`设置选择器环境
`$("span", this).addClass("bar");`等价于$(this).find("span")。在指定上下文中寻找选择器。
2.`jQuery(element)`使用 DOM 元素
3.`jQuery(jQuery object)`克隆 jQuery 对象
当以参数的形式向$()传递jQ对象后，会创建副本。与初始对象一样，新的 jQuery 对象引用相同DOM元素。
4.`jQuery()`返回空集合

1.`jQuery(html,[ownerDocument])`创建新元素
2.`jQuery(html,{props})`设置属性和事件
IE不许你创建input并改变类型；必须用`"<input type="checkbox" />"` 来规定类型.
`$("<input>", {type: "text"，focusin: function() {
    $(this).addClass("active");
  }})`{}逗号分隔，可设置多个属性，事件函数。
`jQuery(callback)`等价于$(document).ready() 

调用`jQuery.noConflict();`$会还原成jQuery
`jQuery.noConflict()(function(){
    // 使用 jQuery 的代码});`等价于文档就绪

`$().jquery`返回jq版本号
`jQuery.fx.interval = 500;`设置动画帧速。Chrome11支持 requestAnimationFrame，无效。
`jQuery.fx.off = true/false;`全局禁用/启用动画

`jQuery.support.propvalue`测试是否支持某功能，返回布尔值。jQuery.support.ajax=ture支持ajax