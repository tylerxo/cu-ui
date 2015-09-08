/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

module.exports = {
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
    'cu-core': 'https://github.com/CUModSquad/cu-core.git#master',
    'cu-components': 'https://github.com/CUModSquad/cu-components.git#master',
    'cu-styles': 'https://github.com/CUModSquad/cu-styles.git#master',
    'cu-events': 'https://github.com/CUModSquad/cu-events.git#master',
    'cu-stores': 'https://github.com/CUModSquad/cu-stores.git#master',
  }
};
