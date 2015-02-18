var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/app').ActionTypes;
var AppDispatcher = require('../dispatcher/app');

var _meals = [];

var MealStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  getAll: function() {
    return _meals;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {
    case ActionTypes.RECEIVE_MEALS:
      _meals = action.meals;
      MealStore.emitChange();
      break;

    case ActionTypes.CREATE_MEAL_COMPLETE:
      _meals.push(action.meal);
      MealStore.emitChange();
      break;

    case ActionTypes.CREATE_MEAL_ERROR:
      // Handle errors!
      break;

    default:
  }
});

module.exports = MealStore;
