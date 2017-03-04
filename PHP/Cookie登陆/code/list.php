<?php
include "cookie.php";
	echo "你好{$_COOKIE['username']}, <a href='logout.php'>退出</a>";

echo "这是文章的列表页面， 你是登录的， 你可以看到这个页面！<br>";

	if($_COOKIE['allow_1']==1) {
		echo "你有1的权限<br>";
	}


	if($_COOKIE['allow_2']==1) {
		echo "你有2的权限<br>";
	}


	if($_COOKIE['allow_3']==1) {
		echo "你有3的权限<br>";
	}


?>
	<a href="index.php">首页</a><br>
	<a href="list.php">列表页</a><br>
	<a href="content.php">内容页</a><br>
