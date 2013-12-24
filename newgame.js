/**********************************

NEW G A M E 

- Add a new game

**********************************/

if (Meteor.isClient) {

Session.setDefault('p1_pts', 0);
Session.setDefault('p2_pts', 0);

Session.setDefault('p1_name', 'Player 1');
Session.setDefault('p2_name', 'Player 2');


Template.newgame.helpers({
  players : function(){
    var players = Players.find({}).fetch();
    return players;
  },

  //get us the game number
  game_no : function(){
    var count = Games.find().count() + 1;
    return count;
  },

  p1_points : function() {
    return Session.get('p1_pts');
  },

  p2_points : function() {
    return Session.get('p2_pts');
  },

  p1_name : function() {
    return Session.get('p1_name');
  },

  p2_name : function() {
    return Session.get('p2_name');
  },

  all_names : function() {
    return Players.find().fetch();
  }
});

Template.newgame.events({
  'blur input.pts' : function() {
    var p1_pts = 0;
    var p2_pts = 0;

    $('.p1_pts').each(function(){
      p1_pts = p1_pts + parseInt($(this).val());
    })

    $('.p2_pts').each(function(){
      p2_pts = p2_pts + parseInt($(this).val());
    })

    Session.set('p1_pts', p1_pts);
    Session.set('p2_pts', p2_pts);
  },

  'blur select.name' : function() {
    Session.set('p1_name', $('#p1_name').val());
    Session.set('p2_name', $('#p2_name').val());
  },

  'click input#newgame_addgame' : function() {
    var game_no = Games.find().count() + 1;

    var p1_name = $('#newgame_p1_name').val();
    var p2_name = $('#newgame_p2_name').val();

    var p1_team = $('#newgame_p1_name').val();
    var p2_team = $('#newgame_p1_name').val();

    var p1_game_goals = {
      '1p' : $('#newgame_p1_name').val(),
      '2p' : $('#newgame_p1_name').val(),
      '3p' : $('#newgame_p1_name').val()
    };

    var p2_game_goals = {
      '1p' : $('#newgame_p1_name').val(),
      '2p' : $('#newgame_p1_name').val(),
      '3p' : $('#newgame_p1_name').val()
    };

    var p1_ot_goals = {
      '1p' : $('#newgame_p1_name').val(),
      '2p' : $('#newgame_p1_name').val(),
      '3p' : $('#newgame_p1_name').val()
    };

    var p1_fights = $('#newgame_p1_fights').val();
    var p2_fights = $('#newgame_p1_fights').val();


    Games.insert(newgame);
  }
});

//Function for getting stuff from forms
function gatherValues(schema, array) {
  var result = {};
  for ( var i = 0; i < array.length; i++) {
    var value = $('#'+schema+"_"+array[i]).val();
    result[array[i]] = value;
  }
  return result;
}

}//isClient