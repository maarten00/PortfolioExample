<?PHP
session_start();
if (isset($_SESSION["user"])) {
	$user = $_SESSION["user"];
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />

		<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame
		Remove this if you use the .htaccess -->
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />

		<title>Portfolio Example</title>
		<meta name="description" content="Portfolio example" />
		<meta name="author" content="Maarten" />

		<meta name="viewport" content="width=device-width; initial-scale=1.0" />

		<!-- Replace favicon.ico & apple-touch-icon.png in the root of your domain and delete these references -->
		<link rel="shortcut icon" href="img/favicon.ico" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		<link rel="stylesheet" href="style/main.css" />
		<script src="scripts/functions.js"></script>
		<script src="libs/jquery-1.7.1.js"></script>
	</head>

	<body onload="attachHandlers()">
		<?PHP
		if (checkLogin()) {
			echo '<p class="loggedInMsg"> Ingelogd als: ';
			echo $user;
			echo '<br /><a href="backend/logout.php">Uitloggen</a></p>';
		}
		?>
		<header>
			<h1>Portfolio Example</h1>
		</header>
		<nav>
			<a href="/">Home</a>
		</nav>
		<div class='login-form'>
			<h1>Login Form</h1>
			<form action="backend/checkcredentials.php" method="post">
				<input type="text" name="username" placeholder="username">
				<input type="password" name="password" placeholder="password">
				<input type="submit" value="Login">
			</form>
		</div>
		<footer>
			<p>
				&copy; Copyright  by Maarten
			</p>
		</footer>
		</div>
	</body>
</html>
<?PHP
	function checkLogin() {
		if (isset($_SESSION["user"])) {
			return true;
		} else {
			return false;
		}
	}
?>
