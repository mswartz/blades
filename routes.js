if (Meteor.isClient) {
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