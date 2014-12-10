var React = require('react/addons'),
    ReactCSSTransitionGroup = React.addons.CSSTransitionGroup,
    MealButton = require('./meal-button.js.jsx');


var MealPicker = React.createClass({

  didSelectMeal: function(index) {
    this.props.onMealSelect(index);
  },

  didDeleteMeal: function(index) {
    this.props.onMealDelete(index);
  },

  toggleModal: function() {
    var event = new CustomEvent('toggleModal');
    document.dispatchEvent(event);
  },

  render: function() {
    var mealButtons = [];

    this.props.meals.forEach(function(meal, index) {
      mealButtons.push(
        <MealButton onSelect={this.didSelectMeal.bind(this, index)}
                    onDelete={this.didDeleteMeal.bind(this, index)} 
                    name={meal.name} key={meal.id} />
      )
    }.bind(this));

    return (
      <div className="meal-picker">
        <h1>Meal Picker</h1>
        <ReactCSSTransitionGroup transitionName="pop-out" transitionEnter={false}>
          {mealButtons}
        </ReactCSSTransitionGroup>
        <button onClick={this.toggleModal}>Add</button>
      </div>
    );
  }
});

module.exports = MealPicker;
