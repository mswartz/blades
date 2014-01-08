/**********************************

M A I N

**********************************/
// Set up collections for 
Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");

if (Meteor.isClient) {

  //Configure iron-router
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

    // Games Detail
    this.route('gameDetail', {
      path: '/games/:_id',
      template: 'game_detail',
      data: function () {
        // this.params is available inside the data function
        var game_id = this.params._id;

        return {
          id : game_id
        }
      },
      //This can check to make sure the game exists
      before: function() {
        if(Games.find({_id:this.params._id}).count()>0){
          this.render();
        } else {
          this.render('notFound');
          this.stop();
        }
      },
      //If all is well, load the template with the player_id
      load: function() {
        Session.set('game_id', this.params._id);
      }
    });

    //Players
    this.route('players', {
      path: '/players',
      template: 'players'
    });

    //New Player
    this.route('newplayer', {
      path: '/newplayer',
      template: 'newplayer'
    });

    // Player Detail
    this.route('playerDetail', {
      // matches: '/posts/1'
      path: '/players/:_id',
      template: 'player_detail',
      data: function () {
        // this.params is available inside the data function
        var player_id = this.params._id;

        return {
          id : player_id
        }
      },
      //This can check to make sure the player exists
      before: function() {
        if(Players.find({_id:this.params._id}).count()>0){
          this.render();
        } else {
          this.render('notFound');
          this.stop();
        }
      },
      //If all is well, load the template with the player_id
      load: function() {
        Session.set('player_id', this.params._id);
      }
    });

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // Uncomment if you want to reset the collections
    // Games.remove({});
    // Players.remove({});
  });
}
