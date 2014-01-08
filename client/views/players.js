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
  },
  scorers : function(){
    var scorers = Players.find({}, {sort: {goals_scored : -1}, limit : 5}).fetch();
    return scorers;
  }
});

Template.players.events({
  'click input.player_deleteplayer' : function(){
    Players.remove(this._id);
  }
});

}//isClient