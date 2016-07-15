/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const utils = require('../lib/utils.js');
const testRunner = require('sdk/test');

exports.testGetHostURL = function(assert) {
    let url = 'https://www.allizom.org/en-US/firefox/new/';
    assert.equal(utils.getHostURL(url), 'https://www.allizom.org');

    url = 'http://127.0.0.8000/en-US/';
    assert.equal(utils.getHostURL(url), 'http://127.0.0.8000');
};

testRunner.run(exports);
