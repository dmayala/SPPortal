define(['backbone', 'hbs!templates/addProject'], function(Backbone, AddProjTemp) {
    var AddProjectView = Backbone.View.extend({

    template: AddProjTemp,

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    }
  });

  return AddProjectView;
});