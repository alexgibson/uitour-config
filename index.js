/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const self = require('sdk/self');
const tabs = require('sdk/tabs');
const prefService = require('sdk/preferences/service');
const { ToggleButton } = require('sdk/ui/button/toggle');
const { Panel } = require('sdk/panel');
const utils = require('lib/utils.js');

const UITOUR_ENABLED = 'browser.uitour.enabled';
const REQUIRE_SECURE = 'browser.uitour.requireSecure';
const TESTING_ORIGINS = 'browser.uitour.testingOrigins';

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

configPanel.port.on('toggle-require-secure', (state) => {
    prefService.set(REQUIRE_SECURE, state);
});

configPanel.port.on('add-to-whitelist', () => {
    const host = utils.getHostURL(tabs.activeTab.url);
    if (host) {
        const newOrigins = utils.addToCommaString(getTestingOrigins(), host);
        prefService.set(TESTING_ORIGINS, newOrigins);
    }
});

function handleChange(state) {
    if (state.checked) {
        configPanel.show({
            position: button
        });
    }
}

function handleShow() {
    configPanel.port.emit('set-uitour-enabled', prefService.get(UITOUR_ENABLED));
    configPanel.port.emit('set-require-secure', prefService.get(REQUIRE_SECURE));
}

function handleHide() {
    button.state('window', {
        checked: false
    });
}

/**
 * New profiles have no 'browser.uitour.testingOrigins' preference.
 * Create one if it does not exist, using an empty value.
 */
function getTestingOrigins() {
    if (!prefService.has(TESTING_ORIGINS)) {
        prefService.set(TESTING_ORIGINS, '');
    }
    return prefService.get(TESTING_ORIGINS);
}
