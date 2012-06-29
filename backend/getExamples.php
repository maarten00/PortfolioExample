<?php
include_once 'dbConnect.php';
$jsonresult = array();

if ($_REQUEST["method"] == "getAllExamples") {
	if ($result = $mysqli -> query("SELECT * FROM examples")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
}

if ($_REQUEST["method"] == "getExample") {
	$id = $_REQUEST["id"];
	if ($result = $mysqli -> query("SELECT * FROM examples WHERE id='$id'")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
}


$jsonText = json_encode($jsonresult);
echo $jsonText;
?>