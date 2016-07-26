/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const enableUITour = document.getElementById('enable-uitour');
const disableUITour = document.getElementById('disable-uitour');
const enableRequireSecure = document.getElementById('enable-require-secure');
const disableRequireSecure = document.getElementById('disable-require-secure');
const whitelist = document.getElementById('whitelist');
const addCurrentSite = document.getElementById('add-current-site');
const removeSelected = document.getElementById('remove-selected');
const removeAll = document.getElementById('remove-all');

enableUITour.addEventListener('change', () => {
    self.port.emit('toggle-uitour-enabled', true);
});

disableUITour.addEventListener('change', () => {
    self.port.emit('toggle-uitour-enabled', false);
});

self.port.on('set-uitour-enabled', (state) => {
    if (state) {
        enableUITour.checked = true;
    } else {
        disableUITour.checked = true;
    }
});

enableRequireSecure.addEventListener('change', () => {
    self.port.emit('toggle-require-secure', true);
});

disableRequireSecure.addEventListener('change', () => {
    self.port.emit('toggle-require-secure', false);
});

self.port.on('set-require-secure', (state) => {
    if (state) {
        enableRequireSecure.checked = true;
    } else {
        disableRequireSecure.checked = true;
    }
});

self.port.on('set-testing-origins', (array) => {
    // Clear the current list of origins before updating.
    while (whitelist.options.length) {
        whitelist.remove(0);
    }

    if (array.length) {
        array.forEach((index) => {
            const option = document.createElement('option');
            option.value = index;
            option.innerText = index;
            whitelist.appendChild(option);
        });
    }
});

addCurrentSite.addEventListener('click', () => {
    self.port.emit('add-to-whitelist');
});

removeSelected.addEventListener('click', () => {
    const selected = whitelist.options[whitelist.selectedIndex].value;
    if (selected) {
        self.port.emit('remove-selected', selected);
    }
});

removeAll.addEventListener('click', () => {
    self.port.emit('remove-all');
});
