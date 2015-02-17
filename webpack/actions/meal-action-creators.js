var AppDispatcher = require('../dispatcher/app');
var ActionTypes = require('../constants/app').ActionTypes;
var WebUtils = require('../utils/web-utils');

module.exports = {
  createMeal: function(meal) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_MEAL,
      meal: meal
    });

    WebUtils.createMeal(meal);
  }
}