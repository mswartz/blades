/**********************************

M A I N

**********************************/
// Set up collections for
Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");
Seasons = new Meteor.Collection("seasons");

Players.allow({
  update: function(){
    return true;
  },
  remove: function(){
    return false;
  }
});

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

        var player = Players.findOne({'name' : this.params.player_name})
        if(player) {
          player.games_won = player.games_won || 0;
          player.games_lost = player.games_lost || 0;
          player.win_streak_record = player.win_streak_record || 0;
          player.loss_streak_record = player.loss_streak_record || 0;
          player.goals_scored = player.goals_scored || 0;
          player.goals_allowed = player.goals_allowed || 0;
          player.fights_won = player.fights_won || 0;
          player.fights_lost = player.fights_lost || 0;
        }

        return player;
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

    //Matchup
    this.route('faceoff', {
      path: '/faceoff',
      template: 'faceoff'
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
