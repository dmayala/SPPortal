define(['backbone'], function(Backbone) {
  var AppRouter = Backbone.Router.extend({
    routes: {
        ""                  : "list",
        "page/:page"        : "list",
        "products/:id"      : "prodDetails",
        "cart/"             : "showCart",
    },

    list: function(page) {
      this.controller.showList(page);
    },

    prodDetails: function(id) {
      this.controller.showProdDetails(id);
    },

    showCart: function() {
      this.controller.showCart();
    }
  });

  return AppRouter;
});