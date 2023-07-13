/*
 * Switch between production and development mode using
 * APP_ENV environment variable. (Defaults to development)
 * Pass '--debug' to disable uglification during a
 * production build.
 *
 * Example:
 *  $ APP_ENV=production ionic serve
 */

require('dotenv').config();

const webpack = require('webpack');

new webpack.DefinePlugin({
  'process.env.APP_ENV': process.env.APP_ENV,
  'process.env.STORYBLOK_ACCESS_TOKEN': '"' + process.env.STORYBLOK_ACCESS_TOKEN
        + '"',
});

module.exports = require('./webpack.config.dev.js');

/*
switch (process.env.APP_ENV) {
case 'production':
case 'prod':
  module.exports = require('./webpack.config.dev.js');
  break;
case 'staging':
case 'stage':
  module.exports = require('./webpack.config.stage.js');
  break;
case 'development':
case 'dev':
default:
  module.exports = require('./webpack.config.dev.js');
  break;
}
*/
