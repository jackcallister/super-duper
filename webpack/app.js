var React = require('react'),
    Picker = require('./components/picker'),
    List = require('./components/list'),
    Form = require('./components/form');

var WebUtils = require('./utils/web-utils');

WebUtils.init();

var App = React.createClass({

  render: function() {
    return (
      <section className="app">
        <main>
          <Picker />
          <List />
        </main>
        <Form />
      </section>
    )
  }
});

document.addEventListener('DOMContentLoaded', function() {
  React.render(<App />, document.getElementById('app'));
});
