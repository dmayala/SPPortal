define(['backbone', 'hbs!templates/account'], function(Backbone, Account) {
  var AccountView = Backbone.View.extend({

    template: Account,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return AccountView;
});