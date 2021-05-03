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
const Discord = __importStar(require("discord.js"));
const cmd = __importStar(require("./commands"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new Discord.Client({
    partials: ["MESSAGE"],
});
const PREFIX = "$";
client.on("ready", () => {
    var _a;
    console.log("Bot Active");
    (_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.setActivity("$trhelp");
});
client.on("message", (msg) => {
    if (msg.author.bot)
        return null;
    if (msg.content.startsWith(PREFIX)) {
        const [command, ...argm] = msg.content
            .substring(PREFIX.length)
            .trim()
            .split(/\s+/);
        // Commands
        cmd.initializeTranslator({ command: command, argm: argm, msg: msg });
        cmd.initializeMultipleTranslate({ command: command, argm: argm, msg: msg });
        cmd.initializeQuiz({ command: command, argm: argm, msg: msg }, client);
    }
});
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=index.js.map