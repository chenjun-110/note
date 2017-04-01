#### W3C
文档加载后激活函数：`$(document).ready()`==`$().ready()`==`$()`
点击触发：`$(selector).click()`
隐藏：`$(selector).hide(speed,callback)`
显示：.show
Google CDN:`<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>`
我本地JQ3：file:///C:/Users/Administrator/Desktop/%E6%95%99%E6%9D%90/jquery-3.0.0/jquery-3.0.0.min.js

one()只运行一次事件
select()框选文本事件
toggle()轮流事件
trigger()触发指定事件
parents()指定父元素
$("id").text(function(i,origText){}) 回调函数i是元素数组下标，origText是原文本值。
$("id").attr(function(i,origValue){}) 回调函数i是元素数组下标，origValue是原属性值。
用toggle()切换2个函数，添加删除父元素

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
eq()索引匹配，正从0，负从-1开始。可匹配未来对象。
：even偶数索引，0也算 ：odd奇数索引
`$('li.item-ii').find('li') 等价于 $('li', 'li.item-ii')`
$('li').has('ul').css('',''); 匹配li后代有ul的元素
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

核心函数
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


##锋利的jquery
相互转换： 把js的dom转换为带jq方法的对象。
```
//jq转js
var $cr=$("#cr"); //jq对象
var cr=$cr.get(0); //dom对象
var cr=$cr[0]; //dom对象
//js转jq
var cr=documnet.getElementById("cr"); //dom对象
var $cr=$(cr); //jq对象
//字符串转jq
var $li=$("<li></li>") //动态创建jq对象,结合append()
```
this指向：$(this)指向jq对象，this指向dom对象。
jq的优点：文件小(1张图片的事)、操作复杂DOM(隐式循环dom)、屏蔽兼容性(ajax)、易扩展。
纠错：jq就是js,如果你用jq卡,说明有问题。性能只优化瓶颈(绝不可能是加载卡)
适用范围：小网站、要求开发速度。
`.ready` 任何时候都可触发，比DOMContentLoaded适用范围广。 同理，动态加载的load回调也不会触发，因为事件已发生。
链式调用的可读性：对同一对象不超过3个操作的写成一行。
`.html` 等同innerHTML。但后者在IE里有Bug:如果属性值只有字母数字字符，就会丢失属性值引号。
$是jQuery的简写，完全相等。
$符冲突：
```
jq2 = jQuery.noConflict();
jq2(function( $ ) { });// 在这个代码块中可以像往常一样使用 $ ;实际的jQuery 对象是 jq2 
```
判断元素存在：`if( $('#a').length>0 )` 或 `if( $('#a')[0] )`
**选择器**：
$("#a ~ div") 等价于 $("#a").nextAll("div") 下所有同级div
$("#a + div") 等价于 $("#a").next("div") 下一个div
`:eq(index)` $("div:eq(index)") 第n个div(0开头)
:gt(index) | :lt(index) 第n个的后面集合 | 前面集合
:header 所有h1-hn元素
:contains("text") 文本含text的集合
:empty | :parent 没有任何子节点的集合 | 有任何子节点的集合
$("div:has(p)") 带p后代的div集合
`$("div[id][style]")` 复合属性，同时带id和style属性的div集合
[id != a] id属性值不为a的集合 类似的还有 ^= 前缀 $= 后缀 *= 含有什么字符 |= 仅带-的前缀 ~= 仅空格前缀
ul li:first-child | :first 每个ul的首个li集合等价于`:nth-child(1)` | 单个
ul li:noly-child  ul中只有1个li
:input 所有<input><textarea><select><button>元素
:text | [type="text"] 等价，后者性能高，前者可搜出没指定type的input。 类似的还有 :password :radio :checkbox :submit :image :reset :button :file
属性值有特殊字符用双斜杠\\转义。
注意：$(".a :hidden")选择.a下所有隐藏，而$(".a:hidden")无法选择到.a下有同名class=a的隐藏元素。

**DOM**:
插入节点：prepend() 插在首位。after() | before() 插在同级下一个 | 插在同级上一个。 wrap() | wrapAll() 单独包裹，插入父节点 | 统一包裹
删除节点：remove() | empty() 完全删除并返回被删节点 | 删除后代。  detach()删除但保留事件和附加数据
操作节点：clone(true) 复制元素和事件 replaceWith("<p></p>") 替换 
抓取节点：parent() | parents() 每个匹配的父元素集合 | 匹配的所有祖先元素集合。 children() | find() 儿子集合 | 后代集合。还有next() prev() siblings()等，高性能==筛选！ end()返回链式前一个jq对象
获取文本内容：script用html() input/textarea用val() 其它用text()--innerText不兼容火狐
获取特性值：attr()|removeAttr() 自定义属性标签用attr()。适用于`accesskey align class contenteditable href id label rel src tabindex title type width`
获取属性值：prop()|removeProp(),如selectedIndex,tagName,nodeName,nodeType,ownerDocument, defaultChecked,defaultSelected。特性不随状态改变而改变，属性会改变。标签上本来就有的固有属性用prop()。它是取得计算结果。适用于`async autofocus checked location multiple readOnly selected disabled` 删除事件：prop("onclick",null)。只写属性名就生效用prop，只返回布尔值用prop。
操作类名：addClass和attr：前者是追加样式，后者是设置样式。 toggleClass()先判断存在再切换样式`$(this)[$(this).hasClass("a") ? "removeClass":"addClass"]("a")`。hasClass()==is()判断存在。
css():屏蔽了兼容性:IE的styleFloat、标准的cssFloat，IE的currentStyle runtimeStyle、标准的getComputedStyle()。属性有引号可以随便写，无引号必须驼峰。
定位：offset()传入对象{top:0}可以修改定位 position() scrollTop() scrollLeft()传数字修改滚动条

**事件**
load()可绑在元素上，例如图片加载完才触发事件，批量绑定不会覆盖，先触发先写的。不要在$(document).ready()里绑定load事件。
合成事件：hover(mouseenter,mouseleave) 
toggle() 显示/隐藏 toggle("slow") 淡入/淡出 toggle(400,function(){}) 每个元素动画结束执行回调，不是一组动画结束执行一次。
下面是jq的event属性：e.type  jq的事件属性做了兼容性处理，api和w3c标准方法一样。
  e.which 兼容e.keyCode和e.charCode 1左 2中 3右
  e.metaKey 判断windows键或command键是否被按
  e.preventDefault() 兼容IE的e.returnValue = false
  e.stopPropagation() 兼容IE的e.cancelBubble = false 阻止冒泡,防止触发祖先的同类事件。
  e.stopImmediatePropagation()除了阻止冒泡，还能阻止多次绑定在自身的事件处理函数执行。jq独有，原理是停止执行数组接下来的回调。
  e.target 兼容IE的e.srcElement。冒泡上来的this不指向目标元素，$(this)可以。
  e.relatedTarget 兼容移入的e.fromElement和移出的e.toElement 关联元素
  e.pageX e.pageY 兼容IE的e.x e.y 鼠标坐标
获取原始event对象：`event.originalEvent`
off()移除所有事件 
off("click","**")移除所有代理事件 
off("click","div",fuc)移除指定事件 
off("click.abc","div",fuc)移除所有属于.abc命名空间的事件，链式删除事件太繁琐。注意当次移除的，在下次触发生效。
事件委托：`$("tbdoy").on("click","tr",fuc)` 如果有1000个tr，这里委托在tbdoy。千万别写成$("tbdoy tr").on("click",fuc)。on()可以绑定在未生成的dom上。 其它思路：1.绑在集合上，内部判断标签$(this).is("#a") 2.判断$(this).attr("class")
on("click",false) 集合全部return false。
on("click", {name: "Karl"},func)把name属性赋值到event.data.name 
on({click:func,mouseenter:fuc})另一种形式
on("click mouseenter",fuc)另一种形式
one() 仅执行一次事件
不支持冒泡的事件：load scroll error focus blur IE8的paste reset change submit。
jq模拟了冒泡：change事件、submit事件。jq不支持事件捕获。
模拟操作：
trigger('click')==click() 传入on()设置的自定义事件名也可触发。
trigger("click!")触发不在命名空间的事件
trigger("xxx",["a"]) 2参传给on()回调的2参,数组的每项对应回调的每个形参。triggerHandler()触发事件回调并阻止默认。
trigger({type:"a",user:"b",pass:"c"}) 触发时传入数据到event.user等属性上。

**动画**
动画抖动：DTD定义，标准模式。
高、宽、透明度:show(600)/hide("fast")==toggle() 
透明度: fadeIn()/fadeOut()==fadeToggle()   fadeTo("slow",0.2)
高度: slideUp()/slideDown()==slideTogele() 
animate({left:"+=5px",height:"2px"},900) 同时。顺序动画执行链式animate即可。css()改变样式需在animate回调中，否则会在开始执行。要移动的话元素需要相对定位或绝对定位，总之需要自己设置前提条件。只能穿数字属性，字符串的需要插件。step函数用于给动画属性调用。缓动需插件。
```
$( ".block:first" ).animate({left: 100,opacity:"toggle"}, {
    duration: 1000,
	queue:false,   //不进入动画队列
    step: function( now, fx ){ //now是动画运动中的属性值，
      $( ".block:gt(0)" ).css( "left", now ); }, //动第1个物体时，剩下的物体跟着一起动。
	specialEasing: {  
      width: 'linear',
      height: 'easeOutBounce'},  //这个值要插件
	complete: function() { 
      $(this).after('<div>Animation complete.</div>');}});
```
stop() 仅停止当前动画。 stop(true)清空动画队列，适用于上个事件有链式动画或组合动画。stop(true,true)清空队列并暂停动画 stop(true,true,true)清空队列并到达动画末状态。
$.fx.off=true 停止全局的动画 
$(ele).is(":animated") 判断是否正在进行动画
animate().delay(1000).animate() 延迟1秒

**特效逻辑** 
滑动滚动条 animate({scrollTop:"+=50"},400)
慢慢放大：animate({height:"+=50"},400)
改变选中项： val() 传下拉<option>的文本值 | 传单选或多选的[value值]、这个要数组形式。 attr("selected",true)/attr("checked",true)
反选：each遍历选项并取反 this.checked=!this.checked   不建议用jq:$(this).attr("checked",!$(this).attr("checked"))
关联全选和复选：each遍历选项 if(!this.checked){a=false} 如果a变量为false说明复选框有未选中项，a为true则选中全选框。其它思路：复选框组绑定点击，判断选框数量是否等于选中框。
实时验证：通常是blur再检测表单。现在keyup时手动触发$(this).triggerHandler("blur")
实时列表：keyup触发后先隐藏所有列表元素再根据value过滤出指定项并显示。`$("table tbody tr").hide().filter(":contains('"+($(this).val()+"')").show()`  原生js判断文本：`indexOf(str)!=-1` 或者用正则四法：match() search() replace() split() exec() test()
选项卡：先高亮标题,再保存索引用于关联内容区 index=$("li").index(this); $(div).eq(index).show();  原生js元素索引：1. li[i].index=i遍历元素时把i赋值到该属性上 2.点击时遍历li和this对象比较，返回i。
网页换肤：修改link标签的href属性值。 保存cookie:把换肤的href值保存在cookie内，加载后获取cookie值，存在则在link里插入cookie保存的css。插件用法：$.cookie("css",this.id,{path:'/',expires:10});var cookie_skin = $.cookie("css");if(cookie_skin){ //调用换肤}

**Ajax**
$.ajax是最底层，用它可实现下面大多。
load("test.html") 加载全部html且执行script
load("test.html .abc") 加载class=abc的元素,不执行script
load("test.php",{a:"1",b:"2"},fuc) 有参数就是POST，无2参时GET。回调1参响应数据，2参请求状态，3参xhr对象。请求完成执行回调。
$.get() 用法同上，GET，回调没有第3参。请求成功才执行回调。用$()包裹1参可以操作返回的html片段。$.get()的4参可为"json"
$.getScript(url,fuc) $.getJSON() 用法同上，
$.each(data,function(index,value){})  迭代器，只有return false才视为退出，其它返回值都会continue。
$("#form").serialize() 把表单元素的键值对转成字符串，便于ajax传输。
$(":radio").serializeArray() 把键值对转为JSON格式
$.param() 把对象或数组转为a=1&b=2格式
ajaxStart() | ajaxStop() ajax发起事件/请求结束。

**插件**
表单验证插件：Validation
ajax表单插件:Form
模态窗口插件：SimpleModal
jQuery UI插件：鼠标交互，ui模板，动画
编写插件：
  插件命名：jquery.name.js
  去处：1.对象方法应添加到`jQuery.fn`上。全局函数应添加到`jQuery`本身.
  注意：插件内部的this指向jq对象。this.each遍历所有元素。分号必须规范。应当返回jq对象保证可链式操作。
  `(function($){   })(jQuery)  //利用闭包编写插件内部使用$符`
`jQuery.extend()` 1.可以扩展jq对象 2.可以合并对象(属性方法合并) 3.设置插件默认参数
```
function foo(p) {
var a={
		a:"bar",
		b:5,
		c:"xml"
	};
	jQuery.extend(jQuery,p||a)
}
foo(); //使用默认参数
$.a //"bar"
foo({a:"a",b:"b",c:"c"}) //设置插件参数。
$.a //"a"
```
  


`jQuery.fn.extend()` 用法同上，区别是它可被jq对象调用。前者被$调用。
```
(function($){
var a={
		a:"bar",
		b:5,
		c:"xml"
	};
	$.fn.extend({
		"color":function(value){
			return this.css("color",value);}, //this指向jq对象，这里保证了可链式调用.
		"reset":function(p){
			jQuery.extend(jQuery,p||a)}
	});
})(jQuery);
然后就可以使用了   
$("div").color("red");  //设置样式
$("div").reset()  //重置参数，不能链式了，因为没return this。
```
**性能**
速度排行：
1.$("#id")最快 底层调用document.getElementById()
2.$("div")标签选择器 底层调用document.getElementsByTagName()
3.$(".class") IE9底层是document.getElementsByClassName()。IE8是循环，不建议。
4.$("[a=v]") 慢





























































































































