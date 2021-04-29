import * as Discord from "discord.js";
import { initializeQuiz, initializeTranslator } from "./commands";
import dotenv from "dotenv";

dotenv.config();

const client = new Discord.Client({
  partials: ["MESSAGE"],
});
const PREFIX = "$";

client.on("ready", () => {
  console.log("Bot Active");
  client.user.setActivity("$transero");
});

client.on("message", (msg: any) => {
  if (msg.author.bot) return null;
  if (msg.content.startsWith(PREFIX)) {
    // Spliting the command
    const [command, ...argm] = msg.content
      .substring(PREFIX.length)
      .trim()
      .split(/\s+/);
    // Commands
    initializeTranslator({ command: command, argm: argm, msg: msg });
    initializeQuiz({ command: command, argm: argm, msg: msg }, client);
  }
});

client.login(process.env.DISCORD_TOKEN);
