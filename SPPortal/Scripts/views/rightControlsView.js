define(['backbone', 'hbs!templates/loggedoff', 'hbs!templates/loggedin'], function(Backbone, LoggedIn, LoggedOff) {
  var RightControlsView = Backbone.View.extend({

    initialize: function() {
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.model, 'change', this.render);
    },

    events: {
      'submit': 'loginSubmit',
      'click #signoff': 'signOff'
    },

    signOff: function(e) {
      e.preventDefault();
      var self = this;
      $.post($(e.target).attr('href'), function (data, textStatus) {
          self.goTo('signoff');
      }, 'json');
    },

    loginSubmit: function(e) {
      e.preventDefault();
      var self = this;
      var target = $(e.target);
      $.post(target.attr('action'), target.serialize(), function (data, textStatus) {
        if (!data.errors) {
          self.goTo('account');
        } else {
          alert(data.errors);
        }
      }, 'json');
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