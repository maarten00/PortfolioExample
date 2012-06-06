<?PHP
include 'hashGenerator.php';

/* Create a new mysqli object with database connection parameters */
$username = 'loginClient';
$password = 'dN3feQySzuUmNScp';
$db = 'portfolio';
$mysqli = new mysqli('localhost', $username, $password, $db);

if (mysqli_connect_errno()) {
	echo "Connection Failed: " . mysqli_connect_errno();
	exit();
}

$user = $_POST['username'];
$pass = $_POST['password'];
$encrPass = hashSSha($pass);

/* Create a prepared statement */
if ($stmt = $mysqli -> prepare("SELECT username, password FROM users WHERE username=?
AND password=?")) {

	/* Bind parameters
	 s - string, b - boolean, i - int, etc */
	$stmt -> bind_param("ss", $user, $encrPass);

	/* Execute it */
	$stmt -> execute();

	/* Bind results */
	$stmt -> bind_result($result1, $result2);

	/* Fetch the value */
	$stmt -> fetch();

	if ($result1 != null) {
		// Register $myusername, $mypassword and redirect to index
		session_register("user");
		session_register("pass");
		header("location:../index.php");
	} else {
		echo "Wrong Username or Password";
	}

	/* Close statement */
	$stmt -> close();
}

/* Close connection */
$mysqli -> close();
?>