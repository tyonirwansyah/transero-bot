"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMultiLanguages = exports.parseLanguage = exports.parseSentence = void 0;
const iso_639_1_1 = __importDefault(require("iso-639-1"));
const languages_1 = require("./languages");
function parseSentence(words, parseNum = 1) {
    if (words === null)
        return "";
    if (words === undefined)
        return "";
    if (words[1] === "")
        return "";
    let sentence = "";
    for (let i = parseNum; i < words.length; i++) {
        sentence += words[i] + " ";
    }
    return sentence;
}
exports.parseSentence = parseSentence;
function parseLanguage(lang) {
    // Chinese => Traditional or Simplified
    if (lang.startsWith("zh")) {
        let words;
        const capitalize = lang.slice(3, 5) === "cn" || "tw" ? lang.slice(3, 5).toUpperCase() : "";
        const word = lang.slice(0, 3);
        if (capitalize === "TW" || capitalize === "CN") {
            words = word + capitalize;
            return words;
        }
        return "";
    }
    // Main Code
    const languageConvert = iso_639_1_1.default.getName(lang).toLowerCase();
    if (lang.length == 2 && languages_1.languages.has(languageConvert)) {
        return languages_1.languages.get(languageConvert);
    }
    else if (languages_1.languages.has(lang)) {
        return languages_1.languages.get(lang);
    }
    else {
        return "";
    }
}
exports.parseLanguage = parseLanguage;
function parseMultiLanguages(lang, amountLang) {
    let langs = [];
    for (let i = 1; i < amountLang + 1; i++) {
        langs.push(lang === null || lang === void 0 ? void 0 : lang[i]);
    }
    langs.forEach((lang, val) => {
        const languageConvert = iso_639_1_1.default.getName(lang).toLowerCase();
        if (lang.length == 2 && languages_1.languages.has(languageConvert)) {
            return (langs[val] = languages_1.languages.get(languageConvert));
        }
        else if (languages_1.languages.has(lang)) {
            return (langs[val] = languages_1.languages.get(lang));
        }
        else {
            return (langs = [""]);
        }
    });
    return langs;
}
exports.parseMultiLanguages = parseMultiLanguages;
//# sourceMappingURL=parseString.js.map