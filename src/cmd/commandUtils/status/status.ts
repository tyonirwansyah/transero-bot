import * as Discord from "discord.js";
import axios from "axios";

const projectApiEndpoint = `https://api.github.com/repos/itstyonirwansyah/transero-bot`;

const commitApiEndpoint = `https://api.github.com/repos/itstyonirwansyah/transero-bot/commits`;

export async function getBotStatus(
  msg: Discord.Message
): Promise<Discord.Message | undefined> {
  const getProjectStats = await axios(projectApiEndpoint);
  const getLatestCommit = await axios(commitApiEndpoint);

  const language = getProjectStats.data?.language;
  const license = getProjectStats.data?.license.spdx_id;
  const issues = getProjectStats.data?.open_issues;
  const commitCode = getLatestCommit.data?.[0].sha;

  const MessageEmbed: Discord.MessageEmbed = new Discord.MessageEmbed()
    .setTitle("Bot Status")
    .setColor("ffffff")
    .setDescription(
      `Status → \`Online\`\nIssues → \`${issues}\`\nLicense → \`${license}\`\nBot Language → \`${language}\`\nLatest Commit → \`#${commitCode.slice(
        0,
        7
      )}\``
    )
    .setFooter("✦ Make sure star my github repo!");

  return msg.channel.send(MessageEmbed);
}
