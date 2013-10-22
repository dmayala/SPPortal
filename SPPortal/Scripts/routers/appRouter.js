//define(['backbone', 'collections/projects', 'views/homeView', 'views/projectView', 'views/signupView', 'views/accountView', 'views/rightControlsView', 'models/token'], function(Backbone, Projects, HomeView, ProjectView, SignupView, AccountView, RightControlsView, Token) {
//  var AppRouter = Backbone.Router.extend({
//    routes: {
//        ""                  : "home",
//        "signoff"           : "home",
//        "signup"            : "signup",
//        "account"           : "account"
//    },

//    home: function () {
//      this.controller.showHome(page);
//      /*var collection = new Projects();
//      new ProjectView({collection: collection});
//      collection.fetch();*/
//      new HomeView();
//      var token = new Token();
//      new RightControlsView({model: token});
//      token.fetch();
//      var collection = new Projects();
//      new ProjectView({collection: collection});
//      collection.fetch();
//    },

//    signup: function() {
//      var token = new Token();
//      new RightControlsView({model: token});
//      token.fetch();
//      new SignupView();
//    },

//    account: function() {
//      var token = new Token();
//      new RightControlsView({model: token});
//      token.fetch();
//      new AccountView();
//    }
//  });

//  return AppRouter;
//});

define(['backbone'], function (Backbone) {
    var AppRouter = Backbone.Router.extend({
        routes: {
          ""                  : "home",
          "signoff"           : "home",
          "signup"            : "signup",
          "account"           : "account",
          "projects"          : "projects"
        },

        home: function (page) {
            this.controller.showHome();
        },

        signup: function () {
            this.controller.showSignup();
        },

        account: function () {
            this.controller.showAccount();
        },

        projects: function () {
            this.controller.showProjects();
        }
    });

    return AppRouter;
});