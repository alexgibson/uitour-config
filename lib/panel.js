/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const { Panel } = require('sdk/panel');
const config = require('lib/config');
const prefs = require('lib/prefs');
const prefService = require('sdk/preferences/service');
const self = require('sdk/self');
const tabs = require('sdk/tabs');
const utils = require('lib/utils');

const panel = Panel({
    width: config.panelWidth,
    height: config.panelHeight,
    contentURL: self.data.url('panel.html'),
    contentScriptFile: self.data.url('panel.js'),
    contentStyleFile: self.data.url('panel.css'),
    onShow: handlePanelShow
});

// when the panel is shown show the current values
function handlePanelShow() {
    panel.port.emit('set-uitour-enabled', prefService.get(prefs.UITOUR_ENABLED));
    panel.port.emit('set-require-secure', prefService.get(prefs.REQUIRE_SECURE));
    panel.port.emit('set-log-level', prefService.get(prefs.LOG_LEVEL));
    updateTestingOriginsUI();
}

/*******************************************************
 * browser.uitour.enabled'
 */
panel.port.on('toggle-uitour-enabled', (state) => {
    prefService.set(prefs.UITOUR_ENABLED, state);
});

/*******************************************************
 * browser.uitour.requireSecure
 */
panel.port.on('toggle-require-secure', (state) => {
    prefService.set(prefs.REQUIRE_SECURE, state);
});

/*******************************************************
 * browser.uitour.testingOrigins
 */
function updateTestingOriginsUI() {
    panel.port.emit('set-testing-origins', utils.arrayFromCommaString(prefs.getTestingOrigins()));
}

panel.port.on('add-to-whitelist', () => {
    const host = utils.getHostURL(tabs.activeTab.url);
    if (host) {
        const newOrigins = utils.addToCommaString(host, prefs.getTestingOrigins());
        prefService.set(prefs.TESTING_ORIGINS, newOrigins);
        updateTestingOriginsUI();
    }
});

panel.port.on('remove-selected', (value) => {
    const newOrigins = utils.removeFromCommaString(value, prefs.getTestingOrigins());
    prefService.set(prefs.TESTING_ORIGINS, newOrigins);
    updateTestingOriginsUI();
});

panel.port.on('remove-all', () => {
    prefService.reset(prefs.TESTING_ORIGINS);
    updateTestingOriginsUI();
});

/*******************************************************
 * browser.uitour.loglevel
 */
panel.port.on('change-log-level', (value) => {
    prefService.set(prefs.LOG_LEVEL, value);
});

module.exports = panel;
