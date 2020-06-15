/**
 * @description Only needed for cloudflare workers. This transpiles the typescript into javascript.
 * {@link https://github.com/EverlastingBugstopper/worker-typescript-template/blob/master/webpack.config.js}
 */

const path = require('path')

const mode = process.env.NODE_ENV || 'production'

module.exports = {
  output: {
    filename: `worker.js`,
    path: path.join(__dirname, 'dist'),
  },
  mode,
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
}