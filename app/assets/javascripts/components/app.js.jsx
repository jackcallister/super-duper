var App = React.createClass({

  didToggleMeal: function(index) {
    // Make this actually toggle not just PUSH
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
        <MealPicker onMealToggle={this.didToggleMeal} meals={this.state.meals} />
        <ShoppingList meals={this.state.selectedMeals} />
      </section>
    )
  }
});
