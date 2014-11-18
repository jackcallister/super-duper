var MealPicker = React.createClass({

  didSelectMeal: function(index) {
    this.props.onMealSelect(index);
  },

  toggleModal: function() {
    var event = new CustomEvent('toggleModal');
    document.dispatchEvent(event);
  },

  render: function() {
    var t = this,
        mealButtons = [];

    this.props.meals.forEach(function(meal, index) {
      mealButtons.push(<MealButton onSelect={t.didSelectMeal.bind(t, index)} name={meal.name} key={index} />)
    });

    return (
      <div>
        <h1>Meal Picker</h1>
        {mealButtons}
        <button onClick={this.toggleModal}>Add</button>
      </div>
    );
  }
});
