/*
 * TODO
 * - Timer method to automatically check if session still exists every ~ seconds
 * - 
 */

function attachHandlers() {
	$('#getAllExamples').click(function() {
		getAllExamples();
	});
	$('#btnAdd').click(function() {
		postExample();
	});
	$('#checkSession').click(function() {
		checkSession();
	});
}

function checkSession() {
	var params = "method=checkSession";
	$.ajax({
		type : "GET",
		url : "backend/session.php?" + params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	}).done(function(data) {
		if (console && console.log) {
			console.log(data);
		}
	});
}

function getAllExamples() {
	var params = "method=getAllExamples";
	$.ajax({
		type : "GET",
		url : "backend/getExamples.php?" + params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	}).done(function(data) {
		if (console && console.log) {
			responseArray = eval("(" + data + ")");
			console.log(responseArray);
			drawExamples(responseArray);
		}
	});
}

function postExample() {
	var params = "method=postExample";
	$.ajax({
		type : "POST",
		url : "backend/postExample.php?" + params,
		data : {
			title : "Title for new example",
			description : "Description for new example",
			imgUrl : "img/example.png",
			exampleDate : "2012-06-06"
		}
	}).done(function() {
		console.log("Data Saved");
	});
}

function drawExamples(inputData) {
	formatExamples();
	$examples = $('.examples');
	for (i in inputData) {
		$article = $('<article id="example' + inputData[i]["id"] + '">')
		$examples.append($article);
		$article.append('<h4 class="exampleTitle">' + inputData[i]["title"]);
		$article.append('<div class="exampleDate">' + inputData[i]["exampleDate"]);
		$article.append('<img src="' + inputData[i]["imgUrl"] + '" class ="articleImg" alt="articleImg">');
		$article.append('<p class="description">' + inputData[i]["description"]);
	}
}

function formatExamples() {
	$examples = $('.examples');
	$examples.empty();
	$examples.append('<header><h3>Examples</h3></header>');
}

