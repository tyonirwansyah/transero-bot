import {
  initializeTranslator,
  initializeMultipleTranslate,
  initializeQuiz,
  initializeDictionary,
  initializeHelp,
  initializeStatus,
  initializeContribution,
  funcParams,
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
    const param: funcParams = { command: command, argm: argm, msg: msg };
    initializeTranslator(param);
    initializeMultipleTranslate(param);
    initializeQuiz(param, client);
    initializeDictionary(param);
    initializeHelp(param);
    initializeStatus(param, client);
    initializeContribution(param);
  }
});

client.login(process.env.DISCORD_TOKEN);
