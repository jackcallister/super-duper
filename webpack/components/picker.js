var React = require('react/addons'),
    MealStore = require('../stores/meal-store'),
    LocalMealStore = require('../stores/local-meal-store'),
    MealButton = require('./picker/meal-button');
    DisabledMealButton = require('./picker/disabled-meal-button');

function getStateFromStores() {
  return {
    meals: MealStore.getAll(),
    localMeals: LocalMealStore.getAll()
  }
}

var MealPicker = React.createClass({

  _renderMealButtons: function() {
    return this.state.meals.map(function(meal, index) {
      return <MealButton meal={meal} key={'meal-button-' + index} />;
    });
  },

  _renderSavingMealButtons: function() {
    return this.state.localMeals.map(function(meal, index) {
      return <DisabledMealButton meal={meal} key={'saving-meal-button-' + index} />;
    });
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  componentDidMount: function() {
    MealStore.addChangeListener(this._onChange);
    LocalMealStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MealStore.removeChangeListener(this._onChange);
    LocalMealStore.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  render: function() {
    var mealButtons = this._renderMealButtons();
    var localMealButtons = this._renderSavingMealButtons();

    return (
      <div className='meal-picker'>
        {mealButtons}
        {localMealButtons}
      </div>
    );
  }
});

module.exports = MealPicker;
