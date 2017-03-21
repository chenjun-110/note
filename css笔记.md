CSS HACK:利用特殊字符 * _ /9识别，顺序从高到低。
```
#tip{ 
background:blue;  /*Firefox变蓝 所有浏览器都支持*/ 
background:red\9;  /*IE8变红 IE6789覆盖*/ 
*background:black; /*IE7变黑IE6、7又一次覆盖*/ 
_background:orange; /*IE6变橘 IE6又一次覆盖*/ 
}  ```
条件注释识别：貌似只能用于body
```
<!--[if IE 7]> 仅IE7可识别 <![endif]-->
<!--[if IE 8]> 仅IE8可识别 <![endif]-->
```
----------

id选择器只能被引用一次，如调用多次需：
`#XXX p {  }`
`#XXX h2{  }`

类选择器：
.xxx { } 
p.xxx { }            #除了p，其他不能引用该class

属性选择器：
[title]{ }           #只要含有属性title，无论值为何都可调用
[title~=hello]{ }    #值只要部分含有hello的都调用
[lang|=en] { }       #lang属性等于e或以en-开头的整个单词。img[src|="/i/figure"] figure-1/2
[abc^="def"]         #选择 abc 属性值以 "def" 开头的所有元素
[abc$="def"]         #选择 abc 属性值以 "def" 结尾的所有元素
[abc*="def"]         #选择 abc 属性值中包含子串 "def" 的所有元素

后代选择器：
h1 em {   }          #无视em嵌套深度
子元素选择器:
h1 > strong {   }    #1层嵌套
相邻兄弟选择器：
h1 + p {   }         #同父级
li + li{   }         #从第2个li生效

伪类：（要先声明DOTYPE）
selector:pseudo-class{property:value}
input:focus{}        #输入焦点
:first-child{}       #只有第1个项生效
:lang(no)            #当lang="no"时调用

伪元素：
:first-line          #文本首行
:first-letter        #文本首字母
font-size:xx/x-large   #字体变大
:before/after{content:url()}#元素前后插入新内容图片

插入外部样式表：
```<head>
<link rel="stylesheet" type="text/css" href="mystyle.css" />
</head>```
内部样式表 内联样式                          
多重样式会继承外部样式里内部没有的样式，相同样式按内部样式优先。

{background-image: url(' ');}                  #背景图像 
background-repeat: repeat-y/repeat-x/no-repeat;#平铺
background-attachment:fixed;                   #图像不会随页面滚动
background-position: 50px 10px/30% 50%/center; #定位
background: #ff0000 url() no-repeat fixed center; #简写
text-indent: 5em;                              #文本缩进，em是字体高
word-spacing:    ;                             #单词间隔
letter-spacing:   ;                            #字母间隔
{text-transform:none/uppercase/lowercase/capitalize} #字符转换：大写/小写/首字母大写
{text-decoration:none/underline/overline/line-through/blink}#文本装饰，下划/上划/删除线/闪
white-space:normal/pre/nowrap/pre-wrap/pre-line#处理空白符，默认/承认格式/禁止换行/自动换行
    pre-line:合并空白符，可换行，自动换行
    normal:合并空白符，不可换行，自动换行
    nowrap:合并空白符，不可换行，禁止自动换行
    pre:不合并空白符，可换行，禁止自动换行
    pre-wrap:不合并空白符，可换行，自动换行
候选字体类型：                                 #带空格的加引号
p{font-family: Times, TimesNR, 'New Century Schoolbook', Georgia, 'New York', serif;}
font-style:normal/italic/oblique;              #字体风格：正常/斜体/倾斜
font-variant:small-caps                        #字体变形:小型大写字母
font-weight:bold/100~900                       #字体粗细：加粗/9级粗度
font-size: 1em/16px/100%/xx-large
font:italic bold 12px大小/30px行高 arial,sans-serif;   #简写

链接样式：（注意顺序）
a:link{     }  #未访问的链接
a:visited{  }  #已访问的链接
a:hover{    }  #鼠标移到链接上
a:active{   }  #点击链接
a.xxx:link{ }  #多个链接可加class

display:block  #用于将`<a><span>`定义为块级元素，从而调用宽高

列表样式:
{list-style-type:circle/square/upper-roman/lower-alpha} #圆孔/方块/罗马/字母
{list-style-image:url( )}                      #图像作为列表标记
{list-style-position:inside}                   #列表往右边缩进
{list-style : url() square inside}             #简写

表格样式：
table-layout:auto/fixed                        #表格布局
border:1px solid 颜色/thin/thick               #边框颜色
border-collapse:collapse/separate；            #单/双线边框
vertical-align:bottom/top/center               #垂直对齐
border-spacing: px  px                         #表格内外边框间距
caption-side:bottom/top/left/right             #表格标题方向
empty-cells:hide                               #隐藏空格边框
border :颜色 dotted/solid thick/thin/medium    #边框线(简写)
outline:颜色 dotted/solid thick/thin/medium    #轮廓线(简写)
    outline-style:dotted/solid/dashed/double   #轮廓线样式
    outline-color:#                            #轮廓线颜色
    outline-width:thin/thick/ px               #轮廓线宽度
padding: px em ex % ;                          #内边距(上,右,下,左。只2组就是上下，左右）
padding-top/right/bottom/left： px/em/ex/ %    #单边内边距（%相对于父元素width）
border-style: solid dotted dashed double       #实线上边框，点右，虚下，双左

定位：
position:relative;left: px;                    #相对定位偏移，+右-左
position:absolute;left: px;top: px             #绝对定位偏移（跟着附近position元素走）
position:fixed;                                #固定定位（滚动IE不变）
overflow:scroll/hidden/auto                    #滚动条显示溢出(指定宽高)/隐藏溢出/自动处理
img{clip:rect(px px px px)}                    #裁剪矩形（顺时针）用于裁剪绝对定位元素
vertical-align:text-top/bottom     #垂直排列
z-index:-1/1                      #-1被堆叠,1堆叠（绝对和固定定位才重叠）

浮动：
clear:both                        #左右不允许出现浮动框
float:right                       #向右浮动
li{display:inline}                #列表横向排列

margin:auto                       #居中
游览器兼容：
body{margin:0;padding:0;}         #IE8以前会有外边距
<!DOCTYOE html>                   #使用float必须声明

max/min-height:                      #最大最小高度
max/min-width:                       #最大最小宽度
line-height:                         #行高
display:inline/block                 #不换行/换行
display:none/visibility:hidde  #隐藏（彻底消失/保留空间）
visibility:collapse                  #用于表格的隐藏
style="cursor: "                     #光标变形
div.img img                                    #divclassimg下的img
opacity:1                            #透明度1
filter:alpha(opacity=100)            #透明度1(用于IE8前）

CSS布局
```
* {
  -webkit-box-sizing: border-box;      谷歌内核识别码
     -moz-box-sizing: border-box;      火狐内核识别码
          box-sizing: border-box;
}```
容器上加清除浮动防止浮动溢出 overflow:auto;
容器相对定位，里面绝对定位
块加清除浮动，可以在浮动元素下方显示 clear:left;
比浮动简单的网格布局 display=inline-block;
column-count:3;                                 分列数（要加前缀识别码）
column-gap:1em;                                 列之间的间隙（要加前缀）
伸缩盒布局：(-webkit-仅用于谷歌)
  容器加 display:flex;
  子元素 flex:initial;                          伸缩范围（min-width~width)
         flex:none;                             固定范围
         flex:1;                                剩余范围的1/3
         flex:2;                                剩余范围的2/3

border-radius；5px                              圆角

----------
元素前加序号：
```
div{
counter-reset: section; /*盒子创建计数器*/
}
h4:before{
content:"aaa" counter(section)".";  /*显示"aaa."*/
counter-increment: section;} /*计数*/```
鼠标悬停[ 特效 ]:
```
a {  
position: relative;  
display: inline-block;  //设了行级块就不乱跑了
outline: none;  
text-decoration: none;   //删掉下划线
color: #000; 
}  //链接默认蓝色
a:hover::before, a:hover::after { position: absolute; }//重点  
a:hover::before { content: "\5B"; left: -20px; }  
a:hover::after { content: "\5D"; right:  -20px; }  ```

###定位

**相对定位：**
1. relative能限制absolute的top/bottom/left/right、z-index、overflow失效。
2. relative的值是以自己为原点移动。
3. margin-top移动后，会改变布局，后面内容会跟上。top不会。relative也不会改变布局。
4. 同时设置左右/上下。absolute拉伸,relative取左上值
5. relative仅能限制fixed的z-index。   
6. 设置了relative的元素会置前，其它元素的z-index都没用。而z-index:auto时，会内部层级控制失效。(但IE6/7仍能控制内部层叠）
7. relative最小化原则：单独给absolute套相对盒子。普通元素就别套里面。不使用relative的absolute元素，可以避免层叠混乱

**绝对定位** 
单独使用虽然无法使用top等，可配合margin。
1. 脱离文档流：absolute和float都能，会让父元素高度塌陷。就算你是块元素后面元素依然忽视你。block必然另起一行。
2. 去浮动：定位生效时，浮动失效。
3. 位置跟随：覆盖原位置。内联元素定位后仍在行内。
4. IE7bug-定位元素会inline-block化，block失效：需定位元素套一层空div盒子。
5. `<!-- -->`在img和i标签中插入能消除空格。
6. 把定位元素放在盒子第1位，会出现在盒子左上角。根据位置跟随原理，定位后后来元素补充左上角，这时定位元素就能通过margin调位置了。
7. 居中：父级text-align:center能让子级内联元素如&nbsp居中。img跟随字符且左移半宽得到居中效果。
8. 居右：text-align:right, 换行&nbsp, inline+fixed+margin-left;右侧自适应工具条
9. 当有2个定位元素，根据DOM流位置后者覆盖前者。多个用z-index
10. 下面是带盒子的绝对定位。
10. position:relative/absolute/fixed/sticky祖先定位元素都能限制absolute。
11. 满屏自适应：absolute+width&height100%+left&top0;等价于absolute+lefttoprightbottom:0;同理width50%等价left0right50%;设对立值可自适应拉伸取代固宽。(IE7+)
12. 居中：固宽+拉伸+margin:auto;(IE8+)另外固宽对宽度的影响优先拉伸。
13. absolute整体布局：
设置1个取代body的div{absolute+拉伸} 
html，body{height:100%}
header，footer{absolute;left:0;right:0;}
header{固高；top:0;} footer{固高；bottom:0;}
aside{固宽；absolute;left:0;topbottom:0;}
.content{absolute;top;bottom;left;overflow:auto}
以上可实现头尾侧模拟fixed效果，内容过长出现滚动条，适合移动端头尾菜单固定。注意DOM流覆盖位置。
如需实现全屏覆盖‘菊花加载’效果,设个和div平级的div盒子。
div2 {absolute+拉伸+rgba(000,.5);z-index:9;}


###边距

**内边距：**
1. width固定值时padding改变盒子尺寸。width:auto或box-sizing:boder-box时padding只改内容尺寸(距离不够时仍会改盒子) 
2. inline元素padding值只会影响内容的水平边距，上下边距无效。但会影响背景色的上下左右。
3. 不支持负值，支持%。%相对于宽度，50%一定是正方形。
4. inline元素的垂直padding是幽灵文本节点，需设置font-size:0；
5. 兼容性：IE7 botton的内边距会随字数增大。可设overflow:visible;火狐 `button::-moz-focus-inner{padding:0;}`
6. label模拟兼容按钮`<label for="btn">按钮</label>`将button隐藏z-index:-1(for获得回车提交事件),label行级块。
7. **等高布局**`margin-bottom:-600px;padding-bottom:600px;`配合父元素overflow:hidden使用。

三道杠图标用padding做：
```
div.abc {width: 150px; height: 30px;
background-color: currentColor;/*背景色取附近*/
background-clip: content-box; /*背景色仅显示在内容区域*/
border-bottom: 30px solid;border-top: 30px solid;
padding: 15px 0;}```
圆环按钮(3层类似home键)：
```
div.abc {width: 150px; height: 150px;
	padding: 10px;
	border: 10px solid;border-radius: 50%;
	background-color: currentColor;
	background-clip:content-box;}```

**外边距**
1. 只适用普通块元素，只能改水平内容大小。
2. %值是相对于**容器**宽度计算的。定位元素的%值相对于**祖先定位容器**宽度计算。
3. margin:50%是2:1长方形
4. 子元素外边距大于父元素外边距的话，发生（上下）重叠。
5. 重叠计算：正正取大值，正负就相加，负负取最负。
6. 利用margin会重叠，所以上下都写，这样更有健壮性，移动元素时不会打乱布局。
7. 去重叠设置：加border/padding/inline元素分隔/块/定位/浮动。overflow:hidden能创建块。
8. auto作用是分配剩余空间，所以inline元素无法居中。转为块占满全行才可。
9. **两栏自适应布局：**{float:left;width:100%;}和{float:left;margin-left:-100px;}.浮动元素可伸缩。
10. margin无效情形：内联元素垂直，display:table-cell/row,仅绝对定位方向的有效，浮动元素脱离文档流所以旁边元素的margin值会略过该元素，内联元素对齐文本基线负值不能超过游览器。
11. margin-start表示文档流开始的magrin值，默认左。`writing-mode:vertical-lr;和direction:rtl"都能改变文档流方向`margin-before默认上，margin-after默认下。仅webkit支持。margin-collapse:discard取消边距/separate取消重叠。

**浮动**
1. 会使父元素高度塌陷破坏(偏移化，去空格化，砌砖化)
2. 清除浮动方法： clear:both;--> 伪元素:after;父元素(IE8+)BFC/(IE67)haslayout;
`clearfix:after{content:";display:table;clear:both;}`(IE8+)
`.clearfix{*zoom:1;}` (IE67) 清除浮动元素最好用在浮动父级上
overflow：hidden会使元素BFC化，不会发生margin重叠。
3. float会使元素block化。
4. 砌砖布局：固定尺寸+浮动。缺点：ie67兼容差,难维护。
5. **流体布局：**
普通：float:left,text-align:center,float:right。
单侧固宽自适应:width+float,padding/margin。
右侧固宽自适应：容器width100%+floatleft,width+=margin负值+floatleft,padding/margin (不改变DOM位置)
两侧或多栏自适应：float,display:table-cell(IE8+)/display:inline-block(IE7)
`{ display: table-cell; *display: inline-block; width: 9999px; *width: auto; }`兼容写法
6. 解决IE7浮动不同行问题：在body中把浮动元素放在元素前，游览器先读取浮动DOM.


触发BFC条件：margin忽略float元素，所以应设float元素margin。或BFC元素padding.清除浮动影响。
- float的值不为none。
- overflow：scroll，auto/hidden（ie7+最优）。
- display：table-cell（ie8+最优）, table-caption, inline-block(ie67最优)
- position的值不为relative和static。
**BFC自适应布局**：代码简单，可大规模应用
.l { float: left; } .r { overflow: hidden; }

filter:alpha(opacity=50)（透明度兼容IE8-）

**overflow**
1. 如果overflow-x/overflow-y的值分别是visible和hidden/scroll/auto,那么visdible值会被重置为auto.
2. IE7滚动条bug:auto时，width:100%应删除。
3. 表格设置滚动条：还需table-layout:fixed;
4. 只能给非display:inline元素设置。
5. 游览器默认滚动条：
html{overflow-y:scroll;}(IE7-)
html{overflow:auto;}(IE8+)
如何删除默认滚动条：html{overflow:hidden;}
6. JS获取滚动高度：后者是谷歌游览器对象
`var s=document.documentElement.scrollTop || document.body.scrollTop`
另外，padding:100px 0;在谷歌中有上下内边距。其它所有游览器都没有padding-bottom。这会导致滚动条高度scrollHeight计算失误。
7. 滚动条出现水平居中页面跳动bug:margin:
8. 跳动
1.html{overflow-y:scroll;} (IE78)  ||
2.padding-left:calc(100vw游览器宽-100%可用宽）(IE9+)
8. 自定义滚动条命令请百度，webkit的最强大。
::-webkit-scrollbar{width:8px;height:8px;} 槽宽
::-webkit-scrollbar-thumb{background-color}拖动条
::-webkit-scrollbar-track{border-radius}   背景槽
9. IOS滚动回调特效：-webkit-overflow-scrolling:touch;
10. 清除浮动：
.box{*zoom:1;} 清除浮动触发IE67haslayout
.box:after{content:'';display:table;clear:both;}
11. overflow遇到包含块(定位元素)会失效：
解决方案：1.自身变为包含块。2.overflow添加子元素包含块包住孙级包含块。3.overflow元素子元素声明transform。（IE9+）
12. resize必须和不为默认值的overflow配合生效。文本域自带overflow:
13. auto。text-overflow:ellipsis必须配合overflow:hidden;white-space:nowrap;使用。 另外resize按钮17*17，滚动条宽17px。
13. 锚点定位：url中的#mm5可以滚动条定位页面id:mm5元素。`<a class="click" href="#mm5">1</a>`单页应用中hidden做盒子，用锚点定位能做选项卡且游览器不弹动。

**行高**
1. simsun
2. 下：font-size+行间距=line-height
2. 行高决定内联盒子高度。内联盒子高度=半行间距+内容区域高度+半行间距。
3. input默认nor
4. mal不能自动继承，需使用inherit;
4. 重阅读网页1.5，轻阅读20px;body{font-size:14px;line-height:1.42857}
5. 图片会和文字基线对齐留下底空。消除：1.block；无基线2.vertical-align:bottom；底线对齐3.行高0；文字基线上移
6. 图片水平垂直居中：盒子{行高+center}。img{vertical-align:middle;基线上移1/2}(IE8+)
7. 多行文本水平垂直居中：盒子同上；text{inline-block;line-height:normal;text-align:left;vertical-align:middle;最大宽度100%}(IE8+)

####布局
outline：none;不占空间
ie6/7不完全支持inline-block脱离文档流. 解决*display:inline; zoom:1;
切图的时候，将图的高度切为单数
父元素width等于块级子元素的margin、border、padding以及content宽度之和
包裹性元素width等于自己content宽度：overflow | position:absolute | float:left/right
2个div之间有回车键造成的间隙？float/HTML代码不要回车

















































a:hover:not(.class) 修改样式时忽略某类
ul li+li:before  +号第1个li不添加
content:"\编码"  特殊字符 "/\00a0"表示/
:hover 一定要放在里面?
A>B 表示选择A元素的所有一代B。`>*`所有直接子元素。
A B选择多代B
A+B表示HTML中紧随A的B元素。
A~B表示A之后出现的同父级的所有B
p:nth-child(2)就表示在p的父元素中选择位居第二位的子元素
p:nth-of-type(2)第n个同级同类型兄弟元素
:first-of-type==:nth-of-type(1) 
odd/even可做n的参数
@import url(x.css) 把多个css文件导入到1个css文件中。
color:blue !important; 优先级最高
元素[属性="值"]{}
样式内使用脚本`a{expression:(this.onFocus=this.blur());}等价于<a href="#" onfocus=this.blur();>等价于a{outline:none}`a在获得焦点的同时失去焦点,隐藏虚线。
content:attr(data-hover); 获取属性值给伪元素
计数器：
```
body {counter-reset: icecream;}
input:checked {counter-increment: icecream;}
.total::after {content: counter(icecream);}```
只选取第1个和最后一个（IE8）:    div>a:first-child    div>a+a+..+a+a