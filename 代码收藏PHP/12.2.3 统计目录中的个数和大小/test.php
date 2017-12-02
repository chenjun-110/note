<?php
	//用来统计一个目录下大小
	function dirsize($file) {
		$size = 0;
		$dir = opendir($file);

		
		while($filename = readdir($dir)) {
			if($filename!="." && $filename !="..") {
				$filename = $file."/".$filename;


				if(is_dir($filename)) {
					//使用递归
					$size += dirsize($filename);
				} else {
					$size += filesize($filename);
				}
			}

		
		}



		closedir($dir);

		return $size;
	}


echo "phpmyadmin目录大小为：".(dirsize("phpmyadmin")/pow(1024,2))."MB<br>";



