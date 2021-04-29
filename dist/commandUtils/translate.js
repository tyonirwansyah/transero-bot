"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateText = exports.parseLanguage = exports.parseSentence = void 0;
const google_translate_api_1 = __importDefault(require("@vitalets/google-translate-api"));
const iso_639_1_1 = __importDefault(require("iso-639-1"));
function parseSentence(words) {
    if (words === null)
        return;
    if (words[1] === "")
        return;
    let sentence = "";
    for (let i = 1; i < words.length; i++) {
        sentence += words[i] + " ";
    }
    return sentence;
}
exports.parseSentence = parseSentence;
function parseLanguage(lang) {
    if (lang.length == 2) {
        const languageConvert = iso_639_1_1.default.getName(lang).toLowerCase();
        if (languages.has(languageConvert)) {
            return languages.get(languageConvert);
        }
        else {
            return "";
        }
    }
    if (languages.has(lang)) {
        return languages.get(lang);
    }
    else {
        return "";
    }
}
exports.parseLanguage = parseLanguage;
function translateText(sentence, lang) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const translateSentence = yield google_translate_api_1.default(sentence, { to: lang });
            return yield translateSentence;
        }
        catch (error) {
            return console.error(error);
        }
    });
}
exports.translateText = translateText;
// All languages Map
let languages = new Map();
languages.set("afrikaans", "af");
languages.set("albanian", "sq");
languages.set("amharic", "am");
languages.set("arabic", "ar");
languages.set("armenian", "hy");
languages.set("azerbaijani", "az");
languages.set("basque", "eu");
languages.set("belarusian", "be");
languages.set("bengali", "bn");
languages.set("bosnian", "bs");
languages.set("bulgarian", "bg");
languages.set("catalan", "ca");
languages.set("cebuano", "ceb");
languages.set("chinese", "zh");
languages.set("corsican", "co");
languages.set("croatian", "hr");
languages.set("czech", "cs");
languages.set("danish", "da");
languages.set("dutch", "nl");
languages.set("english", "en");
languages.set("esperanto", "eo");
languages.set("estonian", "et");
languages.set("finnish", "fi");
languages.set("french", "fr");
languages.set("frisian", "fy");
languages.set("galician", "gl");
languages.set("georgian", "ka");
languages.set("german", "de");
languages.set("greek", "el");
languages.set("gujarati", "gu");
languages.set("haitian creole", "ht");
languages.set("hausa", "ha");
languages.set("hawaiian", "haw");
languages.set("hebrew", "he");
languages.set("hindi", "hi");
languages.set("hmong", "hmn");
languages.set("hungarian", "hu");
languages.set("icelandic", "is");
languages.set("igbo", "ig");
languages.set("indonesian", "id");
languages.set("irish", "ga");
languages.set("italian", "it");
languages.set("japanese", "ja");
languages.set("javanese", "jv");
languages.set("kannada", "kn");
languages.set("kazakh", "kk");
languages.set("khmer", "km");
languages.set("kinyarwanda", "rw");
languages.set("korean", "ko");
languages.set("kurdish", "ku");
languages.set("kyrgyz", "ky");
languages.set("lao", "lo");
languages.set("latin", "la");
languages.set("latvian", "lv");
languages.set("lithuanian", "lt");
languages.set("luxembourgish", "lb");
languages.set("macedonian", "mk");
languages.set("malagasy", "mg");
languages.set("malay", "ms");
languages.set("malayalam", "ml");
languages.set("maltese", "mt");
languages.set("maori", "mi");
languages.set("marathi", "mr");
languages.set("mongolian", "mn");
languages.set("burmese", "my");
languages.set("nepali", "ne");
languages.set("norwegian", "no");
languages.set("nyanja", "ny");
languages.set("odia", "or");
languages.set("pashto", "ps");
languages.set("persian", "fa");
languages.set("polish", "pl");
languages.set("portuguese", "pt");
languages.set("punjabi", "pa");
languages.set("romanian", "ro");
languages.set("russian", "ru");
languages.set("samoan", "sm");
languages.set("scots", "gd");
languages.set("serbian", "sr");
languages.set("sesotho", "st");
languages.set("shona", "sn");
languages.set("sindhi", "sd");
languages.set("sinhalese", "si");
languages.set("slovak", "sk");
languages.set("slovenian", "sl");
languages.set("somali", "so");
languages.set("spanish", "es");
languages.set("sundanese", "su");
languages.set("swahili", "sw");
languages.set("swedish", "sv");
languages.set("tagalog", "tl");
languages.set("tajik", "tg");
languages.set("tamil", "ta");
languages.set("tatar", "tt");
languages.set("telugu", "te");
languages.set("thai", "th");
languages.set("turkish", "tr");
languages.set("turkmen", "tk");
languages.set("ukrainian", "uk");
languages.set("urdu", "ur");
languages.set("uyghur", "ug");
languages.set("uzbek", "uz");
languages.set("vietnamese", "vi");
languages.set("welsh", "cy");
languages.set("xhosa", "xh");
languages.set("yiddish", "yi");
languages.set("yoruba", "yo");
languages.set("zulu", "zu");
//# sourceMappingURL=translate.js.map