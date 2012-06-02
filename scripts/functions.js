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
	$examples =  $('#examples');
	$examples.empty();
	for(i in inputData){
		$examples.append(inputData[i]["title"]);
		$examples.append("<br />")
	}		
}
