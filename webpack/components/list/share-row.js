var React = require('react');

var ShareRow = React.createClass({

  // emailList: function() {
  //   var data = {
  //     meal_ids: this.meal_ids()
  //   }

  //   List.email(data);
  // },

  // meal_ids: function() {
  //   return this.props.meals.map(function(meal) {
  //     return meal.id
  //   });
  // },

  // getDefaultProps: function() {
  //   return {
  //     meals: []
  //   };
  // },

  render: function() {

    return (
      <button className='share-row'>Send</button>
    );
  }

});

module.exports = ShareRow;
