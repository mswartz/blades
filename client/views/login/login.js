if (Meteor.isClient) {

  Template.login.events({
    'submit #login-form': function(e, t) {
      e.preventDefault();

      var email = t.find('#login-email').value,
        password = t.find('#login-password').value;

      email = $.trim(email);
      password = $.trim(password);

      // needs validation...

      // If validation passes, supply the appropriate fields to the
      // Meteor.loginWithPassword() function.
      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          // The user might not have been found, or their password
          // could be incorrect. The login attempt has failed.
          console.log('login error', err);
        } else {
          // The user has been logged in.
          console.log('login successful');
          Session.set('logged_in', true);
        }
      });
      return false;
    },
    'click .close': function() {
      $('.account-form').hide();
    }
  });

  Template.login.events({
    'submit #register-form': function(e, t) {
      e.preventDefault();
      var email = t.find('#account-email').value,
        password = t.find('#account-password').value,
        username = t.find('#account-name').value,
        key = t.find('#account-key').value;

      // Trim and validate the input
      Meteor.call('checkKey', key, function(err, result) {
        if (result) {
          Accounts.createUser({ username: username, email: email, password: password }, function(err) {
            if (err) {
              // Inform the user that account creation failed
              console.log('fail', err);
            } else {
              // Success. Account has been created and the user
              // has logged in successfully.
              Session.set('logged_in', true);
              console.log('user created');
              displayChange();
            }

          });
        } else {
          console.log('keycheck failed', result);
        }

      })

      return false;
    },
    'click .close': function() {
      $('.account-form').hide();
    }
  });
}