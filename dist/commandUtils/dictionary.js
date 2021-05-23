"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getDefeninitionWord = exports.parseLang = exports.parseWord = void 0;
const axios_1 = __importDefault(require("axios"));
const Discord = __importStar(require("discord.js"));
const iso_639_1_1 = __importDefault(require("iso-639-1"));
const randomcolor_1 = __importDefault(require("randomcolor"));
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;
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
        if (languages.has(lg)) {
            return languages.get(lg);
        }
        else {
            return "";
        }
    }
    const languageConvert = iso_639_1_1.default.getName(lang).toLowerCase();
    if (lang.length == 2 && languages.has(languageConvert)) {
        return languages.get(languageConvert);
    }
    else if (languages.has(lang)) {
        return languages.get(lang).toString();
    }
    else {
        return "";
    }
}
exports.parseLang = parseLang;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getDefeninitionWord(p) {
    return __awaiter(this, void 0, void 0, function* () {
        if (p.language === "") {
            return p.msg.reply("error: language doesn't exist or not supported");
        }
        if (p.word === "") {
            return p.msg.reply("error: [word] has no input");
        }
        const embed = new Discord.MessageEmbed().setColor(randomcolor_1.default().substring(1));
        try {
            const url = `https://api.dictionaryapi.dev/api/v2/entries/${p.language}/${p.word}`;
            const data = yield axios_1.default.get(url);
            const definitionsData = data.data[0];
            let synonymBox = "";
            for (let i = 0; i < definitionsData.meanings.length; i++) {
                const word = definitionsData.word;
                const partOfSpeech = definitionsData.meanings[i].partOfSpeech;
                const definition = definitionsData.meanings[i].definitions[0].definition;
                const synonyms = definitionsData.meanings[i].definitions[0].synonyms;
                const example = definitionsData.meanings[i].definitions[0].example;
                embed.addField(`${word.replace(/^./, word[0].toUpperCase())} (${partOfSpeech}):`, `${definition}${example === undefined ? "" : `\n → *${example}*`}`);
                if (synonyms) {
                    synonymBox += synonyms;
                }
            }
            if (synonymBox != "") {
                embed.addField("Synonyms:", `${synonymBox.toString().replace(/\,/g, ", ")}.`);
            }
            return p.msg.channel.send(embed.setAuthor("Transero the Definator", avatar).setTitle("Definitions:"));
        }
        catch (e) {
            return p.msg.channel.send(embed.setDescription("Sorry there are no definition for this text, or maybe check your spelling."));
        }
    });
}
exports.getDefeninitionWord = getDefeninitionWord;
// Languages
const languages = new Map();
languages.set("englishus", "en_US");
languages.set("hindi", "hi");
languages.set("spanish", "es");
languages.set("japanese", "ja");
languages.set("french", "fr");
languages.set("russian", "ru");
languages.set("englishuk", "en_GB");
languages.set("german", "de");
languages.set("italian", "it");
languages.set("korean", "ko");
languages.set("portugese", "pt");
languages.set("arabic", "ar");
languages.set("turkish", "tr");
languages.set("english", "en_US");
//# sourceMappingURL=dictionary.js.map