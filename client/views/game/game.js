if(Meteor.isClient) {

Template.game.events({

	'click input#game_deletegame' : function(){
	    if (confirm('Are you sure you want to delete game '+this.game_no+'?')) {
	        Meteor.call("deleteGame", this._id, function(error, affectedDocs) {
	          if (error) {
	            console.log(error.message);
	          } else {
	            console.log('game deleted!');
	          }
	        });
	    } else {
	        // Do nothing!
	    }
	}
});

}
