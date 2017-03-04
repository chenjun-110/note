<?php
/*
 *  自己定义session存储数据库方式的类
 *
 */



class DBSession {
	public static $pdo;             //pdo的对象
	public static $ctime;           //当前时间
	public static $maxlifetime;     //最大的生存时间
	public static $uip;             //用户正在用的ip
	public static $uagent;          //用户正在用的浏览器

	//开启和初使化使用的, 参数需要一个路
	public static function start(PDO $pdo) {
		
		self::$pdo = $pdo;
		self::$ctime = time();
		self::$maxlifetime = ini_get("session.gc_maxlifetime");
		self::$uip = !empty($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (!empty($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : (!empty($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : "") );



		//filter_var(self::$uip, FILTER_VALIDATE_IP) && self::$uip = '';

		


		self::$uagent = !empty($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : "" ;



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
		$sql = "select * from session where sid = ?";

		$stmt = self::$pdo -> prepare($sql);

		$stmt -> execute(array($sid));
		
		$result = $stmt -> fetch(PDO::FETCH_ASSOC);
		//如果还没有会话信息，返回空字符串
		if(!$result) {
			return '';
		}

		//如果超出来时间，销毁session
		if($result['utime'] + self::$maxlifetime < self::$ctime) {
			self::destroy($sid);
			return '';
		}
		//如果用户换了ip或换了浏览器
		if($result['uip'] != self::$uip || $result['uagent'] != self::$uagent) {
			self::destroy($sid);
			return '';
		}



		return $result['sdata'];

	}

	//写入 $_SESSION['username'] = "meizi";
	public static  function write($sid, $data) {

		//通过sid获取已经有的数据
		$sql = "select * from session where sid = ?";

		$stmt = self::$pdo->prepare($sql);

		$stmt -> execute(array($sid));

		$result = $stmt -> fetch(PDO::FETCH_ASSOC);
		
		
		//如果已经获取到了数据，就不插入而更新
		if($result) {
			//如果数据和原来的不样才更新
			if($result['sdata'] != $data || $result['utime']+10 < self::$ctime) {

				$sql = "update session set sdata = ?, utime = ? where sid=?";

				$stmt = self::$pdo->prepare($sql);

				$stmt -> execute(array($data, self::$ctime, $sid));
			}

		//如果没有数据，就新插入一条数据
		} else {
		


			if(!empty($data)) {
	
				$sql = "insert into session(sid, sdata, utime, uip, uagent) values(?, ?, ?, ?, ?)";
			
				$stmt = self::$pdo -> prepare($sql);

				$stmt -> execute(array($sid, $data, self::$ctime, self::$uip, self::$uagent));
			}
		}

	}

	//销毁 session_destroy() 
	public static  function destroy($sid) {
		$sql = "delete from session where sid=?";

		$stmt = self::$pdo->prepare($sql);

		return $stmt -> execute(array($sid)); 

	}

	//回收垃圾
	public static  function gc($maxlifetime) {

		//	utime < ctime - self::$maxlifetime
	
		$sql = "delete from session where utime < ?";

		$stmt = self::$pdo->prepare($sql);

		return $stmt -> execute(array(self::$ctime - self::$maxlifetime)); 

	
	}


}

	//开启
	DBSession::start($pdo);


