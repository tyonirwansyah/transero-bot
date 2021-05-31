import axios from "axios";
import * as Discord from "discord.js";
import randomColor from "randomcolor";
import { avatar } from "../globals/global";

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
