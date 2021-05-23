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
exports.verifyAnswer = exports.countryCapitalQuiz = exports.capitalCityQuiz = exports.countryFlagQuiz = exports.gameMode = exports.avatar = void 0;
const country = __importStar(require("country-quiz"));
const embed_1 = require("./utils/embed");
const verifyAnswers_1 = require("./utils/verifyAnswers");
// Message Embed Variables
exports.avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;
// Quiz Selections
let FlagtoCountry = country.newQuiz("flag-to-country", 1);
let CountrytoCity = country.newQuiz("country-to-capital", 1);
let CitytoCountry = country.newQuiz("capital-to-country", 1);
var gameMode;
(function (gameMode) {
    gameMode[gameMode["FLAGTOCOUNTRY"] = 0] = "FLAGTOCOUNTRY";
    gameMode[gameMode["COUNTRYTOCITY"] = 1] = "COUNTRYTOCITY";
    gameMode[gameMode["CITYTOCOUNTRY"] = 2] = "CITYTOCOUNTRY";
})(gameMode = exports.gameMode || (exports.gameMode = {}));
// Flag to Country
function countryFlagQuiz(p) {
    FlagtoCountry = country.newQuiz("flag-to-country");
    const quiz = FlagtoCountry;
    embed_1.quizQuestionEmbed({
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
    embed_1.quizQuestionEmbed({
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
    embed_1.quizQuestionEmbed({
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
// Listen Answer
function listenAnswers(p) {
    const listener = (reaction, user) => {
        var _a, _b, _c;
        if (user.bot)
            return;
        const emojiName = reaction.emoji.name;
        const fetchMessage = (_c = (_b = (_a = p.msg) === null || _a === void 0 ? void 0 : _a.channel) === null || _b === void 0 ? void 0 : _b.lastMessage) === null || _c === void 0 ? void 0 : _c.id;
        if (reaction.message.id === fetchMessage) {
            const answerKey = p.quiz.questions[0];
            verifyAnswers_1.checkAnswers({
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
// Verify Answer
function verifyAnswer(p) {
    if (p.answer === p.input) {
        return embed_1.answerEmbed({
            isRight: true,
            msg: p.msg,
            gameMode: p.gameMode,
            client: p.client,
        });
    }
    else if (p.answer != p.input) {
        return embed_1.answerEmbed({
            isRight: false,
            msg: p.msg,
            answer: p.answer.toUpperCase(),
            gameMode: p.gameMode,
            client: p.client,
        });
    }
}
exports.verifyAnswer = verifyAnswer;
//# sourceMappingURL=quiz.js.map