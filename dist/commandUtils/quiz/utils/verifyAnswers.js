"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAnswers = void 0;
const quiz_1 = require("../quiz");
function checkAnswers(p) {
    //@ts-ignore
    const { options, answer } = p.answerKey;
    switch (p.emoji) {
        case "1️⃣":
            quiz_1.verifyAnswer({
                answer: answer,
                input: options[0],
                msg: p.msg,
                gameMode: p.gameMode,
                client: p.client,
            });
            break;
        case "2️⃣":
            quiz_1.verifyAnswer({
                answer: answer,
                input: options[1],
                msg: p.msg,
                gameMode: p.gameMode,
                client: p.client,
            });
            break;
        case "3️⃣":
            quiz_1.verifyAnswer({
                answer: answer,
                input: options[2],
                msg: p.msg,
                gameMode: p.gameMode,
                client: p.client,
            });
            break;
        case "4️⃣":
            quiz_1.verifyAnswer({
                answer: answer,
                input: options[3],
                msg: p.msg,
                gameMode: p.gameMode,
                client: p.client,
            });
            break;
    }
}
exports.checkAnswers = checkAnswers;
//# sourceMappingURL=verifyAnswers.js.map