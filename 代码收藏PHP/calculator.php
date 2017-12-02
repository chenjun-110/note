<?php
	error_reporting(E_ALL & ~E_NOTICE);

	if( isset($_POST['sub']) ) {
		//echo "用户是提交了";
		
		$bz = true;	

		$errormess = "有以上问题：<br>";
		
		if($_POST['num1'] == "") {
			$bz = false;
			$errormess .= "第一个数不能为空<br>";

		} else {
			if(!is_numeric($_POST['num1'])) {
				$bz = false;
				$errormess .="第一个不是数字不能计算<br>";	
			}
		}

		if($_POST['num2'] == "") {
			$bz = false;
			$errormess .= "第二个数不能为空<br>";
		}else {
			if(!is_numeric($_POST['num2'])) {
				$bz = false;
				$errormess .="第二个不是数字不能计算<br>";	
			}

		}





	



		if($bz) {

			//这个是计算后的结果
			$sum = "";
		
			//判断用户选择的是那个运算符号
			switch($_POST['ysf']) {
				case '+': 
					$sum = $_POST['num1'] + $_POST['num2']; 
					break;
				case '-': 
					$sum = $_POST['num1'] - $_POST['num2']; 
					break;
				case 'x': 
					$sum = $_POST['num1'] * $_POST['num2']; 
					break;
				case '/': 
					$sum = $_POST['num1'] / $_POST['num2']; 
					break;
				case '%': 
					$sum = $_POST['num1'] % $_POST['num2']; 
					break;
		
			
			}
		}
	

	} 

echo '<br>';
?>

<html>
	<head>
		<title>简单计算器</title>
		<meta charset="utf-8" />
	</head>

	<body>
		<table border="0" width="400" align="center">
		<form action="jsq.php" method="post">
			<caption><h1>简单计算器</h1></caption>

			<tr>
				<td> 
					<input type="text" size="5" name="num1" value="<?php echo $_POST['num1'] ?>" /> <br>
				</td>

				<td>
					<select name="ysf">
						<option <?php if($_POST['ysf']=="+") echo "selected" ?> value="+"> + </option>
						<option <?php if($_POST['ysf']=="-") echo "selected" ?>  value="-"> - </option>
						<option <?php echo $_POST['ysf']=="x" ? "selected='selected'" : "" ?>  value="x"> x </option>
						<option <?php if($_POST['ysf']=="/") echo "selected" ?>  value="/"> / </option>
						<option  value="%"> % </option>
					</select>
				</td>

				<td>

					<input type="text" size="5" name="num2" value="<?php echo $_POST['num2'] ?>" /> <br>
				</td>


				<td>
					<input type="submit" name="sub" value="计算">
				</td>
			<tr>

			<tr>
				<td colspan="4">

					<?php
						if($bz) {

							echo "计算结果: {$_POST['num1']} {$_POST['ysf']} {$_POST['num2']} = {$sum}";
						} else {
						
							echo $errormess;
						}

					?>
				</td>
			</tr>
		</form>
		</table>
	</body>
</html>
