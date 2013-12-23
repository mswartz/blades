/**********************************

P L A Y E R S 

- Display all players
- Add new Players
- Delete Players

**********************************/

if (Meteor.isClient) {

Template.players.helpers({
  players : function(){
    var players = Players.find({}).fetch();
    return players;
  }
});

Template.players.events({
  'click input.newplayer_submitplayer' : function() {
    var newplayer = gatherValues("newplayer", ["name", "initials", "high_rnd", "low_rnd", "handicap"]);
    Players.insert(newplayer);
  },
  'click input.player_deleteplayer' : function(){
    Players.remove(this._id);
  }
});

function gatherValues(schema, array) {
  var result = {};
  for ( var i = 0; i < array.length; i++) {
    var value = $('#'+schema+"_"+array[i]).val();
    result[array[i]] = value;
  }
  return result;
}

}//isClient