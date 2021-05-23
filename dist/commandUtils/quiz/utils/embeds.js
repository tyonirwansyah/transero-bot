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
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerEmbed = exports.quizQuestionEmbed = void 0;
const Discord = __importStar(require("discord.js"));
const quiz_1 = require("../quiz");
function quizQuestionEmbed(p) {
    const option = p.quizQ.options;
    const url = quiz_1.flagToPng(p.imgUrl);
    const optionsText = `1) ${option[0]}\n 2) ${option[1]}\n 3) ${option[2]}\n 4) ${option[3]}\n`;
    // 0 == Flag Country Flag Quiz
    if (p.typeQuiz === quiz_1.gameMode.FLAGTOCOUNTRY) {
        return quizQuestionEmbedSend({
            color: "1CCAD8",
            question: "What Country is this flag from?",
            options: optionsText,
            msg: p.msg,
            thumbnail: url,
            newField: `[Click Here to See.](${p.imgUrl})`,
        });
    }
    // 1 == Capital City Quiz
    if (p.typeQuiz === quiz_1.gameMode.COUNTRYTOCITY) {
        return quizQuestionEmbedSend({
            color: "840032",
            question: `What is the capital city of **${p.quizQ.question}**?`,
            options: optionsText,
            msg: p.msg,
        });
    }
    // 2 == Country Quiz
    if (p.typeQuiz === quiz_1.gameMode.CITYTOCOUNTRY) {
        return quizQuestionEmbedSend({
            color: "87F5FB",
            question: `What country is **${p.quizQ.question}** in?`,
            options: optionsText,
            msg: p.msg,
        });
    }
    else {
        return console.error("[typeQuiz] only accept number from 0-2");
    }
}
exports.quizQuestionEmbed = quizQuestionEmbed;
function quizQuestionEmbedSend(p) {
    const embed = new Discord.MessageEmbed()
        .setAuthor("Transero the Quiz Whizz", quiz_1.avatar)
        .setTitle(`Question:`)
        .setColor(p.color)
        .setDescription(p.question)
        .addField("Answers", p.options)
        .setFooter("React to one of the icon below!");
    if (p.thumbnail && p.newField) {
        embed.addField("Cannot See Image?", p.newField).setThumbnail(p.thumbnail);
    }
    return p.msg.channel
        .send(embed)
        .then((message) => {
        message.react("1️⃣");
        message.react("2️⃣");
        message.react("3️⃣");
        message.react("4️⃣");
    })
        .catch((e) => console.error(e));
}
function answerEmbed(p) {
    if (p.isRight === true) {
        const embed = new Discord.MessageEmbed()
            .setColor("317B22")
            .setAuthor("Transero the Quiz Whizz", quiz_1.avatar)
            .setDescription("You got the right answer.");
        return quiz_1.listenContinueAnswers({
            msg: p.msg,
            client: p.client,
            embed: embed,
            gameMode: p.gameMode,
        });
    }
    else {
        const embed = new Discord.MessageEmbed()
            .setColor("B33F62")
            .setAuthor("Transero the Quiz Whizz", quiz_1.avatar)
            .setDescription("You got the wrong answer.")
            .setFooter(`The answer is ${"**" + p.answer + "**"}`);
        return quiz_1.listenContinueAnswers({
            msg: p.msg,
            client: p.client,
            embed: embed,
            gameMode: p.gameMode,
        });
    }
}
exports.answerEmbed = answerEmbed;
//# sourceMappingURL=embeds.js.map