/**********************************

NEW PLAYER

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
    var newplayer = {
      'name' : $('#newplayer_name').val(),
      'team' : $('#newplayer_team').val(),
      'current_streak' : 0,
      'win_streak_record' : 0,
      'loss_streak_record' : 0
    };

    Players.insert(newplayer);
  }
});

}//isClient