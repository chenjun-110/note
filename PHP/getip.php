<?php
/*
 *  超全局数组(变量), 在PHP的脚本中， 已经声明完的变量， 你可以直接就去使用即可! 变量的名子已经规定好的了
 *
 *
 *  $_SERVER 
 *  $_ENV  
 *  $_GET
 *  $_POST
 *  $_REQUEST
 *  $_FILES
 *  $_COOKIE
 *  $_SESSION
 *  $GLOBALS
 *
 *
 *    超   全局   数组
 *
 *
 *    1. 数组(关联数组), 就和你自己声明的数组是一样的操作方式
 *    2. 全局
 *    3. 每个预定义的数组都有自独特的能力
 *
 */


	function getip() {
		
		if(!empty($_SERVER['HTTP_CLIENT_IP'])) {
			return $_SERVER['HTTP_CLIENT_IP'];
		} elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
			return $_SERVER['HTTP_X_FORWARDED_FOR'];
		} else if(!empty($_SERVER['REMOTE_ADDR'])) {

			return $_SERVER['REMOTE_ADDR'];
		}else{
			return '未知IP';
		}
	}


	echo getip();

	echo '<br>';



	echo $_SERVER['HTTP_USER_AGENT'];


	echo '<br>';

	echo count($_SERVER);
	echo "<br>";
	echo '<pre>';
	print_r($_SERVER);
	echo '</pre>';
