define(['backbone'], function (Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
          ""                  : "home",
          "signoff"           : "home",
          "account"           : "account",
          "account/projects/:id": "list",
            "adminPanel": "adminPanel",
          "*view"             : "view"
        },

        home: function () {
          this.controller.showHome();
        },

        account: function() {
          this.controller.showAccount();
        },

        adminPanel: function () {
            this.controller.showAdmin();
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