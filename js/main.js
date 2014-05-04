console.log("main..");


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

$("#knowledge-feed").empty();

$.getJSON("data/knowledge.json", function(data){
	console.log("loaded knowledge = " + data);
	
	new KnowledgeCloud("#knowledge-feed", data ,new Dimensions(cloudWidth, cloudHeight));
});

console.log("main END");
