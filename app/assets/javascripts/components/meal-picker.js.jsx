var MealPicker = React.createClass({

  didToggleMeal: function(index) {
    this.props.onMealToggle(index);
  },

  render: function() {
    var t = this,
        mealButtons = [];

    this.props.meals.forEach(function(meal, index) {
      mealButtons.push(<MealButton onToggle={t.didToggleMeal.bind(t, index)} name={meal.name} key={index} />)
    });

    return (
      <div>
        <h1>Meal Picker</h1>
        {mealButtons}
      </div>
    );
  }
});
