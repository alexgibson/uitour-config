/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const {Cu} = require('chrome');
const Prefs = Cu.import('resource://gre/modules/Preferences.jsm').Preferences;
const self = require('sdk/self');
const tabs = require('sdk/tabs');
const prefService = require('sdk/preferences/service');
const { when: unload } = require('sdk/system/unload');
const { ToggleButton } = require('sdk/ui/button/toggle');
const { Panel } = require('sdk/panel');
const utils = require('lib/utils.js');
const prefs = require('lib/prefs.js');

/*******************************************************
 * Add-on ToggleButton
 */

let button;

function setToggleButton(dark) {
    const icon = dark ? './icon-inverted.svg' : './icon.svg';
    button = ToggleButton({
        id: 'uitour-config',
        label: 'UITour',
        icon: icon,
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

// update the our icon for devtools themes
Prefs.observe('devtools.theme', pref => {
  setToggleButton(pref === 'dark');
});

setToggleButton(Prefs.get('devtools.theme') === 'dark');

/*******************************************************
 * Add-on UI Panel
 */
const configPanel = Panel({
    width: 300,
    height: 440,
    contentURL: self.data.url('panel.html'),
    contentScriptFile: self.data.url('panel.js'),
    contentStyleFile: self.data.url('panel.css'),
    onShow: handleConfigPanelShow,
    onHide: handleConfigPanelHide
});

// when the panel is shown show the current values
function handleConfigPanelShow() {
    configPanel.port.emit('set-uitour-enabled', prefService.get(prefs.UITOUR_ENABLED));
    configPanel.port.emit('set-require-secure', prefService.get(prefs.REQUIRE_SECURE));
    configPanel.port.emit('set-log-level', prefService.get(prefs.LOG_LEVEL));
    updateTestingOriginsUI();
}

// when the panel is hidden make sure the button state is also unchecked.
function handleConfigPanelHide() {
    button.state('window', {
        checked: false
    });
}

/*******************************************************
 * browser.uitour.enabled'
 */
configPanel.port.on('toggle-uitour-enabled', (state) => {
    prefService.set(prefs.UITOUR_ENABLED, state);
});


/*******************************************************
 * browser.uitour.requireSecure
 */
configPanel.port.on('toggle-require-secure', (state) => {
    prefService.set(prefs.REQUIRE_SECURE, state);
});


/*******************************************************
 * browser.uitour.testingOrigins
 */
function updateTestingOriginsUI() {
    configPanel.port.emit('set-testing-origins', utils.arrayFromCommaString(utils.getTestingOrigins()));
}

configPanel.port.on('add-to-whitelist', () => {
    const host = utils.getHostURL(tabs.activeTab.url);
    if (host) {
        const newOrigins = utils.addToCommaString(host, utils.getTestingOrigins());
        prefService.set(prefs.TESTING_ORIGINS, newOrigins);
        updateTestingOriginsUI();
    }
});

configPanel.port.on('remove-selected', (value) => {
    const newOrigins = utils.removeFromCommaString(value, utils.getTestingOrigins());
    prefService.set(prefs.TESTING_ORIGINS, newOrigins);
    updateTestingOriginsUI();
});

configPanel.port.on('remove-all', () => {
    prefService.reset(prefs.TESTING_ORIGINS);
    updateTestingOriginsUI();
});


/*******************************************************
 * browser.uitour.loglevel
 */
configPanel.port.on('change-log-level', (value) => {
    prefService.set(prefs.LOG_LEVEL, value);
});

/**
 * By AMO policy global preferences must be changed back to
 * their original value when the add-on is unloaded.
 */
unload(function(reason) {
    if (reason === 'uninstall' || reason === 'disable') {
        prefService.reset(prefs.UITOUR_ENABLED);
        prefService.reset(prefs.REQUIRE_SECURE);
        prefService.reset(prefs.TESTING_ORIGINS);
        prefService.reset(prefs.LOG_LEVEL);
    }
});
