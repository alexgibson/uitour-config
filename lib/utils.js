/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

function _getHostURL(url) {
    const host = url.match(/^(?:https?\:\/\/)(?:[^\/])+/);
    if (host) {
        return host[0];
    }
    return null;
}

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
        return arr.join(',');
    }
}

function _arrayFromCommaString(commaString) {
    if (!commaString) {
        return [];
    }
    return commaString.replace(' ', '').split(',');
}

module.exports = {
    'getHostURL': _getHostURL,
    'addToCommaString': _addToCommaString,
    'arrayFromCommaString': _arrayFromCommaString
};
