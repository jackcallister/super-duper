var React = require('react'),
    App = require('./components/app.js.jsx');

document.addEventListener('DOMContentLoaded', function() {
  React.render(<App />, document.getElementById('app'));
});
