var React = require('react/addons');

var MealButton = React.createClass({

  getNextGridItemIds: function() {
    var nextGridItems = $(this.getDOMNode()).nextAll('.grid-item');
    var nextGridItemsIds = [$(this.getDOMNode()).data('reactid')];

    nextGridItems.toArray().forEach(function(gridItem, index){
      nextGridItemsIds.push($(gridItem).data('reactid'));
    });

    return nextGridItemsIds;
  },

  onDelete: function(e) {
    e.stopPropagation();

    var result = confirm('Are you sure?');

    if (result) {
      var nextGridItemIds = this.getNextGridItemIds();

      this.props.onDelete();
      this.props.onReflowGrid(nextGridItemIds);
    }
  },

  getInitialState: function() {
    return {
      nextMealButtonIds: []
    };
  },

  render: function() {
    return (
      <div className="grid-item meal-button" onClick={this.props.onSelect}>
        <div className="meal-button-bar"></div>
        <div className="meal-button-label">
          <span>{this.props.name}</span>
          <i className="icon-delete" onClick={this.onDelete}></i>
        </div>
      </div>
    );
  }
});

module.exports = MealButton;
