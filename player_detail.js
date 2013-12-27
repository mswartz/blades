/**********************************

P L A Y E R  DETAIL 

- Display chosen player info

**********************************/

if (Meteor.isClient) {
	Template.player_detail.helpers({
	  player_id : function(){
	  	return Session.get('player_id');
	  }
	});
}