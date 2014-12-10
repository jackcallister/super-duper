var Meal = function(){};

Meal.all = function(callback) {
  $.get('/api/meals', function(meals) {
    callback(meals);
  });
}

Meal.create = function(data, callback) {
  $.ajax({
    data: data,
    url: '/api/meals',
    type: 'POST',
    dataType: 'json',
    success: function(data) {
      callback(data);
    }
  });
}

Meal.destroy = function(id) {
  $.ajax({
    url: '/api/meals/' + id,
    type: 'DELETE',
    dataType: 'json'
  });
}

module.exports = Meal;
