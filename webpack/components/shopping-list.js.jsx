var React = require('react/addons'),
    MealRow = require('./meal-row.js.jsx');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var ShoppingList = React.createClass({

  didRemoveMeal: function(index) {
    this.props.onMealRemove(index);
  },

  render: function() {
    var meals = [];

    this.props.meals.forEach(function(meal, index) {
      meals.push(<MealRow key={index} meal={meal} onRemove={this.didRemoveMeal.bind(this, index)}/>)
    }.bind(this));

    return (
      <div>
        <h1>Shopping List</h1>
        <ReactCSSTransitionGroup transitionLeave={false} transitionName="pop">
          {meals}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = ShoppingList;
