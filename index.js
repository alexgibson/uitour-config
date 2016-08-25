/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const { when: unload } = require('sdk/system/unload');
const button = require('lib/button');
const panel = require('lib/panel');
const prefs = require('lib/prefs');

// when the button state is checked show the panel.
button.on('change', (state) => {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
});

// when the panel is hidden make sure the button state is also unchecked.
panel.on('hide', () => {
    button.state('window', {
        checked: false
    });
});

/**
 * By AMO policy global preferences must be changed back to
 * their original value when the add-on is unloaded.
 */
unload(function(reason) {
    if (reason === 'uninstall' || reason === 'disable') {
        prefs.resetAll();
    }
});
