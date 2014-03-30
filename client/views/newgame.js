/**********************************

NEW G A M E 

- Add a new game

**********************************/

if (Meteor.isClient) {

Session.setDefault('p1_pts', 0);
Session.setDefault('p2_pts', 0);
Session.setDefault('ot_count', 0);


Template.newgame.helpers({
  //Get the players
  players : function(){
    var players = Players.find({}).fetch();
    return players;
  },

  //get us the game number
  game_no : function(){
    var count = Games.find().count() + 1;
    Session.set('game_no', count);
    return count;
  },

  //P1 points
  p1_points : function() {
    return Session.get('p1_pts');
  },

  //P2 Points
  p2_points : function() {
    return Session.get('p2_pts');
  },

  //P1 ID
  p1_id : function() {
    return Session.get('p1_id');
  },

  //P2 ID
  p2_id : function() {
    return Session.get('p2_id');
  },

  //Display P1 name
  p1_name : function() {
    var p1_name = Players.findOne({_id:Session.get('p1_id')});
    if(p1_name){
      Session.set('p1_name', p1_name.name);
      return p1_name.name;
    } else {
      return "Choose Player 1";
    }
  },

  //Display P2 name
  p2_name : function() {
    var p2_name = Players.findOne({_id:Session.get('p2_id')});
    if(p2_name){
      Session.set('p2_name', p2_name.name);
      return p2_name.name;
    } else {
      return "Choose Player 2";
    }
  },

  //Get players from Players collection for choosing
  all_names : function() {
    return Players.find().fetch();
  },

  //Dynamically add OT inputs
  ot_scores : function(){
    var ot_scores = [];
    var ot_count = Session.get('ot_count');

    if(ot_count){
      for(var i=0; i<ot_count; i++){
        ot_scores[i] = {
          'ot' : i+1
        }
      }
    }
    return ot_scores;
  }
});

Template.newgame.events({
  //Update points on the fly
  'click input.pts' : function() {
    var p1_pts = 0;
    var p2_pts = 0;

    $('.p1_pts').each(function(){
      p1_pts = p1_pts + parseInt($(this).val());
    })

    $('.p2_pts').each(function(){
      p2_pts = p2_pts + parseInt($(this).val());
    })

    Session.set('p1_pts', p1_pts);
    Session.set('p2_pts', p2_pts);
  },

  //How many overtimes?
  'change #ot_counter' : function(){
    Session.set('ot_count', $('#ot_counter').val());
  },

  //Select your player
  'change select.name' : function() {
    Session.set('p1_id', $('#p1_name').val());
    Session.set('p2_id', $('#p2_name').val());

    //get the preferred team for each player and filter the select menu
    var p1_data = Players.find({_id : Session.get('p1_id')}).fetch();
    Session.set('p1_team', p1_data[0].team);
    $('#p1_team').val(p1_data[0].team);

    var p2_data = Players.find({_id : Session.get('p2_id')}).fetch();
    Session.set('p2_team', p2_data[0].team);
    $('#p2_team').val(p2_data[0].team);
  },


  //Submit the game
  'click input#newgame_addgame' : function() {
    //Create a date so we can sort by this
    var date_created = new Date();
    var date_parsed = Date.parse(date_created);

    //Get player teams
    var p1_team = $('#p1_team').val();
    var p2_team = $('#p2_team').val();

    //Find game winner & loser
    var game_winner;
    var game_loser;
    var game_winner_name;
    var game_loser_name;

    var p1_pts = Session.get('p1_pts');
    var p2_pts = Session.get('p2_pts');

    if(p1_pts > p2_pts){
      game_winner = Session.get('p1_id');
      game_winner_name = Session.get('p1_name');
      game_loser = Session.get('p2_id');
      game_loser_name = Session.get('p2_name');
    } else {
      game_winner = Session.get('p2_id');
      game_winner_name = Session.get('p2_name');
      game_loser = Session.get('p1_id');      
      game_loser_name = Session.get('p1_name');
    }

    //Find fights winner & loser or tied
    var fight_winner;
    var fight_loser;

    var p1_fights = parseInt($('#p1_fights').val());
    var p2_fights = parseInt($('#p2_fights').val());

    if(p1_fights > p2_fights){
      fights_winner = Session.get('p1_id');
      fights_loser = Session.get('p2_id');
      console.log('p1 fight win');
    } else if(p2_fights > p1_fights){
      fights_winner = Session.get('p2_id');
      fights_loser = Session.get('p1_id');
      console.log('p2 fight win');
    } else {
      console.log('FIGHTS TIED');
    }

    //Get regular goals
    var reg_goals = [];

    for(var i = 0; i<3; i++){
      reg_goals[i] = {period : i+1, p1_score : parseInt($('#p1_score_'+(i+1)+'p').val()), p2_score : parseInt($('#p2_score_'+(i+1)+'p').val())};
    }

    //Get OT scores (if any)
    if(Session.get('ot_count')>0){
      var ot_goals = [];

      for(var i = 0; i<=Session.get('ot_count')-1; i++){
        var ot = (i+1)+'ot';
        ot_goals[i] = {ot_num : i+1, p1_score : parseInt($('#p1_score_'+(i+1)+'ot').val()), p2_score : parseInt($('#p2_score_'+(i+1)+'ot').val())};
        
        //Create variable keys so we can pass them in the Players.update
        var p1_ot_key = {};
        var p2_ot_key = {};
        p1_ot_key[ot+'_goals']=ot_goals[i].p1_score;
        p2_ot_key[ot+'_goals']=ot_goals[i].p2_score;

        //Update OT scores on the fly
        Players.update({_id : Session.get('p1_id')}, {$inc: p1_ot_key});
        Players.update({_id : Session.get('p2_id')}, {$inc: p2_ot_key});
      }
    }

    var p1_gos = parseInt($('#p1_gos').val());
    var p2_gos = parseInt($('#p2_gos').val());

    //Save this game 
    Games.insert({
      //Add date info
      'date_created' : date_created,
      'date_parsed' : date_parsed,

      //Add game_no
      'game_no' : Session.get('game_no'),

      //Add player IDs and names
      'p1_id' : Session.get('p1_id'),
      'p2_id' : Session.get('p2_id'),

      'p1_name' : Session.get('p1_name'),
      'p2_name' : Session.get('p2_name'),

      //Add chosen teams
      'p1_team' : p1_team,
      'p2_team' : p2_team,

      //Add reg goals
      'reg_goals' : reg_goals,

      //Add OT goals
      'ot_goals' : ot_goals,

      //Add fights
      'p1_fights' : p1_fights,
      'p2_fights' : p2_fights,
      'fight_winner' : fight_winner,
      'fight_loser' : fight_loser,

      //Add final scores
      'p1_gos' : p1_gos,
      'p2_gos' : p2_gos,

      //Add final scores
      'p1_final' : p1_pts,
      'p2_final' : p2_pts,

      //Add winners
      'game_winner' : game_winner,
      'game_loser' : game_loser,

      'game_winner_name' : game_winner_name,
      'game_loser_name' : game_loser_name,
    });



    // Update players opponent stats for the player they're facing

    // HUGE write-around here, Meteor won't allow client code to modify
    // collections with anything but the _id (no _id AND opponents.id), 
    // so while I could do all this junk with MongoDB selectors I need to do it this way
    // until I figure out how to do it the 'meteor way'.

    var p1data = Players.findOne({_id: Session.get('p1_id')});
    var p2data = Players.findOne({_id: Session.get('p2_id')});

    var p1_exists = false;
    var p2_exists = false;

    var p1_index = 0;
    var p2_index = 0;

    var p1_opp = {
      name: Session.get('p1_name'),
      id: Session.get('p1_id'),
      games_played: 0,
      games_won: 0,
      games_lost: 0,
      goals_scored: 0,
      goals_allowed: 0,
      fights_total: 0,
      fights_won: 0,
      fights_lost: 0,
      shutouts: 0
    };

    var p2_opp = {
      name: Session.get('p2_name'),
      id: Session.get('p2_id'),
      games_played: 0,
      games_won: 0,
      games_lost: 0,
      goals_scored: 0,
      goals_allowed: 0,
      fights_total: 0,
      fights_won: 0,
      fights_lost: 0,
      shutouts: 0
    };

    //If there are no opponent records for this player, add them
    //Add p2_opp to p1
    // if(p1data.opponents == undefined){
    //   console.log('not found');
    //   p2_exists = true;
    //   Players.update({_id:Session.get('p1_id')}, {$addToSet: {'opponents':p2_opp}});
    // } else {
    //     // iterate each p1.opponent looking for the right index
    //     for(var i = 0; i<p1data.opponents.length; i++){
    //       if(p1data.opponents[i].id == Session.get('p2_id')){
    //         p2_exists = true;
    //         p2_index = i;
    //       } 
    //     }
    // }

    // //Add p1_opp to p2 
    // if(p2data.opponents == undefined){
    //   console.log('not found');
    //   p1_exists = true;
    //   Players.update({_id:Session.get('p2_id')}, {$addToSet: {'opponents':p1_opp}});
    // } else {
    //     // iterate each p2.opponent looking for the right index
    //     for(var i = 0; i<p2data.opponents.length; i++){
    //       if(p2data.opponents[i].id == Session.get('p1_id')){
    //         p1_exists = true;
    //         p1_index = i;
    //       } 
    //     }
    // }

    if(p1data.opponents){
      for(var i = 0; i<p1data.opponents.length; i++){
        if(p1data.opponents[i].id == Session.get('p2_id')){
          p2_exists = true;
        } 
      }
    }

    if(p2data.opponents){
      for(var i = 0; i<p2data.opponents.length; i++){
        if(p2data.opponents[i].id == Session.get('p1_id')){
          p1_exists = true;
        } 
      }
    }

    //If the opponents don't exist in each others opponent tables, add them
    if(!p1_exists){
      console.log('Player 1 has never faced Player 2');
      Players.update({_id: Session.get('p2_id')}, {$addToSet: {'opponents': p1_opp}});
    }

    if(!p2_exists){
      console.log('Player 2 has never faced Player 1');
      Players.update({_id: Session.get('p1_id')}, {$addToSet: {'opponents': p2_opp}});
    }

    
    //NOW we can finally increment the Opponent stats 
    var p1_opp_stats = {
      'games_played': 1,
      'games_won' : 0,
      'games_lost' : 0,
      'shutouts' : 0,
      'goals_scored': p1_pts,
      'goals_allowed': p2_pts,
      'fights_total': p1_fights + p2_fights,
      'fights_won': p1_fights,
      'fights_lost': p2_fights,
    };

    var p2_opp_stats = {
      'games_played': 1,
      'games_won' : 0,
      'games_lost' : 0,
      'shutouts' : 0,
      'goals_scored': p2_pts,
      'goals_allowed': p1_pts,
      'fights_total': p1_fights + p2_fights,
      'fights_won': p2_fights,
      'fights_lost': p1_fights,
    };

    if(p1_pts > p2_pts){
      p1_opp_stats['games_lost'] = 0;
      p1_opp_stats['games_won'] = 1;
      p2_opp_stats['games_lost'] = 1;
      p2_opp_stats['games_won'] = 0;
    } else {
      p1_opp_stats['games_lost'] = 1;
      p1_opp_stats['games_won'] = 0;
      p2_opp_stats['games_lost'] = 0;
      p2_opp_stats['games_won'] = 1;
    }

    if(p2_pts == 0){
      p1_opp_stats['shutouts'] = 1;
    } 
    if(p1_pts == 0){
      p2_opp_stats['shutouts'] = 1;
    }


    console.log(p1_opp_stats);
    console.log(p2_opp_stats);


    //Player 1 first
    Meteor.call("incrementOpponent", Session.get('p1_id'), Session.get('p2_id'), p1_opp_stats, p2_opp_stats, function(error, affectedDocs) {
      if (error) {
        console.log(error.message);
      } else {
        console.log('opp stats added');
      }
    });


    //Update Player 1's other stats
    Players.update(Session.get('p1_id'), 
      {$inc: {
        'games_played' : 1,
        '1p_goals' : reg_goals[0].p1_score,
        '2p_goals' : reg_goals[1].p1_score,
        '3p_goals' : reg_goals[2].p1_score,
        'p1_games' : 1,
        'goals_scored' : p1_pts, 
        'goals_allowed' : p2_pts,
        'fights_won' : p1_fights,
        'fights_lost' : p2_fights,
        'gos' : p1_gos,
        'shutouts' : 0
    }});

    //Update Player 2
    Players.update(Session.get('p2_id'), 
      {$inc: {
        'games_played' : 1,
        '1p_goals' : reg_goals[0].p2_score,
        '2p_goals' : reg_goals[1].p2_score,
        '3p_goals' : reg_goals[2].p2_score,
        'p2_games' : 1,
        'goals_scored' : p2_pts, 
        'goals_allowed' : p1_pts,
        'fights_won' : p2_fights,
        'fights_lost' : p1_fights,
        'gos' : p1_gos,
        'shutouts' : 0
    }});

    //Check for shutouts
    if (p2_pts == 0){
      Players.update(Session.get('p1_id'), {$inc: {'shutouts': 1}});
    }

    if (p1_pts == 0){
      Players.update(Session.get('p2_id'), {$inc: {'shutouts': 1}});
    }

    //Update Game winners
    if(game_winner == Session.get('p1_id')){
      Players.update(Session.get('p1_id'), {$inc: { games_won : 1, p1_wins : 1 }});
      Players.update(Session.get('p2_id'), {$inc: { games_lost : 1, p2_losses : 1 }});
    } else {
      Players.update(Session.get('p2_id'), {$inc: { games_won : 1, p2_wins : 1 }});
      Players.update(Session.get('p1_id'), {$inc: { games_lost : 1, p1_losses : 1 }});
    }

    //Update player streak records
    updatePlayerStreak(Session.get('p1_id'));
    updatePlayerStreak(Session.get('p2_id'));
  }
});


}//isClient