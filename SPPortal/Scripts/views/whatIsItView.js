define(['backbone', 'hbs!templates/whatIsIt'], function(Backbone, WhatIsItTpl) {
  var WhatIsItView = Backbone.View.extend({

    template: WhatIsItTpl,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });

  return WhatIsItView;
});