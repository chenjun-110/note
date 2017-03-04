Bootstrap CDN:
```
css: <link href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"> 
theme: <script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap-theme.min.css"></script>
jquery: <script src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
bootstrap: <script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
```
响应式图像 img-responsive
`<meta name="viewport" content="width=device-width, initial-scale=1.0">`
width是设备宽度 1.0是初始无缩放 maximum-scale=1.0,user-scalable=no禁止缩放
class="img-responsive" 响应式img

h1~h3的margin为20px；h4-h6的margin为10px
定义了6个类名。h1 h2 h3 h4 h5 h6
大小：h1为36px，依次减6
`<small>`副标题在h1~h3内font-size: 65%，在h4~h6内font-size:75%
`! important`强制使用本样式
文本字符<用`&lt;`
role="form" 告诉屏幕阅读器这是表单

下面笔记代表p class="lead",简写。//注释为原生css
```
栅格：col-xs-*手机(<768px) col-sm-*平板(≥768px) col-md-*显示器(≥992px) .col-lg-*(≥1200px)。可同时使用。嵌套在div.from-group或div内部的div.row之内。接类名col-md-offset-*向右偏移列距。接类名col-md-pull左 col-md-push右换排序位置。
    div.container
        div.row
            div.col-*-* //可嵌套div.row
```

```
文本突出：p.lead，small、strong、em和cite标签
加粗：<b>和“<strong></strong>”
斜体：<em>或<i>
代码： < >硬编码&lt; &gt;
    <code>单行内联代码     粉色
    <pre>多行代码         灰色
    <kbd>用户输入代码      黑色 
    
代码滚动条：pre高度超过340px
    .pre-scrollable
强调文本颜色类名：
    .text-muted：提示，使用浅灰色（#999）
    .text-primary：主要，使用蓝色（#428bca）
    .text-success：成功，使用浅绿色(#3c763d)
    .text-info：通知信息，使用浅蓝色（#31708f）
    .text-warning：警告，使用黄色（#8a6d3b）
    .text-danger：危险，使用褐色（#a94442）
文本对齐 //text-align
    .text-left：左对齐
    .text-center：居中对齐
    .text-right：右对齐
    .text-justify：两端对齐
去点列表 //padding-left: 0;list-style: none;
    .list-unstyled
ol ul水平列表 .list-inline
dl水平列表 .dl-horizontal
表格： 这里的类要组合起来用border-collapse:collapse;边框合并
     .table：基础表格
     table.table .table-striped 斑马线表格
     table.table .table-bordered 边框表格
     table.table .table-striped .table-bordered .table-hover 悬亮表格
     table.table .table-condensed 紧凑型表格
     div.table-responsive //响应式表格
        table.table .table-bordered
表格行tr颜色://table-hover可加深下面颜色
    .active:活动信息 .success:正确 .info:中立 .warning:警告 .danger:错误
输入框
    from role="form" 
        div.form-group //盒子跟.has-error红/.has-warning橙/.has-success绿会改字框色，再跟.has-feedback加图标√×
            label.control-label //提示文字
            input.form-control //必须有type。
            input.form-control .input-lg //大框
            input.form-control .input-sm //小框
            span.help-blcok //反馈文字,想水平还得配合div.row的栅格
            span.glyphicon.glyphicon-remove.form-control-feedback//可选，和.has-feedback配合加图标的。
水平表单：//缩进代表子父级关系
    .form-horizontal //水平表单
       div.form-group 
         label.col-sm-2 control-label提示字
         div.col-sm-10  //输入框盒子            
            input.form-control 输入框
内联表单：//所有输入框/文字/按钮都排在一行
    .form-inline 内联表单
       div.form-group
         label.sr-only //隐藏标签 不设标签屏幕阅读器失效
         input.form-control //100%显示

禁用：disabled属性和.disabled用于fieldset标签会禁用全域除了legend内部的input。要联合input.form-control一起，否则样式很丑。

下拉选择框
    from role="form" //role属性告诉设备这是表单
        div.from-group
            select.from-control //收起的下拉
            select multiple .from-control//展开的下拉
文本域
    from role="form" 
        div.from-group
            textarea.from-control rows="3" //rows是高度。自动宽度
多选，单选
    from role="form" 
        div.checkbox //每个单选要单独的div
            label //两层嵌套
                input type="checkbox" 
                文字    //可实现文字和input对齐
        div.radio    //div.radio:focus是聚焦。
            label
                input type="radio" name="optionsRadios"
                文字
水平单选，多选
    和上面不一样的地方在于：多个框共享1个div,单选的name属性值必须相同才位于一个组。
    div.form-group和label.checkbox-inline/label.radio-inline
按钮模拟单选，多选
    div.btn-group data-toggle="buttons"
        label.btn.btn-primary //一个label一个选项
            input type="radio/checkbox"



图片
1、img-responsive：响应式图片，主要针对于响应式设计
2、img-rounded：圆角图片
3、img-circle：圆形图片
4、img-thumbnail：缩略图片
```
推荐对a标签和button标签使用。div span input也能行。
![按钮](http://i.imgur.com/q0vlgZz.png)
接类名 .btn-lg变大 .btn-sm变小 .btn-xs超小
接类名 .btn-block最大宽度

组件:必须1.90以上的jQuery.二级下拉a标签必须有data-toggle="dropdown"
```
按钮-正在加载:
    button.btn data-loading-text="正在加载中,请稍等..." id=""
    $(function(){
        $("#id").click(function () {
            $(this).button("loading");
    }); });
下拉菜单(按钮式)
    div.dropdown/div.btn-group //div.btn-group.dropup是向上弹出
        button.dropdown-toggle.btn.btn-default data-toggle="dropdown"
            span.caret //三角
        ul.dropdown-menu //接.dropdown-menu-left/right左对齐右对齐,但要配合加div左浮动。
            li.dropdown-header//菜单标题
            li.active         //活动项
                a tabindex="-1"//忽略tab键
            li.divider        //菜单分隔线
            li.disabled        //禁用项
按钮组
div.btn-toolbar    //if工具栏就加这个盒子
    div.btn-group  //接btn-group-lg/sm/xs调大小
        button.btn.btn-default
            span.图标类
导航：按钮+下拉
    div.btn-group   //垂直导航条用.btn-group-vertical
        button...     //接按钮组
        div.btn-group //替换dropdown
            ...    //接下拉
等分按钮：用于移动端响应
    div.btn-wrap
        div.btn-group.btn-group-justified
            a.btn.btn-default //<button>有兼容问题。
导航：标签式
    ul.nav .nav-tabs //接.nav-justified自适应导航
导航：胶囊式
    ul.nav .nav-pills  //接.nav-stacked垂直导航
        li.nav-divider //分隔线，仅用于垂直
        li.dropdown    //二级导航
            a.dropdown-toggle data-toggle="dropdown"
                span.caret
            ul.dropdown-menu
导航：/面包屑式/用于告诉当前位置
    ol.breadcrumb
导航条：包含输入框、下拉、按钮..
    div.navbar .navbar-default//容器
        div.navbar-header //标题
            a.navbar-brand
        ul.nav .navbar-nav//导航条，可单独用
            li.dropdown   //二级导航参考上面
                ...
        form.navbar-form .navbar-left//搜索框
            div.form-group
                input.form-control
            button.btn.btn-default
固定导航条：用于移动端。小屏垂直显示。
    div.navbar .navbar-default .navbar-fixed-top/bottom
    //盒子其余内容同上。固定上下导航会遮盖内容50px，需要CSS设置内容的上下内边距。
反色导航条：黑底白字，类似夜间模式。
    div.navbar .navbar-inverse //盒子其余内容同上
折叠导航条：用于移动端。屏<768把导航项收到下拉按钮中。
    nav.navbar.navbar-default
        div.navbar-header
            button.navbar-toggle data-toggle="collapse" data-target="取决于待折叠的div的独有.class名或#id名" //该按钮只小屏显示。
                span.sr-only //屏幕阅读器会读出文字
                span.icon-bar //*3，三道杠图标
            a.navbar-brand
        div.collapse .navbar-collapse .独有class //待折叠的导航条盒子
            ul.nav.navbar-nav

分页导航:12345
    ul.pagination .pagination-lg/sm
        li-a...
分页导航：翻页
    ul.pager
        li-a &laquo;上一页
        li-a 下一页&raquo; //默认居中显示
        li.previous       //最左
        li.next           //最右
标签：小标记
    span.label 接下列类名
    .label-deafult:默认标签，深灰色
    .label-primary：主要标签，深蓝色
    .label-success：成功标签，绿色
    .label-info：信息标签，浅蓝色
    .label-warning：警告标签，橙色
    .label-danger：错误标签，红色
徽章：新消息数量
    span.badge .pull-right
```
其它组件：
```
缩略图：需配合栅格盒子显示。
    a.thumbnail
        img style="height:; width:100%;display:block;" 
    div.caption
        h3   //标题
        p   //段落
            a.btn.btn-primary //按钮
警示框条：
    div.alert 接.alert-success/info/warning/danger颜色 再接.alert-dismissable关闭钮效果
        <button class="close/btn" type="button" data-dismiss="alert" >&times;</button>//关闭钮,有多组警示条必须指定id
        a.alert-link //粗体字链接
    <button data-target="#被关盒子id,#自己的id" 其余属性同上>//外部关闭钮。同级按钮一定要指定id

进度条：
    div.progress //接.progress-striped条纹进度条，再接.active动态条纹，也可接在进度div上。
        div.progress-bar //接.progress-bar-info/sucess/warning/danger彩色进度条，style=width:10%值决定进度，多个该div能组成层叠彩色进度width合计<100%。
媒体：图+字
    div.media //容器
        a.pull-left //媒体容器
            img.media-object //媒体对象
        div.media-body       //内容容器
            h4.media-heading //内容标题
            div      //内容。       
            div.media//可选，嵌套容器。
媒体：列表式，头像+回复
    ul.media-list
        li.media //容器
            ...   //同上
        li.media
列表组：n个列表项组成列表组
    ul.list-group
        li.list-group-item //徽章列表项
            span.badge  
    div.list-group         
        a.list-group-item  //描述列表项
            h4.list-group-item-heading //标题
            p.list-group-item-text     //内容
        a.list-group-item  //链接列表项，彩色接.list-group-item-success/info/warning/danger
            span.badge
面板：用于描述
    div.panel panel-default/primary/success/info/warning/danger 重点蓝 成功绿 信息蓝 警告黄 危险红
        div.panel-heading //标题
        div.panel-body 
            p
            table //嵌套表格 参考上面 无边距的table提到body同级位置
            ul    //嵌套列表组 参考上面
        div.panel-footer  //尾

```
单独引用js插件的组件[https://github.com/twbs/bootstrap/tree/v4-dev/js/dist](https://github.com/twbs/bootstrap/tree/v4-dev/js/dist)下载对应的js引用即可。 动画过渡transition.js 模态弹窗modal.js 下拉菜单dropdown.js 滚动侦测scrollspy.js 选项卡tab.js 提示框tooltop.js 弹出框popover.js 警告框alert.js 按钮button.js 折叠/手风琴collapse.js 图片轮播carousel.js 自动定位浮标affix.js 全部bootstrap.min.js
触发在组件有2种方法：1.属性触发，2.js方法
```
模态弹出框
    button.btn.btn-primary data-toggle="modal" data-target="取决盒子#id/独有.class"//触发按钮
    a.btn.btn-primary data-toggle="modal" href="取决盒子#id"//可选，功能同上，有id就不用jQ
    div.modal id="mymodal" //盒子,接.fade淡入效果 接data-backdrop="static"取消单击背景退出 data-keyboard="false"取消Esc退出
        div.modal-dialog   //接.modal-lg/sm大小框
            div.modal-content
                div.modal-header
                    button.close data-dismiss="modal" //关闭x按钮
                        span &times;
                        span.sr-only
                    h4.modal-title //弹出框标题
                div.modal-body   //弹出框内容(文字p 图片)
                div.modal-footer //框底的按钮
                    button data-dismiss="modal"
                    button
     $(function(){
       $(".btn").click(function(){
         $("#mymodal").modal("toggle");//还可为"show/hide"
       });
     }); //有data-toggle、target属性不需要这段代码
     $('#myModal').on('hidden.bs.modal', function (e) {// 处理代码...
     })//shown/hidden.bs.moda弹出窗显示后/隐藏后触发，show/hide.bs.modal弹出窗显示/隐藏时触发，
选项卡：控制显示哪条内容
    ul.nav.nav-tabs/pills     //选项卡菜单
        li.active 
            a href="#面板id" data-toggle="tab/pill"
    div.tab-content          //选项卡面板
        div.tab-pane id=" "//接.fade淡入，有.active的接.in.fade
按钮:确认->加载中->确认
    div.btn-group data-toggle="buttons"
        button.btn.btn-primary data-toggle="button" id="" data-loading-text="加载中..." data-complete-text="确认">确认</button> //data-自定义字符-text
    $(function() {
      $("#id").click(function(){
         $(this).button('loading').delay(1000).queue(function() {
            $(this).button('complete');
            $(this).dequeue();
         });        
      });
    });





其它插件代码在菜鸟教程上有：几个感兴趣的是弹出框、折叠、轮播、滚动监听、附加导航。
提示框：仅支持js触发
    button.btn.btn-default data-toggle="tooltip" data-original-title="自定义提示信息" data-placement="left/right/top/bottom" 
    $(function(){
      $('[data-toggle="tooltip"]').tooltip();
    });
弹出框：和上面的区别是，这个带标题。
    <button.btn.btn-default data-toggle="popover" title="弹出框标题" data-content="弹出框内容" data-placement="left/auto left" data-trigger="hover" data-delay="300">//还有很多属性按需求设置
    $(function(){
        $('[data-toggle="popover"]').popover();
    });
手风琴式折叠：标题->内容
    div.panel-group id="" //大盒子
        div.panel.panel-default //1组对应1组标题+内容
            div.panel-heading   //标题盒子
                h4.panel-title
                    a data-toggle="collapse" data-parent="#大盒子" href="#面板盒子"
            div.panel-collapse.collapse.in id="" //面板盒子 in默认显示.collapse默认隐藏
                div.panel-body
按钮式折叠：按钮->内容  只要有data-toggle和data-target/href就能起作用
    button.btn.btn-danger data-toggle="collapse" data-target="#demo"//按钮，
    div.collapse.in id="demo" //面板
轮播：
    div.carousel.slide data-ride="carousel" data-interval="毫秒" id=" " //大盒子，data-wrap="false"禁止循环播放，data-pause="hover"悬停停止播放
        ol.carousel-indicators//设置顺序
            li.active data-target="#大盒子" data-slide-to="0" //1个li对应1张图片，0是索引值。0++
        div.carousel-inner    //设置图片
            div.item.active //1个item对应1张图片
                a
                    img
                div.carousel-caption
                    h3 标题
                    p 描述
        a.left.carousel-control href="#大盒子" data-slide="prev" //设置左控制
            span.glyphicon.glyphicon-chevron-left
        a.right.carousel-control href="#大盒子" data-slide="next" //设置右控制
            span.glyphicon.glyphicon-chevron-right
滚动监听：滚动到指定位置添加高亮
    nav id="被取决"//导航条样式参照上面,接.navbar-fixed-top导航条固定顶端
        div
            div
        div
            ul
                li
                    a href="#blog" //a标签可以定位到内容区的id值
    div data-spy="scroll" data-target="取决于导航条盒子#id或类" data-offset="10"//这3个属性可加在body里
        h4 id="blog"  //和href关联
        p

    body data-spy="scroll" data-target="#A" 设置滚动监听
        div id="A" //被监听的表的盒子
            ul data-spy="affix" data-offset-top/bottom="20" 设置固定屏幕和固定距离
                li a href="#a" //1个li对应1个h2
        div
            h2 id="a"
```
icon内置类[http://getbootstrap.com/components/#glyphicons](http://getbootstrap.com/components/#glyphicons)
icon阿里[http://www.iconfont.cn/plus/home/index?spm=a313x.7781069.1998910419.2.7j3any](http://www.iconfont.cn/plus/home/index?spm=a313x.7781069.1998910419.2.7j3any)

boot响应式类参考下自己DIY修改：
```
.container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 768px) {
  .container {
    width: 750px;
  }
  @media (min-width: 992px) {
  .container {
    width: 970px;
  }
  @media (min-width: 1200px) {
  .container {
    width: 1170px;
  }//容器

.row {
  margin-right: -15px;
  margin-left: -15px;}//行

.col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left;
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
 }//左浮动

.col-md-12 {
    width: 100%;
  }//均分响应宽度
  .col-md-11 {
    width: 91.66666667%;
  }
  .col-md-10 {
    width: 83.33333333%;
  }
  .col-md-9 {
    width: 75%;
  }
  .col-md-8 {
    width: 66.66666667%;
  }
  .col-md-7 {
    width: 58.33333333%;
  }
  .col-md-6 {
    width: 50%;
  }
  .col-md-5 {
    width: 41.66666667%;
  }
  .col-md-4 {
    width: 33.33333333%;
  }
  .col-md-3 {
    width: 25%;
  }
  .col-md-2 {
    width: 16.66666667%;
  }
  .col-md-1 {
    width: 8.33333333%;
  }

 .col-md-offset-12 {
   margin-left: 100%;
}
//列向右偏移列数，中间省略1-11。。。
  .col-md-offset-0 {
    margin-left: 0;
  }

.col-md-pull-12 {
    right: 100%;
  }
//列向左排序列数，中间省略1-11。。。
.col-md-pull-0 {
    right: 0;
  }

 .col-md-push-12 {
    left: 100%;
  }
//列向右排序列数，中间省略1-11。。。
 .col-md-push-0 {
    left: 0;
  }
```
```
.visible-phone   <767显示 768<隐藏<979 桌面默认隐藏
.visible-tablet  隐藏<767 768<显示<979 桌面默认隐藏
.visible-desktop 隐藏<979             桌面默认显示
.hidden-phone    隐藏<767 768<显示<979 桌面默认显示
.hidden-tablet   显示<767 768<隐藏<979 桌面默认显示
.hidden-desktop  显示<979              桌面默认隐藏 
```