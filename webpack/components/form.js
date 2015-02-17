var React = require('react/addons'),
    MealActionCreators = require('../actions/meal-action-creators');

var Form = React.createClass({

  _getFormData: function() {
    return {
      name: this.state.name,
      ingredients_attributes: this.state.ingredients,
      category: this.state.category
    };
  },

  _createMeal: function(e) {
    e.preventDefault();
    var meal = this._getFormData();

    MealActionCreators.createMeal(meal);
  },

  _handleNameInputChange: function(e) {
    this.setState({
      name: e.target.value
    });
  },

  _handleRadioLabelClick: function(category, event) {
    this.setState({
      category: category
    });

    this.refs[category].getDOMNode().checked = true;
  },

  getInitialState: function() {
    return {
      name: null,
      ingredients: [{name: ''}],
      category: 'other',
    };
  },

  _renderNameField: function() {
    return (
      <div className="form-group">
        <input type='text'
               placeholder='Meal name'
               value={this.state.name}
               onChange={this._handleNameInputChange} />
      </div>
    )
  },

  _renderCategoryRadioButtons: function() {
    var categories = ['other', 'poultry', 'seafood', 'meat', 'pasta', 'vegetarian'];

    var radioButtons = categories.map(function(category) {
      var selectedKlass;
      var checked;

      if (category == this.state.category) {
        selectedKlass = 'selected';
        checked = true;
      }

      return (
        <span key={'radio-group-' + category}>
          <label className={'radio-label ' + selectedKlass}
                 htmlFor={category}
                 onClick={this._handleRadioLabelClick.bind(this, category)}/>
          <input type='radio' name='category' value={category} ref={category} />
        </span>
      )
    }.bind(this));

    return (
      <div className="form-group">
        {radioButtons}
      </div>
    );
  },

  render: function() {
    var nameField = this._renderNameField();
    var categoryRadioButons = this._renderCategoryRadioButtons();

    return (
      <div className='meal-form active'>
        <div ref='modal' className='modal'>
          <form ref='form' onSubmit={this._createMeal}>
            {nameField}
            {categoryRadioButons}
            <input type='submit' value='Add Meal' />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Form;






// _handleIngredientInputChange: function(index, event) {
//   this.state.ingredients[index].name = event.target.value;
//   this.forceUpdate();
// },



  // renderIngredientFields: function() {
  //   var fields = this.state.ingredients.map(function(ingredient, index) {
  //     var button,
  //         inputRef = 'ingredientName' + index,
  //         groupRef = 'ingredientField' + index,
  //         key = 'ingredientField' + index,
  //         isLastField = index == this.state.ingredients.length - 1;

  //     if (isLastField) {
  //       button = <i className='icon-plus' onClick={this.addIngredientField} ></i>
  //     } else {
  //       button = <i className='icon-delete' onClick={this.removeIngredientField.bind(this, index)} ></i>
  //     }

  //     return (
  //       <div className="form-group" key={key} ref={groupRef}>
  //         <input type="text" ref={inputRef}
  //                            placeholder="Ingredient"
  //                            value={this.state.ingredients[index].name}
  //                            onChange={this.handleIngredientInputChange.bind(this, index)} />
  //         {button}
  //       </div>
  //     );
  //   }.bind(this));

  //   return fields;
  // },


// shouldReflowGrid: function(index, gridItemIdsToAnimate) {
//     this.setGridItemPositionsForAnimation();

//     var mealPicker = $(this.getDOMNode());
//     var gridItems = gridItemIdsToAnimate.map(function(id) {
//       return mealPicker.find('[data-reactid="' + id + '"]');
//     });

//     gridItems.reverse().forEach(function(gridItem, index){
//       if (index == gridItems.length - 1) {
//         gridItem.addClass('pop-out-leave-active');
//       } else {
//         var proceedingItemsPosition = $(gridItems[index + 1]).position();
//         gridItem.animate({
//           'top': proceedingItemsPosition.top,
//           'left': proceedingItemsPosition.left
//         }, 300);
//       }
//     }.bind(this));

//     $(":animated").promise().done(function() {
//       this.unsetMealButtonPositionsForAnimation();
//     }.bind(this));
//   },

//   setGridItemPositionsForAnimation: function() {
//     var positions = []
//     var gridItems = $(this.getDOMNode()).children('.grid-item');

//     gridItems.toArray().forEach(function(gridItem, index) {
//       var node = $(gridItem);
//       var position = node.position();

//       positions.push(position);
//     });

//     gridItems.toArray().forEach(function(gridItem, index) {
//       var node = $(gridItem);

//       node.css('top', positions[index].top);
//       node.css('left', positions[index].left);
//       node.css('position', 'absolute');
//     });
//   },

//   unsetMealButtonPositionsForAnimation: function() {
//     var gridItems = $(this.getDOMNode()).children('.grid-item');

//     gridItems.toArray().forEach(function(gridItem, index) {
//       var node = $(gridItem);

//       node.css('top', 0);
//       node.css('left', 0);
//       node.css('position', 'relative');
//     });
//   },
