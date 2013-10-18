define(['backbone'], function(Backbone) {
  var Token = Backbone.Model.extend({
    urlRoot: '/api/Token'
  });
  return Token;
});
