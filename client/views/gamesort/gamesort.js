if(Meteor.isClient) {

  Template.gamesort.rendered = function() {

    var games_total = Session.get('games_total') || 0;

    Session.set('games_start_max', games_total - 1);
    Session.set('games_end_min', 1);
    Session.set('games_start', 1);
    Session.set('games_end', games_total);
  }

  Template.gamesort.helpers({
    games_start_max : function() {
      return parseInt(Session.get('games_end'));
    },
    games_end_max: function() {
      return Session.get('games_total');
    },
    games_end_min: function() {
      return parseInt(Session.get('games_start'));
    },
    disable_controls: function() {
      if(Session.get('games_total') === 0) {
        return 'disabled';
      }

      return '';
    }
  });

  function changeGamesStart() {

    var games_start = $('#games-start').val();
    if(games_start <= Session.get('games_start_max') && games_start >= 1) {
      Session.set('games_start', games_start);
      Session.set('games_end_min', games_start + 1);
    } else {
      $('#games-start').val(1);
    }
  }

  function changeGamesEnd() {

    var games_end = $('#games-end').val();

    if(games_end <= Session.get('games_total') && games_end >= Session.get('games_end_min')) {
      Session.set('games_end', games_end);
      Session.set('games_start_max', games_end - 1);
    }
    else {
      $('#games-end').val(Session.get('games_total'))
    }

  }

  Template.gamesort.events({
    'click input#games-start' : changeGamesStart,

    'keyup input#games-start' : changeGamesStart,

    'blur input#games-start':changeGamesStart,

    'click input#games-end' : changeGamesEnd,

    'keyup input#games-end' : changeGamesEnd,

    'blur input#games-end':changeGamesEnd,

    'click #game_no_asc' : function() {
      Session.set('sort_by', 1);
      $('#game_no_asc').toggleClass('inactive');
      $('#game_no_desc').toggleClass('inactive');
    },
    'click #game_no_desc' : function() {
      Session.set('sort_by', -1);
      $('#game_no_desc').toggleClass('inactive');
      $('#game_no_asc').toggleClass('inactive');
    },
  });
}

