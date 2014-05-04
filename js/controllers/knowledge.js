console.log("Knowlege start");

$.getJSON("data/knowledge.json", function(data){
	
	var knowledgeElement = $( "#knowledge-feed" );
	var knowlegeTemplate = $("#knowledge-item-template").html();
	
	for(var index = 0; index < data.length; index++)
	{
		var skillItem = data[index];
		
		knowledgeElement.append(skillItem + " ");
	};
});

console.log("Knowlege end");
