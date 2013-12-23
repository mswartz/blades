/**********************************

G A M E S

- Display all players
- Add new Players
- Delete Players

**********************************/

if (Meteor.isClient) {

Template.games.helpers({
  games : function(){
    var games = Games.find({}).fetch();
    return games;
  }
});


}//isClient