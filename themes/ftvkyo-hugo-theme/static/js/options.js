"use strict";

// Change the language
function changeLanguage(language) {
    if (language === "en") {
        location = "/";
    } else if (language === "ru") {
        location = "/ru/";
    }
}

const LANGUAGES = ["en", "ru"];

// Load the current language based on location
function loadLanguage() {
    let langCurrent = window.location.pathname.split("/")[1];
    let langSelector = document.querySelector(".options select[name='language']");

    if (LANGUAGES.indexOf(langCurrent) === -1) {
        // The default language is English
        langCurrent = "en";
    }
    langSelector.value = langCurrent;
}

// Run the loadLanguage function after the page is loaded
window.addEventListener("load", loadLanguage);
