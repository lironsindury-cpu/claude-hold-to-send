// ==UserScript==
// @name         Claude Hold to Send
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Auto-click send button when it becomes active on claude.ai
// @match        https://claude.ai/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let holding = false;

    document.addEventListener('mousedown', function(e) {
        const btn = e.target.closest('button[aria-label="Send message"]');
        if (!btn) return;
        if (btn.disabled) {
            holding = true;
            e.preventDefault();

            const observer = new MutationObserver(() => {
                if (!btn.disabled && holding) {
                    btn.click();
                    holding = false;
                    observer.disconnect();
                }
            });

            observer.observe(btn, { attributes: true });
        }
    });

    document.addEventListener('mouseup', function() {
        holding = false;
    });
})();
