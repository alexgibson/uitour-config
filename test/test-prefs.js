/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const prefs = require('lib/prefs.js');
const testRunner = require('sdk/test');

exports.testPrefs = (assert) => {
    assert.strictEqual(prefs.UITOUR_ENABLED, 'browser.uitour.enabled',
        'UITOUR_ENABLED is defined');
    assert.strictEqual(prefs.REQUIRE_SECURE, 'browser.uitour.requireSecure',
        'REQUIRE_SECURE is defined');
    assert.strictEqual(prefs.TESTING_ORIGINS, 'browser.uitour.testingOrigins',
        'TESTING_ORIGINS is defined');
    assert.strictEqual(prefs.LOG_LEVEL, 'browser.uitour.loglevel',
        'LOG_LEVEL is defined');
};

testRunner.run(exports);
