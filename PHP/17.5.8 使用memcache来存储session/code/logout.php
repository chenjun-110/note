<?php
	include "config.inc.php";

	$username = $_SESSION['username'];

	//清空数组
	$_SESSION = array();

	
	//删除cookie中的session id
	if(isset($_COOKIE[session_name()])) {
		setCookie(session_name(), '', time()-3600, '/');
	}

	//销毁所有session资源
	session_destroy();

?>
	再见: <?php echo $username ?> <br>
	<a href="login.php">重新登录</a>
