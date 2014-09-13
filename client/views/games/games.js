/**********************************

G A M E S

**********************************/

if (Meteor.isClient) {

Session.setDefault('sort_by', -1);

Template.games.rendered = function() {
  Session.set('total_games', Games.find().count());
};

Template.games.helpers({
  games : function(){
    var games = Games.find({game_no: {$gte: Session.get('game_range')}}, {sort: {game_no : Session.get('sort_by')}, limit: Session.get('results_num')}).fetch();
    return games;
  },

  total_games : function(){
    var games = Games.find().count();
    Session.set('games_total', games);
  	return games;
  }
});
}//isClient
