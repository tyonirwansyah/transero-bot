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
const commands_1 = require("./commands");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new Discord.Client({
    partials: ["MESSAGE"],
});
const PREFIX = "$";
client.on("ready", () => {
    console.log("Bot Active");
    client.user.setActivity("$transero");
});
client.on("message", (msg) => {
    if (msg.author.bot)
        return null;
    if (msg.content.startsWith(PREFIX)) {
        // Spliting the command
        const [command, ...argm] = msg.content
            .substring(PREFIX.length)
            .trim()
            .split(/\s+/);
        // Commands
        commands_1.initializeTranslator({ command: command, argm: argm, msg: msg });
        commands_1.initializeQuiz({ command: command, argm: argm, msg: msg }, client);
    }
});
client.login(process.env.DISCORD_TOKEN);
//# sourceMappingURL=index.js.map