import * as Discord from "discord.js";
import { gameMode } from "./quiz";

export interface verifyAnswerParams {
  answer: string;
  input: string;
  msg: Discord.Message;
  client: Discord.Client;
  gameMode: number;
}

export interface checkAnswersParams {
  msg: Discord.Message;
  client: Discord.Client;
  answerKey: string[];
  emoji: string;
  gameMode: gameMode;
}

export interface continueQuizParams {
  client: Discord.Client;
  msg: Discord.Message;
  gameMode: number;
  emoji: string;
}

export interface listenAnswersParams {
  msg: Discord.Message;
  client: Discord.Client;
  quiz: string[];
  gameMode: gameMode;
}

export interface listenContinueAnswersParams {
  msg: Discord.Message;
  client: Discord.Client;
  embed: Discord.MessageEmbed;
  gameMode: gameMode;
}

export interface quizParams {
  msg: Discord.Message;
  client: Discord.Client;
}
