/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const uitourPrefs = require('lib/uitour-prefs.js');
const prefService = require('sdk/preferences/service');
const testRunner = require('sdk/test');

exports.testPrefs = (assert) => {
    assert.strictEqual(uitourPrefs.UITOUR_ENABLED, 'browser.uitour.enabled',
        'UITOUR_ENABLED is defined');
    assert.strictEqual(uitourPrefs.REQUIRE_SECURE, 'browser.uitour.requireSecure',
        'REQUIRE_SECURE is defined');
    assert.strictEqual(uitourPrefs.TESTING_ORIGINS, 'browser.uitour.testingOrigins',
        'TESTING_ORIGINS is defined');
    assert.strictEqual(uitourPrefs.LOG_LEVEL, 'browser.uitour.loglevel',
        'LOG_LEVEL is defined');
};

exports.testGetTestingOrigins = (assert) => {
    const host = 'https://www-demo1.allizom.org,https://www.allizom.org';

    assert.strictEqual(prefService.has(uitourPrefs.TESTING_ORIGINS), false,
        'Should not have testingOrigins pref by default');

    uitourPrefs.getTestingOrigins();

    assert.strictEqual(prefService.get(uitourPrefs.TESTING_ORIGINS), '',
        'Should be empty string when testingOrigins is first created');

    prefService.set(uitourPrefs.TESTING_ORIGINS, host);

    assert.strictEqual(prefService.get(uitourPrefs.TESTING_ORIGINS), host,
        'Should return origin values when present.');
};

exports.testResetAll = (assert) => {
    prefService.set(uitourPrefs.UITOUR_ENABLED, false);
    prefService.set(uitourPrefs.REQUIRE_SECURE, false);
    prefService.set(uitourPrefs.TESTING_ORIGINS, 'https://www.allizom.org');
    prefService.set(uitourPrefs.LOG_LEVEL, 'All');

    uitourPrefs.resetAll();

    assert.strictEqual(prefService.get(uitourPrefs.UITOUR_ENABLED), true);
    assert.strictEqual(prefService.get(uitourPrefs.REQUIRE_SECURE), true);
    assert.strictEqual(prefService.get(uitourPrefs.TESTING_ORIGINS), undefined);
    assert.strictEqual(prefService.get(uitourPrefs.LOG_LEVEL), 'Error');
};

testRunner.run(exports);
