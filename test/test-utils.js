/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const utils = require('../lib/utils.js');
const prefService = require('sdk/preferences/service');
const prefs = require('lib/prefs.js');
const testRunner = require('sdk/test');

exports.testGetHostURL = (assert) => {
    let url = 'https://www.allizom.org/en-US/firefox/new/';
    assert.strictEqual(utils.getHostURL(url), 'https://www.allizom.org',
        'Host value returned as expected');

    url = 'http://127.0.0.8000/en-US/';
    assert.strictEqual(utils.getHostURL(url), 'http://127.0.0.8000',
        'Host value returned as expected');

    url = 'about:home';
    assert.strictEqual(utils.getHostURL(url), null,
        'Invalid URL should return null');
};

exports.testAddToCommaString = (assert) => {
    let commaString = '';

    assert.strictEqual(utils.addToCommaString('https://www-demo1.allizom.org', commaString),
        'https://www-demo1.allizom.org',
        'Single values should not have a trailing comma');

    commaString = 'https://www.allizom.org';
    assert.strictEqual(utils.addToCommaString('https://www-demo1.allizom.org', commaString),
        'https://www.allizom.org,https://www-demo1.allizom.org',
        'Additional values should get added');

    commaString = 'https://www.allizom.org,https://www-demo1.allizom.org';
    assert.strictEqual(utils.addToCommaString('https://www-demo1.allizom.org', commaString),
        commaString, 'Duplicate values should not get added');

    commaString = 'https://www.allizom.org,https://www-demo1.allizom.org';
    assert.strictEqual(utils.addToCommaString(null, commaString), commaString,
        'Falsy values should not get added');
};

exports.testRemoveFromCommaString = (assert) => {
    let commaString = 'https://www.allizom.org,https://www-demo1.allizom.org';

    assert.strictEqual(utils.removeFromCommaString('https://www.allizom.org', commaString),
        'https://www-demo1.allizom.org',
        'Should remove a value from comma string as expected');

    commaString = 'https://www.allizom.org';

    assert.strictEqual(utils.removeFromCommaString('https://www.allizom.org', commaString),
        '',
        'Should return an empty string if single value is removed.');
};

exports.testArrayFromCommaString = (assert) => {
    assert.strictEqual(utils.arrayFromCommaString('').length, 0,
        'Array length is as expected');
    assert.strictEqual(utils.arrayFromCommaString('https://www.allizom.org').length, 1,
        'Array length is as expected');
    assert.strictEqual(utils.arrayFromCommaString('https://www-demo1.allizom.org,https://www.allizom.org').length, 2,
        'Array length is as expected');
};

exports.testCommaStringFromArray = (assert) => {
    let arr = [
        'https://www-demo1.allizom.org',
        'https://www.allizom.org'
    ];

    assert.strictEqual(utils.commaStringFromArray(arr), 'https://www-demo1.allizom.org,https://www.allizom.org',
        'Should return comma string from array as expected.');

    arr = 'https://www-demo1.allizom.org,https://www.allizom.org';

    assert.throws(function() {
        utils.commaStringFromArray(arr);
    }, 'Should throw an error if not passed an array.');
};

exports.testGetTestingOrigins = (assert) => {
    const host = 'https://www-demo1.allizom.org,https://www.allizom.org';

    assert.strictEqual(prefService.has(prefs.TESTING_ORIGINS), false,
        'Should not have testingOrigins pref by default');

    utils.getTestingOrigins();

    assert.strictEqual(prefService.get(prefs.TESTING_ORIGINS), '',
        'Should be empty string when testingOrigins is first created');

    prefService.set(prefs.TESTING_ORIGINS, host);

    assert.strictEqual(prefService.get(prefs.TESTING_ORIGINS), host,
        'Should return origin values when present.');
};

testRunner.run(exports);
