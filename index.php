<?PHP
if (isset($_SESSION["user"])) {
	$user = $_SESSION["user"];
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Portfolio Example</title>
		<?PHP
			include 'backend/headers.html';
			include 'backend/session.php';
		?>
	</head>

	<body onload="init();getAllExamples();">
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
			<a href="">Home</a>
			<a href="contact">Contact</a>
		</nav>
		<?PHP
			if (checkLogin()) {
				echo '<a id="btnAdd" class="btn add">Add</a>';
			}
		?>
		<section class='examples'>

		</section>
		<footer>
			<p>
				&copy; Copyright  by Maarten Kuiper
			</p>
		</footer>
		</div>
	</body>
</html>