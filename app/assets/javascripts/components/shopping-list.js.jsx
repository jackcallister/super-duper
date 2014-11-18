var ShoppingList = React.createClass({

  didRemoveMeal: function(index) {
    this.props.onMealRemove(index);
  },

  render: function() {
    var t = this,
        meals = [];

    this.props.meals.forEach(function(meal, index) {
      meals.push(<MealRow key={index} meal={meal} onRemove={t.didRemoveMeal.bind(t, index)}/>)
    });

    return (
      <div>
        <h1>Shopping List</h1>
        {meals}
      </div>
    );
  }
});
