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
      var target = $(e.target);
      var self = this;
      $.post(target.attr('action'), target.serialize(), function (data, textStatus) {
        if (!data.errors) {
          self.goTo('account');
        } else {
          alert(data.errors);
        }
      }, 'json');
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return SignupView;
});