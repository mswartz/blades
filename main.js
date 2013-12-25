/**********************************

M A I N

**********************************/

// Set up collections for 
Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");


if (Meteor.isClient) {

  Router.configure({
    notFoundTemplate: 'notFound' // this will render
  });
  
  //Iron Router routings
  Router.map(function () {
    //Home template
    this.route('home', {
      path: '/',
      template: 'home'
    });

    //Add a game
    this.route('newgame', {
      path: '/newgame',
      template: 'newgame'
    });

    //Games
    this.route('games', {
      path: '/games',
      template: 'games'
    });

    //Players
    this.route('players', {
      path: '/players',
      template: 'players'
    });
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Games.remove({});
  });
}
