import * as Discord from "discord.js";
import * as country from "country-quiz";
import randomColor from "randomcolor";
import iso from "iso-3166-1";

// Message Embed Variables
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;

// Quiz Selections
let FlagtoCountry = country.newQuiz("flag-to-country", 1);
let CountrytoCity = country.newQuiz("country-to-capital", 1);
let CitytoCountry = country.newQuiz("capital-to-country", 1);

// Is Playing?
let isPlaying: boolean = true;

// Param Interface
interface quizParams {
  msg: Discord.Message;
  client: Discord.Client;
}

// Flag to Country
export function countryFlagQuiz(p: quizParams) {
  let notAnswered: boolean = true;
  FlagtoCountry = country.newQuiz("flag-to-country");
  const quiz = FlagtoCountry;
  quizQuestionEmbed({
    quiz: quiz,
    quizQ: quiz.questions[0],
    typeQuiz: 0,
    msg: p.msg,
    imgUrl: quiz.questions[0].question,
  });
  const listener = (reaction: Discord.MessageReaction, user: Discord.User) => {
    if (user.bot) return;
    const emojiName = reaction.emoji.name;
    const fetchMessage = p.msg.channel.lastMessage.id;
    if (reaction.message.id === fetchMessage && notAnswered) {
      const answerKey = quiz.questions[0];
      checkAnswers({
        msg: p.msg,
        client: p.client,
        answerKey: answerKey,
        emoji: emojiName,
        listener: listener,
      });
      notAnswered = false;
    }
  };
  p.client.on("messageReactionAdd", listener);
}

// Country to City
export function capitalCityQuiz(p: quizParams) {
  let notAnswered: boolean = true;
  CountrytoCity = country.newQuiz("country-to-capital");
  const quiz = CountrytoCity;
  quizQuestionEmbed({
    quiz: quiz,
    quizQ: quiz.questions[0],
    typeQuiz: 1,
    msg: p.msg,
  });
  const listener = (reaction: Discord.MessageReaction, user: Discord.User) => {
    if (user.bot) return;
    const emojiName = reaction.emoji.name;
    const fetchMessage = p.msg.channel.lastMessage.id;
    if (reaction.message.id === fetchMessage && notAnswered) {
      const answerKey = quiz.questions[0];
      checkAnswers({
        msg: p.msg,
        client: p.client,
        answerKey: answerKey,
        emoji: emojiName,
        listener: listener,
      });
      notAnswered = false;
    }
  };
  p.client.on("messageReactionAdd", listener);
}

// City to Country
export function countryCapitalQuiz(p: quizParams) {
  let notAnswered: boolean = true;
  CitytoCountry = country.newQuiz("capital-to-country");
  const quiz = CitytoCountry;
  quizQuestionEmbed({
    quiz: quiz,
    quizQ: quiz.questions[0],
    typeQuiz: 2,
    msg: p.msg,
  });
  const listener = (reaction: Discord.MessageReaction, user: Discord.User) => {
    if (user.bot) return;
    const emojiName = reaction.emoji.name;
    const fetchMessage = p.msg.channel.lastMessage.id;
    if (reaction.message.id === fetchMessage && notAnswered) {
      const answerKey = quiz.questions[0];
      checkAnswers({
        msg: p.msg,
        client: p.client,
        answerKey: answerKey,
        emoji: emojiName,
        listener: listener,
      });
      notAnswered = false;
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

// Verify Answer
function verifyAnswer(answer: string, input: string, msg: Discord.Message) {
  if (answer === input) {
    return answerEmbed({
      isRight: true,
      msg: msg,
    });
  } else if (answer != input) {
    return answerEmbed({
      isRight: false,
      msg: msg,
      answer: answer.toUpperCase(),
    });
  }
}

// Embedss //

interface answerEmbedParams {
  isRight: boolean;
  msg: Discord.Message;
  answer?: string;
}

function answerEmbed(p: answerEmbedParams) {
  if (p.isRight === true) {
    const embed = new Discord.MessageEmbed()
      .setColor(randomColor().substring(1))
      .setAuthor("Transero the Quiz Whizz", avatar)
      .setDescription("You got the right answer.");
    return p.msg.channel
      .send(embed)
      .then((message) => {
        message.react("🚫");
        message.react("⏭");
      })
      .catch((e) => {
        console.error(e);
      });
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor(randomColor().substring(1))
      .setAuthor("Transero the Quiz Whizz", avatar)
      .setDescription("You got the wrong answer.")
      .setFooter(`The answer is ${"**" + p.answer + "**"}`);
    return p.msg.channel
      .send(embed)
      .then((message) => {
        message.react("🚫");
        message.react("⏭");
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

interface quizQuestionParams {
  quizQ: any;
  typeQuiz: number;
  msg: Discord.Message;
  imgUrl?: string;
  quiz?: any;
}

function quizQuestionEmbed(p: quizQuestionParams) {
  if (!isPlaying) return;
  let embed = new Discord.MessageEmbed()
    .setColor(randomColor().substring(1))
    .setAuthor("Transero the Quiz Whizz", avatar)
    .setTitle(`Question:`);
  // 0 == Flag Country Flag Quiz
  if (p.typeQuiz === 0) {
    const option = p.quizQ.options;
    const url = flagToPng(p.imgUrl);
    return p.msg.channel
      .send(
        embed
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
  if (p.typeQuiz === 1) {
    const option = p.quizQ.options;
    return p.msg.channel
      .send(
        embed
          .setColor(randomColor().substring(1))
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
  if (p.typeQuiz === 2) {
    const option = p.quizQ.options;
    return p.msg.channel
      .send(
        embed
          .setColor(randomColor().substring(1))
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

interface checkAnswersParam {
  msg: Discord.Message;
  client: Discord.Client;
  answerKey: string[];
  emoji: string;
  listener: any;
}

function checkAnswers(p: checkAnswersParam) {
  switch (p.emoji) {
    case "1️⃣":
      verifyAnswer(p.answerKey.answer, p.answerKey.options[0], p.msg);
      p.client.removeListener("messageReactionAdd", p.listener);
      break;
    case "2️⃣":
      verifyAnswer(p.answerKey.answer, p.answerKey.options[1], p.msg);
      p.client.removeListener("messageReactionAdd", p.listener);
      break;
    case "3️⃣":
      verifyAnswer(p.answerKey.answer, p.answerKey.options[2], p.msg);
      p.client.removeListener("messageReactionAdd", p.listener);
      break;
    case "4️⃣":
      verifyAnswer(p.answerKey.answer, p.answerKey.options[3], p.msg);
      p.client.removeListener("messageReactionAdd", p.listener);
      break;
  }
}
