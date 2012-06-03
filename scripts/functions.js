function attachHandlers() {
	$('#getAllExamples').click(function() {
		getAllExamples();
	});
}

function getXmlHttpRequestObject() {
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		if(window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
}


function getAllExamples() {
	var params = "method=getAllExamples";
	$.ajax({
		url : "backend/getExamples.php?" + params,
		beforeSend : function(xhr) {
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	}).done(function(data) {
		if(console && console.log) {
			responseArray = eval("(" + data+ ")");
			console.log(responseArray);
			drawExamples(responseArray);
		}
	});
}

function drawExamples(inputData) {
	formatExamples();
	$examples =  $('.examples');
	for(i in inputData){
		$article = $('<article id="example' + inputData[i]["id"] + '">')
		$examples.append($article);
		$article.append('<h4>' + inputData[i]["title"]);
		$article.append('<img src="' + inputData[i]["imgUrl"] + '" alt="exampleImg">');
		$article.append('<p class="description">' + inputData[i]["description"]);
	}	
	
}

function formatExamples(){
	$examples =  $('.examples');
	$examples.empty();
	$examples.append('<header><h3>Examples</h3></header>');
}


