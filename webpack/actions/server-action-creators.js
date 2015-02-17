var AppDispatcher = require('../dispatcher/app');
var ActionTypes = require('../constants/app').ActionTypes;

module.exports = {
  receiveMeals: function(meals) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MEALS,
      meals: meals
    });
  },

  createMealError: function() {

  },

  createMealComplete: function(meal) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.CREATE_MEAL_COMPLETE,
      meal: meal
    });
  }
}
