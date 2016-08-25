/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const self = require('sdk/self');
const panel = require('../lib/panel');
const testRunner = require('sdk/test');
const config = require('../lib/config');

exports.testGetHostURL = (assert) => {
    assert.strictEqual(panel.contentURL, self.data.url('panel.html'),
        'contentURL is as expected');
    assert.strictEqual(panel.contentScriptFile, self.data.url('panel.js'),
        'contentScriptFile is as expected');
    assert.strictEqual(panel.contentStyleFile, self.data.url('panel.css'),
        'contentStyleFile is as expected');
    assert.strictEqual(panel.height, config.panelHeight,
        'height is as expected');
    assert.strictEqual(panel.width, config.panelWidth,
        'width is as expected');
    panel.destroy();
};

testRunner.run(exports);
