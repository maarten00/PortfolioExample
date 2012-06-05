<?php
$host="localhost"; // Host name 
$username="root"; // Mysql username 
$password=""; // Mysql password 
$db_name="portfolio"; // Database name 
$tbl_name="examples"; // Table name

$mysqli = new mysqli($host, $username, $password, $db_name);
if($mysqli -> connect_errno) {
echo "Unable to connect: " . $mysqli -> connect_errno;
}
?>