/**********************************

G A M E DETAIL 

- Display chosen game info

**********************************/
if (Meteor.isClient) {
	Template.game_detail.helpers({
	  game_id : function(){
	  	return Session.get('game_id');
	  },
	  game : function(){
	  	return Games.find({_id : Session.get('game_id')}).fetch();
	  }
	});
}