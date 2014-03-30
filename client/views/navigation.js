if (Meteor.isClient) {
  Template.navigation.events({
  	'click .logout': function(){
  		Meteor.logout();
  	}
  })
}