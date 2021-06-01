import * as Discord from "discord.js";
import randomColor from "randomcolor";

const command = [
  "**$tr** : translate one language → $tr [language] [sentence]",
  "**$trm** : translate 2-3 language → $trm [languageAmount] [languages] [sentence]",
  "**$trdef** : finds a definition of a word → $trdef [language] [sentence]",
  "**$trquiz** : creates a quiz game (3 categories)",
  "**$trstats** : show bot status",
  "**$trcontr** : contribute to transero",
];

export const commandsListEmbed = new Discord.MessageEmbed()
  .setTitle("Commands")
  .setDescription(command)
  .setColor(randomColor().substring(1))
  .setFooter("✦ Start commanding transero with these commands");
