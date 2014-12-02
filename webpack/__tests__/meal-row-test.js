jest.dontMock('../components/meal-row.js.jsx');

var React = require('react/addons'),
    MealRow = require('../components/meal-row.js.jsx'),
    TestUtils = React.addons.TestUtils;

describe('MealRow', function() {

  var meal = { name: "test-meal", ingredients: [{ name: "test-ingredient" }] };
  var handleRemove = jest.genMockFunction();

  var MealRowElement = TestUtils.renderIntoDocument(
    <MealRow meal={meal} onRemove={handleRemove} />
  );

  var button = TestUtils.findRenderedDOMComponentWithTag(MealRowElement, 'button');
  var list = TestUtils.findRenderedDOMComponentWithTag(MealRowElement, 'ul');
  
  it('renders the meal ingredients as li', function() {
    expect(list.props.children.length).toEqual(1);
  });

  it('calls the onRemove handler', function(){
    TestUtils.Simulate.click(button);
    expect(handleRemove).toBeCalled();
  });
});
