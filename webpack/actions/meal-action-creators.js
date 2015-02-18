var AppDispatcher = require('../dispatcher/app');
var ActionTypes = require('../constants/app').ActionTypes;
var WebUtils = require('../utils/web-utils');
var MealUtils = require('../utils/meal-utils');

module.exports = {
  createMeal: function(meal) {
    var cacheId = MealUtils.generateCacheId();

    AppDispatcher.handleViewAction({
      type: ActionTypes.CREATE_MEAL,
      meal: meal,
      cacheId: cacheId
    });

    WebUtils.createMeal(meal, cacheId);
  }
}
