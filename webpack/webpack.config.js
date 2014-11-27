module.exports = {
  entry: './main.js.jsx',
  output: {
    filename: '../app/assets/javascripts/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'jsx-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
