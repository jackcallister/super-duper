var assign = require('object-assign');
var PayloadSources = require('../constants/app').PayloadSources;
var Dispatcher = require('flux').Dispatcher;

module.exports = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    this.dispatch({
      source: PayloadSources.SERVER_ACTION,
      action: action
    });
  },

  handleViewAction: function(action) {
    this.dispatch({
      source: PayloadSources.VIEW_ACTION,
      action: action
    });
  }
});
