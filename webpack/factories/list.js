var List = function(){};

List.email = function(data) {
  $.ajax({
    data: data,
    url: '/api/lists',
    type: 'POST',
    dataType: 'json'
  });
}

module.exports = List;
