define(['backbone'], function(Backbone) {
  var Project = Backbone.Model.extend({
    urlRoot: '/api/Project'
  });
  return Project;
});
