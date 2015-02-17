var ServerActionCreators = require('../actions/server-action-creators');
var Endpoints = require('../constants/api').Endpoints;
var request = require('superagent');

module.exports = {

  // Need to handle server errors
  init: function() {
    request.get(Endpoints.MEALS_INDEX, function(res) {
      json = JSON.parse(res.text);
      ServerActionCreators.receiveMeals(json);
    })
  },

  // Need to handle server errors
  createMeal: function(data) {
    request.post(Endpoints.MEALS_CREATE)
    .send({meal: data})
    .end(function(error, res){
      var json = JSON.parse(res.text).meal;
      ServerActionCreators.createMealComplete(json);
    });
  }
};
