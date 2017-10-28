const path = require('path');

module.exports = {
  entry: './src/main.ts',
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ],
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
         contentBase: './'
  },
  resolve: {
    extensions: [ ".tsx", ".ts", "**./*.ts" ,".js" ]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};