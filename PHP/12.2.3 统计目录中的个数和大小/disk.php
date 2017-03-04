<?php
	$total = disk_total_space("C:");
	$free = disk_free_space("C:");

	echo "C: 盘的总大小：".round($total/pow(2,30))."G<br>";
	echo "C: 盘的可用空间：".round($free/pow(2,30))."G<br>";

