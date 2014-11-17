var MealButton = React.createClass({

  render: function() {
    return (
      <button onClick={this.props.onToggle}>{this.props.name}</button>
    );
  }
});
