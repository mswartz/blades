/**********************************

G A M E S

**********************************/

if (Meteor.isClient) {

Session.setDefault('sort_by', -1);
Session.setDefault('game_range', 1);
Session.setDefault('results_num', 50);


Template.games.helpers({
  games : function(){
    return Games.find({game_no: {$gte: Session.get('game_range')}}, {sort: {game_no : Session.get('sort_by')}, limit: Session.get('results_num')}).fetch();
  },

  total_games : function(){
  	return Games.find().count();
  },

  game_range : function(){
    // Use the Paginate function and return the range;
    return Paginate(Games.find({}).count(), Session.get('results_num'));
  }
});

Template.games.events({
  'click #game_no_asc' : function() {
    Session.set('sort_by', 1);
  },
  'click #game_no_desc' : function() {
    Session.set('sort_by', -1);
  },
  'change #game_range' : function() {
    var range = parseInt($('#game_range').val());
    Session.set('game_range', range);
  },
  'change #results_num' : function(){
    var results_num = parseInt($('#results_num').val());
    Session.set('results_num', results_num);
  }
})


}//isClient