/**********************************

P L A Y E R  DETAIL 

- Display chosen player info

**********************************/
if (Meteor.isClient) {
	Template.player_detail.helpers({
	  player_id : function(){
	  	return Session.get('player_id');
	  },
	  player : function(){
	  	return Players.find({_id : Session.get('player_id')}).fetch();
	  },
	  stats : function(){
	  	var player_data = Players.find({_id : Session.get('player_id')}).fetch();

	  	var win_avg = player_data[0].games_won / player_data[0].games_played;
		var fight_avg = player_data[0].fights_won / (player_data[0].fights_won + player_data[0].fights_lost);
	  	var gs_avg = player_data[0].goals_scored / player_data[0].games_played;
	  	var ga_avg = player_data[0].goals_allowed / player_data[0].games_played;

	  	var stats = [];

	  	stats[0] = {
	  		'win_avg' : win_avg,
	  		'fight_avg' : fight_avg,
	  		'gs_avg' : gs_avg,
	  		'ga_avg' : ga_avg
	  	}

	  	return stats;
	  },
	  games : function(){
	  	var games = Games.find({ $or: [{'p1_id':Session.get('player_id')}, {'p2_id':Session.get('player_id')}]}, {sort: {'game_no':1}}).fetch();
	  	return games;

	  }
	});
}