
// Set up collections for 
Players = new Meteor.Collection("players");
Games = new Meteor.Collection("games");


if (Meteor.isClient) {

  Template.hello.greeting = function () {
    return "Welcome to blades.";
  };

  Template.hello.greeting = function () {
    return "Welcome to blades.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        alert("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
