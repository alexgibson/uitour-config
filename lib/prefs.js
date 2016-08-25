/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const prefService = require('sdk/preferences/service');

const LOG_LEVEL = 'browser.uitour.loglevel';
const REQUIRE_SECURE = 'browser.uitour.requireSecure';
const TESTING_ORIGINS = 'browser.uitour.testingOrigins';
const UITOUR_ENABLED = 'browser.uitour.enabled';

function _resetAll() {
    prefService.reset(UITOUR_ENABLED);
    prefService.reset(REQUIRE_SECURE);
    prefService.reset(TESTING_ORIGINS);
    prefService.reset(LOG_LEVEL);
}

// New profiles have no 'browser.uitour.testingOrigins' preference.
// Create one if it does not exist, using an empty value.
function _getTestingOrigins() {
    if (!prefService.has(TESTING_ORIGINS)) {
        prefService.set(TESTING_ORIGINS, '');
    }
    return prefService.get(TESTING_ORIGINS);
}

module.exports = {
    'UITOUR_ENABLED': UITOUR_ENABLED,
    'REQUIRE_SECURE': REQUIRE_SECURE,
    'TESTING_ORIGINS': TESTING_ORIGINS,
    'LOG_LEVEL': LOG_LEVEL,
    'resetAll': _resetAll,
    'getTestingOrigins': _getTestingOrigins
};
