//Eventually perform most DB updates here

Meteor.methods({
  incrementOpponent: function (player1Id, player2Id, p1_stats) {
    check(player1Id, String);
    check(player2Id, String);

    Players.update({
      _id: player1Id,
      'opponents.id': player2Id
    }, {
      $inc: {
        'opponents.$.games_played' : p1_stats.games_played,
        'opponents.$.games_won' : p1_stats.games_won,
        'opponents.$.games_lost' : p1_stats.games_lost,
        'opponents.$.goals_scored' : p1_stats.goals_scored,
        'opponents.$.goals_allowed' : p1_stats.goals_allowed,
        'opponents.$.fights_total' : p1_stats.fights_total,
        'opponents.$.fights_won' : p1_stats.fights_won,
        'opponents.$.fights_lost' : p1_stats.fights_lost,
        'opponents.$.shutouts' : p1_stats.shutouts
      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        return "Update Successful";
      }
    });
  },
  checkKey: function(key) {
    return key === 'glitch';
  }
});