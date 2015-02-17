var keyMirror = require('react/lib/keyMirror');

module.exports = {

  ActionTypes: keyMirror({
    RECEIVE_MEALS: null,
    RECEIVE_MEAL: null,
    SELECT_MEAL: null,
    CREATE_MEAL: null,
    CREATE_MEAL_COMPLETE: null,
    CREATE_MEAL_ERROR: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
}
