var React = require('react/addons');

var MealForm = React.createClass({

  getFormData: function() {
    var name = this.state.name;
    var ingredients = this.state.ingredients;
    var category = this.state.category;

    var data = {
      meal: {
        name: name,
        ingredients_attributes: ingredients,
        category: category
      }
    }

    return data;
  },

  createMeal: function(e) {
    e.preventDefault();

    Meal.create(this.getFormData(), function(response) {
      this.afterCreateMeal(response);
    }.bind(this));
  },

  afterCreateMeal: function(meal) {
    this.replaceState(this.getInitialState());
    this.props.onMealCreate(meal);
    this.props.onFormExit();
  },

  toggleAddButton: function(event) {
    if (event.target.value != "") {
      this.setState({
        disableIngredientButton: false
      });
    } else {
      this.setState({
        disableIngredientButton: true
      });
    }
  },

  addIngredientField: function(event) {
    this.state.ingredients.push(this.defaultIngredient());

    this.setState({
      ingredients: this.state.ingredients
    });
  },

  removeIngredientField: function(index, event) {
    this.state.ingredients.splice(index, 1);
    this.forceUpdate();
  },

  handleNameInputChange: function(event) {
    this.setState({
      name: event.target.value
    });
  },

  handleIngredientInputChange: function(index, event) {
    this.state.ingredients[index].name = event.target.value;
    this.forceUpdate();
  },

  handleRadioLabelClick: function(category, event) {
    this.setState({
      category: category
    });

    this.refs[category].getDOMNode().checked = true;
  },

  defaultIngredient: function() {
    return { name: "" }
  },

  getInitialState: function() {
    return {
      name: null,
      ingredients: [this.defaultIngredient()],
      category: 'other',
    };
  },

  renderNameField: function() {
    return (
      <div className="form-group">
        <input type='text' placeholder='Meal name'
                           value={this.state.name}
                           onChange={this.handleNameInputChange}
                           autoFocus={true} />
      </div>
    )
  },

  renderIngredientFields: function() {
    var fields = this.state.ingredients.map(function(ingredient, index) {
      var button,
          inputRef = 'ingredientName' + index,
          groupRef = 'ingredientField' + index,
          key = 'ingredientField' + index,
          isLastField = index == this.state.ingredients.length - 1;

      if (isLastField) {
        button = <i className='icon-plus' onClick={this.addIngredientField} ></i>
      } else {
        button = <i className='icon-delete' onClick={this.removeIngredientField.bind(this, index)} ></i>
      }

      return (
        <div className="form-group" key={key} ref={groupRef}>
          <input type="text" ref={inputRef}
                             placeholder="Ingredient"
                             value={this.state.ingredients[index].name}
                             onChange={this.handleIngredientInputChange.bind(this, index)} />
          {button}
        </div>
      );
    }.bind(this));

    return fields;
  },

  renderCategoryRadioButtons: function() {
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
          <label className={'radio-label ' + selectedKlass} htmlFor={category} onClick={this.handleRadioLabelClick.bind(this, category)}/>
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
    var nameField = this.renderNameField();
    var ingredientFields = this.renderIngredientFields();
    var categoryRadioButons = this.renderCategoryRadioButtons();

    return (
      <div className='meal-form active'>
        <div className='modal-overlay' onClick={this.props.onFormExit}></div>
        <div ref='modal' className='modal'>
          <form ref='form' onSubmit={this.createMeal}>
            {nameField}
            {ingredientFields}
            {categoryRadioButons}
            <input type='submit' value='Add Meal' />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = MealForm;




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
