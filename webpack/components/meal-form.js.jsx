var React = require('react/addons'),
    Meal = require('../factories/meal.js');

var MealForm = React.createClass({

  categories: function() {
    return ['other', 'poultry', 'seafood', 'meat', 'pasta', 'vegetarian'];
  },

  getFormData: function() {
    var categories = this.categories(),
        selectedCategory;

    var mealName = this.refs["mealName"].getDOMNode().value.trim();

    var ingredientAttributes = this.state.ingredients.map(function(ingredient, index) {
      return { name: this.refs["ingredientName" + index].getDOMNode().value.trim() }
    }.bind(this));

    categories.forEach(function(category){
      var checked = this.refs[category].getDOMNode().checked;
      if (checked) {
        selectedCategory = category;
      }
    }.bind(this));

    var data = {
      meal: {
        name: mealName,
        ingredients_attributes: ingredientAttributes,
        category: selectedCategory
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
    event.preventDefault();
    var ingredients = this.state.ingredients;
    ingredients.push(this.defaultIngredient());

    this.setState({
      ingredients: ingredients,
      disableIngredientButton: true
    });
  },

  handleRadioLabelClick: function(category, event) {
    this.setState({
      selectedCategory: category
    });

    this.refs[category].getDOMNode().checked = true;
  },

  defaultIngredient: function() {
    return { name: "" }
  },

  getInitialState: function() {
    return {
      ingredients: [this.defaultIngredient()],
      disableIngredientButton: true,
      selectedCategory: null
    };
  },

  renderIngredientFields: function() {
    var fields = this.state.ingredients.map(function(ingredient, index) {
      var addButton,
          ref = "ingredientName" + index,
          key = "ingredientField" + index,
          isLastField = index == this.state.ingredients.length - 1,
          toggleAddButton;
          focus;

      if (isLastField) {
        addButton = <button onClick={this.addIngredientField} disabled={this.state.disableIngredientButton}>Add</button>;
        toggleAddButton = this.toggleAddButton;
        focus = true;
      }

      return (
        <div className="form-group" key={key}>
          <input type="text" ref={ref} placeholder="Ingredient" onChange={toggleAddButton} autoFocus={focus} />
          {addButton}
        </div>
      );
    }.bind(this));

    return fields;
  },

  renderCategoryRadioButtons: function() {
    var categories = this.categories();

    var radioButtons = categories.map(function(category) {
      var selectedKlass;
      var checked;

      if (category == this.state.selectedCategory) {
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
    var ingredientFields = this.renderIngredientFields();
    var categoryRadioButons = this.renderCategoryRadioButtons();

    return (
      <div className='meal-form active'>
        <div className='modal-overlay' onClick={this.props.onFormExit}></div>
        <div ref='modal' className='modal'>
          <form ref='form' onSubmit={this.createMeal}>
            <div className="form-group">
              <input type='text' ref='mealName' placeholder='Meal name' />
            </div>
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
