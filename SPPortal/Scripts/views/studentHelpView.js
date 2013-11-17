define(['backbone', 'hbs!templates/studenthelp'], function(Backbone, StudentHelpTpl) {
  var StudentHelpView = Backbone.View.extend({

    template: StudentHelpTpl,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return StudentHelpView;
});