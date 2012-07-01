/*
 * TODO
 * - Add support for uploading images
 * - Change the date format on form and display
 * - Draw single example on add
 */

var session;
var developmentMode;

/*
 * Initialization function with code to run when the page loads.
 */
function init() {
	$('#btnAdd').click(function() {
		getExampleForm(createExampleForm);
	});
	checkSession();
	developmentMode = "true";
}

/*
 * Checks if the user session exists
 */
function checkSession() {
	var params = "method=checkSession";
	$.ajax({
		type : "GET",
		url : "backend/session.php?" + params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	}).done(function(data) {
		console.log(data);
		if(session == "true" && data == "false"){
			endSession();
		}
		session = data;
	});
}

function startSessionTimer() {
	if (!developmentMode) {
		checkSession();
		setInterval(checkSession, 10000);
	}
}

function endSession() {
	var params = "method=endSession";
	$.ajax({
		type : "GET",
		url : "backend/logout.php?" + params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	}).done(function(data) {
		window.location.reload();
	});
}

/*
 * Retrieves all examples in the database.
 */
function getAllExamples() {

	var params = "method=getAllExamples";
	$.ajax({
		type : "GET",
		url : "backend/getExamples.php?" + params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	}).done(function(data) {
		responseArray = eval("(" + data + ")");
		drawExamples(responseArray);
	});
}

/*
 * Retrieves a single example from the database.
 * @Param id
 * Id of the example to be retrieved
 * @Param callback
 * Method to be called when done, syntax: 'getExample(1, calledMethod);'
 */
function getExample($id, callback) {
	var params = "method=getExample&id=" + $id;
	$.ajax({
		type : "GET",
		url : "backend/getExamples.php?" + params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	}).done(function(data) {
		jsonArray = eval("(" + data + ")");
		callback(jsonArray);
	});
}

/*
 * Adds a new example to the database
 * @Params
 * Data to be added
 */
function postExample($title, $desc, $imgUrl, $exampleDate) {
	var params = "method=postExample";
	$.ajax({
		type : "POST",
		url : "backend/postExample.php?" + params,
		data : {
			title : $title,
			description : $desc,
			imgUrl : $imgUrl,
			exampleDate : $exampleDate
		}
	}).done(function() {
		console.log("Data Saved");
	});
}

/*
 * Modifies an example in the database.
 * @Param id
 * Id of the example to be modified
 */
function modifyExample($id, $title, $desc, $imgUrl, $exampleDate) {
	var params = "method=modifyExample";
	$.ajax({
		type : "POST",
		url : "backend/postExample.php?" + params,
		data : {
			id : $id,
			title : $title,
			description : $desc,
			imgUrl : $imgUrl,
			exampleDate : $exampleDate
		}
	}).done(function() {
		console.log("Data Saved");
		redrawExample($id, $title, $desc, $imgUrl, $exampleDate);
	});
}

/*
 * Removes an example from the database and view.
 * @Param id
 * id of the example to be removed
 */
function deleteExample($id) {
	if (confirm('Are you sure you wish to delete this article?')) {
		$.ajax({
			type : "POST",
			url : "backend/postExample.php?",
			data : {
				method : "deleteExample",
				id : $id
			}
		}).done(function() {
			console.log("Data removed");
			$('#example' + $id).remove();
		});
	}
}

/*
 * Clears example section to remove current content
 */
function formatExamples() {
	$examples = $('.examples');
	$examples.empty();
	$examples.append('<header><h3>Examples</h3></header>');
}

/*
 * Draws multiple examples to the page
 * @Param inputData
 * Data used to fill each article formatted in JSON.
 */
function drawExamples(inputData) {
	startSessionTimer();
	formatExamples();
	$examples = $('.examples');
	for (i in inputData) {
		$article = $('<article id="example' + inputData[i]["id"] + '">')
		$examples.append($article);
		$article.append('<h3 class="exampleTitle">' + inputData[i]["title"]);
		$article.append('<div class="exampleDate">' + inputData[i]["exampleDate"]);
		if (session == "true") {
			$article.append('<img src="img/icons/edit.png" class="btnEdit" id="btnEdit' + inputData[i]["id"] + '" />');
			$article.append('<img src="img/icons/delete.png" class="btnDelete" id="btnDelete' + inputData[i]["id"] + '" /><br>');
		}
		$article.append('<img src="' + inputData[i]["imgUrl"] + '" class ="articleImg" alt="articleImg">');
		$article.append('<p class="description">' + inputData[i]["description"]);
	}
	attachExampleHandlers();
}

/*
 * Redraws an example
 * @Param id
 * ID of the xample to be redrawn
 */
function redrawExample($id, $title, $desc, $imgUrl, $exampleDate){
	$example = $('#example'+$id);
	$example.children(".exampleTitle").text($title);
	$example.children(".exampleDate").text($exampleDate);
	$example.children(".description").text($desc);
	$example.children(".articleImg").attr('src', $imgUrl);
	
}

/*
 * Draw a single example to the page
 */
function drawNewExample(){
	
}

/*
 *Adds event handlers to edit and delete buttons for each example
 */
function attachExampleHandlers() {
	$('.btnEdit').click(function(event) {
		var el = event.target.id;
		el = el.slice(7);
		getExampleForm(createExampleForm, el);
	});
	$('.btnDelete').click(function(event) {
		var el = event.target.id;
		el = el.slice(9);
		deleteExample(el);
	});
}

/*
 * Uses an XHR to retrieve a form from the server
 * The form is used to create a new example or edit an existing one
 * @param callback
 * Function to be called when request is done
 * @param id
 * Optional, ID of article to be retrieved if the form needs to be filled in with current data
 */
function getExampleForm(callback, id) {
	$.ajax({
		type : "GET",
		url : "forms/newExample.html",
		cache: false,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	}).done(function(data) {
		if (!id)
			callback(data);
		else
			callback(data, id);
	});
}

/*
 * Renders exampleform to page.
 * @param inputHTML
 * The HTML code for the form to be drawn
 * @param id
 * Optional, ID of article to be retrieved if the form needs to be filled in with current data
 */
function createExampleForm(inputHTML, id) {
	$('#exampleFieldset').remove();
	if (!$('#exampleFieldset').length) {
		$('.examples').prepend(inputHTML);
	}
	$('#exampleFieldset').show();
	$('#formCloseBtn').click(function() {
		$('#exampleFieldset').remove();
	});
	if (!id)
		addExampleFormHandler("0");
	else
		addExampleFormHandler("1", id);
	if (id)
		fillForm(id);
}

/*
 * Adds the correct handler to the form
 * @param type
 * 0 if you want to add a new example, 1 if you want a modify an existing one
 * @param id
 * id of the article you want to modify, only used if type equals 1. 
 */
function addExampleFormHandler(type, id) {
	$('#exampleForm').submit(function() {	
		if (type == "0") {
			postExample($('#exampleFormTitle').val(), $('#exampleFormDesc').val(), $('#exampleFormImgUrl').val(), $('#exampleFormDate').val());
			$('#exampleFieldset').append($('<p>Added new example.</p>'));
		} else if (type == "1") {
			modifyExample(id, $('#exampleFormTitle').val(), $('#exampleFormDesc').val(), $('#exampleFormImgUrl').val(), $('#exampleFormDate').val());
			$('#exampleFieldset').append($('<p>Modified example #' + id + '</p>'));
		}
		$('#exampleForm').empty();
		return false;
	});
}

/*
 * Fills exampleForm with data currently shown on the page when modifying an existing example. 
 * @param ID
 * id of the example for which the data should be retrieved
 */
function fillForm(id) {
	$('html, body').animate({
		scrollTop : $("#exampleFieldset").offset().top
	}, 500);
	$example = "example" + id;
	$el = $('#' + $example);
	$('#exampleFormTitle').val($el.children(".exampleTitle").contents().text());
	$('#exampleFormDesc').val($el.children(".description").contents().text());
	$('#exampleFormImgUrl').val($el.children(".articleImg").attr('src'));
	$('#exampleFormDate').val($el.children(".exampleDate").contents().text());
	$('#exampleFieldset').children('legend').text("Modify Example");
	$('#exampleFormSm').val("Modify Example");
}
