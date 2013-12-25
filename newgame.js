/**********************************

NEW G A M E 

- Add a new game

**********************************/

if (Meteor.isClient) {

Session.setDefault('p1_pts', 0);
Session.setDefault('p2_pts', 0);

Session.setDefault('p1_name', 'Player 1');
Session.setDefault('p2_name', 'Player 2');

Session.setDefault('p1_id', 'Player1');
Session.setDefault('p2_id', 'Player2');

Session.setDefault('ot_count', 0);

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

  p1_id : function() {
    return Session.get('p1_id');
  },

  p2_id : function() {
    return Session.get('p2_id');
  },

  p1_name : function() {
    var p1_name = Players.findOne({_id:Session.get('p1_id')});
    if(p1_name){
      return p1_name.name;
    }
  },

  p2_name : function() {
    var p2_name = Players.findOne({_id:Session.get('p2_id')});
    if(p2_name){
      return p2_name.name;
    }
  },

  all_names : function() {
    return Players.find().fetch();
  },

  ot_inputs : function(){
    var ot_inputs = [];
    var ot_count = Session.get('ot_count');

    if(ot_count){
      for(var i=0; i<ot_count; i++){
        ot_inputs[i] = {
          'ot' : i+1
        }
      }
    }
    return ot_inputs;
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

  'click #ot_counter' : function(){
    Session.set('ot_count', $('#ot_counter').val());
  },

  'blur select.name' : function() {
    Session.set('p1_id', $('#p1_name').val());
    Session.set('p2_id', $('#p2_name').val());
  },

  'click input#newgame_addgame' : function() {

    var p1_team = $('#p1_team').val();
    var p2_team = $('#p2_team').val();

    var p1_reg_goals = {
      '1p' : $('#p1_score_1p').val(),
      '2p' : $('#p1_score_2p').val(),
      '3p' : $('#p1_score_3p').val()
    };

    var p2_reg_goals = {
      '1p' : $('#p2_score_1p').val(),
      '2p' : $('#p2_score_2p').val(),
      '3p' : $('#p2_score_3p').val()
    };

    if(Session.get('ot_count')>0){

      var p1_ot_goals = {};
      var p2_ot_goals = {};

      for(var i = 0; i<=Session.get('ot_count')-1; i++){
        p1_ot_goals[(i+1)+'ot'] = parseInt($('#p1_score_'+(i+1)+'ot').val());
        p2_ot_goals[(i+1)+'ot'] = parseInt($('#p2_score_'+(i+1)+'ot').val());
      }

    }

    var p1_fights = $('#p1_fights').val();
    var p2_fights = $('#p2_fights').val();

    var p1_final = parseInt($('#p1_final').text());
    var p2_final = parseInt($('#p2_final').text());

    Games.insert({
      'p1_id' : Session.get('p1_id'),
      'p2_id' : Session.get('p2_id'),

      'p1_reg_goals' : p1_reg_goals,
      'p2_reg_goals' : p2_reg_goals,

      'p1_ot_goals' : p1_ot_goals,
      'p2_ot_goals' : p2_ot_goals,

      'p1_fights' : p1_fights,
      'p2_fights' : p2_fights,

      'p1_final' : p1_final,
      'p2_final' : p2_final
    });
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