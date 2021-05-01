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
exports.disableHoldingCommand = exports.initializeQuiz = exports.initializeTranslator = void 0;
const Discord = __importStar(require("discord.js"));
const transL = __importStar(require("./commandUtils/translate"));
const quizL = __importStar(require("./commandUtils/quiz"));
const randomcolor_1 = __importDefault(require("randomcolor"));
const iso_639_1_1 = __importDefault(require("iso-639-1"));
// For Message Embed
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;
let holdingQuizCommand = false;
// Translate Command
function initializeTranslator(param) {
    // Translator variables
    let sentence;
    let language;
    let translatedRes;
    //
    if (param.command === "tr") {
        if (param.argm.length <= 0) {
            return param.msg.reply("error: missing [language] [sentence]");
        }
        sentence = transL.parseSentence(param.argm);
        language = transL.parseLanguage(param.argm[0].toLowerCase());
        if (sentence.length <= 0) {
            return param.msg.reply("error: missing [sentence]");
        }
        if (language === "") {
            return param.msg.reply("error: language doesn't exist or not supported");
        }
        transL
            .translateText(sentence, language)
            .then((d) => {
            translatedRes = d;
            const urlSentence = sentence
                .replace(/\s/g, "%20")
                .replace(/\s+/g, "")
                .trim();
            const fromLanguage = translatedRes.from.language.iso;
            const resultMessage = new Discord.MessageEmbed()
                .setColor(randomcolor_1.default().substring(1))
                .setAuthor("Transero the Great", avatar)
                .setTitle("Translate:")
                .setDescription(`**${iso_639_1_1.default.getName(fromLanguage)}** to **${iso_639_1_1.default.getName(language)}**`)
                .addField("From:", sentence)
                .addField("To:", translatedRes.text)
                .addField("More Details:", `[Google Translate](https://translate.google.com/?sl=${fromLanguage}&tl=${language}&text=${urlSentence}&op=translate)`);
            param.msg.channel.send(resultMessage);
        })
            .catch((e) => console.error(e));
    }
}
exports.initializeTranslator = initializeTranslator;
// Quiz Command
function initializeQuiz(param, client) {
    // Variable
    let notAnswered = true;
    let quizMsgId;
    //
    if (param.command === "trquiz") {
        const pickQuiz = new Discord.MessageEmbed()
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .setTitle("Pick a Quiz:")
            .setDescription("Pick a quiz to start rolling.")
            .addFields({
            name: "Guess the country flag  📠",
            value: "I'll show a flag and you will guess what country is it.",
        }, {
            name: "Guess the capital city  🗽",
            value: "I'll show a country and you will guess the capital city.",
        }, {
            name: "Guess the country  👨‍🦯",
            value: "I'll show a city and you will guess the country.",
        }, {
            name: "How to Play?",
            value: "Start by reacting to the **emoji** you are going to play.",
        });
        param.msg.channel.send(pickQuiz).then((message) => {
            message.react("📠");
            message.react("🗽");
            message.react("👨‍🦯");
            quizMsgId = message.id;
        });
        const listener = (reaction, user) => {
            if (user.bot)
                return;
            const emojiName = reaction.emoji.name;
            if (reaction.message.id === quizMsgId && notAnswered) {
                switch (emojiName) {
                    case "📠":
                        param.msg.channel.send(pickQuizEmbed("Picked Country Flag Quiz."));
                        quizL.countryFlagQuiz({ msg: param.msg, client: client });
                        notAnswered = false;
                        holdingQuizCommand = true;
                        param.msg.client.removeListener("messageReactionAdd", listener);
                        break;
                    case "🗽":
                        param.msg.channel.send(pickQuizEmbed("Picked Capital City Quiz."));
                        quizL.capitalCityQuiz({ msg: param.msg, client: client });
                        notAnswered = false;
                        holdingQuizCommand = true;
                        param.msg.client.removeListener("messageReactionAdd", listener);
                        break;
                    case "👨‍🦯":
                        param.msg.channel.send(pickQuizEmbed("Picked Country Quiz."));
                        quizL.countryCapitalQuiz({ msg: param.msg, client: client });
                        notAnswered = false;
                        holdingQuizCommand = true;
                        param.msg.client.removeListener("messageReactionAdd", listener);
                        break;
                }
            }
        };
        param.msg.client.on("messageReactionAdd", listener);
    }
    else if (param.command === "trquiz" && holdingQuizCommand) {
        return param.msg.channel.send(pickQuizEmbed("Game currently running."));
    }
}
exports.initializeQuiz = initializeQuiz;
function disableHoldingCommand(input) {
    holdingQuizCommand = input;
}
exports.disableHoldingCommand = disableHoldingCommand;
function pickQuizEmbed(message) {
    return new Discord.MessageEmbed()
        .setColor("674771")
        .setAuthor("Transero the Quiz Whizz", avatar)
        .setDescription(message);
}
//# sourceMappingURL=commands.js.map