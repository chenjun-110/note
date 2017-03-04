<?php
	function extname($url) {
		if(strstr($url, "?")) {
			//如果有问号格式的文件， 将问号前的文件取出给变量$file
			list($file) = explode("?", $url);
		} else {
			$file = $url;
		}

		//以下是第二步取出文件名

		$loc = strrpos($file, "/")+1;
		
		$filename = substr($file, $loc);


		//以下是第三步取扩展名称
		$arr = explode(".", $filename);

		return array_pop($arr);

	}

	echo extname("http://www.lampbrother.net/aaa/init.inc.php")."<br>";
	echo extname("init.inc.php")."<br>";
	echo extname("C:/aaa/init.inc.php")."<br>";
	echo extname("http://www.lampbrother.net/aaa/init.inc.php?a=100")."<br>";
