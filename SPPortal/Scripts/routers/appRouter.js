define(['backbone'], function (Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
          ""                  : "home",
          "signoff"           : "home",
          "account"           : "account",
          "account/projects/:id"      : "list",
          "*view"             : "view"
        },

        home: function () {
          this.controller.showHome();
        },

        account: function() {
          this.controller.showAccount();
        },

        list: function(id) {
          this.controller.listProject(id);
        },

        view: function (view) {
          this.controller.showWildcardView(view);
        }
    });

    return AppRouter;
});