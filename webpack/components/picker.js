var React = require('react/addons'),
    MealStore = require('../stores/meal-store'),
    MealButton = require('./picker/meal-button');

function getStateFromStores() {
  return {
    meals: MealStore.getAll()
  }
}

var MealPicker = React.createClass({

  _renderMealButtons: function() {
    return this.state.meals.map(function(meal) {
      return <MealButton meal={meal} key={'meal-button-' + meal.id} />;
    });
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  componentDidMount: function() {
    MealStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MealStore.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  render: function() {
    var mealButtons = this._renderMealButtons();

    return (
      <div className='meal-picker'>
        {mealButtons}
        <div className='grid-item'>
          <button>Add Meal</button>
        </div>
      </div>
    );
  }
});

module.exports = MealPicker;
