/**********************************

G A M E S

- Display all players
- Add new Players
- Delete Players

**********************************/

if (Meteor.isClient) {

Session.setDefault('sort_by', 'game_no_asc');
Session.setDefault('game_range', 1);

Template.games.helpers({
  games : function(){
    var games;

    if(Session.get('sort_by')=='game_no_desc'){
      games = Games.find({game_no: {$gte: Session.get('game_range')}}, {sort: {game_no : -1}}).fetch();
    } else if (Session.get('sort_by')=='game_no_asc') {
      games = Games.find({game_no: {$gte: Session.get('game_range')}}, {sort: {game_no : 1}}).fetch();
    }

    return games;
  },

  total_games : function(){
  	return Games.find().count();
  }
});

Template.games.events({
  'click #game_no_asc' : function() {
    Session.set('sort_by', 'game_no_asc');
  },
  'click #game_no_desc' : function() {
    Session.set('sort_by', 'game_no_desc');
  },
  'change #game_range' : function() {
    var range = parseInt($('#game_range').val());
    Session.set('game_range', range);
  }
})


}//isClient