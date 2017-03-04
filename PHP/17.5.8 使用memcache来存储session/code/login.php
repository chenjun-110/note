<?php
	


	//处理登录

if(isset($_POST['dosubmit'])) {
	

		include "conn.inc.php";
		//到数据查找用户输入的是否正确

		$sql = "select id, username, allow_1, allow_2, allow_3 from user where username =? and password = ?";
		$stmt = $pdo -> prepare($sql);


		$stmt -> execute(array($_POST['username'], md5($_POST['password'])));

		

		if($stmt->rowCount() > 0) {

			//将用户信息一次性放到session中
			$_SESSION=$stmt->fetch(PDO::FETCH_ASSOC);	

			//加登录标记
			$_SESSION['isLogin']=1;

			header("Location:index.php");
		}else {
			echo "登录失败!<br>";
		}

	}

?>

<form action="login.php" method="post">
	username: <input type="text" name="username" value="" /><br>
	password: <input type="password" name="password" value="" /><br>

	<input type="submit" name="dosubmit" value="login"> <br>
</form>
