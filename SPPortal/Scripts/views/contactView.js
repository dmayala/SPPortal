define(['backbone', 'hbs!templates/contactus'], function(Backbone, ContactTpl) {
  var ContactView = Backbone.View.extend({

    template: ContactTpl,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return ContactView;
});