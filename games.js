/**********************************

G A M E S

- Display all players
- Add new Players
- Delete Players

**********************************/

if (Meteor.isClient) {

Session.setDefault('sort_by', 'game_no_asc');

Template.games.helpers({
  games : function(){
    var games;

    if(Session.get('sort_by')=='game_no_desc'){
      games = Games.find({}, {sort: {game_no : -1}}).fetch();
    } else if (Session.get('sort_by')=='game_no_asc') {
      games = Games.find({}, {sort: {game_no : 1}}).fetch();
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
  }
})


}//isClient