const nodeExternals = require('webpack-node-externals');

module.exports = {
  // webpack should emit node.js compatible code
  target: 'node',
  // in order to ignore all modules in node_modules folder from bundling
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2016'] },
        }],
      },
    ],
  },
};
