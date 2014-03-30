if (Meteor.isClient) {
  Template.navigation.events({
  	'click .nav-trigger' : function(){
  		alert('something');
  	},
  	'click .logout' : function(){
  		Meteor.logout();
  	}
  })
}