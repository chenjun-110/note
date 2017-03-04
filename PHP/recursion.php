<?php

	/*$dirname = "./phpmyadmin";


	function fordir($dirname) {
		//打开目录资源
		$dir = opendir($dirname);


		readdir($dir);
		readdir($dir);

		while( $file = readdir($dir)) {
		
			$nfile = $dirname.'/'.$file;

			
			if(is_dir($nfile)){
				echo "目录: {$nfile}<br>";

				fordir($nfile);
			} else {
				echo "文件: {$nfile}<br>";
			}
			
		}


		closedir($dir);
		//关闭
	}*/

	//fordir($dirname);




/*
 *  
 *  在函数中调用自己就是递归函数
 *  
 */

	function test($n) {
		echo $n."<br>";

		if($n > 0)
			test($n-1);
		else
			echo "--<br>";


		echo $n."<br>";
	
	
	}


test(2);

 


	
































