console.log("main..");

$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 300);
});

var Dimensions = function(width, height) {
	this.width = width;
	this.height = height;
}

$(window).bind('resizeEnd', function() {
	
	var predictedNewGraphDimen = calculatePredictedGraphDimensions();
	var currentDimensions = new Dimensions($('#knowledge-feed').width(), $('#knowledge-feed').height());
	
	if(elementMatchSize(predictedNewGraphDimen, currentDimensions))
	{
		console.log("Graph resized already.");
  	}else
  	{
  		console.log("Graph needs a resize.");
		
  		new WordGraphResize(predictedNewGraphDimen);
  	}
});

var elementMatchSize = function(dimensionsA, dimensionB) {
	console.log("compare: " + dimensionsA.width + "," + dimensionB.width + " with " + dimensionsA.height + "," + dimensionB.height);
	
	return dimensionsA.width == dimensionB.width && dimensionsA.height == dimensionB.height;
}

var calculatePredictedGraphDimensions = function() {
	var aspectRatio = 0.4;
	var cloudWidth = $("#knowledge-feed").width();
	var cloudHeight = $( window ).height();
	
	console.log("cloudWidth=" + cloudWidth);
	console.log("cloudHeight=" + cloudHeight);
	
	//Use potrait on narrow screens
	if(cloudHeight > cloudWidth) {
	 	var temp = cloudHeight;
	 	
	 	cloudHeight = cloudWidth*2;
	}else{
		cloudHeight = cloudWidth*aspectRatio;
	}
	
	return new Dimensions(cloudWidth, cloudHeight);
}

var WordGraphResize = function(dimensions) {
	console.log("WordGraphResize");
	console.log("Doing a resize: " + dimensions.width + "," + dimensions.height);
	
	
	$("#knowledge-feed").empty();

	$.getJSON("data/knowledge.json", function(data){
		console.log("loaded knowledge = " + data);
	
		new KnowledgeCloud("#knowledge-feed", data ,new Dimensions(dimensions.width, dimensions.height));
	});
}

new WordGraphResize(calculatePredictedGraphDimensions());

console.log("main END");



