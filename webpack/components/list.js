var React = require('react'),
    ListStore = require('../stores/list-store'),
    MealRow = require('./list/meal-row'),
    ShareRow = require('./list/share-row');

function getStateFromStores() {
  return {
    meals: ListStore.getAll()
  }
}

var ShoppingList = React.createClass({

  _renderMealRows: function() {
    return this.state.meals.map(function(meal) {
      return <MealRow key={'meal-row-' + meal.id} meal={meal} />;
    });
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  componentDidMount: function() {
    ListStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return getStateFromStores();
  },

  render: function() {
    var mealRows = this._renderMealRows();

    return (
      <div className='shopping-list'>
        {mealRows}
        <ShareRow />
      </div>
    );
  }
});

module.exports = ShoppingList;
