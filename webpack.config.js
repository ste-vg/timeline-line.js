const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
      'timeline-line': './src/index.ts',
      'timeline-line.min': './src/index.ts'
    },
    mode: 'production',
    output: {
      path: path.resolve(__dirname, '_bundles'),
      filename: '[name].js',
      libraryTarget: 'umd',
      library: 'Timeline-line',
      umdNamedDefine: true
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /^(?!.*\.spec\.ts$).*\.ts$/,
                loaders: ['awesome-typescript-loader'],
                exclude: /node_modules/,
            }
        ]
    }
  }