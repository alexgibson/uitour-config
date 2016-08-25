/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const { ToggleButton } = require('sdk/ui/button/toggle');
const {Cu} = require('chrome');
const config = require('lib/config');
const Prefs = Cu.import('resource://gre/modules/Preferences.jsm').Preferences;

let button;

function setToggleButton(dark) {
    const icon = dark ? config.iconInverted : config.icon;
    button = ToggleButton({
        id: config.id,
        label: config.label,
        icon: icon
    });
}

// update the our icon for devtools themes
Prefs.observe('devtools.theme', pref => {
    setToggleButton(pref === 'dark');
});

setToggleButton(Prefs.get('devtools.theme') === 'dark');

module.exports = button;
