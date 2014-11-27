jest.dontMock('../components/meal-button.js.jsx');

var React = require('react/addons'),
    MealButton = require('../components/meal-button.js.jsx'),
    TestUtils = React.addons.TestUtils;

describe('MealButton', function() {

  var handleSelect = jest.genMockFunction();

  var MealButtonElement = TestUtils.renderIntoDocument(
    <MealButton name='test-name' onSelect={handleSelect} />
  );

  var button = TestUtils.findRenderedDOMComponentWithTag(MealButtonElement, 'button');
  
  it('renders the name prop', function() {
    expect(button.getDOMNode().textContent).toEqual('test-name');
  });

  it('calls the onSelect handler', function(){
    TestUtils.Simulate.click(button);
    expect(handleSelect).toBeCalled();
  });
});
