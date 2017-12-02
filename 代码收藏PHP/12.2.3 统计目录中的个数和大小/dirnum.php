<?php
	$dirn = 0; //目录数
	$filen = 0; //文件数


	//用来统计一个目录下的文件和目录的个数
	function getdirnum($file) {
		global $dirn;
		global $filen;
				
		$dir = opendir($file);


		while($filename = readdir($dir)) {
			if($filename!="." && $filename !="..") {
				$filename = $file."/".$filename;


				if(is_dir($filename)) {
					$dirn++;
					getdirnum($filename);  //递归，就可以查看所有子目录
				} else {
					$filen++; 
				}
			}

		
		}



		closedir($dir);

	
	}


	getdirnum("phpmyadmin");


	echo "目录数为:{$dirn}<br>";
	echo "文件数为:{$filen}<br>";
