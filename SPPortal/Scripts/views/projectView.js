define(['backbone', 'views/projectItemView'], function(Backbone, ProjectItemView) {
  var ProjectView = Backbone.View.extend({

    initialize: function () {
        this.childViews = [];
        this.listenTo(this.collection, 'sync', this.render);
    },

    close: function () {
        _.each(this.childViews, function (childView) {
            childView.remove();
        });
        this.childViews.length = 0;
        this.remove();
    },

    addChildView: function (view, options) {
        var child = new view(options);
        this.$el.append(child.render().el);
        this.childViews.push(child);
    },

    render: function () {
        this.collection.each(this.addOne, this);
        return this;
    },

    addOne: function (model) {
        this.addChildView(ProjectItemView, { model: model })
    }
  });

  return ProjectView;
});