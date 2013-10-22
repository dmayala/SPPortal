define(['backbone', 'collections/projects', 'views/homeView', 'views/projectView', 'views/signupView', 'views/accountView', 'views/rightControlsView', 'models/token', 'views/projectsView'], function (Backbone, Projects, HomeView, ProjectView, SignupView, AccountView, RightControlsView, Token, ProjectsView) {

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

      $("#main").hide().html(this.currentView.el).fadeIn(1000);
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
    },

    showProjects: function () {
        this.showView(new ProjectsView());
    }

  });

  return Controller;
});