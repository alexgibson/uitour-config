/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const enabled = document.getElementById('enable-uitour');
const disabled = document.getElementById('disable-uitour');

enabled.addEventListener('change', () => {
    self.port.emit('toggle-uitour-enabled', true);
});

disabled.addEventListener('change', () => {
    self.port.emit('toggle-uitour-enabled', false);
});

self.port.on('set-uitour-enabled', function(state) {
    if (state) {
        enabled.checked = true;
    } else {
        disabled.checked = true;
    }
});
