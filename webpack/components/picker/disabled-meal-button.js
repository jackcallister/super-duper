var React = require('react');

var intervalId;

var DisabledMealButton = React.createClass({

  _updateEllipsis: function() {
    return setInterval(function(){
      var ellipsis = this.state.ellipsis;

      if (ellipsis != '...') {
        this.setState({
          ellipsis: ellipsis + '.'
        });
      } else {
        this.setState({
          ellipsis: ''
        });
      };
    }.bind(this), 500);
  },

  getInitialState: function() {
    return {
      ellipsis: ''
    };
  },

  componentDidMount: function() {
    intervalId = this._updateEllipsis();
  },

  componentWillUnmount: function() {
    clearInterval(intervalId);
  },

  render: function() {
    return (
      <div className='grid-item meal-button meal-button-disabled'>
        <div className={'meal-button-bar ' + this.props.meal.category}></div>
        <div className='meal-button-label'>
          <span className='name'>Saving {this.state.ellipsis}</span>
        </div>
      </div>
    );
  }

});

module.exports = DisabledMealButton;
