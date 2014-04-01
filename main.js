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

    //Login template
    this.route('login', {
      path: '/login',
      template: 'login'
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
      path: '/games/:game_num',
      template: 'game_detail',
      data: function () {
        return Games.findOne({'game_no' : parseInt(this.params.game_num)});
      },
      onBeforeAction : function(){
        if(Games.findOne({'game_no' : parseInt(this.params.game_num)}) != undefined){
          this.render();
        } else {
          this.render('notFound');
        }
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
      path: '/players/:player_name',
      template: 'player_detail',
      data: function () {
        return Players.findOne({'name' : this.params.player_name});
      },
      onBeforeAction : function(){
        if(Players.findOne({'name' : this.params.player_name}) != undefined){
          Session.set('player_id', Players.findOne({'name' : this.params.player_name})._id);
          this.render();
        } else {
          this.render('notFound');
        }
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
