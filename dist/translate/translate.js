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
exports.translateMultipleText = exports.translateText = exports.avatar = void 0;
const Discord = __importStar(require("discord.js"));
const google_translate_api_1 = __importDefault(require("@vitalets/google-translate-api"));
const iso_639_1_1 = __importDefault(require("iso-639-1"));
const randomcolor_1 = __importDefault(require("randomcolor"));
const embed_1 = require("./utils/embed");
exports.avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;
function translateText(p) {
    return __awaiter(this, void 0, void 0, function* () {
        if (p.sentence === undefined)
            return;
        try {
            const trRes = yield google_translate_api_1.default(p.sentence, {
                to: p.langS,
            });
            const urlSentence = trRes.raw[1][4][0]
                .replace(/\s/g, "%20")
                .replace(/\s+/g, "")
                .trim();
            const fromLang = iso_639_1_1.default.getName(trRes.from.language.iso);
            const toLang = iso_639_1_1.default.getName(trRes.raw[1][1]);
            const fromLangRaw = trRes.from.language.iso;
            const toLangRaw = trRes.raw[1][1];
            const link = `[✦](https://translate.google.com/?sl=${fromLangRaw}&tl=${toLangRaw}&text=${urlSentence}&op=translate)`;
            const resultMessage = new Discord.MessageEmbed()
                .setColor(randomcolor_1.default().substring(1))
                .setAuthor("Transero the Super Translator", exports.avatar)
                .setFooter("Click ✦ for more details, Thanks for translating.")
                .addField(`**${fromLang}** to **${trRes.raw[1][1].startsWith("zh") ? "Chinese" : toLang}:**`, `${link} ${trRes.text.replace(/^./, trRes.text[0].toUpperCase())} ${trRes.pronunciation != null ? `\n${trRes.pronunciation}` : ""}`);
            p.msg.channel.send(resultMessage);
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.translateText = translateText;
function translateMultipleText(p) {
    var _a;
    const translationRes = [];
    let count = 0;
    (_a = p.langM) === null || _a === void 0 ? void 0 : _a.forEach((l, _v, a) => __awaiter(this, void 0, void 0, function* () {
        if (p.sentence === undefined)
            return;
        try {
            const translateSentence = yield google_translate_api_1.default(p.sentence, { to: l });
            translationRes.push(translateSentence);
            count++;
        }
        catch (e) {
            throw new Error(e);
        }
        if (count === a.length) {
            embed_1.translateMultipleTextEmbed({ translations: translationRes, msg: p.msg });
        }
    }));
}
exports.translateMultipleText = translateMultipleText;
//# sourceMappingURL=translate.js.map