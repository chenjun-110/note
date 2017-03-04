<?php
	$arr = array(0,1,22,3,44,5,6,7,88,9);



	//从大到小


function mysort(&$arr) {	

	$len = count($arr);//优化1
	
	for($i=0; $i<$len-1; $i++) { 
		for($j = 0; $j < $len-$i-1; $j++) { //优化2：这里多减1个$i
			if($arr[$j] > $arr[$j+1]) {
				$tmp = $arr[$j];

				$arr[$j] = $arr[$j+1];

				$arr[$j+1] = $tmp;
			}

		}
	}

	
}

mysort($arr);

print_r($arr);


