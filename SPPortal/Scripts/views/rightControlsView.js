define(['backbone', 'hbs!templates/loggedoff', 'hbs!templates/loggedin'], function(Backbone, LoggedIn, LoggedOff) {
  var RightControlsView = Backbone.View.extend({

    el: '#right-controls',

    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'change', this.render);
    },

    events: {
      'submit #test': 'loginSubmit',
      'click #signoff': 'signOff'
    },

    signOff: function(e) {
      e.preventDefault();
      $.ajax({
          context: this, 
          type: 'POST',
          url: 'Account/LogOff',
          success: function(response) {
            this.goTo('signoff');
          }
      });
    },

    loginSubmit: function(e) {
      e.preventDefault();
      $.ajax({
          context: this, 
          type: 'POST',
          url: 'Account/JsonLogin',
          data: { username: $('#test [name="username"]').val(), 
                  password: $('#test [name="password"]').val() },
          success: function (response) {
              if (!response.errors) {
                  this.goTo('account');
              } else {
                  alert(response.errors);
              }
          }
      });
    },

    render: function() {
      if (this.model.attributes.loggedIn) {
        this.template = LoggedIn;
      } else {
        this.template = LoggedOff;
      }

      this.$el.html(this.template());
      return this;
    }
  });

  return RightControlsView;
});