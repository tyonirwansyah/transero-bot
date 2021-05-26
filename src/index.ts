import {
  initializeTranslator,
  initializeMultipleTranslate,
  initializeQuiz,
  initializeDictionary,
  initializeHelp,
} from "./cmd/commands";
import * as Discord from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client: Discord.Client = new Discord.Client({
  partials: ["MESSAGE"],
});
const PREFIX = "$";

client.on("ready", () => {
  console.log("Bot Active");
  client?.user?.setActivity("$trhelp");
});

client.on("message", (msg: Discord.Message) => {
  if (msg.author.bot) return null;
  if (msg.content.startsWith(PREFIX)) {
    const [command, ...argm] = msg.content
      .substring(PREFIX.length)
      .trim()
      .split(/\s+/);
    // Commands
    initializeTranslator({ command: command, argm: argm, msg: msg });
    initializeMultipleTranslate({ command: command, argm: argm, msg: msg });
    initializeQuiz({ command: command, argm: argm, msg: msg }, client);
    initializeDictionary({ command: command, argm: argm, msg: msg });
    initializeHelp({ command: command, argm: argm, msg: msg });
  }
});

client.login(process.env.DISCORD_TOKEN);
