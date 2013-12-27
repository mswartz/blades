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
  //Get the players
  players : function(){
    var players = Players.find({}).fetch();
    return players;
  },

  //get us the game number
  game_no : function(){
    var count = Games.find().count() + 1;
    return count;
  },

  //P1 points
  p1_points : function() {
    return Session.get('p1_pts');
  },

  //P2 Points
  p2_points : function() {
    return Session.get('p2_pts');
  },

  //P1 ID
  p1_id : function() {
    return Session.get('p1_id');
  },

  //P2 ID
  p2_id : function() {
    return Session.get('p2_id');
  },

  //Display P1 name
  p1_name : function() {
    var p1_name = Players.findOne({_id:Session.get('p1_id')});
    if(p1_name){
      return p1_name.name;
    }
  },

  //Display P2 name
  p2_name : function() {
    var p2_name = Players.findOne({_id:Session.get('p2_id')});
    if(p2_name){
      return p2_name.name;
    }
  },

  //Get players from Players collection for choosing
  all_names : function() {
    return Players.find().fetch();
  },

  //Dynamically add OT inputs
  ot_scores : function(){
    var ot_scores = [];
    var ot_count = Session.get('ot_count');

    if(ot_count){
      for(var i=0; i<ot_count; i++){
        ot_scores[i] = {
          'ot' : i+1
        }
      }
    }
    return ot_scores;
  }
});

Template.newgame.events({
  //Update points on the fly
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

  //How many overtimes?
  'change #ot_counter' : function(){
    Session.set('ot_count', $('#ot_counter').val());
  },

  //Select your player
  'change select.name' : function() {
    Session.set('p1_id', $('#p1_name').val());
    Session.set('p2_id', $('#p2_name').val());
  },

  'click input#newgame_addgame' : function() {
    //Get player teams
    var p1_team = $('#p1_team').val();
    var p2_team = $('#p2_team').val();

    //Get p1 reg goals
    var p1_reg_goals = {
      '1p' : $('#p1_score_1p').val(),
      '2p' : $('#p1_score_2p').val(),
      '3p' : $('#p1_score_3p').val()
    };

    //Get p2 reg goals
    var p2_reg_goals = {
      '1p' : $('#p2_score_1p').val(),
      '2p' : $('#p2_score_2p').val(),
      '3p' : $('#p2_score_3p').val()
    };

    //Get OT scores (if any)
    if(Session.get('ot_count')>0){

      var p1_ot_goals = {};
      var p2_ot_goals = {};

      for(var i = 0; i<=Session.get('ot_count')-1; i++){
        p1_ot_goals[(i+1)+'ot'] = parseInt($('#p1_score_'+(i+1)+'ot').val());
        p2_ot_goals[(i+1)+'ot'] = parseInt($('#p2_score_'+(i+1)+'ot').val());
      }

    }

    //Find fights
    var p1_fights = $('#p1_fights').val();
    var p2_fights = $('#p2_fights').val();

    //Find Final scores
    var p1_final = parseInt($('#p1_final').text());
    var p2_final = parseInt($('#p2_final').text());

    Games.insert({
      //Add player IDs
      'p1_id' : Session.get('p1_id'),
      'p2_id' : Session.get('p2_id'),

      //Add chosen teams
      'p1_id' : p1_team,
      'p2_id' : p1_team,

      //Add reg goals
      'p1_reg_goals' : p1_reg_goals,
      'p2_reg_goals' : p2_reg_goals,

      //Add OT goals
      'p1_ot_goals' : p1_ot_goals,
      'p2_ot_goals' : p2_ot_goals,

      //Add fights
      'p1_fights' : p1_fights,
      'p2_fights' : p2_fights,

      //Add final scores
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