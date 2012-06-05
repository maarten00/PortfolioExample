<?PHP
function hashSSHA($password) {
	$salt = sha1($password);
	$hash = base64_encode(sha1($password . $salt, true) . $salt);
	return $hash;
}
?>