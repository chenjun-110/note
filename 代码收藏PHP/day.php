<?php
	$year = isset($_GET['year']) ? $_GET['year'] : date("Y");  //当前的年
	
	$month = isset($_GET['month']) ? $_GET['month'] : date("m"); //当前的月

	$day  = isset($_GET['day']) ? $_GET['day'] : date("d"); //当前的日

	//当年当月的天数
	$days = date("t", mktime(0,0,0, $month, 1, $year));

	//获取当月的第一天是星期几
	$startweek = date("w", mktime(0,0,0, $month, 1, $year));



	echo "今天是{$year}年{$month}月{$day}日，是情人节, 还是元宵节！<br>";

	echo '<table border="0" width="300" align="center">';
	
	echo '<tr>';

	echo '<th style="background:blue">日</th>';
	echo '<th style="background:blue">一</th>';
	echo '<th style="background:blue">二</th>';
	echo '<th style="background:blue">三</th>';
	echo '<th style="background:blue">四</th>';
	echo '<th style="background:blue">五</th>';
	echo '<th style="background:blue">六</th>';

	echo '</tr>';
	
	echo '<tr>';
	for($i=0; $i<$startweek; $i++) {
		echo "<td>&nbsp;</td>";
	}

	for($j=1; $j <= $days; $j++) {
		$i++;

		if($j==$day) {
			echo "<td style='background:green'>{$j}</td>";
		
		}else{

			echo "<td>{$j}</td>";
		}

		if($i%7 ==0 ){
			echo '</tr><tr>';
		}
	}
 	

	while($i%7!==0) {
		echo '<td>&nbsp;</td>';
		$i++;
	}

	echo '</tr>';
	echo '</table>';

