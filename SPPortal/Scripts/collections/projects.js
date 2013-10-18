define(['backbone', 'models/project'], function(Backbone, Project) {
  var Projects = Backbone.Collection.extend({
    model: Project,
    url: '/api/Project'
  });
  return Projects;
});