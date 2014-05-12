define(['backbone', 'hbs!templates/admin', 'views/projectDetailsView', 'models/project'], function (Backbone, AdminTpl, ProjectDetailsView, Project) {
  var AdminView = Backbone.View.extend({

    template: AdminTpl,

    initialize: function() {
        this.listenTo(this.collection, 'sync', this.render);
    },

    events: {
        'click #adminlist a': function (e) {
            e.preventDefault();
            var project = this.collection.get($(e.target).attr('href'));
            var projView = new ProjectDetailsView({ model: project });
            $('#adminPanel').html(projView.el);
        },

        'click #pendingbtn': function (e) {
            e.preventDefault();
            this.collection.fetch({ data: $.param({ pending: true }) });
        },

        'click #completedbtn': function (e) {
            e.preventDefault();
            this.collection.fetch({ data: $.param({ completed: true }) });
        },

        'click #approvedbtn': function (e) {
            e.preventDefault();
            this.collection.fetch({ data: $.param({ approved: true }) });
        },

        'click #featuredbtn': function (e) {
            e.preventDefault();
            this.collection.fetch({ data: $.param({ showcase: true }) });
        },

    },

    render: function() {
        this.$el.html(this.template({ projects: this.collection.toJSON() }));
      return this;
    }
  });

  return AdminView;
});