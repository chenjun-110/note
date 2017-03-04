<?php
	header("Content-Type:text/html;charset=utf-8");

	
	if(isset($_POST['dosubmit'])) {
		$pdo = new PDO("mysql:host=localhost;dbname=xsphp", "root", "123456");

		$stmt = $pdo -> prepare("select id, username, allow_1, allow_2, allow_3 from user where username=? and password=?");

		$stmt -> execute(array($_POST['username'],md5($_POST['password'])));
		//如果查出数据，说明这个用户是存在的，就让登录
		if($stmt->rowCount() > 0) {
			list($id, $username, $allow_1, $allow_2, $allow_3) = $stmt->fetch(PDO::FETCH_NUM);
			
			$time = time()+24*60*60;

			setCookie("uid", $id, $time, "/");
			setCookie("username", $username, $time, "/");
			setCookie("allow_1", $allow_1, $time, "/");
			setCookie("allow_2", $allow_2, $time, "/");
			setCookie("allow_3", $allow_3, $time, "/");
			//设置一个登录判断的标记isLogin
			setCookie("isLogin", 1, $time, "/");

			header("Location:index.php");
		} else {
			echo "登录失败!";
		}

	}
?>

<h3>用户登录</h3>
<form action="login.php" method="post">
	username: <input type="text" name="username" value="" /><br>
	password: <input type="password" name="password" value="" /><br>

	<input type="submit" name="dosubmit" value="登录"><br>
</form>
