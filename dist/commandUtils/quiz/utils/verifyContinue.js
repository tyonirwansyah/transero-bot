"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenContinueAnswers = void 0;
const quiz_1 = require("../quiz");
const embed_1 = require("./embed");
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
exports.listenContinueAnswers = listenContinueAnswers;
function continueQuiz(p) {
    switch (p.emoji) {
        case "⏭":
            if (p.gameMode === quiz_1.gameMode.FLAGTOCOUNTRY)
                return quiz_1.countryFlagQuiz({ client: p.client, msg: p.msg });
            if (p.gameMode === quiz_1.gameMode.COUNTRYTOCITY)
                return quiz_1.capitalCityQuiz({ client: p.client, msg: p.msg });
            if (p.gameMode === quiz_1.gameMode.CITYTOCOUNTRY)
                return quiz_1.countryCapitalQuiz({ client: p.client, msg: p.msg });
            break;
        case "🚫":
            embed_1.endEmbed({ msg: p.msg });
            break;
    }
}
//# sourceMappingURL=verifyContinue.js.map