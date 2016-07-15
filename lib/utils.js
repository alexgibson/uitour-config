/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

exports.getHostURL = (url) => {
    const host = url.match(/^(?:https?\:\/\/)(?:[^\/])+/);
    if (host) {
        return host[0];
    }
    return null;
};

exports.addToCommaString = (item, commaString) => {
    if (!item) {
        return commaString;
    }
    if (!commaString) {
        return item;
    } else {
        let arr = commaString.replace(' ', '').split(',');
        arr.push(item);
        //remove any duplicates from the array
        arr = [...new Set(arr)];
        return arr.join(',');
    }
};
