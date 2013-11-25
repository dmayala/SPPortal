define(['backbone', 'hbs!templates/addProject', 'models/Project', 'models/Request'], function(Backbone, AddProjTemp, Project, Request) {
    var AddProjectView = Backbone.View.extend({

    template: AddProjTemp,

    initialize: function () {
        this.render();
        var originalSerializeArray = $.fn.serializeArray;
        $.fn.extend({
            serializeArray: function () {
                var brokenSerialization = originalSerializeArray.apply(this);
                var checkboxValues = $(this).find('input[type=checkbox]').map(function () {
                    return { 'name': this.name, 'value': this.checked };
                }).get();
                var checkboxKeys = $.map(checkboxValues, function (element) { return element.name; });
                var withoutCheckboxes = $.grep(brokenSerialization, function (element) {
                    return $.inArray(element.name, checkboxKeys) == -1;
                });

                return $.merge(withoutCheckboxes, checkboxValues);
            }
        });
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
      window.checked = {};
      checked['choices'] = "";
      dataArray.forEach(function (data) {
          if (data.value) {
              checked['choices'] += "1";
          } else {
              checked['choices'] += "0";
          }
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