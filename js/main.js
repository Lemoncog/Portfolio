console.log("main..");

var Tweet = Backbone.Model.extend({
	defaults : function() {
		return {
			username : "Lemoncog",
			message : "Hello",
			imageURL : "https://pbs.twimg.com/profile_images/440786240720232448/gHL_Cau__bigger.jpeg"
		};
	}
});

console.log("Tweet=" + Tweet);

var TweetList = Backbone.Collection.extend({
	model : Tweet,
	url : 'data/mockTweets.json',

	initialize : function() {
	},
});

console.log("TweetList=" + TweetList);

var TweetView = Backbone.View.extend({
		initialize : function() {
			this.render();
		},
		
		 render: function() { 		 	
		  	return "<p>"+this.model+"</p>";
  		}
});

var TwitterView = Backbone.View.extend({
	tagName : "li",
	el : '#twitter-feed',

	initialize : function() {
		this.collection = new TweetList();
		this.render();
	},

	render : function() {
		console.log("Fetching tweets");
		
		var that = this;
		
		this.collection.fetch({
			success : function(collection, response) {
				console.log('Collection fetch success', response);
				console.log('Collection models: ', collection.models);
				
				_.each(that.collection.models, function (item){
					that.renderApp(item);
				}, that);
				
			},
			error : function(collection, response) {
				throw new Error("Twitter fetch error" + response.responseText);

			}
		});
	},
	
	renderApp: function(item) {
		var tweetView = new TweetView({
				model: item
		});
		
		this.$el.append(tweetView.render());
	}
});

twitterView = new TwitterView();
