var React = require('react/addons'),
    MealPicker = require('./meal-picker.js.jsx'),
    ShoppingList = require('./shopping-list.js.jsx'),
    MealForm = require('./meal-form.js.jsx');

var App = React.createClass({

  didCreateMeal: function(data) {
    var meals = this.state.meals;
    meals.push(data.meal);

    this.setState({
      meals: meals
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
    var selectedMeal = this.state.meals[index];
    var selectedMeals = this.state.selectedMeals;

    selectedMeals.push(selectedMeal);

    this.setState({
      selectedMeals: selectedMeals
    });
  },

  fetchMeals: function() {
    var t = this;

    $.get("/api/meals", function(data) {
      t.setState({
        meals: data
      });
    });
  },

  getInitialState: function() {
    return {
      meals: [],
      selectedMeals: []
    };
  },

  componentDidMount: function() {
    this.fetchMeals();
  },

  render: function() {
    return (
      <section>
        <MealPicker onMealSelect={this.didSelectMeal} meals={this.state.meals} />
        <ShoppingList onMealRemove={this.didRemoveMeal} meals={this.state.selectedMeals} />
        <MealForm onCreateMeal={this.didCreateMeal} />
      </section>
    )
  }
});

module.exports = App;