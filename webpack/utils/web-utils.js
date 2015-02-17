var ServerActionCreators = require('../actions/server-action-creators');
var Endpoints = require('../constants/api').Endpoints;
var request = require('superagent');

module.exports = {

  init: function() {
    request.get(Endpoints.MEALS_INDEX, function(res) {
      json = JSON.parse(res.text);
      ServerActionCreators.receiveMeals(json);
    })
  }
};
