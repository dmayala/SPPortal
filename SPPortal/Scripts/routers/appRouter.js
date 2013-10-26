define(['backbone'], function (Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
          ""                  : "home",
          "signoff"           : "home",
          "*view"             : "view"
        },

        home: function () {
          this.controller.showHome();
        },

        view: function (view) {
          this.controller.showWildcardView(view);
        }
    });

    return AppRouter;
});