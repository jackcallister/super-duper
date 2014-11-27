var React = require('react/addons');

var MealButton = React.createClass({

  render: function() {
    return (
      <button onClick={this.props.onSelect}>{this.props.name}</button>
    );
  }
});

module.exports = MealButton;
