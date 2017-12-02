<?php
	header("Content-Type:text/html;charset=utf8");
	$filename = "message.txt";

	//如果用户提交了， 就写入文件， 按一定格式写入
	if(isset($_POST['dosubmit'])) {
		//字段的分隔使用||, 行的分隔使用[n]
		$mess = "{$_POST['username']}||".time()."||{$_POST['title']}||{$_POST['content']}[n]";

		writemessage($filename, $mess);

	}



	if(file_exists($filename)) {
		readmessage($filename);
	}


	function writemessage($filename, $mess) {
		$fp = fopen($filename, "a");
		
		fwrite($fp, $mess);

		fclose($fp);
	}

	function readmessage($filename) {
		$mess = file_get_contents($filename);
		
		$mess = rtrim($mess, "[n]");

		$arrmess = explode("[n]", $mess);

		foreach($arrmess as $m) {
			list($username, $dt ,$title, $content) = explode("||", $m);

			echo "<b>{$username}</b>, ".date("Y-m-d H:i").": <i>{$title}</i>, <u>{$content}</u><br><hr><br>";
		}

	}


?>



<form action="message.php" method="post">
	用户: <input type="text" name="username" value="" /><br>
	标题：<input type="text" name="title" value="" /><br>
	内容：<textarea  name="content" cols="40" rows="4"></textarea><br>
	<input type="submit" name="dosubmit" value="留言" /><br>
</form>
