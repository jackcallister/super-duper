var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('../constants/app').ActionTypes;
var AppDispatcher = require('../dispatcher/app');

var _meals = [];

var ListStore = assign({}, EventEmitter.prototype, {

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
    case ActionTypes.SELECT_MEAL:
      _meals.push(action.meal);
      ListStore.emitChange();
      break;

    default:
  }
});

module.exports = ListStore;
