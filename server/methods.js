//Eventually perform most DB updates here

Meteor.methods({
  incrementOpponent: function (p1_id, p2_id, p1stats, p2stats) {
    // check(player, String);
    // check(opponent, String);

    Players.update({
      _id : p1_id,
      'opponents.id' : p2_id
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
        console.log("Update "+p1_id+" Successful");
        return "Update Successful";
      }
    });

    Players.update({
      _id : p2_id,
      'opponents.id' : p1_id
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
        console.log("Update "+p2_id+" Successful");
        return "Update Successful";
      }
    });
  },

  slackPost: function(game_no, winner, loser, winner_points, loser_points){
    HTTP.post("https://upstatement.slack.com/services/hooks/incoming-webhook", {"params":
    {"token": "ffaX9oszfuVD3hUBEauvkFSA",
     "payload": JSON.stringify({
       "channel": "#blades",
       "username": "bladesbot",
       "text": "Game "+game_no+": "+winner+" just beat "+loser+" "+winner_points+" to "+loser_points,
       "icon_emoji": ":bladesbot:"
      })
    }}
  );
  },

  deleteGame: function(game){
    Games.remove(game);
  },

  addPlayer: function(player){
    Players.insert(player);
  },

  deletePlayer: function(player){
    Players.remove(player);
  },

  //Secret key for registration
  checkKey: function(key) {
    return key === 'glitch';
  }
});