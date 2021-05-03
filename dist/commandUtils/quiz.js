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
const iso_3166_1_1 = __importDefault(require("iso-3166-1"));
// Message Embed Variables
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;
// Quiz Selections
let FlagtoCountry = country.newQuiz("flag-to-country", 1);
let CountrytoCity = country.newQuiz("country-to-capital", 1);
let CitytoCountry = country.newQuiz("capital-to-country", 1);
var gameMode;
(function (gameMode) {
    gameMode[gameMode["FLAGTOCOUNTRY"] = 0] = "FLAGTOCOUNTRY";
    gameMode[gameMode["COUNTRYTOCITY"] = 1] = "COUNTRYTOCITY";
    gameMode[gameMode["CITYTOCOUNTRY"] = 2] = "CITYTOCOUNTRY";
})(gameMode || (gameMode = {}));
// Flag to Country
function countryFlagQuiz(p) {
    FlagtoCountry = country.newQuiz("flag-to-country");
    const quiz = FlagtoCountry;
    quizQuestionEmbed({
        quiz: quiz,
        quizQ: quiz.questions[0],
        typeQuiz: gameMode.FLAGTOCOUNTRY,
        msg: p.msg,
        imgUrl: quiz.questions[0].question,
    });
    listenAnswers({
        msg: p.msg,
        client: p.client,
        quiz: quiz,
        gameMode: gameMode.FLAGTOCOUNTRY,
    });
}
exports.countryFlagQuiz = countryFlagQuiz;
// Country to City
function capitalCityQuiz(p) {
    CountrytoCity = country.newQuiz("country-to-capital");
    const quiz = CountrytoCity;
    quizQuestionEmbed({
        quiz: quiz,
        quizQ: quiz.questions[0],
        typeQuiz: gameMode.COUNTRYTOCITY,
        msg: p.msg,
        imgUrl: "",
    });
    listenAnswers({
        msg: p.msg,
        client: p.client,
        quiz: quiz,
        gameMode: gameMode.COUNTRYTOCITY,
    });
}
exports.capitalCityQuiz = capitalCityQuiz;
// City to Country
function countryCapitalQuiz(p) {
    CitytoCountry = country.newQuiz("capital-to-country");
    const quiz = CitytoCountry;
    quizQuestionEmbed({
        quiz: quiz,
        quizQ: quiz.questions[0],
        typeQuiz: gameMode.CITYTOCOUNTRY,
        msg: p.msg,
        imgUrl: "",
    });
    listenAnswers({
        msg: p.msg,
        client: p.client,
        quiz: quiz,
        gameMode: gameMode.CITYTOCOUNTRY,
    });
}
exports.countryCapitalQuiz = countryCapitalQuiz;
function listenAnswers(p) {
    const listener = (reaction, user) => {
        var _a, _b, _c;
        if (user.bot)
            return;
        const emojiName = reaction.emoji.name;
        const fetchMessage = (_c = (_b = (_a = p.msg) === null || _a === void 0 ? void 0 : _a.channel) === null || _b === void 0 ? void 0 : _b.lastMessage) === null || _c === void 0 ? void 0 : _c.id;
        if (reaction.message.id === fetchMessage) {
            const answerKey = p.quiz.questions[0];
            checkAnswers({
                msg: p.msg,
                client: p.client,
                answerKey: answerKey,
                emoji: emojiName,
                gameMode: p.gameMode,
            });
            p.client.removeListener("messageReactionAdd", listener);
        }
    };
    p.client.on("messageReactionAdd", listener);
}
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
            client: p.client,
        });
    }
    else if (p.answer != p.input) {
        return answerEmbed({
            isRight: false,
            msg: p.msg,
            answer: p.answer.toUpperCase(),
            gameMode: p.gameMode,
            client: p.client,
        });
    }
}
function answerEmbed(p) {
    if (p.isRight === true) {
        const embed = new Discord.MessageEmbed()
            .setColor("317B22")
            .setAuthor("Transero the Quiz Whizz", avatar)
            .setDescription("You got the right answer.");
        return listenContinueAnswers({
            msg: p.msg,
            client: p.client,
            embed: embed,
            gameMode: p.gameMode,
        });
    }
    else {
        const embed = new Discord.MessageEmbed()
            .setColor("B33F62")
            .setAuthor("Transero the Quiz Whizz", avatar)
            .setDescription("You got the wrong answer.")
            .setFooter(`The answer is ${"**" + p.answer + "**"}`);
        return listenContinueAnswers({
            msg: p.msg,
            client: p.client,
            embed: embed,
            gameMode: p.gameMode,
        });
    }
}
function listenContinueAnswers(p) {
    return p.msg.channel
        .send(p.embed)
        .then((message) => {
        message.react("🚫");
        message.react("⏭");
        const listener = (reaction, user) => {
            if (user.bot)
                return;
            const emojiName = reaction.emoji.name;
            if (reaction.message.id === message.id) {
                continueQuiz({
                    client: p.msg.client,
                    msg: p.msg,
                    gameMode: p.gameMode,
                    emoji: emojiName,
                });
                p.client.removeListener("messageReactionAdd", listener);
            }
        };
        p.client.on("messageReactionAdd", listener);
    })
        .catch((e) => {
        console.error(e);
    });
}
function continueQuiz(p) {
    switch (p.emoji) {
        case "⏭":
            if (p.gameMode === gameMode.FLAGTOCOUNTRY)
                return countryFlagQuiz({ client: p.client, msg: p.msg });
            if (p.gameMode === gameMode.COUNTRYTOCITY)
                return capitalCityQuiz({ client: p.client, msg: p.msg });
            if (p.gameMode === gameMode.CITYTOCOUNTRY)
                return countryCapitalQuiz({ client: p.client, msg: p.msg });
            break;
        case "🚫":
            break;
    }
}
function quizQuestionEmbed(p) {
    const option = p.quizQ.options;
    const url = flagToPng(p.imgUrl);
    const optionsText = `1) ${option[0]}\n 2) ${option[1]}\n 3) ${option[2]}\n 4) ${option[3]}\n`;
    // 0 == Flag Country Flag Quiz
    if (p.typeQuiz === gameMode.FLAGTOCOUNTRY) {
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
    if (p.typeQuiz === gameMode.COUNTRYTOCITY) {
        return quizQuestionEmbedSend({
            color: "840032",
            question: `What is the capital city of **${p.quizQ.question}**?`,
            options: optionsText,
            msg: p.msg,
        });
    }
    // 2 == Country Quiz
    if (p.typeQuiz === gameMode.CITYTOCOUNTRY) {
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
function quizQuestionEmbedSend(p) {
    const embed = new Discord.MessageEmbed()
        .setAuthor("Transero the Quiz Whizz", avatar)
        .setTitle(`Question:`)
        .setColor(p.color)
        .setDescription(p.question)
        .addField("Answers", p.options)
        .setFooter("React to one of the icon below!");
    if (p.thumbnail && p.newField) {
        embed.addField("Cannot See Image?", p.newField).setThumbnail(p.thumbnail);
    }
    p.msg.channel
        .send(embed)
        .then((message) => {
        message.react("1️⃣");
        message.react("2️⃣");
        message.react("3️⃣");
        message.react("4️⃣");
    })
        .catch((e) => console.error(e));
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
                client: p.client,
            });
            break;
        case "2️⃣":
            verifyAnswer({
                answer: answer,
                input: options[1],
                msg: p.msg,
                gameMode: p.gameMode,
                client: p.client,
            });
            break;
        case "3️⃣":
            verifyAnswer({
                answer: answer,
                input: options[2],
                msg: p.msg,
                gameMode: p.gameMode,
                client: p.client,
            });
            break;
        case "4️⃣":
            verifyAnswer({
                answer: answer,
                input: options[3],
                msg: p.msg,
                gameMode: p.gameMode,
                client: p.client,
            });
            break;
    }
}
//# sourceMappingURL=quiz.js.map