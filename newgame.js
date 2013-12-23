/**********************************

NEW G A M E 

- Add a new game

**********************************/

if (Meteor.isClient) {

Template.newgame.helpers({
  players : function(){
    var players = Players.find({}).fetch();
    return players;
  }
});

Template.newgame.events({
  'click input#newgame_addgame' : function() {
    alert("clicked");
    var newgame = gatherValues("newgame", ["p1_name", "p1_team", "p1_1p_score", "p1_2p_score", "p1_3p_score", "p1_1ot_score", "p1_2ot_score", "p1_3ot_score", "p1_fights", "p2_name", "p2_team", "p2_1p_score", "p2_2p_score", "p2_3p_score", "p2_1ot_score", "p2_2ot_score", "p2_3ot_score", "p2_fights"]  );
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