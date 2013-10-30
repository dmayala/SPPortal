define(['backbone', 'hbs!templates/addProject', 'models/Project', 'models/Request'], function(Backbone, AddProjTemp, Project, Request) {
    var AddProjectView = Backbone.View.extend({

    template: AddProjTemp,

    initialize: function () {
        this.render();
    },

    events: {
      'click .active': function (e) {
        $(e.target).blur();
      },

      'submit': 'submitForm'
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    submitForm: function (e) {
      e.preventDefault();
      var self = this;
      var dataArray = $(e.target).serializeArray();
      var project = new Project({ name: dataArray.shift().value, description: dataArray.shift().value });
      var checked = {};
      dataArray.forEach(function (data) {
          checked[data.name] = data.value;
      });
      project.save({}, {
        success: function (model, response) {
          checked['ProjectID'] = response.id;
          var request = new Request(checked);
          request.save(null, { success: function () { self.goTo('account'); } });
        }
      });
    }
  });

  return AddProjectView;
});