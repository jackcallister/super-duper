var ShoppingList = React.createClass({

  render: function() {
    var t = this,
        meals = [];

    this.props.meals.forEach(function(meal, index) {
      meals.push(<MealRow key={index} meal={meal} />)
    });

    return (
      <div>
        <h1>Shopping List</h1>
        {meals}
      </div>
    );
  }
});
