/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const self = require('sdk/self');
const tabs = require('sdk/tabs');
const prefService = require('sdk/preferences/service');
const { when: unload } = require('sdk/system/unload');
const { ToggleButton } = require('sdk/ui/button/toggle');
const { Panel } = require('sdk/panel');
const utils = require('lib/utils.js');

const UITOUR_ENABLED = 'browser.uitour.enabled';
const REQUIRE_SECURE = 'browser.uitour.requireSecure';
const TESTING_ORIGINS = 'browser.uitour.testingOrigins';

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

/**
 * Add-on ToggleButton
 */

let button;

function setToggleButton() {
    button = ToggleButton({
        id: 'uitour-config',
        label: 'Configure UITour',
        icon: {
            '16': './icon-16.png',
            '32': './icon-32.png',
            '64': './icon-64.png'
        },
        onChange: handleToggleButtonChange
    });
}

function handleToggleButtonChange(state) {
    if (state.checked) {
        configPanel.show({
            position: button
        });
    }
}

setToggleButton();

/**
 * Add-on UI Panel
 */
const configPanel = Panel({
    width: 300,
    height: 350,
    contentURL: self.data.url('panel.html'),
    contentScriptFile: self.data.url('panel.js'),
    onShow: handleConfigPanelShow,
    onHide: handleConfigPanelHide
});

// when the panel is shown show the current values
function handleConfigPanelShow() {
    configPanel.port.emit('set-uitour-enabled', prefService.get(UITOUR_ENABLED));
    configPanel.port.emit('set-require-secure', prefService.get(REQUIRE_SECURE));
    updateTestingOriginsList();
}

// when the panel is hidden make sure the button state is also unchecked.
function handleConfigPanelHide() {
    button.state('window', {
        checked: false
    });
}

function updateTestingOriginsList() {
    configPanel.port.emit('set-testing-origins', utils.arrayFromCommaString(getTestingOrigins()));
}

configPanel.port.on('toggle-uitour-enabled', (state) => {
    prefService.set(UITOUR_ENABLED, state);
});

configPanel.port.on('toggle-require-secure', (state) => {
    prefService.set(REQUIRE_SECURE, state);
});

configPanel.port.on('add-to-whitelist', () => {
    const host = utils.getHostURL(tabs.activeTab.url);
    if (host) {
        const newOrigins = utils.addToCommaString(host, getTestingOrigins());
        prefService.set(TESTING_ORIGINS, newOrigins);
        updateTestingOriginsList();
    }
});

configPanel.port.on('remove-selected', (value) => {
    const newOrigins = utils.removeFromCommaString(value, getTestingOrigins());
    prefService.set(TESTING_ORIGINS, newOrigins);
    updateTestingOriginsList();
});

configPanel.port.on('remove-all', () => {
    prefService.reset(TESTING_ORIGINS);
    updateTestingOriginsList();
});

/**
 * By AMO policy global preferences must be changed back to
 * their original value when the add-on is unloaded.
 */
unload(function() {
    prefService.reset(UITOUR_ENABLED);
    prefService.reset(REQUIRE_SECURE);
    prefService.reset(TESTING_ORIGINS);
});
