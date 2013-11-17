define(['backbone', 'hbs!templates/aboutUs'], function(Backbone, AboutTpl) {
  var AboutView = Backbone.View.extend({

    template: AboutTpl,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return AboutView;
});