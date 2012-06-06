<?PHP
session_start();
if (isset($_SESSION["user"])) {
	$user = $_SESSION["user"];
}

function checkLogin() {
	return isset($_SESSION['user']);
}

if (isset($_REQUEST["method"]) && $_REQUEST["method"] == "checkSession") {
	$result = checkLogin();
	$jsonText = json_encode($result);
	echo $jsonText;
}
?>