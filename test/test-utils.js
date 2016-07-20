/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const utils = require('../lib/utils.js');
const testRunner = require('sdk/test');

exports.testGetHostURL = (assert) => {
    let url = 'https://www.allizom.org/en-US/firefox/new/';
    assert.strictEqual(utils.getHostURL(url), 'https://www.allizom.org');

    url = 'http://127.0.0.8000/en-US/';
    assert.strictEqual(utils.getHostURL(url), 'http://127.0.0.8000');

    url = 'about:home';
    assert.strictEqual(utils.getHostURL(url), null);
};

exports.testAddToCommaString = (assert) => {
    let commaString = '';

    assert.strictEqual(utils.addToCommaString('https://www-demo1.allizom.org', commaString),
        'https://www-demo1.allizom.org',
        'Single items should not have a trailing comma');

    commaString = 'https://www.allizom.org';
    assert.strictEqual(utils.addToCommaString('https://www-demo1.allizom.org', commaString),
        'https://www.allizom.org,https://www-demo1.allizom.org',
        'Additional items should get added');

    commaString = 'https://www.allizom.org,https://www-demo1.allizom.org';
    assert.strictEqual(utils.addToCommaString('https://www-demo1.allizom.org', commaString),
        commaString, 'Duplicate items should not get added');

    commaString = 'https://www.allizom.org,https://www-demo1.allizom.org';
    assert.strictEqual(utils.addToCommaString(null, commaString), commaString,
        'Falsey items should not get added');
};

exports.testArrayFromCommaString = (assert) => {
    assert.strictEqual(utils.arrayFromCommaString('').length, 0);
    assert.strictEqual(utils.arrayFromCommaString('https://www.allizom.org').length, 1);
    assert.strictEqual(utils.arrayFromCommaString('https://www-demo1.allizom.org,https://www.allizom.org').length, 2);
};

testRunner.run(exports);
