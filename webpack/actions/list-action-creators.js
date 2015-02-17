var AppDispatcher = require('../dispatcher/app');
var ActionTypes = require('../constants/app').ActionTypes;

module.exports = {
  selectMeal: function(meal) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.SELECT_MEAL,
      meal: meal
    });
  }
}