if (Meteor.isClient) {
	Template.home.helpers({
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
		'fight_leaders' : function(){
			var fight_data = Players.find({}, {sort: {'fights_won': -1}}).fetch();
			for(var i = 0; i<fight_data.length; i++){
				var fight_avg = (fight_data[i].fights_won / (fight_data[i].fights_won + fight_data[i].fights_lost))*100;
				fight_data[i].fight_avg = fight_avg.toFixed(2);
				var fpg_avg = (fight_data[i].fights_won + fight_data[i].fights_lost) / fight_data[i].games_played;
				fight_data[i].fpg_avg = fpg_avg.toFixed(1);
			};
			return fight_data;
		},
	});
}