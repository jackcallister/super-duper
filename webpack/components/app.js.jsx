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

  didDeleteMeal: function(index) {
    Meal.destroy(this.state.meals[index].id);
    this.state.meals.splice(index, 1);

    this.setState({
      meals: this.state.meals
    });
  },

  didSelectMeal: function(index) {
    this.setState({
      selectedMeals: this.state.selectedMeals.concat(this.state.meals[index])
    });
  },

  didClickAddButton: function() {
    this.setState({
      displayAddMealForm: true
    });
  },

  didExitForm: function() {
    this.setState({
      displayAddMealForm: false
    });
  },

  getInitialState: function() {
    return {
      meals: [],
      selectedMeals: [],
      displayAddMealForm: false
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
    var mealForm;

    if (this.state.displayAddMealForm) {
      mealForm = <MealForm onMealCreate={this.didCreateMeal} onFormExit={this.didExitForm} />
    }

    return (
      <section className="app">
        <main>
          <MealPicker onMealSelect={this.didSelectMeal}
                      onMealDelete={this.didDeleteMeal}
                      onAddButtonClick={this.didClickAddButton}
                      meals={this.state.meals} />
          <ShoppingList onMealRemove={this.didRemoveMeal} meals={this.state.selectedMeals} />
        </main>
        {mealForm}
      </section>
    )
  }
});

module.exports = App;
