<?php
	header("Content-Type:text/html;charset=utf-8");
	//加载分页类
	include "page.class.php";

	//连接数据库
	$link = mysql_connect("localhost", "root", "123456") or die("数据库连接失败!");

	//选择一个库作用默认的库
	mysql_select_db("xsphp");

	//获取总记录数
	$sql = "select count(*) as total from users";

	$result = mysql_query($sql);

	$data = mysql_fetch_assoc($result);

	//创建分页对象
	$page = new Page($data['total'], 10, "id=5&cid=6&user=admin", false);

	$page->set("head", "个用户");
	$page->set("first", "|<");
	$page->set("prev", "|<<");
	$page->set("next", ">>|");
	$page->set("last", ">|");
	
	echo "当前页为：".$page->page."<br>";


	//执行SQL
	$sql = "select id, name, sex, age, email from users order by id {$page->limit} ";

	echo $sql."<br>";
	$result = mysql_query($sql);


	echo '<table border="1" width="900" align="center">';
	echo '<caption><h1>USERS</h1></caption>';

	echo '<tr>';
	echo '<th>ID</th>';
	echo '<th>NAME</th>';
	echo '<th>SEX</th>';
	echo '<th>AGE</th>';
	echo '<th>EMAIL</th>';
	echo '</tr>';


	while(list($id, $name, $sex, $age, $email) = mysql_fetch_row($result)) {
		echo '<tr>';
		echo "<td>{$id}</td>";
		echo "<td>{$name}</td>";
		echo "<td>{$sex}</td>";
		echo "<td>{$age}</td>";
		echo "<td>{$email}</td>";
		echo '</tr>';
	}
	//使用fpage()方法， 获取分页内容
	echo '<tr><td colspan="5" align="right">'.$page->fpage(3,4,5,6,7,0).'</td></tr>';
	echo '</table>';


	//关闭
	mysql_close();
