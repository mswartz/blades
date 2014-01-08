if (Meteor.isClient) {
	Template.home.helpers({
		'meta_stats' : function(){
			var data = Games.find({}).fetch();
			var games_tot = data.length;
			var goals_tot = 0;
			var fights_tot = 0;
			var gos_tot = 0;

			for (var i=0; i<games_tot; i++){
				goals_tot = goals_tot + (data[i].p1_final + data[i].p2_final);
				fights_tot = fights_tot + (data[i].p1_fights + data[i].p2_fights);
				gos_tot = gos_tot + (data[i].p1_gos + data[i].p2_gos);
			}

			var gpg_avg = goals_tot/games_tot;
			var fpg_avg = fights_tot/games_tot;
	
			var metadata = [];
			metadata[0] = {
				'games_tot' : games_tot,
				'goals_tot' : goals_tot,
				'fights_tot' : fights_tot,
				'gos_tot' : gos_tot,
				'gpg_avg' : gpg_avg.toFixed(1),
				'fpg_avg' : fpg_avg.toFixed(1)
			};
			console.log(metadata);

			return metadata;
		},
		'player_streaks' : function(){
			var game_data = Players.find({}, {sort: {'current_streak': -1}}).fetch();
			for(var i = 0; i<game_data.length; i++){
				
				
			};
			return game_data;
		},
		'game_leaders' : function(){
			var game_data = Players.find({}, {sort: {'games_won': -1}}).fetch();
			for(var i = 0; i<game_data.length; i++){
				var avg = (game_data[i].games_won / game_data[i].games_played)*100;
				game_data[i].game_avg = avg.toFixed(2);
			};
			return game_data;
		},
		'goal_leaders' : function(){
			var goal_data = Players.find({}, {sort: {'goals_scored': -1}}).fetch();
			for(var i = 0; i<goal_data.length; i++){
				var avg = goal_data[i].goals_scored / goal_data[i].games_played;
				goal_data[i].gpg_avg = avg.toFixed(1);
			};
			return goal_data;
		},
		'defense_leaders' : function(){
			var data = Players.find({}, {sort: {'goals_allowed': 1}}).fetch();
			for(var i = 0; i<data.length; i++){
				var gapg_avg = data[i].goals_allowed / data[i].games_played;
				data[i].gapg_avg = gapg_avg.toFixed(1);
			};
			return data;
		},
		'fight_leaders' : function(){
			var fight_data = Players.find({}, {sort: {'fights_won': -1}}).fetch();
			for(var i = 0; i<fight_data.length; i++){
				var fight_avg = (fight_data[i].fights_won / (fight_data[i].fights_won + fight_data[i].fights_lost))*100;
				fight_data[i].fight_avg = fight_avg.toFixed(2);
				var fpg_avg = (fight_data[i].fights_won + fight_data[i].fights_lost) / fight_data[i].games_played;
				fight_data[i].fpg_avg = fpg_avg.toFixed(1);
			};
			return fight_data;
		}
	});
}