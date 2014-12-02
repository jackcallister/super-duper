var React = require('react/addons'),
    MealPicker = require('./meal-picker.js.jsx'),
    ShoppingList = require('./shopping-list.js.jsx'),
    MealForm = require('./meal-form.js.jsx');

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

  fetchMeals: function() {
    $.get("/api/meals", function(data) {
      this.setState({
        meals: data
      });
    }.bind(this));
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
