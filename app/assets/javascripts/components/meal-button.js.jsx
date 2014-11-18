var MealButton = React.createClass({

  render: function() {
    return (
      <button onClick={this.props.onSelect}>{this.props.name}</button>
    );
  }
});
