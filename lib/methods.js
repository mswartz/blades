//Eventually perform most DB updates here

Meteor.methods({
  incrementOpponent: function (player, opponent, p1stats, p2stats) {
    // check(player, String);
    // check(opponent, String);

    Players.update({
      _id: player,
      'opponents.id': opponent
    }, {
      $inc: {
        'opponents.$.games_played' : p1stats.games_played,
        'opponents.$.games_won' : p1stats.games_won,
        'opponents.$.games_lost' : p1stats.games_lost,
        'opponents.$.goals_scored' : p1stats.goals_scored,
        'opponents.$.goals_allowed' : p1stats.goals_allowed,
        'opponents.$.fights_total' : p1stats.fights_total,
        'opponents.$.fights_won' : p1stats.fights_won,
        'opponents.$.fights_lost' : p1stats.fights_lost,
        'opponents.$.shutouts' : p1stats.shutouts
      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        console.log("Update "+player+" Successful");
        return "Update Successful";
      }
    });

    Players.update({
      _id: opponent,
      'opponents.id': player
    }, {
      $inc: {
        'opponents.$.games_played' : p2stats.games_played,
        'opponents.$.games_won' : p2stats.games_won,
        'opponents.$.games_lost' : p2stats.games_lost,
        'opponents.$.goals_scored' : p2stats.goals_scored,
        'opponents.$.goals_allowed' : p2stats.goals_allowed,
        'opponents.$.fights_total' : p2stats.fights_total,
        'opponents.$.fights_won' : p2stats.fights_won,
        'opponents.$.fights_lost' : p2stats.fights_lost,
        'opponents.$.shutouts' : p2stats.shutouts
      }
    }, function(error, affectedDocs) {
      if (error) {
        throw new Meteor.Error(500, error.message);
      } else {
        console.log("Update "+player+" Successful");
        return "Update Successful";
      }
    });
  },

  //Secret key for registration
  checkKey: function(key) {
    return key === 'glitch';
  }
});