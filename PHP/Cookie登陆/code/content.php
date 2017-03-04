<?php
include "cookie.php";
	echo "你好{$_COOKIE['username']}, <a href='logout.php'>退出</a>";

	echo "这是文章的内容页面， 你是登录的， 你可以看到这个页面！<br>";




	echo "这是首页， 你是登录的， 你可以看到这个页面！<br>";

?>
	<a href="index.php">首页</a><br>
	<a href="list.php">列表页</a><br>
	<a href="content.php">内容页</a><br>
