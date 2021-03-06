import * as Discord from "discord.js";
import * as quizL from "./commandUtils/quiz/quiz";
import * as dictL from "./commandUtils/dictionary/dictionary";
import * as parseWord from "./commandUtils/dictionary/utils/parseString";
import randomColor from "randomcolor";
import { commandsListEmbed } from "./commandUtils/help/help";
import { allQuizGames } from "./commandUtils/translate/utils/PickAQuiz";
import { getBotStatus } from "./commandUtils/status/status";
import {
  translateMultipleText,
  translateText,
} from "./commandUtils/translate/translate";
import {
  parseSentence,
  parseLanguage,
  parseMultiLanguages,
} from "./commandUtils/translate/utils/parseString";
import { getContribute } from "./commandUtils/contribute/contribute";

// For Message Embed
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;

// Param Interface
export interface funcParams {
  command: string;
  argm: string[];
  msg: Discord.Message;
}

// Translate Command
export function initializeTranslator(
  param: funcParams
): Promise<Discord.Message | undefined> | undefined {
  if (param.command === "tr") {
    if (param.argm.length <= 0) {
      return param.msg.reply("error: missing [language] [sentence]");
    }
    const sentence = parseSentence(param.argm);
    const language = parseLanguage(param.argm[0].toLowerCase());
    if (sentence === "") {
      return param.msg.reply("error: [sentence] missing");
    }
    if (language === "") {
      return param.msg.reply(
        "error: [language] doesn't exist or not supported"
      );
    }
    translateText({
      sentence: sentence,
      langS: language,
      msg: param.msg,
    });
  }
}

export function initializeMultipleTranslate(
  param: funcParams
): Promise<Discord.Message | undefined> | undefined {
  if (param.command === "trm") {
    if (isNaN(parseInt(param.argm[0]))) {
      return param.msg.reply("error: [amountLanguages] Not a number");
    } else if (parseInt(param.argm[0]) > 3) {
      return param.msg.reply("error: [amountLanguages] Maximum 3 languages");
    } else if (parseInt(param.argm[0]) === 1) {
      return param.msg.reply("error: have to be either 2 or 3 languages");
    } else if (param.argm.length === 1) {
      return param.msg.reply("error: missing [languages] [sentence]");
    }
    const amountLanguages = parseInt(param.argm[0]);
    const sentence = parseSentence(param.argm, amountLanguages + 1);
    const language = parseMultiLanguages(param.argm, amountLanguages);
    if (language!.some((l) => l === "missingLang")) {
      return param.msg.reply("error: [languages] is missing ");
    }
    if (language!.some((l) => l === "")) {
      return param.msg.reply(
        "error: [languages] one of the language doesn't exist or not supported"
      );
    }
    if (sentence === "") {
      return param.msg.reply("error: [sentence] missing sentence");
    }
    translateMultipleText({
      sentence: sentence,
      langM: language,
      msg: param.msg,
    });
  }
}

// Quiz Command
export function initializeQuiz(
  param: funcParams,
  client: Discord.Client
): void {
  // Variable
  let quizMsgId: string;
  //
  if (param.command === "trquiz") {
    const pickQuiz = new Discord.MessageEmbed()
      .setColor(randomColor().substring(1))
      .setAuthor("Transero the Quiz Whizz", avatar)
      .setTitle("Pick a Quiz:")
      .setDescription("Pick a quiz to start rolling.")
      .addFields(allQuizGames);
    param.msg.channel.send(pickQuiz).then((message) => {
      message.react("????");
      message.react("????");
      message.react("???????????");
      quizMsgId = message.id;
    });
    const listener = (
      reaction: Discord.MessageReaction,
      user: Discord.User | Discord.PartialUser
    ) => {
      if (user.bot) return;
      const emojiName = reaction.emoji.name;
      if (reaction.message.id === quizMsgId) {
        switch (emojiName) {
          case "????":
            param.msg.channel.send(pickQuizEmbed("Picked Country Flag Quiz."));
            quizL.countryFlagQuiz({ msg: param.msg, client: client });
            param.msg.client.removeListener("messageReactionAdd", listener);
            break;
          case "????":
            param.msg.channel.send(pickQuizEmbed("Picked Capital City Quiz."));
            quizL.capitalCityQuiz({ msg: param.msg, client: client });
            param.msg.client.removeListener("messageReactionAdd", listener);
            break;
          case "???????????":
            param.msg.channel.send(pickQuizEmbed("Picked Country Quiz."));
            quizL.countryCapitalQuiz({ msg: param.msg, client: client });
            param.msg.client.removeListener("messageReactionAdd", listener);
            break;
        }
      }
    };
    param.msg.client.on("messageReactionAdd", listener);
  }
}

function pickQuizEmbed(message: string) {
  return new Discord.MessageEmbed()
    .setColor("674771")
    .setAuthor("Transero the Quiz Whizz", avatar)
    .setDescription(message);
}

// Dictionary Command

export function initializeDictionary(
  param: funcParams
): Promise<Discord.Message | undefined> | undefined {
  if (param.command === "trdef") {
    if (param.argm.length === 0) {
      return param.msg.reply("error: missing [language] [word]");
    } else if (param.argm.length === 1) {
      return param.msg.reply("error: missing [language] or [word]");
    }
    const language = parseWord.parseLang(param.argm[0]);
    const word = parseWord.parseWord(param.argm);
    return dictL.getDefeninitionWord({
      word: word,
      language: language,
      msg: param.msg,
    });
  }
}

// Help Commands

export function initializeHelp(
  param: funcParams
): Promise<Discord.Message> | undefined {
  if (param.command === "trhelp") {
    return param.msg.channel.send(commandsListEmbed);
  }
}

// Bot Status Commands

export function initializeStatus(
  param: funcParams,
  client: Discord.Client
): Promise<Discord.Message | undefined> | undefined {
  if (param.command === "trstats") {
    return getBotStatus(param.msg, client);
  }
}

export function initializeContribution(
  param: funcParams
): Promise<Discord.Message | undefined> | undefined {
  if (param.command === "trcontr") {
    return getContribute(param.msg);
  }
}
