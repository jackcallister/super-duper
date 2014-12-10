var React = require('react/addons');

var MealButton = React.createClass({

  onDelete: function(e) {
    e.stopPropagation();
    var result = confirm('Are you sure?');
    
    if (result) {
      this.props.onDelete();  
    }
  },

  render: function() {
    return (
      <div className="meal-button-wrapper" onClick={this.props.onSelect}>
        <div className="meal-button-bar"></div>
        <div className="meal-button">
          <span>{this.props.name}</span>
          <i className="icon-delete" onClick={this.onDelete}></i>
        </div>
      </div>
    );
  }
});

module.exports = MealButton;
