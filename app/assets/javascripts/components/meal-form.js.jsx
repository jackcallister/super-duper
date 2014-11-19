var MealForm = React.createClass({

  createMeal: function(e) {
    e.preventDefault();
    var t = this;
    var mealName = this.refs["meal-name"].getDOMNode().value.trim();
    var ingredientAttributes = this.state.ingredients.map(function(ingredient, index) {
      return { name: t.refs["ingredient-name-" + index].getDOMNode().value.trim() }
    });

    var formData = {
      meal: {
        name: mealName,
        ingredients_attributes: ingredientAttributes
      }
    }

    $.ajax({
      data: formData,
      url: "/api/meals",
      type: "POST",
      dataType: "json",
      success: function(data) {
        this.props.onCreateMeal(data);
      }.bind(this)
    });

    this.refs["meal-name"].getDOMNode().value = "";
    this.state.ingredients.forEach(function(ingredient, index) {
      t.refs["ingredient-name-" + index].getDOMNode().value = "";
    });
    
    this.didToggle();
  },

  didToggle: function(e) {
    this.setState({
      visible: !this.state.visible
    });
  },

  getInitialState: function() {
    return {
      visible: false,
      ingredients: [this.defaultIngredient()]
    };
  },

  defaultIngredient: function() {
    return { name: "" }
  },

  addIngredientField: function(e) {
    e.preventDefault();
    var ingredients = this.state.ingredients;
    ingredients.push(this.defaultIngredient());
    
    this.setState({
      ingredients: ingredients
    });
  },

  componentDidMount: function() {
    document.addEventListener('toggleModal', this.didToggle);
  },

  componentWillUnmount: function() {
    document.removeEventListener('toggleModal', this.didToggle);
  },

  render: function() {
    var visibleKlass = this.state.visible ? "modal-active" : "modal-inactive";
   
    var ingredientInputs = this.state.ingredients.map(function(ingredient, index) {
      var ref = "ingredient-name-" + index;
      return (<input type="text" ref={ref} placeholder="Ingredient" key={index} />);
    });

    return (
      <div>
        <div id="modal-overlay" className={visibleKlass} onClick={this.didToggle}></div>
        <div ref="modal" id="modal" className={visibleKlass}>
          <form ref="form" onSubmit={this.createMeal}>
            <input type="text" ref="meal-name" placeholder="Meal name" />
            {ingredientInputs}
            <button onClick={this.addIngredientField} disable>Add ingredient</button>
            <input type="submit" value="Add Meal"/>
          </form>
        </div>
      </div>
    );
  }
});
