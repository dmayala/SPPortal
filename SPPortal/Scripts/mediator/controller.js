define(['backbone', 'collections/projects', 'views/homeView', 'views/projectView', 'views/signupView', 'views/accountView', 'views/rightControlsView', 'models/token'], function (Backbone, Projects, HomeView, ProjectView, SignupView, AccountView, RightControlsView, Token) {

  var Controller = function() {
    this.collection = new Projects();
    this.token = new Token();
  };

  _.extend(Controller.prototype, {
    start: function() {
        this.showLoginHeader(this.token);
    },

    showView: function (view) {
      this.token.fetch();

      if (this.currentView){
        this.currentView.close();
      }

      this.currentView = view;
      this.currentView.render();

      $("#main").html(this.currentView.el);
    },

    showLoginHeader: function (token) {
      new RightControlsView({model: token});
    },

    showHome: function () {
        var collection = new Projects();
        this.showView(new HomeView({ collection: collection }));
        collection.fetch();
    },

    showSignup: function () {
      this.showView(new SignupView());
    },

    showAccount: function () {
      this.showView(new AccountView());
    }

  });

  return Controller;
});