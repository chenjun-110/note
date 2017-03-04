<?php
/*
 *  自己定义session存储数据库方式的类
 *
 */



class MemSession {
	public static $mem;             //pdo的对象
	public static $maxlifetime;     //最大的生存时间


	//开启和初使化使用的, 参数需要一个路
	public static function start(Memcache $mem) {
		
		self::$mem = $mem;
	
		self::$maxlifetime = ini_get("session.gc_maxlifetime");
	

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
		$data = self::$mem -> get($sid);

		if(empty($data)) {
			return '';
		}

		return $data;

	}

	//写入 $_SESSION['username'] = "meizi";
	public static  function write($sid, $data) {
		self::$mem -> set($sid, $data, MEMCACHE_COMPRESSED, self::$maxlifetime);
	}

	//销毁 session_destroy() 
	public static  function destroy($sid) {
		self::$mem -> delete($sid, 0);

	}

	//回收垃圾
	public static  function gc($maxlifetime) {
		return true;
	
	}


}

	//创建对象
	$mem = new Memcache();
	//添加两台memcache服务器
	$mem -> addServer("localhost", 11211);
	$mem -> addServer("192.168.1.137", 11211);



	//开启
	MemSession::start($mem);


