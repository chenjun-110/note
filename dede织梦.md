本地安装：先下载安装xampp，再下载织梦，把织梦的upload文件夹移动到xampp的htdocs文件夹内(相当于根目录)。再游览器访问http://localhost/uploads/install进行安装。
进入后台：localhost/uploads/dede
进入数据库：http://localhost/phpmyadmin
标签可参照默认模板的写法。

语法：
自定义函数：标记内编程是不能使用echo之类的语句的，只能把所有返回值赋值给`@me`。
	{dede:tagname runphp='yes'}
	       $aaa = @me;
	       @me = "123456";
	{/dede:tagname} 
循环：{dede:foreach array='数组名称'}[field:key/] [field:value/]{/dede:foreach}
引入：{dede:include file='文件名称' ismake='是否为dede板块模板(yes/no)'/}
{dede:global.name/}   全局变量      等同于 <?php echo $name; ?>
{dede:var.name/}      var数组       等同于 <?php echo $_vars['name']; ?>
{dede:field.name/}    field数组     等同于 <?php echo $fields['name']; ?>
{dede:cfg.name/}      系统配置变量  等同于 <?php echo $cfg_name; ?>

块标记：bind-数据来源函数，bindtype-函数类型，rstype-返回值类型。
{dede:datalist}循环代码{/dede:datalist}
等同于-自由调用块标记 
{tag:blockname bind='GetArcList' bindtype='class' rstype='array'}
循环代码
{/tag:blockname}

条件：{dede:if 条件} a-block  {else} b-block {/dede:if}

标签的作用域：全局：`arclist、channel、sql、loop`。列表_list.htm：`list、pagelist`。内容_.article.htm：`likearticle、pagebreak`。

数据库取值：在dede内部是`[field:字段名]`

循环：{dede:arclist row=4 titlelen=32 idlist='9,10,11,12' typeid=3 noflag='h'} {/dede:arclist} //idlist是指定文档列表id	
跳转内容页链接标签：`[field:arcurl/]`
内容页取对应的图片：`{dede:field.litpic/}`
跳到列表页链接标签：`{dede:channel type="top" row='1'}<a href="[field:typeurl/]">Blog</a>{/dede:channel}` type决定栏目祖父级别























