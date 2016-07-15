/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const utils = require('../lib/utils.js');
const testRunner = require('sdk/test');

exports.testGetHostURL = (assert) => {
    let url = 'https://www.allizom.org/en-US/firefox/new/';
    assert.equal(utils.getHostURL(url), 'https://www.allizom.org');

    url = 'http://127.0.0.8000/en-US/';
    assert.equal(utils.getHostURL(url), 'http://127.0.0.8000');

    url = 'about:home';
    assert.equal(utils.getHostURL(url), null);
};

exports.testAddToCommaString = (assert) => {
    let commaString = '';
    assert.equal(utils.addToCommaString('https://www-demo1.allizom.org', commaString),
        'https://www-demo1.allizom.org',
        'Single items should not have a trailing comma');

    commaString = 'https://www.allizom.org';
    assert.equal(utils.addToCommaString('https://www-demo1.allizom.org', commaString),
        'https://www.allizom.org,https://www-demo1.allizom.org',
        'Additional items should get added');

    commaString = 'https://www.allizom.org,https://www-demo1.allizom.org';
    assert.equal(utils.addToCommaString('https://www-demo1.allizom.org', commaString),
        commaString, 'Duplicate items should not get added');

    commaString = 'https://www.allizom.org,https://www-demo1.allizom.org';
    assert.equal(utils.addToCommaString(null, commaString), commaString,
        'Falsey items should not get added');
};

testRunner.run(exports);