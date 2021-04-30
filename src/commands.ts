import * as Discord from "discord.js";
import * as transL from "./commandUtils/translate";
import * as quizL from "./commandUtils/quiz";
import randomColor from "randomcolor";
import ISO6391 from "iso-639-1";

// For Message Embed
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;
let holdingQuizCommand: boolean = false;

// Param Interface
interface funcParams {
  command: string;
  argm: string[];
  msg: Discord.Message;
}

// Translate Command
export function initializeTranslator(param: funcParams) {
  // Translator variables
  let sentence: any;
  let language: string;
  let translatedRes: any;
  //
  if (param.command === "translate") {
    if (param.argm.length <= 0) {
      return param.msg.reply("error: missing [language] [sentence]");
    }
    sentence = transL.parseSentence(param.argm);
    language = transL.parseLanguage(param.argm[0].toLowerCase());
    if (sentence.length <= 0) {
      return param.msg.reply("error: missing [sentence]");
    }
    if (language === "") {
      return param.msg.reply("error: language doesn't exist or not supported");
    }
    transL
      .translateText(sentence, language)
      .then((d) => {
        translatedRes = d;
        const urlSentence = sentence
          .replace(/\s/g, "%20")
          .replace(/\s+/g, "")
          .trim();
        const fromLanguage = translatedRes.from.language.iso;
        const resultMessage = new Discord.MessageEmbed()
          .setColor(randomColor().substring(1))
          .setAuthor("Transero the Great", avatar)
          .setTitle("Translate:")
          .setDescription(
            `**${ISO6391.getName(fromLanguage)}** to **${ISO6391.getName(
              language
            )}**`
          )
          .addField("From:", sentence)
          .addField("To:", translatedRes.text)
          .addField(
            "More Details:",
            `[Google Translate](https://translate.google.com/?sl=${fromLanguage}&tl=${language}&text=${urlSentence}&op=translate)`
          );
        param.msg.channel.send(resultMessage);
      })
      .catch((e: any) => console.error(e));
  }
}

// Quiz Command
export function initializeQuiz(param: funcParams, client: Discord.Client) {
  // Variable
  let notAnswered: boolean = true;
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
      user: Discord.User
    ) => {
      if (user.bot) return;
      const emojiName = reaction.emoji.name;
      if (reaction.message.id === quizMsgId) {
        if (notAnswered) {
          switch (emojiName) {
            case "📠":
              param.msg.channel.send(
                pickQuizEmbed("Picked Country Flag Quiz.")
              );
              quizL.countryFlagQuiz({ msg: param.msg, client: client });
              notAnswered = false;
              holdingQuizCommand = true;
              param.msg.client.removeListener("messageReactionAdd", listener);
              break;
            case "🗽":
              param.msg.channel.send(
                pickQuizEmbed("Picked Capital City Quiz.")
              );
              quizL.capitalCityQuiz({ msg: param.msg, client: client });
              notAnswered = false;
              holdingQuizCommand = true;
              param.msg.client.removeListener("messageReactionAdd", listener);
              break;
            case "👨‍🦯":
              param.msg.channel.send(pickQuizEmbed("Picked Country Quiz."));
              quizL.countryCapitalQuiz({ msg: param.msg, client: client });
              notAnswered = false;
              holdingQuizCommand = true;
              param.msg.client.removeListener("messageReactionAdd", listener);
              break;
          }
        }
      }
    };
    param.msg.client.on("messageReactionAdd", listener);
  } else if (param.command === "trquiz" && holdingQuizCommand) {
    return param.msg.channel.send(pickQuizEmbed("Game currently running."));
  }
}

export function disableHoldingCommand(input: boolean) {
  holdingQuizCommand = input;
}

function pickQuizEmbed(message: string) {
  return new Discord.MessageEmbed()
    .setColor(randomColor().substring(1))
    .setAuthor("Transero the Quiz Whizz", avatar)
    .setDescription(message);
}
