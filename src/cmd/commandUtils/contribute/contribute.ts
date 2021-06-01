import * as Discord from "discord.js";

const MD = [
  "[✦](https://github.com/itstyonirwansyah/transero-bot/issues)",
  "[✦](https://github.com/itstyonirwansyah/transero-bot/pulls)",
  "[✦](https://github.com/itstyonirwansyah/transero-bot)",
];

export function getContribute(msg: Discord.Message): Promise<Discord.Message> {
  return msg.channel.send(embed);
}

const embed = new Discord.MessageEmbed()
  .setTitle("**Contribute:**")
  .setColor("45cbb2")
  .setDescription(
    `${MD[0]} Via Github (Issues)\n${MD[1]} Via Github (Pull Request)\n${MD[2]} Via Github (Repository)`
  )
  .setFooter("Click ✦ to start contributing");
