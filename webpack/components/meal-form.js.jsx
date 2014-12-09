var React = require('react/addons'),
    Meal = require('../factories/meal.js');

var MealForm = React.createClass({

  getMealFromForm: function() {
    var mealName = this.refs["mealName"].getDOMNode().value.trim();
    
    var ingredientAttributes = this.state.ingredients.map(function(ingredient, index) {
      return { name: this.refs["ingredientName" + index].getDOMNode().value.trim() }
    }.bind(this));

    var data = {
      meal: {
        name: mealName,
        ingredients_attributes: ingredientAttributes
      }
    }

    return data;
  },

  createMeal: function(e) {
    e.preventDefault();   

    var meal = this.getMealFromForm();
    
    Meal.create(meal, function(response) {
      this.afterCreateMeal(response);  
    }.bind(this));
  },

  afterCreateMeal: function(meal) {
    this.props.onCreateMeal(meal);
    this.clearForm();
    this.didToggle();
  },

  clearForm: function() {
    this.refs["mealName"].getDOMNode().value = "";
    this.state.ingredients.forEach(function(ingredient, index) {
      this.refs["ingredientName" + index].getDOMNode().value = "";
    }.bind(this));
  },

  didToggle: function(e) {
    this.setState({
      visible: !this.state.visible
    }, function() {
      this.refs.mealName.getDOMNode().focus();
      if (!this.state.visible) {
        this.clearForm();
        this.replaceState(this.getInitialState());
      }
    });
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

  addIngredientField: function(e) {
    e.preventDefault();
    var ingredients = this.state.ingredients;
    ingredients.push(this.defaultIngredient());

    this.setState({
      ingredients: ingredients,
      disableIngredientButton: true
    });
  },

  defaultIngredient: function() {
    return { name: "" }
  },

  getInitialState: function() {
    return {
      visible: false,
      ingredients: [this.defaultIngredient()],
      disableIngredientButton: true
    };
  },

  componentDidMount: function() {
    document.addEventListener('toggleModal', this.didToggle);
  },

  componentWillUnmount: function() {
    document.removeEventListener('toggleModal', this.didToggle);
  },

  render: function() {
    var t = this,
        numberOfIngredients = this.state.ingredients.length;

    var ingredientFields = this.state.ingredients.map(function(ingredient, index) {
      var addButton,
          ref = "ingredientName" + index,
          key = "ingredientField" + index,
          isLastField = index == numberOfIngredients - 1,
          toggleAddButton;
          focus;

      if (isLastField) {
        addButton = <button onClick={t.addIngredientField} disabled={t.state.disableIngredientButton}>Add ingredient</button>;
        toggleAddButton = t.toggleAddButton;
        focus = true;
      }

      return (
        <div key={key}>
          <input type="text" ref={ref} placeholder="Ingredient" onChange={toggleAddButton} autoFocus={focus} />
          {addButton}
        </div>
      );
    });

    var visibleKlass = this.state.visible ? "modal-active" : "modal-inactive";

    return (
      <div>
        <div id="modal-overlay" className={visibleKlass} onClick={this.didToggle}></div>
        <div ref="modal" id="modal" className={visibleKlass}>
          <form ref="form" onSubmit={this.createMeal}>
            <input type="text" ref="mealName" placeholder="Meal name" />
            {ingredientFields}
            <input type="submit" value="Add Meal" />
          </form>
        </div>
      </div>
    );
  }
});

module.exports = MealForm;
