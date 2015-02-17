var React = require('react/addons')
    ListActionCreators = require('../../actions/list-action-creators');

var MealButton = React.createClass({

  _onSelect: function() {
    ListActionCreators.selectMeal(this.props.meal);
  },

  render: function() {
    return (
      <div className='grid-item meal-button' onClick={this._onSelect}>
        <div className={'meal-button-bar ' + this.props.meal.category}></div>
        <div className='meal-button-label'>
          <span className='name'>{this.props.meal.name}</span>
        </div>
      </div>
    );
  }
});

module.exports = MealButton;
