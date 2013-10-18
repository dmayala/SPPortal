define(['backbone', 'hbs!templates/showcaseItemView'], function(Backbone, showcaseItemView){
  var ProjectItemView = Backbone.View.extend({
    template: showcaseItemView,

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return ProjectItemView;
});