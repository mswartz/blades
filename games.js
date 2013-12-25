/**********************************

G A M E S

- Display all players
- Add new Players
- Delete Players

**********************************/

if (Meteor.isClient) {

Template.games.helpers({
  games : function(){
    var games = Games.find({}).fetch();

    for(var i = 0; i<games.length; i++){
    	var p1 = Players.find({_id:games[i].p1_id});
    	var p2 = Players.find({_id:games[i].p2_id});
    	games[i].p1 = p1;
    	games[i].p2 = p2;
    }

    return games;
  },

  total_games : function(){
  	return Games.find().count();
  }
});


}//isClient