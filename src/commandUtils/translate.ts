import * as Discord from "discord.js";
import translate, { ITranslateResponse } from "@vitalets/google-translate-api";
import ISO6391 from "iso-639-1";
import randomColor from "randomcolor";

const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;

export function parseSentence(words: string[] | string, parseNum = 1): string {
  if (words === null) return "";
  if (words === undefined) return "";
  if (words[1] === "") return "";
  let sentence = "";
  for (let i = parseNum; i < words.length; i++) {
    sentence += words[i] + " ";
  }
  return sentence;
}

export function parseLanguage(lang: string): string {
  // Chinese => Traditional or Simplified
  if (lang.startsWith("zh")) {
    let words;
    const capitalize =
      lang.slice(3, 5) === "cn" || "tw" ? lang.slice(3, 5).toUpperCase() : "";
    const word = lang.slice(0, 3);
    if (capitalize === "TW" || capitalize === "CN") {
      words = word + capitalize;
      return words;
    }
    return "";
  }
  // Main Code
  const languageConvert = ISO6391.getName(lang).toLowerCase();
  if (lang.length == 2 && languages.has(languageConvert)) {
    return languages.get(languageConvert);
  } else if (languages.has(lang)) {
    return languages.get(lang);
  } else {
    return "";
  }
}

export function parseMultiLanguages(
  lang: string[],
  amountLang: number
): string[] {
  let langs: string[] = [];
  for (let i = 1; i < amountLang + 1; i++) {
    langs.push(lang?.[i] as string);
  }
  langs.forEach((lang, val) => {
    const languageConvert = ISO6391.getName(lang).toLowerCase();
    if (lang.length == 2 && languages.has(languageConvert)) {
      return (langs[val] = languages.get(languageConvert));
    } else if (languages.has(lang)) {
      return (langs[val] = languages.get(lang));
    } else {
      return (langs = [""]);
    }
  });
  return langs;
}

interface translateParams {
  sentence: string | undefined;
  langS?: string;
  langM?: string[];
  msg: Discord.Message;
}

export async function translateText(p: translateParams): Promise<void> {
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
    p.msg.channel.send(resultMessage);
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

interface translateMultipleTextEmbedParams {
  translations: Array<ITranslateResponse>;
  msg: Discord.Message;
}

function translateMultipleTextEmbed(p: translateMultipleTextEmbedParams) {
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

const languages = new Map();
languages.set("afrikaans", "af");
languages.set("albanian", "sq");
languages.set("amharic", "am");
languages.set("arabic", "ar");
languages.set("armenian", "hy");
languages.set("azerbaijani", "az");
languages.set("basque", "eu");
languages.set("belarusian", "be");
languages.set("bengali", "bn");
languages.set("bosnian", "bs");
languages.set("bulgarian", "bg");
languages.set("catalan", "ca");
languages.set("cebuano", "ceb");
languages.set("chinese", "zh-CN");
languages.set("chinesetr", "zh-TW");
languages.set("corsican", "co");
languages.set("croatian", "hr");
languages.set("czech", "cs");
languages.set("danish", "da");
languages.set("dutch", "nl");
languages.set("english", "en");
languages.set("esperanto", "eo");
languages.set("estonian", "et");
languages.set("finnish", "fi");
languages.set("french", "fr");
languages.set("frisian", "fy");
languages.set("galician", "gl");
languages.set("georgian", "ka");
languages.set("german", "de");
languages.set("greek", "el");
languages.set("gujarati", "gu");
languages.set("haitian creole", "ht");
languages.set("hausa", "ha");
languages.set("hawaiian", "haw");
languages.set("hebrew", "he");
languages.set("hindi", "hi");
languages.set("hmong", "hmn");
languages.set("hungarian", "hu");
languages.set("icelandic", "is");
languages.set("igbo", "ig");
languages.set("indonesian", "id");
languages.set("irish", "ga");
languages.set("italian", "it");
languages.set("japanese", "ja");
languages.set("javanese", "jv");
languages.set("kannada", "kn");
languages.set("kazakh", "kk");
languages.set("khmer", "km");
languages.set("kinyarwanda", "rw");
languages.set("korean", "ko");
languages.set("kurdish", "ku");
languages.set("kyrgyz", "ky");
languages.set("lao", "lo");
languages.set("latin", "la");
languages.set("latvian", "lv");
languages.set("lithuanian", "lt");
languages.set("luxembourgish", "lb");
languages.set("macedonian", "mk");
languages.set("malagasy", "mg");
languages.set("malay", "ms");
languages.set("malayalam", "ml");
languages.set("maltese", "mt");
languages.set("maori", "mi");
languages.set("marathi", "mr");
languages.set("mongolian", "mn");
languages.set("burmese", "my");
languages.set("nepali", "ne");
languages.set("norwegian", "no");
languages.set("nyanja", "ny");
languages.set("odia", "or");
languages.set("pashto", "ps");
languages.set("persian", "fa");
languages.set("polish", "pl");
languages.set("portuguese", "pt");
languages.set("punjabi", "pa");
languages.set("romanian", "ro");
languages.set("russian", "ru");
languages.set("samoan", "sm");
languages.set("scots", "gd");
languages.set("serbian", "sr");
languages.set("sesotho", "st");
languages.set("shona", "sn");
languages.set("sindhi", "sd");
languages.set("sinhalese", "si");
languages.set("slovak", "sk");
languages.set("slovenian", "sl");
languages.set("somali", "so");
languages.set("spanish", "es");
languages.set("sundanese", "su");
languages.set("swahili", "sw");
languages.set("swedish", "sv");
languages.set("tagalog", "tl");
languages.set("tajik", "tg");
languages.set("tamil", "ta");
languages.set("tatar", "tt");
languages.set("telugu", "te");
languages.set("thai", "th");
languages.set("turkish", "tr");
languages.set("turkmen", "tk");
languages.set("ukrainian", "uk");
languages.set("urdu", "ur");
languages.set("uyghur", "ug");
languages.set("uzbek", "uz");
languages.set("vietnamese", "vi");
languages.set("welsh", "cy");
languages.set("xhosa", "xh");
languages.set("yiddish", "yi");
languages.set("yoruba", "yo");
languages.set("zulu", "zu");
