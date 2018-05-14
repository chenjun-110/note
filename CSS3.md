**SVG**
<rect />     x、y左上角 rx、ry圆角半径
<circle />   cx、cy圆心 r半径
<ellipse />  rx、ry椭圆x/y半径
<line />     x1、y1起点 x2、y2终点
<polyline /> points="xn yn, Xn Yn"点集数列 折线
<polygon />  points的终点会连接起点 多边形
<path />     d="M x y Q x y, x y T x" M起点 L连接点 A（x半径 y半径 圆旋转角度 0小弧 1顺时针 x y弧终点） 3次贝塞尔MCSQT，S如果前面有C/S会镜像控制点，S的两个坐标就代表第2个控制线的2个点。二次贝塞尔MQ两条控制线是连在一起的。
SVG的class样式不一样:
fill:背景色
stroke-width:边框宽
stroke:边框色
stroke-linejoin | stroke-linecap：线段连接处样式
stroke-dasharray：值是一组数组，没数量上限，每个数字交替表示线长和缺口长。用@keyframes控制线长可实现线条动画，IE不支持animation控制SVG。
stroke-dashoffset：虚线的偏移量。用实虚线偏移也可实现线条动画。
viewBox="x y 视宽 视高"
**SMIL动画** IE不支持
五大标签
<set> 延时修改属性
<animate> 单属性过渡动画，可多个标签组合。
<animateTransform> 变换
`<animateMotion>` 路径动画
属性:
from="160"初值 to="60"终值 by相对值 values="20;10;20"关键帧位置值(非时间) 
begin="0s;3s"开始时间(多个值代表在非无限循环里的多次数)，begin="id.end-1s"表示在id动画结束之前1s开始，begin="id.click+2s"点击之后2s触发,begin="id.repeat(2)"id动画循环2次后触发，begin="accessKey(a)"按下a键触发,begin="indefinite"配合JS的beginElement()方法触发 dur="3s"持续时间 repeatCount="indefinite"循环次数 repeatDur="10s"循环总时间 attributeName="x"要动的属性 attributeType="CSS/XML/auto"属性类型 type="scale/rotate"属性为transform时用 path=""路径 rotate="auto"随路径旋转 
calcMode=discrete离散|linear|paced|spline贝塞尔，速率。keyTimes="0;.5;1"关键帧，必须和values数目相同。 keySplines="x y x y;x y x y"插值，仅spline模式有效。
fill="freeze"动画停留在结束位置。accumulate="sum"动画结束位置作为下个动画开始位置。additive="sum"多动画同时附加。restart="whenNotActive"动画运行时不能重启动画/never动画只能被触发1次。 min，max动画最短最长时间。
svg.pauseAnimations();暂停，svg.unpauseAnimations()重启动，svg是svgDOM.
**path**
M 路径起点， Z 闭合路径，终点连接起点， L 画线到， H 水平画线， V 垂直画线， A 画弧线。大写字母是绝对定位，小写是相对坐标
`C dx1 dy1,dx2 dy2,x y` 前俩是虚控12点，后是实点
`S x2 y2,x y` 虚控1点是C的虚控2点的镜像，S可组合使用。
CS是三次贝塞尔有2个虚控点。QT是二次且只有1个虚控点，两线段的交点。
`Q x1 y1,x y`  x1是唯一虚点，x是实点。
`T x y` 虚点是前虚点的镜像，x是实点。T可组合使用。
写法：逗号可以用空格代替



**阴影**
`box-shadow: 右shadow 底shadow blur spread color inset;`
参数：模糊距离、阴影大小、颜色、反向。可以做阳光照射过来的亮点。具体参数可用谷歌工具里调。
text-shadow 文本
**渐变**
例子1：`background: -webkit-gradient(linear, right top, left 30deg, from(#fff) ,color-stop(0.20, #07beea), color-stop(0.73, #10a6ce),color-stop(0.95, #000), to(#444));`写法等价于
例子2：`background-image: linear-gradient(to left bottom,#fff 0%,#07beea 20%, #10a6ce 73% ,#000 95% ,#000 155%);`
详解：gradient(类型，起点方向，终点方向，form起色,color-stop中间色,to终色)。color-stop(渐变位置0-1，色)



background: linear-gradient(red, blue); （标准语法必须放在兼容语法最后），线型渐变默认从上到下。 (to right, red , blue)从左到右。to bottom right从左上到右下。0deg从下到上，角度随顺时针变化默认180deg。
repeating-linear-gradient 重复渐变色
rgba(255,0,0,1)最后一位表示透明度不透明。
`background: radial-gradient(center, shape size, start-color, ..., last-color);`圆形渐变
 **文本**
word-break: break-all|keep-all; 单词内换行，连字符换行
word-wrap:break-word; 文本换行 长URL或长单词换行
white-space:nowrap; 不换行
text-align:justify; 两端对齐
text-justify: auto inter-word inter-ideograph inter-cluster distribute kashida trim;文本对齐（仅IE支持）
text-overflow: clip ellipsis string;文字溢出处理

引用外部字体：
```
@font-face {
      font-family: "imooc-icon";
      src:url('xxx.eot') /*IE9兼容模式*/
      src:url('xxx.eot?#iefix') format('embedded-opentype'), 
          url('xxx.woff') format('woff'), 
          url('xxxn.ttf') format('truetype'), 
          url('xxx.svg#micon') format('svg');
      font-weight: normal;
      font-style: normal;}```
使用字体方法：1.类元素写入文字`&#x编号;`2.插入.class:before{content:"\编号";}
字体图标类:
```
.imooc-icon {
	font-family: "imooc-icon";
	font-style: normal;
	font-weight: normal;
	font-size: 0.2rem;
	-webkit-font-smoothing:antialiased;/*抗锯齿*/
	-moz-osx-font-smoothing:grayscale;/*抗锯齿*/
}
```
**动画**
思路：
性能：尽量让动画元素脱离文档流。js存变量写在一起，减少layout。
曲线运动用rotate-基点不在内部,直线运动用translate。
曲线运动用2个keyframes，不同速度不同方向实现，left会重排。
用多帧直线运动代替曲线运动好理解点。
步进动画：雪碧图按帧切换位置+速度step-start。不支持安卓4.3-ios4.3
rotate()函数只是旋转，而不会改变元素的形状，坐标系会跟着旋转，translate值写在前面可以避免坐标系影响。skew()函数不会旋转，而只会改变元素的形状。scale(-1)类似翻转。
translate可用在绝对定位自身调整。
transform-origin是以左上角(0,0)为准,默认中心点。
translateZ是3D图形的半径，正值会朝元素面对的方向走去。
rotatex正值在上边。rotatey正值在右边。
视差滚动：鼠标滚动各层背景移速不同。性能在所有方案里最高。
```
舞台div perspective: 1px;overflow: auto;
    容器div transform-style: preserve-3d;
        背景div translateZ(-1px) scale(2);
        元素们absolute、rotate 多层背景调z值就行：translateZ(-2px);
```
图片视差：background-attachment: fixed; 图片一直定在视口上，内容出现图片才显示。js监听scroll->计算window.scrollTop/data-speed，该值传给background-position进行视差定位。
颠倒视差：滑动鼠标，往相反的方向运动。原理实际是向下滑鼠标，向上动的本来就是默认行为，向下动是js监听scroll->计算（scrollTop*i+默认top）值，该值传给style.top。自我感觉调top没background性能好。
线运动：scale(0,1)水平运动-宽度逐渐变为原宽。
transform: matrix(缩放x, 拉伸y, 拉伸x, 缩放y, 偏移x, 偏移y);
transform:rotate(0deg) 旋转
translate(0px,0px) 偏移
transform: scale(x,y) 体积翻x y倍
transform: skew(0deg,0deg); 拉xy轴
transform: matrix(n,n,n,n,n,n) 合并方法
transform-origin:20% 0; 更改旋转的基点
transform:rotateX(0deg) 围绕X轴翻转
transform: translateY(14px)沿Y轴偏移

transition: property duration timing-function delay;
animation: name duration timing-function delay iteration-count direction fill-mode play-state;; 
@keyframes myfirst{       
0%   {background: red;}    //=from
50%  {background: blue;} 
100% {background: green;}} //=to
关键字：inherit 继承父级样式 initial 回到默认值
绕圆运动内容不转：也可用双层盒子，反转实现。
```
.abc1 {animation: spin 3s infinite linear;}
@keyframes spin{
  from{
    transform: rotate(0turn) translateY(-150px) translateY(50%) rotate(1turn);}
  to {
    transform: rotate(1turn) translateY(-150px) translateY(50%) rotate(0turn);}}```
Column-gap：3px;  列间距
column-span: 1|all; 元素横跨列数
column-rule: column-rule-width column-rule-style column-rule-color;缩写，列中样式
columns: column-width column-count;缩写，列宽列数

appearance:button 元素伪装样式
box-sizing:border-box;元素所有边距边框都在设定盒子内。
outline-offset 外边线偏移
resize:both; 调整大小按钮
img{width:100%;heigth:auto;} 响应图片
filter 滤镜
@media only screen and (max-width:){} 响应式
@media all and (min-width:){}

**响应式设计**
IE9+`<meta name="viewport" content="width=device-width, initial-scale=1.0"/>` IE8-用css3-mediaqueries.js
viewport：参数device-width为设备宽度、initial-scale初始缩放、maximum-scale/minimum-scale最大/最小缩放比率、user-scalable授权手动缩放。
box-sizing:border-box;配合width:%;float:left
12列网格布局：在`@media only screen and ()`定义12个width:L8.33%~100%的类。小屏幕时带网格的都width:100%。
orientation: landscape横屏/portrait竖屏
max-width: 100%;图片最大不超过原本大小
background-size:contain;图片按比例响应 100% 100%填充满 cover最大比例缩放裁剪 
min-device-width设备宽度，游览器大小无影响
```
<picture>
    <source srcset="" media="(max-width:400px)">
    <source srcset="" >
</picture>
```
按屏幕决定是否载入
css <link rel="stylesheet" media="screen and (min-width: 701px) and (max-width: 900px)" href="small.css" />
css文件内载入css文件
@import  url("tinyScreen.css") screen and (max-device-width: 400px);
1个css内部识别屏幕  
@media  screen and (max-device-width: 400px) {.a{} .b{} }
自适应图片 
img {max-width: 100%;}
ipad识别
<link rel="stylesheet" media="all and (orientation:portrait纵屏/landscape横屏)" href="portrait.css" type="text/css" />

px不支持缩放，1em在body设置为10px，1rem=在html设置10px,1vw=视窗宽度1%,1vh=视窗高度1%
移动端rem字体设置：目的是在设计屏幕上让1rem=100px，谷歌不支持10px 适用margin padding height width,border低版本安卓不支持。
```
简化版：不能解决默认字体不为16px的情况。(看情况用var b=self.setInterval(a,100);)
var designWidth = 640, rem2px = 10; //设计宽度自定义
document.documentElement.style.fontSize = 
  ((((window.innerWidth / designWidth) * rem2px) / 16) * 100) + '%';
升级版：解决默认字体，解决横屏。
function adapt(designWidth, rem2px){
  var d = window.document.createElement('div');
  d.style.width = '1rem';
  d.style.display = "none";
  var head = window.document.getElementsByTagName('head')[0];
  head.appendChild(d);
  var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
  d.remove();
  document.documentElement.style.fontSize = window.innerWidth / designWidth * rem2px / defaultFontSize * 100 + '%';
  var st = document.createElement('style');
  var portrait = "@media screen and (min-width: "+window.innerWidth+"px) {html{font-size:"+ ((window.innerWidth/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}";
  var landscape = "@media screen and (min-width: "+window.innerHeight+"px) {html{font-size:"+ ((window.innerHeight/(designWidth/rem2px)/defaultFontSize)*100) +"%;}}"
  st.innerHTML = portrait + landscape;
  head.appendChild(st);
  return defaultFontSize
};
var defaultFontSize = adapt(640, 100);
```

修改占位符字体颜色
```
input::-webkit-input-placeholder {
　　color: #D6D0CA !important; /* WebKit browsers /
　　}
　　input:-moz-placeholder {
　　color: #D6D0CA !important; / Mozilla Firefox 4 to 18 /
　　}
　　input::-moz-placeholder {
　　color: #D6D0CA !important; / Mozilla Firefox 19+ /
　　}
　　input:-ms-input-placeholder {
　　color: #D6D0CA !important; / Internet Explorer 10+ */
　　}
```
margin/padding取形式为百分比的值时，都是以父元素的width为参照物的！
width:calc(100% - (10px + 5px) * 2) 自动计算宽度，减去margin/padding/border。这几个值会撑破100%盒子，手动计算很麻烦，必须带空格。
自适应正方形{width:100%;padding-bottom:100%;heigth:0;}%相对于容器/.a{width:100%;overflow:hidden} .a:after{content:'';display:block;margin-top:100%}子高=父宽
rem方案：html{font-size: calc(18px + 4 * (100vw - 600px) / 400);}

/*手机横屏转向*/
@media (max-device-width : 1024px) and (orientation : landscape) {
    html { transform: rotate(90deg); }
}
文档流：
writing-mode: lr-tb | tb-rl | tb-lr (IE8+);
writing-mode: horizontal-tb | vertical-rl | vertical-lr;
direction：仅影响内联文本流，margin-left/right失效，margin-start/end代替，margin-before/after代替margin-top/bottom
unicode-bidi：

button reset :
  border: none;
  box-shadow: none;
  border-radius: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
button:focus {
  outline: none;
}

box-sizing属性：
content-box，border和padding不计算入width之内
padding-box，padding计算入width内
border-box，border和padding计算入width之内


#### 弹性盒子
direction: rtl 方向
`display`: flex; 容器弹性盒子
`flex-direction`： 弹性子元素方向 (row默认|row-reverse右对齐反排列|column竖向|column-reverse反竖向)
`flex-wrap` 换行 绝不超出容器（nowrap单行默认|wrap多行|wrap-reverse多行向上）
`flex-flow`是flex-direction和flex-wrap的简写
`justify-content`: 容器横向内容对齐 (flex-start左对齐|certer|flex-end右对齐|space-between占左右2边平均分布|space-around不占首尾平均分布)
`align-items`: 容器竖向内容对齐(flex-start上对齐|flex-end下对齐|center垂直居中|baseline基线对齐|stretch默认拉伸)
`align-self` 元素竖向内容对齐，参数同上
`align-content `‘行’对齐 certer居中换行，参数同上。
`order:-1 `排序，和z-index类似。数值小的在前面。
`margin:auto` 获取所有剩余空间，单个元素可实现居中
`flex:1 100%` 分配空间，1代表1/n。flex和为n。参数：拉伸比率 收缩比率 基准值。
水平排列：display: flex; flex-direction: row;
 水平且均分空间：占位符flex:1,其余固宽。
实战：
  1. margin-left: auto; 可代替 justify-self: flex-end; 后者不兼容,auto会消耗所有空闲空间。auto可以调整水平方向任意元素的间距。flexbox内部元素的magrin:auto是垂直水平居中。
  2. 控制文字高度和文字高度相等,font-size === line-height
**选择器**
A>B 表示选择A元素的所有子B，仅一代。`>*`所有直接子元素。
A B 选择多代B
A+B 表示HTML中紧随A的B元素。不包括A
::after和::before用于制作元素，:hover必须放在伪元素前面才能选到伪元素。
`#a:target` href="#a"匹配id=a的,点击a标签操作另一元素
p:nth-child(2)或p:nth-last-child(2) p的父元素中选择位居第二个子元素
:nth-of-type(n)或:nth-last-of-type(n) 同类型第n个，n可为计算式，为n时是计数器，为even偶数，为odd奇数。
A:only-of-type A的父级只有1个A。
A:only-child A的父级只有1个子元素
a:hover:not(.class) 修改样式时忽略某类
A[class*="col-"] 属性任意位置带col-的。
A[class^="col-"] 属性值开头
A[class$="col-"] 属性值结尾
:hover 一定要放在里面?
`<element data-*="value">` 存储数据在元素data-email
没什么用的选择器：
:root 根元素 :empty 空标签 
A:first-child或A:last-child  A的父元素的第1个/末尾子元素
p:first-of-type或:last-of-type 同类型首个或末个
:enabled 表单元素 :disabled 禁用的元素 :read-only 只读元素 :read-write 非只读元素
::selection 选中的字体
content:"\编码"  特殊字符
content:attr(data-*) 使用本标签的任意属性值
content:attr(data-*,url) 插入图片，url值存在属性里
content:url() 插入图片
