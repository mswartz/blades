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

    if (confirm('Are you sure you want to delete '+this.name+'?')) {
        Meteor.call("deletePlayer", this._id, function(error, affectedDocs) {
          if (error) {
            console.log(error.message);
          } else {
            console.log('player deleted');
          }
        });
    } else {
        // Do nothing!
    }

  }
});

}//isClient