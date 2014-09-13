/**********************************

G A M E S

**********************************/

if (Meteor.isClient) {

Session.setDefault('sort_by', -1);

Template.games.rendered = function() {
  Session.set('games_total', Games.find().count());
};

Template.games.helpers({
  games : function(){
    var start = Session.get('games_start'),
        end = Session.get('games_end'),
        games = Splice(start, end, Games.find({}, {sort: {game_no : Session.get('sort_by')}}).fetch());
    return games;
  },

  games_total : function(){
    var games = Games.find().count();
    Session.set('games_total', games);
  	return games;
  }
});
}//isClient
