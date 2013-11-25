define(['backbone', 'hbs!templates/account', 'models/Project', 'views/projectDetailsView'], function (Backbone, Account, Project, ProjectDetailsView) {
  var AccountView = Backbone.View.extend({

    template: Account,

    initialize: function() {
        this.listenTo(this.collection, 'sync', this.render);
    },

    events: {
        'click .projects_list a': function (e) {
            e.preventDefault();
            var project = new Project({ id: $(e.target).attr('href') });
            var self = this;
            project.fetch({
                success: function () {
                    var projView = new ProjectDetailsView({ model: project });
                    $('#accountpanel').html(projView.el);
                }
            });
        }
    },

    render: function () {
        this.$el.html(this.template({ username: this.model.attributes.userName, projects: this.collection.toJSON() }));
        //$("#myprojects").empty();
        //this.collection.forEach(function(project) {
        //    $("#myprojects").append(this.template(project.attributes));
        //}, this);
        return this;

        //if (this.collection.length > 0) {
        //    this.$el.html(this.template(this.collection.models[0].attributes));
        //    return this;
        //}
    }
  });

  return AccountView;
});