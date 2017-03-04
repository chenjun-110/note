<?php
header("Content-Type:text/html;charset=utf-8");
/*
Array
(
    [pic] => Array
        (
            [name] => 195_4074_831a070561e20a0.jpg
            [type] => image/jpeg
            [tmp_name] => C:\wamp\tmp\php45.tmp
            [error] => 0
            [size] => 43274
        )

)
 * *
 *
 *
 */
	//第一步： 判断错误
	if($_FILES['pic']['error'] > 0) {
		switch($_FILES['pic']['error']) {
			case 1:
				echo "表示上传文件的大小超出了约定值。文件大小的最大值是在PHP配置文件中指定的，该指令是：upload_max_filesize<br>";
				break;
			case 2:
				echo "表示上传文件大小超出了HTML表单隐藏域属性的MAX＿FILE＿SIZE元素所指定的最大值1M<br>";
				break;
			case 3:
				echo "表示文件只被部分上传<br>";
				break;
			case 4:
				echo "表示没有上传任何文件<br>";
				break;
		
			default:
				echo "末知错误<br>";
				break;
		}
	
		

		exit;
	}

	//第二步： 判断类型
	$arr = explode(".", basename($_FILES['pic']['name']));
	$hz = array_pop($arr);
	
	$allowtype =array("gif", "png", "jpg", "jpeg");

	if(!in_array($hz, $allowtype)) {
		echo "上传的类型不合法";
		exit;
	} 

	//第三步： 判断大小
	$maxsize= 1000000;
	if($_FILES['pic']['size'] > $maxsize) {
		echo "上传的文件超过了，{$maxsize}字节!";
		exit;
	}


	//第四步， 上传后的文件名一定要设置

	$tmpfile = $_FILES['pic']['tmp_name'];
	$srcname = "./uploads/".date("YmdHis").rand(100, 999).".".$hz;

	//将临时目录下的上传的文件，复制到我指定目录下， 指定的名子就可以完成上传
	if( move_uploaded_file($tmpfile, $srcname) ) {
		echo "上传成功!";
	}else{
		echo "上传失败!";
	}
