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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateMultipleTextEmbed = void 0;
const Discord = __importStar(require("discord.js"));
const iso_639_1_1 = __importDefault(require("iso-639-1"));
const randomcolor_1 = __importDefault(require("randomcolor"));
const translate_1 = require("./translate");
function translateMultipleTextEmbed(p) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Translations:")
        .setAuthor("Transero the Super Translator", translate_1.avatar)
        .setFooter("Click ✦ for more details, Thanks for translating.")
        .setColor(randomcolor_1.default().substring(1));
    p.translations.forEach((tr, val, arr) => {
        const fromLang = iso_639_1_1.default.getName(tr.from.language.iso);
        const toLang = iso_639_1_1.default.getName(tr.raw[1][1]);
        const fromLangRaw = tr.from.language.iso;
        const toLangRaw = tr.raw[1][1];
        const urlSentence = tr.raw[1][4][0].replace(/\s/g, "%20").trim();
        const link = `[✦](https://translate.google.com/?sl=${fromLangRaw}&tl=${toLangRaw}&text=${urlSentence}&op=translate)`;
        embed.addField(`${fromLang} to ${toLang}:`, `${link} ${tr.text.replace(/^./, tr.text[0].toUpperCase())} ${tr.pronunciation != null ? `\n${tr.pronunciation}` : ""}`);
        if (val + 1 === arr.length) {
            p.msg.channel.send(embed);
        }
    });
}
exports.translateMultipleTextEmbed = translateMultipleTextEmbed;
//# sourceMappingURL=embed.js.map