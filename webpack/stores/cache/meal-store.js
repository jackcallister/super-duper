var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../../constants/app').ActionTypes;
var AppDispatcher = require('../../dispatcher/app');

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

    case ActionTypes.CREATE_MEAL:
      action.meal.cacheId = action.cacheId;
      _meals.push(action.meal);
      MealStore.emitChange();
      break;

    case ActionTypes.CREATE_MEAL_COMPLETE:
      for (var i = _meals.length - 1; i >= 0; i--) {
        if (_meals[i].cacheId == action.cacheId) {
          _meals.splice(i, 1);
        };
      };
      MealStore.emitChange();
      break;

    default:
  }
});

module.exports = MealStore;
