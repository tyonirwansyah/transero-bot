import {
  listenAnswersParams,
  verifyAnswerParams,
  quizParams,
} from "./quizInterface";
import * as Discord from "discord.js";
import * as country from "country-quiz";
import { quizQuestionEmbed, answerEmbed } from "./utils/embed";
import { checkAnswers } from "./utils/verifyAnswers";

// Message Embed Variables
export const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;

// Quiz Selections
let FlagtoCountry = country.newQuiz("flag-to-country", 1);
let CountrytoCity = country.newQuiz("country-to-capital", 1);
let CitytoCountry = country.newQuiz("capital-to-country", 1);

export enum gameMode {
  FLAGTOCOUNTRY,
  COUNTRYTOCITY,
  CITYTOCOUNTRY,
}

type UserOrPartialUser = Discord.User | Discord.PartialUser;

// Flag to Country
export function countryFlagQuiz(p: quizParams): void {
  FlagtoCountry = country.newQuiz("flag-to-country");
  const quiz = FlagtoCountry;
  quizQuestionEmbed({
    quiz: quiz,
    quizQ: quiz.questions[0],
    typeQuiz: gameMode.FLAGTOCOUNTRY,
    msg: p.msg,
    imgUrl: quiz.questions[0].question,
  });
  listenAnswers({
    msg: p.msg,
    client: p.client,
    quiz: quiz,
    gameMode: gameMode.FLAGTOCOUNTRY,
  });
}

// Country to City
export function capitalCityQuiz(p: quizParams): void {
  CountrytoCity = country.newQuiz("country-to-capital");
  const quiz = CountrytoCity;
  quizQuestionEmbed({
    quiz: quiz,
    quizQ: quiz.questions[0],
    typeQuiz: gameMode.COUNTRYTOCITY,
    msg: p.msg,
    imgUrl: "",
  });
  listenAnswers({
    msg: p.msg,
    client: p.client,
    quiz: quiz,
    gameMode: gameMode.COUNTRYTOCITY,
  });
}

// City to Country
export function countryCapitalQuiz(p: quizParams): void {
  CitytoCountry = country.newQuiz("capital-to-country");
  const quiz = CitytoCountry;
  quizQuestionEmbed({
    quiz: quiz,
    quizQ: quiz.questions[0],
    typeQuiz: gameMode.CITYTOCOUNTRY,
    msg: p.msg,
    imgUrl: "",
  });
  listenAnswers({
    msg: p.msg,
    client: p.client,
    quiz: quiz,
    gameMode: gameMode.CITYTOCOUNTRY,
  });
}

// Listen Answer

function listenAnswers(p: listenAnswersParams): void {
  const listener = (
    reaction: Discord.MessageReaction,
    user: UserOrPartialUser
  ) => {
    if (user.bot) return;
    const emojiName = reaction.emoji.name;
    const fetchMessage = p.msg?.channel?.lastMessage?.id;
    if (reaction.message.id === fetchMessage) {
      const answerKey = p.quiz.questions[0];
      checkAnswers({
        msg: p.msg,
        client: p.client,
        answerKey: answerKey,
        emoji: emojiName,
        gameMode: p.gameMode,
      });
      p.client.removeListener("messageReactionAdd", listener);
    }
  };
  p.client.on("messageReactionAdd", listener);
}

// Verify Answer
export function verifyAnswer(p: verifyAnswerParams): Promise<void> | undefined {
  if (p.answer === p.input) {
    return answerEmbed({
      isRight: true,
      msg: p.msg,
      gameMode: p.gameMode,
      client: p.client,
    });
  } else if (p.answer != p.input) {
    return answerEmbed({
      isRight: false,
      msg: p.msg,
      answer: p.answer.toUpperCase(),
      gameMode: p.gameMode,
      client: p.client,
    });
  }
}
