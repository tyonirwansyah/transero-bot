import * as Discord from "discord.js";
import randomColor from "randomcolor";

const commands =
  "**$tr** : translate one language\n**$trm** : translate 2-3 language\n**$trquiz** : creates a quiz game (3 categories)\n**$trdef** : finds a definition of a word";

export const commandsListEmbed = new Discord.MessageEmbed()
  .setTitle("Commands")
  .setDescription(commands)
  .setColor(randomColor().substring(1))
  .setFooter("✦ Start commanding transero with these commands");
