// ==UserScript==
// @name         navi!direct
// @namespace    https://github.com/lainmaxxer/navigame
// @version      1.0.0
// @description  Adds a navi!direct button next to osu!direct on beatmap pages, to open the beatmap in navi
// @author       lainmaxxer (based on nekiosu!direct by brandwagen)
// @match        https://osu.ppy.sh/*
// @grant        none
// @license      MIT
// @homepageURL  https://github.com/lainmaxxer/navigame
// @downloadURL  https://raw.githubusercontent.com/lainmaxxer/navigame/main/navi-direct/navi-direct.user.js
// @updateURL    https://raw.githubusercontent.com/lainmaxxer/navigame/main/navi-direct/navi-direct.user.js
// ==/UserScript==

// Based on nekiosu!direct 1.0.5 by brandwagen (MIT). The button opens navi://b/<difficulty> (the selected difficulty) or
// navi://s/<set> through the navi:// link navi registers, and is placed after the osu!direct button of the beatmap header.

(function () {
    'use strict';

    const ID = "navi-direct";
    const SCHEME = "navi";
    const LOGO_URL = "data:image/png;base64,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";

    const TEMPLATE = `<a class="btn-osu-big btn-osu-big--beatmapset-header " href="${SCHEME}://b/0" id="${ID}"><span class="btn-osu-big__content"><span class="btn-osu-big__left"><span class="btn-osu-big__text-top">navi!direct</span></span><span class="btn-osu-big__icon"><img src="${LOGO_URL}" alt="" style="width:26px;height:26px;display:block;object-fit:contain;transform:scale(1.3)"></span></span></a>`;

    function findAnchor() {
        const row = document.querySelector(".beatmapset-header__buttons");
        if (!row) return null;

        const direct = row.querySelector('a.btn-osu-big[href^="osu://"]');
        if (direct) return direct;

        return [...row.querySelectorAll(".btn-osu-big")]
            .find(el => el.id !== ID && /sign\s*in/i.test(el.textContent)) || null;
    }

    function getLink() {
        const set = location.pathname.match(/^\/beatmapsets\/(\d+)/)?.[1];
        if (!set) return null;
        const diff = location.hash.match(/^#\w+\/(\d+)/)?.[1];
        return diff ? `${SCHEME}://b/${diff}` : `${SCHEME}://s/${set}`;
    }

    function createButton() {
        const t = document.createElement("template");
        t.innerHTML = TEMPLATE.trim();
        const btn = t.content.firstElementChild;
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const link = getLink();
            if (link) btn.setAttribute("href", link);
        }, true);
        return btn;
    }

    function inject() {
        const link = getLink();
        const anchor = findAnchor();
        if (!link || !anchor) return;

        const btn = document.getElementById(ID) || createButton();
        if (btn.getAttribute("href") !== link) btn.setAttribute("href", link);
        if (anchor.nextElementSibling !== btn) anchor.after(btn);
    }

    let queued = false;
    function schedule() {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => { queued = false; inject(); });
    }

    new MutationObserver(schedule).observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
    document.addEventListener("turbo:render", schedule);
    document.addEventListener("turbo:load", schedule);
    window.addEventListener("hashchange", schedule);
    schedule();
})();
