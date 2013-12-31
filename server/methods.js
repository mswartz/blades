Meteor.methods({
  incrementOpponent: function (player1Id, player2Id) {
    check(player1Id, String);
    check(player2Id, String);

    Players.update({
      _id: player1Id,
      'opponents.id': player2Id
    }, {
      $inc: {
        'opponents.$.games_played' : 1
      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  }
});