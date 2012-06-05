<?PHP
session_start();
if (isset($_SESSION["user"])) {
	$user = $_SESSION["user"];
}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Portfolio Example</title>
		<?PHP
			include 'backend/headers.xhtml';
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
			<h1>Portfolio Example</h1>
		</header>
		<nav>
			<a href="">Home</a>
			<a href="contact">Contact</a>
		</nav>
		<?PHP
			if (checkLogin()) {
				echo '<a href="" class="btn add">Add</a>';
			}
		?>
		<section class='examples'>
			Hier komen de voorbeelden van gemaakte websites.
			<br />
			<a id="getAllExamples">Haal voorbeelden op</a>
			<?PHP
				if (checkLogin()) {

				}
			?>
		</section>
		<footer>
			<p>
				&copy; Copyright  by Maarten Kuiper
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