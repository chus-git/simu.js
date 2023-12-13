const path = require('path');

module.exports = {
  entry: './src/simu.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'simu.min.js',
    path: path.resolve(__dirname, 'build'),
    library: 'simu',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
};