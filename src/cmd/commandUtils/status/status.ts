import * as Discord from "discord.js";
import axios from "axios";

const projectApiEndpoint = `https://api.github.com/repos/itstyonirwansyah/transero-bot`;

const commitApiEndpoint = `https://api.github.com/repos/itstyonirwansyah/transero-bot/commits`;

export async function getBotStatus(
  msg: Discord.Message,
  client: Discord.Client
): Promise<Discord.Message | undefined> {
  const getProjectStats = await axios(projectApiEndpoint);
  const getLatestCommit = await axios(commitApiEndpoint);

  const language = getProjectStats.data?.language;
  const license = getProjectStats.data?.license.spdx_id;
  const issues = getProjectStats.data?.open_issues;
  const commitCode = getLatestCommit.data?.[0].sha;
  const servers = client.guilds.cache.size;

  const MessageEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
    .setTitle("Bot Status")
    .setColor("45cbb2")
    .setDescription(
      `**Status** → \`Online\`\n**Servers** → \`${servers}\`\n**Issues** → \`${issues}\`\n**License** → \`${license}\`\n**Bot Language** → \`${language}\`\n**Latest Commit** → \`#${commitCode.slice(
        0,
        7
      )}\``
    )
    .setFooter("✦ Make sure you star my github repo!");

  return msg.channel.send(MessageEmbed);
}
