/**********************************

NEW PLAYER

**********************************/

if (Meteor.isClient) {

Template.newplayer.helpers({
  //nuffin here
});

Template.newplayer.events({
  'click input.newplayer_submitplayer' : function() {
    var newplayer = {
      'name' : $('#newplayer_name').val(),
      'team' : $('#newplayer_team').val(),
      'current_streak' : 0,
      'win_streak_record' : 0,
      'loss_streak_record' : 0
    };

    Meteor.call("addPlayer", newplayer, function(error, affectedDocs) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('new player added!');
      }
    });

    // Router.go('players');
  }
});

}//isClient