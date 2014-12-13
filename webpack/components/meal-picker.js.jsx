var React = require('react/addons'),
    MealButton = require('./meal-button.js.jsx');


var MealPicker = React.createClass({

  shouldReflowGrid: function(index, gridItemIdsToAnimate) {
    this.setGridItemPositionsForAnimation();

    var mealPicker = $(this.getDOMNode());
    var gridItems = gridItemIdsToAnimate.map(function(id) {
      return mealPicker.find('[data-reactid="' + id + '"]');
    });

    gridItems.reverse().forEach(function(gridItem, index){
      if (index == gridItems.length - 1) {
        gridItem.addClass('pop-out-leave-active');
      } else {
        var proceedingItemsPosition = $(gridItems[index + 1]).position();
        gridItem.animate({
          'top': proceedingItemsPosition.top,
          'left': proceedingItemsPosition.left
        }, 300);
      }
    }.bind(this));

    $(":animated").promise().done(function() {
      this.unsetMealButtonPositionsForAnimation();
    }.bind(this));
  },

  didSelectMeal: function(index) {
    this.props.onMealSelect(index);
  },

  didDeleteMeal: function(index) {
    this.props.onMealDelete(index);
  },

  setGridItemPositionsForAnimation: function() {
    var positions = []
    var gridItems = $(this.getDOMNode()).children('.grid-item');

    gridItems.toArray().forEach(function(gridItem, index) {
      var node = $(gridItem);
      var position = node.position();

      positions.push(position);
    });

    gridItems.toArray().forEach(function(gridItem, index) {
      var node = $(gridItem);

      node.css('top', positions[index].top);
      node.css('left', positions[index].left);
      node.css('position', 'absolute');
    });
  },

  unsetMealButtonPositionsForAnimation: function() {
    var gridItems = $(this.getDOMNode()).children('.grid-item');

    gridItems.toArray().forEach(function(gridItem, index) {
      var node = $(gridItem);

      node.css('top', 0);
      node.css('left', 0);
      node.css('position', 'relative');
    });
  },

  toggleModal: function() {
    var event = new CustomEvent('toggleModal');
    document.dispatchEvent(event);
  },

  render: function() {
    var mealButtons = [];

    this.props.meals.forEach(function(meal, index) {
      mealButtons.push(
        <MealButton onSelect={this.didSelectMeal.bind(this, index)}
                    onDelete={this.didDeleteMeal.bind(this, index)}
                    onReflowGrid={this.shouldReflowGrid.bind(this, index)}
                    name={meal.name}
                    category={meal.category}
                    key={meal.id}  />
      )
    }.bind(this));

    return (
      <div className="meal-picker">
        <h1>Meal Picker</h1>
        {mealButtons}
        <div className="grid-item">
          <button onClick={this.toggleModal}>Add</button>
        </div>
      </div>
    );
  }
});

module.exports = MealPicker;
