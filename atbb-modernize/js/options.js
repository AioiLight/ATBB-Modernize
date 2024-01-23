const defaultOptions = {
    smooth: true,
    sans_serif: true,
    search: "direct",
    remove_editheader: true
};

document.addEventListener("DOMContentLoaded", () => {
    document.title = chrome.i18n.getMessage("options_title");

    i18n("title");

    i18n("desc_enter_search");
    i18n("desc_sticky_stats");
    i18n("desc_sticky_checking");

    i18n("desc_smooth");
    i18n("desc_sans_serif");

    i18n("desc_search");
    i18n("desc_search_direct");
    i18n("desc_search_number");
    i18n("desc_search_none");

    i18n("desc_remove_editheader");

    i18nV("text_submit");
    i18nV("text_reset");

    document.querySelector(".text_submit").addEventListener("click", () => {
        saveOptions();

        const e = document.querySelector(".options-status");
        e.innerHTML = chrome.i18n.getMessage("options_text_saved");
        setTimeout(() => {
            e.innerHTML = "";
        }, 3000);
    });

    document.querySelector(".text_reset").addEventListener("click", () => {
        const e = document.querySelector(".options-status");
        e.innerHTML = chrome.i18n.getMessage("options_text_resetted");
        setTimeout(() => {
            e.innerHTML = "";
        }, 3000);

        resetOptions();
    });

    restoreOptions();
});

function i18n(key) {
    document.querySelector("." + key).innerHTML += chrome.i18n.getMessage("options_" + key);
}

function i18nV(key) {
    document.querySelector("." + key).value = chrome.i18n.getMessage("options_" + key);
}

function setOC(key, value) {
    document.querySelector("#" + key).checked = value;
}

function setOV(key, value) {
    document.querySelector("#" + key).value = value;
}

function setOR(name, value) {
    document.querySelector("[name=" + name + "][value=" + value + "]").checked = true
}

function restoreOptions() {
    chrome.storage.sync.get(
        defaultOptions,
        (items) => {
            setOptions(items)
        }
    )
}

function saveOptions() {
    chrome.storage.sync.set(buildOptions());
}

function resetOptions() {
    setOptions(defaultOptions);
    chrome.storage.sync.set(defaultOptions);
}

function setOptions(options) {
    setOC("smooth", options.smooth);
    setOC("sans_serif", options.sans_serif);
    setOR("search", options.search);
    setOC("remove_editheader", options.remove_editheader);
}

function buildOptions() {
    return {
        smooth: document.querySelector("#smooth").checked,
        sans_serif: document.querySelector("#sans_serif").checked,
        search: document.querySelector("[name=search]:checked").value,
        remove_editheader: document.querySelector("#remove_editheader").checked
    };
}