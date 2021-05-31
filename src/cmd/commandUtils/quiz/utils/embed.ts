/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as Discord from "discord.js";
import { gameMode } from "../quiz";
import { flagToPng } from "./flagToPng";
import { listenContinueAnswers } from "./verifyContinue";
import { avatar } from "../../globals/global";
import {
  quizQuestionParams,
  quizQuestionEmbedParams,
  answerEmbedParams,
  endEmbedParams,
} from "./embedInterface";

export function quizQuestionEmbed(p: quizQuestionParams): void | Promise<void> {
  //@ts-ignore
  const option = p.quizQ.options;
  const url = flagToPng(p.imgUrl);
  const optionsText = `1) ${option[0]}\n 2) ${option[1]}\n 3) ${option[2]}\n 4) ${option[3]}\n`;
  // 0 == Flag Country Flag Quiz
  if (p.typeQuiz === gameMode.FLAGTOCOUNTRY) {
    return quizQuestionEmbedSend({
      color: "1CCAD8",
      question: "What Country is this flag from?",
      options: optionsText,
      msg: p.msg,
      thumbnail: url,
      newField: `[Click Here to See.](${p.imgUrl})`,
    });
  }
  // 1 == Capital City Quiz
  if (p.typeQuiz === gameMode.COUNTRYTOCITY) {
    return quizQuestionEmbedSend({
      color: "840032",
      //@ts-ignore
      question: `What is the capital city of **${p.quizQ.question}**?`,
      options: optionsText,
      msg: p.msg,
    });
  }
  // 2 == Country Quiz
  if (p.typeQuiz === gameMode.CITYTOCOUNTRY) {
    return quizQuestionEmbedSend({
      color: "87F5FB",
      //@ts-ignore
      question: `What country is **${p.quizQ.question}** in?`,
      options: optionsText,
      msg: p.msg,
    });
  } else {
    return console.error("[typeQuiz] only accept number from 0-2");
  }
}

function quizQuestionEmbedSend(p: quizQuestionEmbedParams) {
  const embed = new Discord.MessageEmbed()
    .setAuthor("Transero the Quiz Whizz", avatar)
    .setTitle(`Question:`)
    .setColor(p.color)
    .setDescription(p.question)
    .addField("Answers", p.options)
    .setFooter("React to one of the icon below!");
  if (p.thumbnail && p.newField) {
    embed.addField("Cannot See Image?", p.newField).setThumbnail(p.thumbnail);
  }
  return p.msg.channel
    .send(embed)
    .then((message) => {
      message.react("1️⃣");
      message.react("2️⃣");
      message.react("3️⃣");
      message.react("4️⃣");
    })
    .catch((e) => console.error(e));
}

export function answerEmbed(p: answerEmbedParams): Promise<void> {
  if (p.isRight === true) {
    const embed = new Discord.MessageEmbed()
      .setColor("317B22")
      .setAuthor("Transero the Quiz Whizz", avatar)
      .setDescription("You got the right answer.");
    return listenContinueAnswers({
      msg: p.msg,
      client: p.client,
      embed: embed,
      gameMode: p.gameMode,
    });
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor("B33F62")
      .setAuthor("Transero the Quiz Whizz", avatar)
      .setDescription("You got the wrong answer.")
      .setFooter(`The answer is ${"**" + p.answer + "**"}`);
    return listenContinueAnswers({
      msg: p.msg,
      client: p.client,
      embed: embed,
      gameMode: p.gameMode,
    });
  }
}

export function endEmbed(p: endEmbedParams): Promise<Discord.Message> {
  const embed = new Discord.MessageEmbed()
    .setColor("317B22")
    .setAuthor("Transero the Quiz Whizz", avatar)
    .setFooter("Ended, Thank you for joining the quiz");
  return p.msg.channel.send(embed);
}
