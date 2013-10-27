define(['backbone', 'hbs!templates/addProject'], function(Backbone, AddProjTemp) {
    var AddProjectView = Backbone.View.extend({

    template: AddProjTemp,

    initialize: function () {
        this.render();
    },

    events: {
      'click .active': function (e) {
        $(e.target).blur();
      },

      'submit': 'submitForm'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    submitForm: function (e) {
      e.preventDefault();
      var target = $(e.target);
      console.log(target.serialize());
    }
  });

  return AddProjectView;
});