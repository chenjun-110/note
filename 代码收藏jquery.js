$('.level1 > a').click(function(){
	$(this).addClass('current')
	.next().show()  //下一个元素显示
	.parent().siblings().children('a').removeClass('current') //父辈的同辈的子a移除class
	.next().hide(); //隐藏下一个元素
	return false;
}); 
/*
<li class='level1'>
<a>xxx</a>  //点a显示ul
<ul></ul>  //子菜单
</li>
<li class='level1'> //还有n个li
 */
