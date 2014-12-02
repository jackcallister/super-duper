var React = require('react/addons'),
    MealButton = require('./meal-button.js.jsx');

var MealPicker = React.createClass({

  didSelectMeal: function(index) {
    this.props.onMealSelect(index);
  },

  toggleModal: function() {
    var event = new CustomEvent('toggleModal');
    document.dispatchEvent(event);
  },

  render: function() {
    var mealButtons = [];

    this.props.meals.forEach(function(meal, index) {
      mealButtons.push(<MealButton onSelect={this.didSelectMeal.bind(this, index)} name={meal.name} key={index} />)
    }.bind(this));

    return (
      <div>
        <h1>Meal Picker</h1>
        {mealButtons}
        <button onClick={this.toggleModal}>Add</button>
      </div>
    );
  }
});

module.exports = MealPicker;
