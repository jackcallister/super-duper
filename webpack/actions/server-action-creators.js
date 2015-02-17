var AppDispatcher = require('../dispatcher/app');
var ActionTypes = require('../constants/app').ActionTypes;

module.exports = {
  receiveMeals: function(meals) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MEALS,
      meals: meals
    });
  },

  receiveMeal: function(meal) {
    AppDispatcher.handleServerAction({
      type: ActionTypes.RECEIVE_MEAL,
      meal: meal
    });
  }
}
