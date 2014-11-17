var App = React.createClass({

  didToggleMeal: function(index) {
    var selectedMeal = this.state.meals[index];
    var selectedMeals = this.state.selectedMeals;
    var index = selectedMeals.indexOf(selectedMeal);

    if (index > -1) {
      selectedMeals.splice(index, 1)
    } else {
      selectedMeals.push(selectedMeal);
    }

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
        <MealPicker onMealToggle={this.didToggleMeal} meals={this.state.meals} />
        <ShoppingList meals={this.state.selectedMeals} />
      </section>
    )
  }
});
