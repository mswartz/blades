var noplayer = {
	name: "No Players",
	_id: -1,
	team: "unknown"
};


Session.setDefault('player1', noplayer);
Session.setDefault('player2', noplayer);

function getPlayer(playertag) {
	var id = $("#" + playertag).val();

	if(!id) {
		return null;
	}

  	if(id === -1) {
  		return noplayer;
  	}

  	return Players.findOne({'_id' : id}) || noplayer;
}

function getGames() {
  	var query = {
				$or: 	[
				  		{
				  			'p1_id':Session.get('player1')['_id'],
				  			'p2_id':Session.get('player2')['_id']
			  			},
			  			{
			  				'p1_id':Session.get('player2')['_id'],
			  				'p2_id':Session.get('player1')['_id']
			  			}
		  			],
	  		};

	var start = Session.get('games_start'),
		end = Session.get('games_end'),
  		games = Splice(start, end, Games.find(query, {sort: {game_no : Session.get('sort_by')}}).fetch());

  	return games;
}


function getTotalGames() {

	var query = {
		$or: 	[
		  		{
		  			'p1_id':Session.get('player1')['_id'],
		  			'p2_id':Session.get('player2')['_id']
	  			},
	  			{
	  				'p1_id':Session.get('player2')['_id'],
	  				'p2_id':Session.get('player1')['_id']
	  			}
  			]
		};


  	return Games.find(query).fetch().length;
}

function forceNum(num) {
	return isNaN(num) ? 0 : num;
}

Template.faceoff.rendered = function(){
	Session.set('player1', getPlayer('player1'));
	Session.set('player2', getPlayer('player2'));
	Session.set('games_total', getTotalGames());
};

Template.faceoff.helpers({

  //Get the players
  players : function(){
    var players = Players.find({}).fetch();
    if(!players || players.length === 0) {
    	return [noplayer];
    }

    Session.set('player1', players[0]);
    return players;
  },

  reverseplayers : function(){
    var players = Players.find({}).fetch();
    if(!players || players.length === 0) {
    	return [noplayer]
    }

    players = players.reverse();

    Session.set('player2', players[0]);

    return players;
  },

  player1 : function(){
  	return Session.get('player1');
  },

  player2: function() {
  	return Session.get('player2');
  },
  games : function(){
  	//By default return all games with this player
  	return getGames();
  },
  stats : function() {

  	var player1 = Session.get('player1'),
  		player2 = Session.get('player2');

  	var games = getGames();

  	var stats = {
  		'p1_wins':0,
  		'p1_goals':0,
  		'p1_shutouts':0,
  		'p1_reg_1': 0,
  		'p1_reg_2': 0,
  		'p1_reg_3': 0,
  		'p1_fights':0,
  		'p1_gos':0,
  		'p1_ot':0,
  		'p1_best':{game_no:-1},
  		'p1_best_diff':0,
  		'p1_diff':0,
  		'p2_wins':0,
  		'p2_goals':0,
  		'p2_shutouts':0,
  		'p2_reg_1': 0,
  		'p2_reg_2': 0,
  		'p2_reg_3': 0,
  		'p2_fights':0,
  		'p2_gos':0,
  		'p2_ot':0,
  		'p2_best':{game_no:-1},
  		'p2_best_diff':0,
  		'p2_diff':0,
  	};

  	for(var i = 0; i < games.length; i++) {
  		var game = games[i],
  			winner,
  			loser;

  		if(game.p1_id === player1._id && game.p2_id === player2._id) {
  			p1 = "p1";
  			p2 = "p2";
  		} else if(game.p2_id === player1._id && game.p1_id === player2._id) {
  			p1 = "p2";
  			p2 = "p1";
  		} else {
  			console.error('Invalid game');
  			continue;
  		}
  		if(game.p1_winner) {

  			stats[p1 +"_wins"] += 1;

  			var game_diff = forceNum(game.p1_final - game.p2_final);

  			stats[p1 +"_diff"] += game_diff;

  			if(stats[p1 +"_best_diff"] < game_diff) {

  				stats[p1 +"_best"] = game;
  				stats[p1 +"_best_diff"] = game_diff;

  			} else if (stats[p1 +"_best_diff"] === game_diff) {
  				if(game.p1_final > stats[p1 +"_best"].p1_final) {
  					stats[p1 +"_best"] = game;
  					stats[p1 +"_best_diff"] = game_diff;
  				}
  			}

  			if(game.ot_goals != 0) {
  				stats[p1 +"_ot"] += 1;
  			}

  			if(game.p2_final === 0) {
  				stats[p1 + "_shutouts"] += 1;
  			}

  		}
  		else if(game.p2_winner) {
  			stats[p2 +"_wins"] += 1;

  			var game_diff = forceNum(game.p2_final - game.p1_final);

  			stats[p2 +"_diff"] += game_diff;

  			if(stats[p2 +"_best_diff"] < game_diff) {

  				stats[p2 +"_best"] = game;
  				stats[p2 +"_best_diff"] = game_diff;

  			} else if (stats[p2 +"_best_diff"] === game_diff) {
  				if(game.p2_final > stats[p2 +"_best"].p2_final) {
  					stats[p2 +"_best"] = game;
  					stats[p2 +"_best_diff"] = game_diff;
  				}
  			}

  			if(game.ot_goals != 0) {
  				stats[p2 + "_ot"] += 1;
  			}

  			if(game.p1_final === 0) {
  				stats[p2 + "_shutouts"] += 1;
  			}
  		}

  		stats[p1 + "_goals"] += forceNum(game.p1_final);
  		stats[p1 + "_reg_1"] += forceNum(game.reg_goals[0].p1_score);
  		stats[p1 + "_reg_2"] += forceNum(game.reg_goals[1].p1_score);
  		stats[p1 + "_reg_3"] += forceNum(game.reg_goals[2].p1_score);
  		stats[p1 + "_fights"] += forceNum(game.p1_fights);
  		stats[p1 + "_gos"] += forceNum(game.p1_gos);

  		stats[p2 + "_goals"] += forceNum(game.p2_final);
  		stats[p2 + "_reg_1"] += forceNum(game.reg_goals[0].p2_score);
  		stats[p2 + "_reg_2"] += forceNum(game.reg_goals[1].p2_score);
  		stats[p2 + "_reg_3"] += forceNum(game.reg_goals[2].p2_score);
  		stats[p2 + "_fights"] += forceNum(game.p2_fights);
  		stats[p2 + "_gos"] += forceNum(game.p2_gos);
  	}

  	if( stats.p1_wins + stats.p2_wins === 0) {
  		return [];
  	}

  	if(stats.p1_best.game_no === -1) {
  		stats.p1_best = {
  			game_no: stats.p2_best.game_no,
  			game_loser_points: stats.p2_best.game_winner_points,
  			game_winner_points: stats.p2_best.game_loser_points
  		};
  	}

  	if(stats.p2_best.game_no === -1) {
  		stats.p2_best = {
  			game_no: stats.p1_best.game_no,
  			game_loser_points: stats.p1_best.game_winner_points,
  			game_winner_points: stats.p1_best.game_loser_points
  		};
  	}

  	return [
  		{
  			name: 'wins',
  			p1: stats.p1_wins,
  			p2: stats.p2_wins
  		},

  		{
  			name: 'goals',
  			p1: stats.p1_goals,
  			p2: stats.p2_goals
  		},
  		{
  			name: 'fights',
  			p1: stats.p1_fights,
  			p2: stats.p2_fights
  		},
  		{
  			name: 'shutouts',
  			p1: stats.p1_shutouts,
  			p2: stats.p2_shutouts
  		},
  		{
  			name: 'gos',
  			p1: stats.p1_gos,
  			p2: stats.p2_gos
  		},
  		{
  			name: 'overtime victories',
  			p1: stats.p1_ot,
  			p2: stats.p2_ot
  		},
  		{
  			name: 'Best Game',
  			p1: stats.p1_best.game_winner_points + " - " + stats.p1_best.game_loser_points,
  			p2: stats.p2_best.game_winner_points + " - " + stats.p2_best.game_loser_points
  		},
  		{
  			name: 'AVG Goal Margin',
  			p1: forceNum(stats.p1_diff/stats.p1_wins),
  			p2: forceNum(stats.p2_diff/stats.p2_wins)
  		},
  		{
  			name: 'period breakdown',
  			p1: stats.p1_reg_1 + ' / ' + stats.p1_reg_2 + ' / ' + stats.p1_reg_3,
  			p2: stats.p2_reg_1 + ' / ' + stats.p2_reg_2 + ' / ' + stats.p2_reg_3
  		},
  	];
  }

});

Template.faceoff.events({
  //Update points on the fly
  'change select#player1' : function() {
  	Session.set('player1', getPlayer('player1'));

  	var games_total = getTotalGames();

  	Session.set('games_total', games_total);

  	$('#games-start').val(1);
  	$('#games-end').val(games_total);

  	Session.set('games_total', games_total);
  	Session.set('games_start', 1);
  	Session.set('games_end', games_total);
  	Session.set('games_start_max', games_total);
  	Session.set('games_end_min', 2);
  },
  'change select#player2' : function() {
  	Session.set('player2', getPlayer('player2'));

  	var games_total = getTotalGames();

  	$('#games-start').val(1);
  	$('#games-end').val(games_total);

  	Session.set('games_total', games_total);
  	Session.set('games_start', 1);
  	Session.set('games_end', games_total);
  	Session.set('games_start_max', games_total);
  	Session.set('games_end_min', 1);
  },
});
