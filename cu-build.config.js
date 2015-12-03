/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var config = {
  type: 'multi',
  path: __dirname,
  name: 'cu-ui',
  publish: {
    dest: __dirname + '/publish',
    cse_dest: __dirname + '/publish-cse',
  },
  build: {
    ui_nested: true,
  },
  server: {
    inject: {
      scripts_before: [],
      scripts_after: [],
    },
  },
  libraries: {
    'camelot-unchained': 'https://github.com/CUModSquad/camelot-unchained-client-library.git#master'
  }
};

// load user config and merge it with default config if it exists
var extend = require('extend');
var fs = require('fs');
var userConfig = {};
if (fs.existsSync(__dirname + '/user-cu-build.config.js')) {
  userConfig = require(__dirname + '/user-cu-build.config.js');
}
config = extend(true, config, userConfig);

module.exports = config;
