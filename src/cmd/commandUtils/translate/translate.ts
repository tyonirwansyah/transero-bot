import * as Discord from "discord.js";
import ISO6391 from "iso-639-1";
import randomColor from "randomcolor";
import translate, { ITranslateResponse } from "@vitalets/google-translate-api";
import { translateMultipleTextEmbed } from "./utils/embed";
import { avatar } from "../globals/global";

interface translateParams {
  sentence: string | undefined;
  langS?: string;
  langM?: string[] | null;
  msg: Discord.Message;
}

export async function translateText(
  p: translateParams
): Promise<Discord.Message | undefined> {
  if (p.sentence === undefined) return;
  try {
    const trRes = await translate(p.sentence, {
      to: p.langS,
    });
    const urlSentence = trRes.raw[1][4][0]
      .replace(/\s/g, "%20")
      .replace(/\s+/g, "")
      .trim();
    const fromLang = ISO6391.getName(trRes.from.language.iso);
    const toLang = ISO6391.getName(trRes.raw[1][1]);
    const fromLangRaw = trRes.from.language.iso;
    const toLangRaw = trRes.raw[1][1];
    const link = `[✦](https://translate.google.com/?sl=${fromLangRaw}&tl=${toLangRaw}&text=${urlSentence}&op=translate)`;
    const resultMessage = new Discord.MessageEmbed()
      .setColor(randomColor().substring(1))
      .setAuthor("Transero the Super Translator", avatar)
      .setFooter("Click ✦ for more details, Thanks for translating.")
      .addField(
        `**${fromLang}** to **${
          trRes.raw[1][1].startsWith("zh") ? "Chinese" : toLang
        }:**`,
        `${link} ${trRes.text.replace(/^./, trRes.text[0].toUpperCase())} ${
          trRes.pronunciation != null ? `\n${trRes.pronunciation}` : ""
        }`
      );
    return p.msg.channel.send(resultMessage);
  } catch (e) {
    throw new Error(e);
  }
}

export function translateMultipleText(p: translateParams): void {
  const translationRes: Array<ITranslateResponse> = [];
  let count = 0;
  p.langM?.forEach(async (l, _v, a) => {
    if (p.sentence === undefined) return;
    try {
      const translateSentence = await translate(p.sentence, { to: l });
      translationRes.push(translateSentence);
      count++;
    } catch (e) {
      throw new Error(e);
    }
    if (count === a.length) {
      translateMultipleTextEmbed({ translations: translationRes, msg: p.msg });
    }
  });
}
