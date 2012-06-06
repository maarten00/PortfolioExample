<?PHP
if (isset($_SESSION["user"])) {
	$user = $_SESSION["user"];
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Portfolio Example - CP</title>
		<?PHP
			include 'backend/headers.xhtml';
			include 'backend/session.php';
		?>
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
			<h1>Portfolio Example - CP</h1>
		</header>
		<nav></nav>
		<section class='loginForm'>
			<header>
				<h1>Login Form</h1>
			</header>
			<form action="backend/checkcredentials.php" method="post">
				<input type="text" name="username" placeholder="Username">
				<input type="password" name="password" placeholder="Password">
				<input type="submit" value="Login">
			</form>
		</section>
		<footer>
			<p>
				&copy; Copyright  by Maarten
			</p>
		</footer>
		</div>
	</body>
</html>