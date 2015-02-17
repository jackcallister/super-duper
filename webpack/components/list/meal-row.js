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
      <div className={'meal-row ' + collapsedKlass} onClick={this.handleCollapseToggle}>
        <div className='meal-row-header' >
          <h3>{this.props.meal.name}</h3>
          <div className='actions'>
            <span className={'icon-arrow ' + collapsedKlass} />
            <span onClick={this.props.onRemove} className='icon-delete' />
          </div>
        </div>
        <ul className='accordian'>
          {ingredients}
        </ul>
      </div>
    );
  }
});

module.exports = MealRow;
