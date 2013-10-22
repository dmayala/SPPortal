define(['backbone', 'hbs!templates/projects', 'views/projectItemView', 'models/project'], function(Backbone, ProjectsTemp, ProjectItemView, Project) {
    var ProjectsView = Backbone.View.extend({

    template: ProjectsTemp,

    initialize: function() {
      this.render();
    },

    events: {
      'submit': 'search'
    },

    search: function (e) {
        e.preventDefault();
        var self = this;
        var that = $(e.target);
        $.getJSON(that.attr("action") + '?' + that.serialize().replace(/\+/g, '%20'), function (data) {
          var newData = new Project(data);
          $('#queryresults').html(new ProjectItemView({ model: newData }).render().el);
        }).fail(function () {
          $('#queryresults').empty();
        });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return ProjectsView;
});