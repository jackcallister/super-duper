var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/app').ActionTypes;
var AppDispatcher = require('../dispatcher/app');

var _meals = [];

var LocalMealStore = assign({}, EventEmitter.prototype, {

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
      _meals.push(action.meal);
      LocalMealStore.emitChange();
      break;

    case ActionTypes.CREATE_MEAL_COMPLETE:
      _meals = [];
      LocalMealStore.emitChange();
      break;

    default:
  }
});

module.exports = LocalMealStore;
