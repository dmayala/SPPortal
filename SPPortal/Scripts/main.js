require.config({
  paths: {
    hbs: "vendor/require-handlebars-plugin/hbs",
    Handlebars: "vendor/require-handlebars-plugin/Handlebars",
    jQuery: 'vendor/jquery/jquery.min',
    bootstrap: 'vendor/bootstrap/dist/js/bootstrap',
    underscore: 'vendor/underscore-amd/underscore',
    i18nprecompile: "vendor/require-handlebars-plugin/hbs/i18nprecompile",
    json2: "vendor/require-handlebars-plugin/hbs/json2",
    backbone: 'vendor/backbone/backbone'
  },

  shim: {
    backbone: {
        deps: ["underscore", "jQuery"],
        exports: "Backbone"
    },
    bootstrap: ['jQuery']
  },

  hbs: {
    disableI18n: true,
    templateExtension: "html",
    helperDirectory: "templates/helpers/"
  }
});

require(['bootstrap', 'backbone', 'routers/appRouter', 'mediator/controller'], function(_bootstrap, Backbone, AppRouter, Controller){
  Backbone.View.prototype.goTo = function (loc) {
    app.navigate(loc, true);
  };

  Backbone.View.prototype.close = function () {
      this.remove();
      this.unbind();
  }

  var controller = new Controller();
  var app = new AppRouter();
  app.controller = controller;
  controller.start();
  Backbone.history.start();
});