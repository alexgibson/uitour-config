/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const button = require('../lib/button');
const config = require('../lib/config');
const testRunner = require('sdk/test');

exports.testGetHostURL = (assert) => {
    assert.strictEqual(button.id, config.id, 'id is as expected');
    assert.strictEqual(button.label, config.label, 'label is as expected');
    button.destroy();
};

testRunner.run(exports);
