<?php
include_once 'dbConnect.php';

if ($_REQUEST["method"] == "postExample") {
	$title = $_POST["title"];
	$description = $_POST["description"];
	$imgUrl = $_POST["imgUrl"];
	$exampleDate = $_POST["exampleDate"];

	$query = $mysqli -> query("INSERT INTO examples (`title`, `description`, `imgUrl`, `exampleDate`) 
	VALUES ('$title', '$description', '$imgUrl', '$exampleDate')");
	$mysqli -> query($query);

	if ($result = $mysqli -> query("SELECT MAX(ID) FROM examples")) {
		while ($row = $result -> fetch_assoc()) {
			$jsonresult[] = $row;
		}
		$result -> free();
	}
	$jsonText = json_encode($jsonresult);
	echo $jsonText;
}

if ($_REQUEST["method"] == "modifyExample") {
	$id = $_POST["id"];
	$title = $_POST["title"];
	$description = $_POST["description"];
	$imgUrl = $_POST["imgUrl"];
	$exampleDate = $_POST["exampleDate"];

	$query = $mysqli -> query("UPDATE examples SET title='$title', description='$description', 
	imgUrl='$imgUrl', exampleDate = '$exampleDate' WHERE id='$id'");
	$mysqli -> query($query);
}

if ($_REQUEST["method"] == "deleteExample") {
	$id = $_POST["id"];
	$query = $mysqli -> query("DELETE FROM examples WHERE id='$id'");
	$mysqli -> query($query);
}
?>
