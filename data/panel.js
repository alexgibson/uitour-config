/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const enableUITour = document.getElementById('enable-uitour');
const disableUITour = document.getElementById('disable-uitour');
const enableRequireSecure = document.getElementById('enable-require-secure');
const disableRequireSecure = document.getElementById('disable-require-secure');
const addToWhitelist = document.getElementById('add-to-whitelist');
const whitelist = document.getElementById('whitelist');

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
    if (array.length) {
        
        // Clear the current list of options before updating from array.
        for (let i = 0; i < whitelist.options.length; i++) {
            whitelist.options[i] = null;
        }

        array.forEach((index) => {
            const option = document.createElement('option');
            option.value = index;
            option.innerText = index;
            whitelist.appendChild(option);
        });
    }
});

addToWhitelist.addEventListener('click', () => {
    self.port.emit('add-to-whitelist');
});
