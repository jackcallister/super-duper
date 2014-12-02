jest.dontMock('../components/shopping-list.js.jsx');

var React = require('react/addons'),
    ShoppingList = require('../components/shopping-list.js.jsx'),
    TestUtils = React.addons.TestUtils;

describe('ShoppingList', function() {

  var meals = [{ name: "test-meal", ingredients: [{ name: "test-ingredient" }] }];
  var handleRemoveMeal = jest.genMockFunction();

  var ShoppingListElement = TestUtils.renderIntoDocument(
    <ShoppingList onMealRemove={handleRemoveMeal} meals={meals} />
  );

  var button = TestUtils.findRenderedDOMComponentWithTag(ShoppingListElement, 'button');

  it('calls the onMealRemove handler', function(){
    TestUtils.Simulate.click(button);
    expect(handleRemoveMeal).toBeCalled();
  });
});
