var React = require('react/addons');

var MealRow = React.createClass({

  handleCollapseToggle: function() {
    this.setState({
      collapsed: !this.state.collapsed
    })
  },

  getInitialState: function() {
    return {
      collapsed: true
    };
  },

  render: function() {
    var ingredients = [],
        collapsedKlass;

    this.props.meal.ingredients.forEach(function(ingredient, index) {
      ingredients.push(<li key={index}>{ingredient.name}</li>)
    });

    if (this.state.collapsed) {
      collapsedKlass = 'closed';
    } else {
      collapsedKlass = 'open'
    }

    return (
      <div>
        <h3 onClick={this.handleCollapseToggle}>{this.props.meal.name}</h3>
        <ul className={'accordian ' + collapsedKlass}>
          {ingredients}
        </ul>
        <button onClick={this.props.onRemove}>Remove</button>
      </div>
    );
  }
});

module.exports = MealRow;
