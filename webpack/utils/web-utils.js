var ServerActionCreators = require('../actions/server-action-creators');
var Endpoints = require('../constants/api').Endpoints;
var request = require('superagent');

module.exports = {

  // Need to handle server errors
  init: function() {
    request.get(Endpoints.MEALS_INDEX, function(res) {
      meals = JSON.parse(res.text);
      ServerActionCreators.receiveMeals(meals);
    })
  },

  // Need to handle server errors
  createMeal: function(meal, cacheId) {
    request.post(Endpoints.MEALS_CREATE)
    .send({meal: meal})
    .end(function(error, res){
      var meal = JSON.parse(res.text).meal;
      ServerActionCreators.createMealComplete(meal, cacheId);
    });
  }
};
