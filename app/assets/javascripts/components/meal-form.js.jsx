var MealForm = React.createClass({

  createMeal: function(e) {
    e.preventDefault();
    var mealName = this.refs["meal-name"].getDOMNode().value.trim();
    var ingredientName = this.refs["ingredient-name"].getDOMNode().value.trim();

    var formData = {
      meal: {
        name: mealName,
        ingredients_attributes: [{
          name: ingredientName
        }]
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
    this.refs["ingredient-name"].getDOMNode().value = "";

    this.handleToggle();
  },

  handleToggle: function(e) {
    this.setState({
      visible: !this.state.visible
    });
  },

  getInitialState: function() {
    return {
      visible: false
    };
  },

  componentDidMount: function() {
    document.addEventListener('toggleModal', this.handleToggle);
  },

  componentWillUnmount: function() {
    document.removeEventListener('toggleModal', this.handleToggle);
  },

  render: function() {
    var visibleKlass = this.state.visible ? "modal-active" : "modal-inactive";

    return (
      <div>
        <div id="modal-overlay" className={visibleKlass} onClick={this.handleToggle}></div>
        <div ref="modal" id="modal" className={visibleKlass}>
          <form ref="form" onSubmit={this.createMeal}>
            <input type="text" ref="meal-name" placeholder="Meal name" />
            <input type="text" ref="ingredient-name" placeholder="Ingredient" />

            <input type="submit" value="Add Meal"/>
          </form>
        </div>
      </div>
    );
  }
});
