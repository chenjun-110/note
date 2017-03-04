<?php
	include "conn.inc.php";
	//如果没登录就去登录页面
	if(!(isset($_SESSION['isLogin']) && $_SESSION['isLogin']===1)) {
		header("Location:login.php");
	}

	echo "你好: ".$_SESSION['username']." <a href='logout.php'>退出</a><br>";

	if($_SESSION['allow_1'] == 1) {
		echo "你有这个 1 的权限!<br>";
	}

	if($_SESSION['allow_2'] == 1) {
		echo "你有这个 2 的权限!<br>";
	}

	if($_SESSION['allow_3'] == 1) {
		echo "你有这个 3 的权限!<br>";
	}

	$stmt = $pdo -> prepare("select id, title, ptime from email where uid=?");

	$stmt -> execute(array($_SESSION['id']));

	echo "你有".$stmt->rowCount()."封邮件!<br>";
	echo '<table>';
	echo '<tr><th>ID</th><th>TITLE</th><th>DATE</th></tr>';
	while(list($id, $title, $ptime) = $stmt->fetch(PDO::FETCH_NUM) ) {
		echo '<tr>';
		echo '<td>'.$id.'</td>';
		echo '<td>'.$title.'</td>';
		echo '<td>'.date("Y-m-d H:i", $ptime).'</td>';
		echo '</tr>';
	}

	echo '</table>';
