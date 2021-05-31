import * as Discord from "discord.js";
import { ITranslateResponse } from "@vitalets/google-translate-api";
import ISO6391 from "iso-639-1";
import randomColor from "randomcolor";
import { avatar } from "../../globals/global";

interface translateMultipleTextEmbedParams {
  translations: Array<ITranslateResponse>;
  msg: Discord.Message;
}
export function translateMultipleTextEmbed(
  p: translateMultipleTextEmbedParams
): void {
  const embed = new Discord.MessageEmbed()
    .setTitle("Translations:")
    .setAuthor("Transero the Super Translator", avatar)
    .setFooter("Click ✦ for more details, Thanks for translating.")
    .setColor(randomColor().substring(1));
  p.translations.forEach((tr: ITranslateResponse, val, arr) => {
    const fromLang = ISO6391.getName(tr.from.language.iso);
    const toLang = ISO6391.getName(tr.raw[1][1]);
    const fromLangRaw = tr.from.language.iso;
    const toLangRaw = tr.raw[1][1];
    const urlSentence = tr.raw[1][4][0].replace(/\s/g, "%20").trim();
    const link = `[✦](https://translate.google.com/?sl=${fromLangRaw}&tl=${toLangRaw}&text=${urlSentence}&op=translate)`;
    embed.addField(
      `${fromLang} to ${toLang}:`,
      `${link} ${tr.text.replace(/^./, tr.text[0].toUpperCase())} ${
        tr.pronunciation != null ? `\n${tr.pronunciation}` : ""
      }`
    );
    if (val + 1 === arr.length) {
      p.msg.channel.send(embed);
    }
  });
}
