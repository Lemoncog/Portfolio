console.log("Projects START");

var Project = Backbone.Model.extend({});

var ProjectList = Backbone.Collection.extend({
	model : Project,
	url : 'data/projects.json',

	initialize : function() {
	},
});

var projectTemplate = $("#project-item-template").html();
console.log("projectTemplate=" + projectTemplate);

var ProjectItemView = Backbone.View.extend({	
		template : _.template(projectTemplate),
	
		initialize : function() {
			//_.bindAll(this);
			console.log("init ran");  
		},
		
			
		events : {
			"click " : "projectClickHandler"
		},
		
		projectClickHandler : function(event) {
			console.log("I felt that! = " + this.model.link);
			
			window.open(this.model.link,'_blank');
			
			return false;
		},
				
		 render: function() {
		 	
		 	console.log("this.$el" + this.$el);   
		 	
		 	this.$el.html( this.template(({ imageUrl : "img/github.png",  title : this.model.title, description : this.model.description, technologies : this.model.technologies })) );
		 	
		 	console.log("this.$el" + this.$el.html);
		 	
		 	return this.$el;		 			 			 			 	
  		}
});

var ProjectView = Backbone.View.extend({
	el : '#project-feed',

	initialize : function() {
		this.collection = new ProjectList();
		this.render();
	},

	render : function() {
		console.log("Fetching projects");
		
		var that = this;
		
		this.collection.fetch({
			success : function(collection, response) {
				console.log("+++++++SUCCESS+++++++++++");
				_.each(that.collection.models, function (item){
					that.renderApp(item.toJSON());
				}, that);
				
			},
			error : function(collection, response) {
				console.log("#######ERROR###########");				
				throw new Error("Project fetch error" + response.responseText);
			}
		});
	},
	
	renderApp: function(item) {
		var projectItemView = new ProjectItemView({
				model: item
		});
							
		var container = document.createDocumentFragment();	
		this.$el.append( projectItemView.render() ).hide().fadeIn().slideDown();
	}
});

projectView = new ProjectView();