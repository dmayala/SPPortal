define(['backbone', 'hbs!templates/projDetails'], function (Backbone, ProjDetailsTpl) {
  var ProjectDetailsView = Backbone.View.extend({

    template: ProjDetailsTpl,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return ProjectDetailsView;
});