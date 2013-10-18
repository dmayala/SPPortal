define(['backbone', 'hbs!templates/home', 'views/projectView'], function(Backbone, Home, ProjectView) {
    var HomeView = Backbone.View.extend({

    template: Home,

    initialize: function () {
      this.childViews = [];
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
        this.$el.find('#showcase').append(child.render().el);
        this.childViews.push(child);
    },

    addOne: function (model) {
        this.addChildView(ProjectView, { model: model });
    },

    render: function () {
      this.$el.html(this.template());
      this.addChildView(ProjectView, { collection: this.collection });
      return this;
    }
  });

  return HomeView;
});