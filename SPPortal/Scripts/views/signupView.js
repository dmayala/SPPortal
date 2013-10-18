define(['backbone', 'hbs!templates/signup'], function(Backbone, Signup) {
  var SignupView = Backbone.View.extend({

    template: Signup,

    initialize: function() {
      this.render();
    },

    events: {
      'submit .form-signin': 'registerPost'
    },

    registerPost: function(e) {
      e.preventDefault();
      $.ajax({
          context: this, 
          type: 'POST',
          url: 'Account/JsonRegister',
          data: { UserName: $('.form-signin [name="username"]').val(), 
                  Password: $('.form-signin [name="password"]').val(),
                  ConfirmPassword: $('.form-signin [name="confirmpassword"]').val()
          },
          success: function(response) {
            this.goTo('account');
          }
      });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return SignupView;
});