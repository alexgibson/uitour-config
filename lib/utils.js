/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const prefService = require('sdk/preferences/service');
const prefs = require('lib/prefs.js');

function _addToCommaString(item, commaString) {
    if (!item) {
        return commaString;
    }
    if (!commaString) {
        return item;
    } else {
        let arr = _arrayFromCommaString(commaString);
        arr.push(item);
        //remove any duplicates from the array
        arr = [...new Set(arr)];
        return _commaStringFromArray(arr);
    }
}

function _arrayFromCommaString(commaString) {
    return (commaString) ? commaString.replace(' ', '').split(',') : [];
}

function _commaStringFromArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('_commaStringFromArray: was not passed an Array.');
    }
    return arr.join(',');
}

function _getHostURL(url) {
    const host = url.match(/^(?:https?\:\/\/)(?:[^\/])+/);
    return (host) ? host[0] : null;
}

// New profiles have no 'browser.uitour.testingOrigins' preference.
// Create one if it does not exist, using an empty value.
function _getTestingOrigins() {
    if (!prefService.has(prefs.TESTING_ORIGINS)) {
        prefService.set(prefs.TESTING_ORIGINS, '');
    }
    return prefService.get(prefs.TESTING_ORIGINS);
}

function _removeFromCommaString(item, commaString) {
    let arr = _arrayFromCommaString(commaString);
    const i = arr.indexOf(item);

    if (i !== -1) {
        arr.splice(i, 1);
    }
    return _commaStringFromArray(arr);
}

module.exports = {
    'addToCommaString': _addToCommaString,
    'arrayFromCommaString': _arrayFromCommaString,
    'commaStringFromArray': _commaStringFromArray,
    'getHostURL': _getHostURL,
    'getTestingOrigins': _getTestingOrigins,
    'removeFromCommaString': _removeFromCommaString
};
