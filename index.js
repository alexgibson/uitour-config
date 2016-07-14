/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const self = require('sdk/self');
const prefService = require('sdk/preferences/service');
const { ToggleButton } = require('sdk/ui/button/toggle');
const { Panel } = require('sdk/panel');

const UITOUR_ENABLED = 'browser.uitour.enabled';

const button = ToggleButton({
    id: 'uitour-config',
    label: 'Configure UITour',
    icon: {
        '16': './icon-16.png',
        '32': './icon-32.png',
        '64': './icon-64.png'
    },
    onChange: handleChange
});

const configPanel = Panel({
    contentURL: self.data.url('panel.html'),
    contentScriptFile: self.data.url('panel.js'),
    onShow: handleShow,
    onHide: handleHide
});

configPanel.port.on('toggle-uitour-enabled', (state) => {
    prefService.set(UITOUR_ENABLED, state);
});

function handleChange(state) {
    if (state.checked) {
        configPanel.show({
            position: button
        });
    }
}

function handleShow() {
    var enabled = prefService.get(UITOUR_ENABLED);
    configPanel.port.emit('set-uitour-enabled', enabled);
}

function handleHide() {
    button.state('window', {
        checked: false
    });
}
