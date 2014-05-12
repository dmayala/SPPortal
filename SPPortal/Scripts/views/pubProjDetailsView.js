define(['backbone', 'hbs!templates/pubProjDetails'], function (Backbone, ProjDetailsTpl) {
  var ProjectDetailsView = Backbone.View.extend({

    template: ProjDetailsTpl,

    initialize: function() {
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
        'click #delbtn': function () {
            if (confirm('Are you sure you want to delete this project?')) {
                this.model.destroy();
            }
        },

        'click #updbtn': function (e) {
             e.preventDefault();
             var dataArray = $(e.target).parents('form:first').serializeArray();
             var leJSON = {};
             dataArray.forEach(function (data) {
                 leJSON[data.name] = data.value;
             });
             this.model.save(leJSON);
         }
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });

  return ProjectDetailsView;
});