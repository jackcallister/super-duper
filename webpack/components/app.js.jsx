var React = require('react/addons'),
    MealPicker = require('./meal-picker.js.jsx'),
    ShoppingList = require('./shopping-list.js.jsx'),
    MealForm = require('./meal-form.js.jsx'),
    Meal = require('../factories/meal.js');

var App = React.createClass({

  didCreateMeal: function(data) {
    this.setState({
      meals: this.state.meals.concat(data.meal)
    });
  },

  didRemoveMeal: function(index) {
    var selectedMeal = this.state.selectedMeals[index];
    var selectedMeals = this.state.selectedMeals;

    selectedMeals.splice(selectedMeals.indexOf(selectedMeal), 1);

    this.setState({
      selectedMeals: selectedMeals
    });
  },

  didSelectMeal: function(index) {
    this.setState({
      selectedMeals: this.state.selectedMeals.concat(this.state.meals[index])
    });
  },

  getInitialState: function() {
    return {
      meals: [],
      selectedMeals: []
    };
  },

  componentDidMount: function() {
    Meal.all(function(meals) {
      this.setState({
        meals: meals
      });
    }.bind(this));
  },

  render: function() {
    return (
      <section className="app">
        <MealPicker onMealSelect={this.didSelectMeal} meals={this.state.meals} />
        <ShoppingList onMealRemove={this.didRemoveMeal} meals={this.state.selectedMeals} />
        <MealForm onCreateMeal={this.didCreateMeal} />
      </section>
    )
  }
});

module.exports = App;
