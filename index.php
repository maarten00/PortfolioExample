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
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		<link rel="stylesheet" href="style/main.css" />
		<script src="scripts/functions.js"></script>
		<script src="libs/jquery-1.7.1.js"></script>
	</head>

	<body onload="attachHandlers()">
		<div>
			<header>
				<h1>Portfolio Example</h1>
			</header>
			<nav>
				<a href="/">Home</a>
				<a href="/contact">Contact</a>
			</nav>

			<div id = examples>
				Hier komen de voorbeelden van gemaakte websites.<br />
				<a id="getAllExamples">Haal voorbeelden op</a>
			</div>

			<footer>
				<p>
					&copy; Copyright  by Maarten
				</p>
			</footer>
		</div>
	</body>
</html>
