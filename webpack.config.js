const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new Dotenv()
  ]
};

module.exports = config;