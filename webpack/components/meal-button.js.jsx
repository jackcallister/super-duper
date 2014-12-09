var React = require('react/addons');

var MealButton = React.createClass({

  render: function() {
    return (
      <div className="meal-button-wrapper" onClick={this.props.onSelect}>
        <div className="meal-button-bar"></div>
        <div className="meal-button">
          <span>{this.props.name}</span>
        </div>
      </div>
    );
  }
});

module.exports = MealButton;
