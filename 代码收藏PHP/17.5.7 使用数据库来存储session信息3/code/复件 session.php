<?php
/*
 *  自己定义session存储File方式的类
 *
 */



class FileSession {
	private static  $path;
	//开启和初使化使用的, 参数需要一个路
	public static function start($path = "c:/wamp/sessfile/") {
		self::$path = $path;


		//注册过程， 让PHP自己处理session时，找这个函数指定的几个周期来完成
		session_set_save_handler(
			array(__CLASS__, "open"), 
			array(__CLASS__,"close"),
			array(__CLASS__, "read"), 
			array(__CLASS__, "write"),
			array(__CLASS__, "destroy"), 
			array(__CLASS__,"gc"));

		session_start();  //开启会话

	}

	// 开启时， session_start()
	public static function open($path, $name) {
		return true;
	}

	//关闭
	public static  function close() {
		return true;
	}

	//读取 echo $_SESSION['username'] 
	public static  function read($sid) {
	
		
		$filename = self::$path."mz_".$sid;

		return @file_get_contents($filename);

	}

	//写入 $_SESSION['username'] = "meizi";
	public static  function write($sid, $data) {
	

		$filename = self::$path."mz_".$sid;


		return file_put_contents($filename, $data);
		
	}

	//销毁 session_destroy() 
	public static  function destroy($sid) {
	

		$filename = self::$path."mz_".$sid;

		return @unlink($filename);
	}

	//回收垃圾
	public static  function gc($maxlifetime) {
	

		foreach(glob(self::$path."mz_*") as $file) {
			//只删除过期的
			if(filemtime($file)+$maxlifetime < time()) {
				unlink($file);
			}
		}
	}


}

	//开启
	FileSession::start();


