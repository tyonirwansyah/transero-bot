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
const commands_1 = require("../commands");
// Message Embed Variables
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;
// Quiz Selections
let FlagtoCountry = country.newQuiz("flag-to-country");
let CountrytoCity = country.newQuiz("country-to-capital");
let CitytoCountry = country.newQuiz("capital-to-country");
let messageId;
// Is Playing?
let isPlaying = true;
let qCount = 0;
let scoreAnswer = 0;
// Exported Functions //
// Flag to Country
function countryFlagQuiz(p) {
    let notAnswered = true;
    if (qCount === FlagtoCountry.questions.length) {
        isPlaying = false;
        resultEmbed(scoreAnswer, FlagtoCountry.questions.length, p.msg);
        p.client.removeAllListeners("messageReactionAdd"); // prevent mem. leaks
        commands_1.disableHoldingCommand(false);
        return ((FlagtoCountry = country.newQuiz("flag-to-country")),
            (isPlaying = true),
            (qCount = 0),
            (scoreAnswer = 0));
    }
    if (isPlaying) {
        quizQuestionEmbed({
            quiz: FlagtoCountry,
            quizQ: FlagtoCountry.questions[qCount],
            typeQuiz: 0,
            msg: p.msg,
            imgUrl: FlagtoCountry.questions[qCount].question,
        });
        p.client.on("messageReactionAdd", (reaction, user) => {
            if (user.bot)
                return;
            const emojiName = reaction.emoji.name;
            if (reaction.message.id === messageId) {
                if (notAnswered) {
                    let yourAnswer;
                    const answerKey = FlagtoCountry.questions[qCount];
                    switch (emojiName) {
                        case "1️⃣":
                            notAnswered = false;
                            yourAnswer = 0;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            countryFlagQuiz({ msg: p.msg, client: p.client });
                            break;
                        case "2️⃣":
                            notAnswered = false;
                            yourAnswer = 1;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            countryFlagQuiz({ msg: p.msg, client: p.client });
                            break;
                        case "3️⃣":
                            notAnswered = false;
                            yourAnswer = 2;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            countryFlagQuiz({ msg: p.msg, client: p.client });
                            break;
                        case "4️⃣":
                            notAnswered = false;
                            yourAnswer = 3;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            countryFlagQuiz({ msg: p.msg, client: p.client });
                            break;
                    }
                }
            }
        });
    }
}
exports.countryFlagQuiz = countryFlagQuiz;
// Country to City
function capitalCityQuiz(p) {
    let notAnswered = true;
    if (qCount === CountrytoCity.questions.length) {
        isPlaying = false;
        resultEmbed(scoreAnswer, CountrytoCity.questions.length, p.msg);
        p.client.removeAllListeners("messageReactionAdd"); // prevent mem. leaks
        commands_1.disableHoldingCommand(false);
        return ((CountrytoCity = country.newQuiz("country-to-capital")),
            (isPlaying = true),
            (qCount = 0),
            (scoreAnswer = 0));
    }
    if (isPlaying) {
        quizQuestionEmbed({
            quiz: CountrytoCity,
            quizQ: CountrytoCity.questions[qCount],
            typeQuiz: 1,
            msg: p.msg,
        });
        p.client.on("messageReactionAdd", (reaction, user) => {
            if (user.bot)
                return;
            const emojiName = reaction.emoji.name;
            if (reaction.message.id === messageId) {
                if (notAnswered) {
                    let yourAnswer;
                    const answerKey = CountrytoCity.questions[qCount];
                    switch (emojiName) {
                        case "1️⃣":
                            notAnswered = false;
                            yourAnswer = 0;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            capitalCityQuiz({ msg: p.msg, client: p.client });
                            break;
                        case "2️⃣":
                            notAnswered = false;
                            yourAnswer = 1;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            capitalCityQuiz({ msg: p.msg, client: p.client });
                            break;
                        case "3️⃣":
                            notAnswered = false;
                            yourAnswer = 2;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            capitalCityQuiz({ msg: p.msg, client: p.client });
                            break;
                        case "4️⃣":
                            notAnswered = false;
                            yourAnswer = 3;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            capitalCityQuiz({ msg: p.msg, client: p.client });
                            break;
                    }
                }
            }
        });
    }
}
exports.capitalCityQuiz = capitalCityQuiz;
// City to Country
function countryCapitalQuiz(p) {
    let notAnswered = true;
    if (qCount === CitytoCountry.questions.length) {
        isPlaying = false;
        resultEmbed(scoreAnswer, CitytoCountry.questions.length, p.msg);
        p.client.removeAllListeners("messageReactionAdd"); // prevent mem. leaks
        commands_1.disableHoldingCommand(false);
        return ((CitytoCountry = country.newQuiz("capital-to-country")),
            (isPlaying = true),
            (qCount = 0),
            (scoreAnswer = 0));
    }
    if (isPlaying) {
        quizQuestionEmbed({
            quiz: CitytoCountry,
            quizQ: CitytoCountry.questions[qCount],
            typeQuiz: 2,
            msg: p.msg,
        });
        p.client.on("messageReactionAdd", (reaction, user) => {
            if (user.bot)
                return;
            const emojiName = reaction.emoji.name;
            if (reaction.message.id === messageId) {
                if (notAnswered) {
                    let yourAnswer;
                    const answerKey = CitytoCountry.questions[qCount];
                    switch (emojiName) {
                        case "1️⃣":
                            notAnswered = false;
                            yourAnswer = 0;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            countryCapitalQuiz({ msg: p.msg, client: p.client });
                            break;
                        case "2️⃣":
                            notAnswered = false;
                            yourAnswer = 1;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            countryCapitalQuiz({ msg: p.msg, client: p.client });
                            break;
                        case "3️⃣":
                            notAnswered = false;
                            yourAnswer = 2;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            countryCapitalQuiz({ msg: p.msg, client: p.client });
                            break;
                        case "4️⃣":
                            notAnswered = false;
                            yourAnswer = 3;
                            p.msg.channel.send(verifyAnswer(answerKey.answer, answerKey.options[yourAnswer]));
                            qCount++;
                            countryCapitalQuiz({ msg: p.msg, client: p.client });
                            break;
                    }
                }
            }
        });
    }
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
function verifyAnswer(answer, input) {
    if (answer === input) {
        scoreAnswer += 1;
        return answerEmbed(true);
    }
    else if (answer != input) {
        return answerEmbed(false, answer.toUpperCase());
    }
}
// Embedss //
function answerEmbed(isRight, answer) {
    if (isRight === true) {
        return new Discord.MessageEmbed()
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .setDescription("You got the right answer.");
    }
    else {
        return new Discord.MessageEmbed()
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .setDescription("You got the wrong answer.")
            .setFooter(`The answer is ${"**" + answer + "**"}`);
    }
}
function resultEmbed(score, question, msg) {
    if (score === 5) {
        const embed = new Discord.MessageEmbed()
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .addField("Results", "**Bingo**, you got everything correct ")
            .setFooter("Type `$trquiz` if you want to play again");
        msg.channel.send(embed);
    }
    else if (score < 2) {
        const embed = new Discord.MessageEmbed()
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .addField("Results", `**Oh noo**, you gotta learn ${score}/${question}`)
            .setFooter("Type `$trquiz` if you want to try again");
        msg.channel.send(embed);
    }
    else {
        const embed = new Discord.MessageEmbed()
            .setColor(randomcolor_1.default().substring(1))
            .setAuthor("Transero the Quiz Whizz", avatar)
            .addField("Results", `**Eii**, you got ${score}/${question}`)
            .setFooter("Type `$trquiz` if you want to play again");
        msg.channel.send(embed);
    }
}
function quizQuestionEmbed(p) {
    if (!isPlaying)
        return;
    let embed = new Discord.MessageEmbed()
        .setColor(randomcolor_1.default().substring(1))
        .setAuthor("Transero the Quiz Whizz", avatar)
        .setTitle(`Question ${qCount + 1}/${p.quiz.questions.length}`);
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
            messageId = message.id;
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
            messageId = message.id;
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
            messageId = message.id;
        })
            .catch((e) => console.error(e));
    }
    else {
        return console.error("[typeQuiz] only accept number from 0-2");
    }
}
//# sourceMappingURL=quiz.js.map