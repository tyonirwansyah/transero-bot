import * as Discord from "discord.js";

export interface answerEmbedParams {
  isRight: boolean;
  msg: Discord.Message;
  client: Discord.Client;
  answer?: string;
  gameMode: number;
}
export interface quizQuestionParams {
  quizQ: string[];
  typeQuiz: number;
  msg: Discord.Message;
  imgUrl: string;
  quiz?: string[];
}
export interface quizQuestionEmbedParams {
  color: string;
  question: string;
  options: string;
  msg: Discord.Message;
  thumbnail?: string;
  newField?: string;
}

export interface endEmbedParams {
  msg: Discord.Message;
}
