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
exports.answerEmbed = void 0;
const Discord = __importStar(require("discord.js"));
const quiz_1 = require("./quiz");
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
//# sourceMappingURL=answerEmbedParams.js.map