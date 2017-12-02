<?php
	include "conn.inc.php";

	//如果没登录就去登录页面
	if(!(isset($_SESSION['isLogin']) && $_SESSION['isLogin']===1)) {
		header("Location:login.php");
	}
