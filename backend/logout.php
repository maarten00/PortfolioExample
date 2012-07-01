<?php
session_start();
session_destroy();
header("location:../index.php");

if (isset($_REQUEST["method"]) && $_REQUEST["method"] == "endSession") {
	session_start();
	session_destroy();
	header("location:../index.php");
}
?>
