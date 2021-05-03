import * as Discord from "discord.js";
import * as country from "country-quiz";
import iso from "iso-3166-1";

// Message Embed Variables
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;

// Quiz Selections
let FlagtoCountry = country.newQuiz("flag-to-country", 1);
let CountrytoCity = country.newQuiz("country-to-capital", 1);
let CitytoCountry = country.newQuiz("capital-to-country", 1);

// Param Interface
interface quizParams {
  msg: Discord.Message;
  client: Discord.Client;
}

enum gameMode {
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
  const listener = (
    reaction: Discord.MessageReaction,
    user: UserOrPartialUser
  ) => {
    if (user.bot) return;
    const emojiName = reaction.emoji.name;
    const fetchMessage = p?.msg?.channel?.lastMessage?.id;
    if (reaction.message.id === fetchMessage) {
      const answerKey = quiz.questions[0];
      checkAnswers({
        msg: p.msg,
        client: p.client,
        answerKey: answerKey,
        emoji: emojiName,
        gameMode: gameMode.FLAGTOCOUNTRY,
      });
      p.client.removeListener("messageReactionAdd", listener);
    }
  };
  p.client.on("messageReactionAdd", listener);
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
  const listener = (
    reaction: Discord.MessageReaction,
    user: UserOrPartialUser
  ) => {
    if (user.bot) return;
    const emojiName = reaction.emoji.name;
    const fetchMessage = p.msg?.channel?.lastMessage?.id;
    if (reaction.message.id === fetchMessage) {
      const answerKey = quiz.questions[0];
      checkAnswers({
        msg: p.msg,
        client: p.client,
        answerKey: answerKey,
        emoji: emojiName,
        gameMode: gameMode.COUNTRYTOCITY,
      });
      p.client.removeListener("messageReactionAdd", listener);
    }
  };
  p.client.on("messageReactionAdd", listener);
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
  const listener = (
    reaction: Discord.MessageReaction,
    user: UserOrPartialUser
  ) => {
    if (user.bot) return;
    const emojiName = reaction.emoji.name;
    const fetchMessage = p.msg?.channel?.lastMessage?.id;
    if (reaction.message.id === fetchMessage) {
      const answerKey = quiz.questions[0];
      checkAnswers({
        msg: p.msg,
        client: p.client,
        answerKey: answerKey,
        emoji: emojiName,
        gameMode: gameMode.CITYTOCOUNTRY,
      });
      p.client.removeListener("messageReactionAdd", listener);
    }
  };
  p.client.on("messageReactionAdd", listener);
}

/// Local Funcssss ///

// Convert to png
function flagToPng(url: string) {
  const countryIso = url.substring(30).replace(".svg", "");
  const isoCode = iso.whereAlpha3(countryIso);
  const newUrl = `https://flagcdn.com/w160/${
    isoCode === undefined ? "" : isoCode.alpha2.toLowerCase()
  }.png`;
  return newUrl;
}

interface verifyAnswerParams {
  answer: string;
  input: string;
  msg: Discord.Message;
  client: Discord.Client;
  gameMode: number;
}

// Verify Answer
function verifyAnswer(p: verifyAnswerParams) {
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

// Embedss //

interface answerEmbedParams {
  isRight: boolean;
  msg: Discord.Message;
  client: Discord.Client;
  answer?: string;
  gameMode: number;
}

function answerEmbed(p: answerEmbedParams) {
  if (p.isRight === true) {
    const embed = new Discord.MessageEmbed()
      .setColor("317B22")
      .setAuthor("Transero the Quiz Whizz", avatar)
      .setDescription("You got the right answer.");
    return p.msg.channel
      .send(embed)
      .then((message) => {
        message.react("🚫");
        message.react("⏭");
        const listener = (
          reaction: Discord.MessageReaction,
          user: UserOrPartialUser
        ) => {
          if (user.bot) return;
          const emojiName = reaction.emoji.name;
          if (reaction.message.id === message.id) {
            continueQuiz({
              client: p.msg.client,
              msg: p.msg,
              gameMode: p.gameMode,
              emoji: emojiName,
            });
            p.client.removeListener("messageReactionAdd", listener);
          }
        };
        p.client.on("messageReactionAdd", listener);
      })
      .catch((e) => {
        console.error(e);
      });
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor("B33F62")
      .setAuthor("Transero the Quiz Whizz", avatar)
      .setDescription("You got the wrong answer.")
      .setFooter(`The answer is ${"**" + p.answer + "**"}`);
    return p.msg.channel
      .send(embed)
      .then((message) => {
        message.react("🚫");
        message.react("⏭");
        const listener = (
          reaction: Discord.MessageReaction,
          user: Discord.User | Discord.PartialUser
        ) => {
          if (user.bot) return;
          const emojiName = reaction.emoji.name;
          if (reaction.message.id === message.id) {
            continueQuiz({
              client: p.msg.client,
              msg: p.msg,
              gameMode: p.gameMode,
              emoji: emojiName,
            });
            p.client.removeListener("messageReactionAdd", listener);
          }
        };
        p.client.on("messageReactionAdd", listener);
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

interface continueQuizParams {
  client: Discord.Client;
  msg: Discord.Message;
  gameMode: number;
  emoji: string;
}

function continueQuiz(p: continueQuizParams) {
  switch (p.emoji) {
    case "⏭":
      if (p.gameMode === gameMode.FLAGTOCOUNTRY)
        return countryFlagQuiz({ client: p.client, msg: p.msg });
      if (p.gameMode === gameMode.COUNTRYTOCITY)
        return capitalCityQuiz({ client: p.client, msg: p.msg });
      if (p.gameMode === gameMode.CITYTOCOUNTRY)
        return countryCapitalQuiz({ client: p.client, msg: p.msg });
      break;
    case "🚫":
      break;
  }
}

interface quizQuestionParams {
  quizQ: string[];
  typeQuiz: number;
  msg: Discord.Message;
  imgUrl: string;
  quiz?: string[];
}

function quizQuestionEmbed(p: quizQuestionParams) {
  const embed = new Discord.MessageEmbed()
    .setAuthor("Transero the Quiz Whizz", avatar)
    .setTitle(`Question:`);
  // 0 == Flag Country Flag Quiz
  if (p.typeQuiz === gameMode.FLAGTOCOUNTRY) {
    const option = p.quizQ.options;
    const url = flagToPng(p.imgUrl);
    return p.msg.channel
      .send(
        embed
          .setColor("1CCAD8")
          .setDescription("What Country is this flag from?")
          .setThumbnail(url)
          .addField(
            "Answers",
            `1) ${option[0]}\n 2) ${option[1]}\n 3) ${option[2]}\n 4) ${option[3]}\n`
          )
          .addField("Cannot See Image?", `[Click Here to See.](${p.imgUrl})`)
          .setFooter("React to one of the icon below!")
      )
      .then((message) => {
        message.react("1️⃣");
        message.react("2️⃣");
        message.react("3️⃣");
        message.react("4️⃣");
      })
      .catch((e) => console.error(e));
  }
  // 1 == Capital City Quiz
  if (p.typeQuiz === gameMode.COUNTRYTOCITY) {
    const option = p.quizQ.options;
    return p.msg.channel
      .send(
        embed
          .setColor("840032")
          .setAuthor("Transero the Quiz Whizz", avatar)
          .setDescription(
            `What is the capital city of **${p.quizQ.question}**?`
          )
          .addField(
            "Answers",
            `1) ${option[0]}\n 2) ${option[1]}\n 3) ${option[2]}\n 4) ${option[3]}\n`
          )
          .setFooter("React to one of the icon below!")
      )
      .then((message) => {
        message.react("1️⃣");
        message.react("2️⃣");
        message.react("3️⃣");
        message.react("4️⃣");
      })
      .catch((e) => console.error(e));
  }
  // 2 == Country Quiz
  if (p.typeQuiz === gameMode.CITYTOCOUNTRY) {
    const option = p.quizQ.options;
    return p.msg.channel
      .send(
        embed
          .setColor("87F5FB")
          .setAuthor("Transero the Quiz Whizz", avatar)
          .setDescription(`What country is **${p.quizQ.question}** in?`)
          .addField(
            "Answers",
            `1) ${option[0]}\n 2) ${option[1]}\n 3) ${option[2]}\n 4) ${option[3]}\n`
          )
          .setFooter("React to one of the icon below!")
      )
      .then((message) => {
        message.react("1️⃣");
        message.react("2️⃣");
        message.react("3️⃣");
        message.react("4️⃣");
      })
      .catch((e) => console.error(e));
  } else {
    return console.error("[typeQuiz] only accept number from 0-2");
  }
}

interface checkAnswersParams {
  msg: Discord.Message;
  client: Discord.Client;
  answerKey: string[];
  emoji: string;
  gameMode: number;
}

function checkAnswers(p: checkAnswersParams) {
  const { options, answer }: string[] = p.answerKey;
  switch (p.emoji) {
    case "1️⃣":
      verifyAnswer({
        answer: answer,
        input: options[0],
        msg: p.msg,
        gameMode: p.gameMode,
        client: p.client,
      });
      break;
    case "2️⃣":
      verifyAnswer({
        answer: answer,
        input: options[1],
        msg: p.msg,
        gameMode: p.gameMode,
        client: p.client,
      });
      break;
    case "3️⃣":
      verifyAnswer({
        answer: answer,
        input: options[2],
        msg: p.msg,
        gameMode: p.gameMode,
        client: p.client,
      });
      break;
    case "4️⃣":
      verifyAnswer({
        answer: answer,
        input: options[3],
        msg: p.msg,
        gameMode: p.gameMode,
        client: p.client,
      });
      break;
  }
}
