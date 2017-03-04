<?php
	include "config.inc.php";

	try {
		$pdo = new PDO(DSN, DBUSER, DBPASS);
	}catch(PDOException $e) {
		echo "ERROR: ".$e->getMessage();
	}
