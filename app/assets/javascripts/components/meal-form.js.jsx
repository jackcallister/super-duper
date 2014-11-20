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

    this.clearForm();
    this.didToggle();
  },

  clearForm: function() {
    var t = this;
    this.refs["meal-name"].getDOMNode().value = "";
    this.state.ingredients.forEach(function(ingredient, index) {
      t.refs["ingredient-name-" + index].getDOMNode().value = "";
    });
  },

  didToggle: function(e) {
    this.setState({
      visible: !this.state.visible
    }, function() {
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
      ingredients: ingredients
    }, this.focusIngredientField(this.state.ingredients.length - 1));
  },

  focusIngredientField: function(index) {
    // Trigger this after the nodes render.
    // this.refs["ingredient-name-" + index].getDOMNode.focus();
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
          ref = "ingredient-name-" + index,
          key = "ingredient-field-" + index,
          isLastField = index == numberOfIngredients - 1,
          toggleAddButton;

      if (isLastField) {
        addButton = <button onClick={t.addIngredientField} disabled={t.state.disableIngredientButton}>Add ingredient</button>;
        toggleAddButton = t.toggleAddButton;
      }

      return (
        <div key={key}>
          <input type="text" ref={ref} placeholder="Ingredient" onChange={toggleAddButton} />
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
            <input type="text" ref="meal-name" placeholder="Meal name" />
            {ingredientFields}
            <input type="submit" value="Add Meal"/>
          </form>
        </div>
      </div>
    );
  }
});
