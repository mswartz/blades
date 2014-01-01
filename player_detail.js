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
	  	//get the player form the Players collection
	  	var player = Players.find({_id : Session.get('player_id')}).fetch();

	  	//Crunch opponent stats
	  	for(var i = 0; i<player[0].opponents.length; i++){
	  		player[0].opponents[i].games_avg = player[0].opponents[i].games_won / player[0].opponents[i].games_played;
	  		player[0].opponents[i].fights_avg = player[0].opponents[i].fights_won / (player[0].opponents[i].fights_won + player[0].opponents[i].fights_lost);
	  	}

	  	//Crunch the player stats
	  	player[0].win_avg = player[0].games_won / player[0].games_played;
		player[0].fight_avg = player[0].fights_won / (player[0].fights_won + player[0].fights_lost);
	  	player[0].gs_avg = player[0].goals_scored / player[0].games_played;
	  	player[0].ga_avg = player[0].goals_allowed / player[0].games_played;

	  	//now return the player with the opp stats to the template
	  	return player;
	  },
	  games : function(){
	  	var games = Games.find({ $or: [{'p1_id':Session.get('player_id')}, {'p2_id':Session.get('player_id')}]}, {sort: {'game_no':1}}).fetch();
	  	return games;
	  },
	  wins : function(){
	  	var wins = Games.find({'game_winner':Session.get('player_id')}, {sort: {'game_no':1}}).fetch();
	  	return wins;
	  }
	});
}