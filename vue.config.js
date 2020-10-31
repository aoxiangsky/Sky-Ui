const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'examples/index.html',
    },
  },
  configureWebpack: {
    // plugins: [
    //   new CopyWebpackPlugin([
    //     {
    //       from: 'src/style',
    //       to: 'style/',
    //       toType: 'dir',
    //     },
    //   ]),
    // ],
  },
};
