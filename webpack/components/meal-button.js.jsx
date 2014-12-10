var React = require('react/addons');

var MealButton = React.createClass({

  onDelete: function(e) {
    e.stopPropagation();
    // var result = confirm('Are you sure?');
    
    // if (result) {
      this.props.onDelete();  
    // }
  },

  // 1. Components load for the first time.
  // 2. An action cause the node to be removed.

  // 1. Element will enter the DOM
  // componentWillEnter: function(callback) {
  //   callback();
  //   console.log('will enter');
  // },

  // // 1. Element is now in the DOM
  // componentDidEnter: function() {
  //   console.log('did enter');
  // },

  // // 2. An action has caused this element to be removed from DOM
  // //    it will now leave.

  // // Here is a chance to animate other nodes.
  // // 
  // // Get the next node and animate it into the position  
  // //
  // componentWillLeave: function(callback) {
  //   console.log('will leave');

  //   $(this.getDOMNode()).next().addClass('moving');

  //   callback();
  // },

  // // 2. The component has now left the DOM
  // componentDidLeave: function(){
  //   console.log('did leave'); 
  // },

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
