define(['backbone', 'collections/projects', 'views/homeView', 'views/projectView', 'views/signupView', 'views/accountView', 'views/rightControlsView', 'models/token', 'views/projectsView', 'views/addProjectView', 'views/aboutView', 'views/contactView', 'views/studentHelpView', 'views/whatIsItView'], function (Backbone, Projects, HomeView, ProjectView, SignupView, AccountView, RightControlsView, Token, ProjectsView, AddProjectView, AboutView, ContactView, StudentHelpView, WhatIsItView) {

  var Controller = function() {
    this.views = { 'account': AccountView, 'signup': SignupView, 'projects': ProjectsView, 'addProject': AddProjectView, 'about': AboutView, 'contact': ContactView, 'studenthelp': StudentHelpView, 'whatisit': WhatIsItView };
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

      $('#main').hide().html(this.currentView.el).fadeIn(1000);
    },

    showLoginHeader: function (token) {
      new RightControlsView({el: '#right-controls', model: token});
    },

    showHome: function () {
      var collection = new Projects();
      this.showView(new HomeView({ collection: collection }));
      collection.fetch({ data: $.param({ showcase: true }) });
    },

    showWildcardView: function (viewName) {
      var WildView = this.views[viewName];
      if (WildView) {
        this.showView(new WildView());
      }
    }
  });

  return Controller;
});