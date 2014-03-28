/**********************************

P L A Y E R  D E T A I L

**********************************/

if (Meteor.isClient) {
	Session.setDefault('sort_by', 1);
	Session.setDefault('game_range', 1);
	Session.setDefault('results_num', 50);
	Session.setDefault('sort_wins', undefined);

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
	  	player[0].so_avg = player[0].shutouts / player[0].games_played;

	  	//Let's snip off some decimals
	  	player[0].win_avg = player[0].win_avg.toFixed(2) * 100;
		player[0].fight_avg = player[0].fight_avg.toFixed(2) * 100;
		player[0].gs_avg = player[0].gs_avg.toFixed(2);
		player[0].ga_avg = player[0].ga_avg.toFixed(2);
		player[0].so_avg = player[0].so_avg.toFixed(2);


	  	//now return the player with the opp stats to the template
	  	return player;
	  },
	  games : function(){
	  	//By default return all games with this player
	  	var games = Games.find({$or: [{'p1_id':Session.get('player_id')}, {'p2_id':Session.get('player_id')}]}, {sort: {game_no : Session.get('sort_by')}, limit: Session.get('results_num')}).fetch();

	  	//If sorted by wins, return only wins
	    if(Session.get('sort_wins')=='wins'){
	      games = Games.find({'game_winner':Session.get('player_id')}, {sort: {game_no : Session.get('sort_by')}, limit: Session.get('results_num')}).fetch();
	    } 
	    //If sorted by losses, return only losses
	    else if (Session.get('sort_wins')=='losses') {
	      games = Games.find({'game_loser':Session.get('player_id')}, {sort: {game_no : Session.get('sort_by')}, limit: Session.get('results_num')}).fetch();
	    } else {
	      games = Games.find({$and: [{game_no: {$gte: Session.get('game_range')}},{$or: [{'p1_id':Session.get('player_id')}, {'p2_id':Session.get('player_id')}]}]}, {sort: {game_no : Session.get('sort_by')}, limit: Session.get('results_num')}).fetch();
	    }
    
	  	return games;
	  },
	  game_range : function(){
	    // Use the Paginate function and return the range;
	    return Paginate(Games.find({$or: [{'p1_id':Session.get('player_id')}, {'p2_id':Session.get('player_id')}]}).count(), Session.get('results_num'));
	  }
	});

	Template.player_detail.events({
	  'click #game_no_asc' : function() {
	    Session.set('sort_by', 1);
	  },
	  'click #game_no_desc' : function() {
	    Session.set('sort_by', -1);
	  },
	  'click #sort_wins' : function() {
	    Session.set('sort_wins', 'wins');
	  },
	  'click #sort_losses' : function() {
	    Session.set('sort_wins', 'losses');
	  },
	  'click #sort_none' : function() {
	    Session.set('sort_wins', undefined);
	  },
	  'change #game_range' : function() {
	    var range = parseInt($('#game_range').val());
	    Session.set('game_range', range);
	  },
	  'input #results_num' : function(){
	    var results_num = parseInt($('#results_num').val());
	    Session.set('results_num', results_num);
	  }
	})
}