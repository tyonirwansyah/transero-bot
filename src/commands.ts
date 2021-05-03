import * as Discord from "discord.js";
import * as transL from "./commandUtils/translate";
import * as quizL from "./commandUtils/quiz";
import randomColor from "randomcolor";

// For Message Embed
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;

// Param Interface
interface funcParams {
  command: string;
  argm: string[];
  msg: Discord.Message;
}

// Translate Command
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function initializeTranslator(param: funcParams) {
  if (param.command === "tr") {
    if (param.argm.length <= 0) {
      return param.msg.reply("error: missing [language] [sentence]");
    }
    const sentence = transL.parseSentence(param.argm);
    const language = transL.parseLanguage(param.argm[0].toLowerCase());
    if (sentence === "") {
      return param.msg.reply("error: [sentence] missing");
    }
    if (language === "") {
      return param.msg.reply(
        "error: [language] doesn't exist or not supported"
      );
    }
    transL.translateText({
      sentence: sentence,
      langS: language,
      msg: param.msg,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function initializeMultipleTranslate(param: funcParams) {
  if (param.command === "trm") {
    if (isNaN(parseInt(param.argm[0]))) {
      return param.msg.reply("error: [amountLanguages] Not a number");
    } else if (parseInt(param.argm[0]) > 3) {
      return param.msg.reply("error: [amountLanguages] Maximum 3 languages");
    } else if (parseInt(param.argm[0]) === 1) {
      return param.msg.reply("Why one language, use **$tr** instead");
    }
    const amountLanguages = parseInt(param.argm[0]);
    const sentence = transL.parseSentence(param.argm, amountLanguages + 1);
    const language = transL.parseMultiLanguages(param.argm, amountLanguages);
    if (language.includes("")) {
      return param.msg.reply(
        "error: [Languages] one of the language doesn't exist or not supported"
      );
    }
    if (sentence === "") {
      return param.msg.reply("error: [sentence] missing sentence");
    }
    transL.translateMultipleText({
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
      .addFields(
        {
          name: "Guess the country flag  📠",
          value: "I'll show a flag and you will guess what country is it.",
        },
        {
          name: "Guess the capital city  🗽",
          value: "I'll show a country and you will guess the capital city.",
        },
        {
          name: "Guess the country  👨‍🦯",
          value: "I'll show a city and you will guess the country.",
        },
        {
          name: "How to Play?",
          value: "Start by reacting to the **emoji** you are going to play.",
        }
      );
    param.msg.channel.send(pickQuiz).then((message) => {
      message.react("📠");
      message.react("🗽");
      message.react("👨‍🦯");
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
          case "📠":
            param.msg.channel.send(pickQuizEmbed("Picked Country Flag Quiz."));
            quizL.countryFlagQuiz({ msg: param.msg, client: client });
            param.msg.client.removeListener("messageReactionAdd", listener);
            break;
          case "🗽":
            param.msg.channel.send(pickQuizEmbed("Picked Capital City Quiz."));
            quizL.capitalCityQuiz({ msg: param.msg, client: client });
            param.msg.client.removeListener("messageReactionAdd", listener);
            break;
          case "👨‍🦯":
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
