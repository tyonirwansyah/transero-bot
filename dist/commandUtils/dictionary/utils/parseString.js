"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLang = exports.parseWord = void 0;
const iso_639_1_1 = __importDefault(require("iso-639-1"));
const languages_1 = require("./languages");
function parseWord(words) {
    if (words[1] === "")
        return "";
    let sentence = "";
    for (let i = 1; i < words.length; i++) {
        sentence += words[i] + "%20";
    }
    return sentence;
}
exports.parseWord = parseWord;
function parseLang(lang) {
    if (lang.startsWith("en-")) {
        const code = lang[3] + lang[4];
        const lg = "english" + code;
        if (languages_1.languages.has(lg)) {
            return languages_1.languages.get(lg);
        }
        else {
            return "";
        }
    }
    const languageConvert = iso_639_1_1.default.getName(lang).toLowerCase();
    if (lang.length == 2 && languages_1.languages.has(languageConvert)) {
        return languages_1.languages.get(languageConvert);
    }
    else if (languages_1.languages.has(lang)) {
        return languages_1.languages.get(lang).toString();
    }
    else {
        return "";
    }
}
exports.parseLang = parseLang;
//# sourceMappingURL=parseString.js.map