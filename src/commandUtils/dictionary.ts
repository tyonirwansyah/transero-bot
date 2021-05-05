import axios from "axios";
import * as Discord from "discord.js";
import ISO6391 from "iso-639-1";
import randomColor from "randomcolor";

const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;

export function parseWord(words: string[]): string {
  if (words[1] === "") return "";
  let sentence = "";
  for (let i = 1; i < words.length; i++) {
    sentence += words[i] + "%20";
  }
  return sentence;
}

export function parseLang(lang: string): string {
  if (lang.startsWith("en-")) {
    const code = lang[3] + lang[4];
    const lg = "english" + code;
    if (languages.has(lg)) {
      return languages.get(lg);
    } else {
      return "";
    }
  }
  const languageConvert = ISO6391.getName(lang).toLowerCase();
  if (lang.length == 2 && languages.has(languageConvert)) {
    return languages.get(languageConvert);
  } else if (languages.has(lang)) {
    return languages.get(lang).toString();
  } else {
    return "";
  }
}

interface getDefininitionWordParams {
  word: string;
  language: string;
  msg: Discord.Message;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function getDefeninitionWord(p: getDefininitionWordParams) {
  if (p.language === "") {
    return p.msg.reply("error: language doesn't exist or not supported");
  }
  if (p.word === "") {
    return p.msg.reply("error: [word] has no input");
  }
  const embed = new Discord.MessageEmbed().setColor(randomColor().substring(1));
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/${p.language}/${p.word}`;
    const data = await axios.get(url);
    const definitionsData = data.data[0];
    let synonymBox = "";
    for (let i = 0; i < definitionsData.meanings.length; i++) {
      const word = definitionsData.word;
      const partOfSpeech = definitionsData.meanings[i].partOfSpeech;
      const definition = definitionsData.meanings[i].definitions[0].definition;
      const synonyms = definitionsData.meanings[i].definitions[0].synonyms;
      const example = definitionsData.meanings[i].definitions[0].example;
      embed.addField(
        `${word.replace(/^./, word[0].toUpperCase())} (${partOfSpeech}):`,
        `${definition}${example === undefined ? "" : `\n → *${example}*`}`
      );
      if (synonyms) {
        synonymBox += synonyms;
      }
    }
    if (synonymBox != "") {
      embed.addField(
        "Synonyms:",
        `${synonymBox.toString().replace(/\,/g, ", ")}.`
      );
    }
    return p.msg.channel.send(
      embed.setAuthor("Transero the Definator", avatar).setTitle("Definitions:")
    );
  } catch (e) {
    return p.msg.channel.send(
      embed.setDescription(
        "Sorry there are no definition for this text, or maybe check your spelling."
      )
    );
  }
}

// Languages
const languages = new Map();
languages.set("englishus", "en_US");
languages.set("hindi", "hi");
languages.set("spanish", "es");
languages.set("japanese", "ja");
languages.set("french", "fr");
languages.set("russian", "ru");
languages.set("englishuk", "en_GB");
languages.set("german", "de");
languages.set("italian", "it");
languages.set("korean", "ko");
languages.set("portugese", "pt");
languages.set("arabic", "ar");
languages.set("turkish", "tr");
languages.set("english", "en_US");
