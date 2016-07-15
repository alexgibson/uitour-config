/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

exports.getHostURL = function(url) {
    var host = url.match(/^(?:https?\:\/\/)(?:[^\/])+/);
    if (host) {
        return host[0];
    }
    return null;
};
