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
exports.countryCapitalQuiz = exports.capitalCityQuiz = exports.countryFlagQuiz = void 0;
const Discord = __importStar(require("discord.js"));
const country = __importStar(require("country-quiz"));
const randomcolor_1 = __importDefault(require("randomcolor"));
const iso_3166_1_1 = __importDefault(require("iso-3166-1"));
// Message Embed Variables
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;
// Quiz Selections
let FlagtoCountry = country.newQuiz("flag-to-country", 1);
let CountrytoCity = country.newQuiz("country-to-capital", 1);
let CitytoCountry = country.newQuiz("capital-to-country", 1);
// Is Playing?
let isPlaying = true;
// Flag to Country
function countryFlagQuiz(p) {
    let notAnswered = true;
    FlagtoCountry = country.newQuiz("flag-to-country");
    const quiz = FlagtoCountry;
    quizQuestionEmbed({
        quiz: quiz,
        quizQ: quiz.questions[0],
        typeQuiz: 0,
        msg: p.msg,
        imgUrl: quiz.questions[0].question,
    });
    const listener = (reaction, user) => {
        if (user.bot)
            return;
        const emojiName = reaction.emoji.name;
        const fetchMessage = p.msg.channel.lastMessage.id;
        if (reaction.message.id === fetchMessage && notAnswered) {
            const answerKey = quiz.questions[0];
            checkAnswers({
                msg: p.msg,
                client: p.client,
                answerKey: answerKey,
                emoji: emojiName,
                listener: listener,
                gameMode: 0,
            });
            notAnswered = false;
        }
    };
    p.client.on("messageReactionAdd", listener);
}
exports.countryFlagQuiz = countryFlagQuiz;
// Country to City
function capitalCityQuiz(p) {
    let notAnswered = true;
    CountrytoCity = country.newQuiz("country-to-capital");
    const quiz = CountrytoCity;
    quizQuestionEmbed({
        quiz: quiz,
        quizQ: quiz.questions[0],
        typeQuiz: 1,
        msg: p.msg,
    });
    const listener = (reaction, user) => {
        if (user.bot)
            return;
        const emojiName = reaction.emoji.name;
        const fetchMessage = p.msg.channel.lastMessage.id;
        if (reaction.message.id === fetchMessage && notAnswered) {
            const answerKey = quiz.questions[0];
            checkAnswers({
                msg: p.msg,
                client: p.client,
                answerKey: answerKey,
                emoji: emojiName,
                listener: listener,
                gameMode: 1,
            });
            notAnswered = false;
        }
    };
    p.client.on("messageReactionAdd", listener);
}
exports.capitalCityQuiz = capitalCityQuiz;
// City to Country
function countryCapitalQuiz(p) {
    let notAnswered = true;
    CitytoCountry = country.newQuiz("capital-to-country");
    const quiz = CitytoCountry;
    quizQuestionEmbed({
        quiz: quiz,
        quizQ: quiz.questions[0],
        typeQuiz: 2,
        msg: p.msg,
    });
    const listener = (reaction, user) => {
        if (user.bot)
            return;
        const emojiName = reaction.emoji.name;
        const fetchMessage = p.msg.channel.lastMessage.id;
        if (reaction.message.id === fetchMessage && notAnswered) {
            const answerKey = quiz.questions[0];
            checkAnswers({
                msg: p.msg,
                client: p.client,
                answerKey: answerKey,
                emoji: emojiName,
                listener: listener,
                gameMode: 2,
            });
            notAnswered = false;
        }
    };
    p.client.on("messageReactionAdd", listener);
}
exports.countryCapitalQuiz = countryCapitalQuiz;
/// Local Funcssss ///
// Convert to png
function flagToPng(url) {
    const countryIso = url.substring(30).replace(".svg", "");
    const isoCode = iso_3166_1_1.default.whereAlpha3(countryIso);
    const newUrl = `https://flagcdn.com/w160/${isoCode === undefined ? "" : isoCode.alpha2.toLowerCase()}.png`;
    return newUrl;
}
// Verify Answer
function verifyAnswer(p) {
    if (p.answer === p.input) {
        return answerEmbed({
            isRight: true,
            msg: p.msg,
            gameMode: p.gameMode,
        });
    }
    else if (p.answer != p.input) {
        return answerEmbed({
            isRight: false,
            msg: p.msg,
            answer: p.answer.toUpperCase(),
            gameMode: p.gameMode,
        });
    }
}
function answerEmbed(p) {
    let messageId;
    if (p.isRight === true) {
        const embed = new Discord.MessageEmbed()
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .setDescription("You got the right answer.");
        return p.msg.channel
            .send(embed)
            .then((message) => {
            message.react("🚫");
            message.react("⏭");
            messageId = message.id;
            continueQuiz({
                Id: messageId,
                client: p.msg.client,
                msg: p.msg,
                gameMode: p.gameMode,
            });
        })
            .catch((e) => {
            console.error(e);
        });
    }
    else {
        const embed = new Discord.MessageEmbed()
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .setDescription("You got the wrong answer.")
            .setFooter(`The answer is ${"**" + p.answer + "**"}`);
        return p.msg.channel
            .send(embed)
            .then((message) => {
            message.react("🚫");
            message.react("⏭");
            messageId = message.id;
            continueQuiz({
                Id: messageId,
                client: p.msg.client,
                msg: p.msg,
                gameMode: p.gameMode,
            });
        })
            .catch((e) => {
            console.error(e);
        });
    }
}
function continueQuiz(p) {
    const listener = (reaction, user) => {
        if (user.bot)
            return;
        const emojiName = reaction.emoji.name;
        if (reaction.message.id === p.Id) {
            switch (emojiName) {
                case "⏭":
                    if (p.gameMode === 0)
                        return countryFlagQuiz({ client: p.client, msg: p.msg });
                    if (p.gameMode === 1)
                        return capitalCityQuiz({ client: p.client, msg: p.msg });
                    if (p.gameMode === 2)
                        return countryCapitalQuiz({ client: p.client, msg: p.msg });
                    p.client.removeListener("messageReactionAdd", listener);
                    break;
                case "🚫":
                    p.client.removeListener("messageReactionAdd", listener);
                    break;
            }
        }
    };
    return p.client.on("messageReactionAdd", listener);
}
function quizQuestionEmbed(p) {
    if (!isPlaying)
        return;
    let embed = new Discord.MessageEmbed()
        .setColor(randomcolor_1.default().substring(1))
        .setAuthor("Transero the Quiz Whizz", avatar)
        .setTitle(`Question:`);
    // 0 == Flag Country Flag Quiz
    if (p.typeQuiz === 0) {
        const option = p.quizQ.options;
        const url = flagToPng(p.imgUrl);
        return p.msg.channel
            .send(embed
            .setDescription("What Country is this flag from?")
            .setThumbnail(url)
            .addField("Answers", `1) ${option[0]}\n 2) ${option[1]}\n 3) ${option[2]}\n 4) ${option[3]}\n`)
            .addField("Cannot See Image?", `[Click Here to See.](${p.imgUrl})`)
            .setFooter("React to one of the icon below!"))
            .then((message) => {
            message.react("1️⃣");
            message.react("2️⃣");
            message.react("3️⃣");
            message.react("4️⃣");
        })
            .catch((e) => console.error(e));
    }
    // 1 == Capital City Quiz
    if (p.typeQuiz === 1) {
        const option = p.quizQ.options;
        return p.msg.channel
            .send(embed
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .setDescription(`What is the capital city of **${p.quizQ.question}**?`)
            .addField("Answers", `1) ${option[0]}\n 2) ${option[1]}\n 3) ${option[2]}\n 4) ${option[3]}\n`)
            .setFooter("React to one of the icon below!"))
            .then((message) => {
            message.react("1️⃣");
            message.react("2️⃣");
            message.react("3️⃣");
            message.react("4️⃣");
        })
            .catch((e) => console.error(e));
    }
    // 2 == Country Quiz
    if (p.typeQuiz === 2) {
        const option = p.quizQ.options;
        return p.msg.channel
            .send(embed
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .setDescription(`What country is **${p.quizQ.question}** in?`)
            .addField("Answers", `1) ${option[0]}\n 2) ${option[1]}\n 3) ${option[2]}\n 4) ${option[3]}\n`)
            .setFooter("React to one of the icon below!"))
            .then((message) => {
            message.react("1️⃣");
            message.react("2️⃣");
            message.react("3️⃣");
            message.react("4️⃣");
        })
            .catch((e) => console.error(e));
    }
    else {
        return console.error("[typeQuiz] only accept number from 0-2");
    }
}
function checkAnswers(p) {
    const { options, answer } = p.answerKey;
    switch (p.emoji) {
        case "1️⃣":
            verifyAnswer({
                answer: answer,
                input: options[0],
                msg: p.msg,
                gameMode: p.gameMode,
            });
            p.client.removeListener("messageReactionAdd", p.listener);
            break;
        case "2️⃣":
            verifyAnswer({
                answer: answer,
                input: options[1],
                msg: p.msg,
                gameMode: p.gameMode,
            });
            p.client.removeListener("messageReactionAdd", p.listener);
            break;
        case "3️⃣":
            verifyAnswer({
                answer: answer,
                input: options[2],
                msg: p.msg,
                gameMode: p.gameMode,
            });
            p.client.removeListener("messageReactionAdd", p.listener);
            break;
        case "4️⃣":
            verifyAnswer({
                answer: answer,
                input: options[3],
                msg: p.msg,
                gameMode: p.gameMode,
            });
            p.client.removeListener("messageReactionAdd", p.listener);
            break;
    }
}
//# sourceMappingURL=quiz.js.map