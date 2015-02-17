var React = require('react'),
    Picker = require('./components/picker'),
    List = require('./components/list');

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
      </section>
    )
  }
});

document.addEventListener('DOMContentLoaded', function() {
  React.render(<App />, document.getElementById('app'));
});
