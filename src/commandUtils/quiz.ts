import * as Discord from "discord.js";
import * as country from "country-quiz";
import randomColor from "randomcolor";
import iso from "iso-3166-1";
import { disableHoldingCommand } from "../commands";

// Message Embed Variables
const avatar = `https://i.pinimg.com/originals/c1/09/cf/c109cf64b7b0f7bcdf5b46d4069f4ee3.jpg`;

// Quiz Selections
let FlagtoCountry = country.newQuiz("flag-to-country");
let CountrytoCity = country.newQuiz("country-to-capital");
let CitytoCountry = country.newQuiz("capital-to-country");

let messageId: string;

// Is Playing?
let isPlaying: boolean = true;
let qCount: number = 0;
let scoreAnswer: number = 0;

// Param Interface
interface quizParams {
  msg: Discord.Message;
  client: Discord.Client;
}

// Exported Functions //

// Flag to Country
export function countryFlagQuiz(p: quizParams) {
  let notAnswered: boolean = true;
  if (qCount === FlagtoCountry.questions.length) {
    isPlaying = false;
    resultEmbed(scoreAnswer, FlagtoCountry.questions.length, p.msg);
    p.client.removeAllListeners("messageReactionAdd"); // prevent mem. leaks
    disableHoldingCommand(false);
    return (
      (FlagtoCountry = country.newQuiz("flag-to-country")),
      (isPlaying = true),
      (qCount = 0),
      (scoreAnswer = 0)
    );
  }
  if (isPlaying) {
    quizQuestionEmbed({
      quiz: FlagtoCountry,
      quizQ: FlagtoCountry.questions[qCount],
      typeQuiz: 0,
      msg: p.msg,
      imgUrl: FlagtoCountry.questions[qCount].question,
    });
    p.client.on("messageReactionAdd", (reaction, user) => {
      if (user.bot) return;
      const emojiName = reaction.emoji.name;
      if (reaction.message.id === messageId) {
        if (notAnswered) {
          let yourAnswer: number;
          const answerKey = FlagtoCountry.questions[qCount];
          switch (emojiName) {
            case "1️⃣":
              notAnswered = false;
              yourAnswer = 0;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              countryFlagQuiz({ msg: p.msg, client: p.client });
              break;
            case "2️⃣":
              notAnswered = false;
              yourAnswer = 1;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              countryFlagQuiz({ msg: p.msg, client: p.client });
              break;
            case "3️⃣":
              notAnswered = false;
              yourAnswer = 2;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              countryFlagQuiz({ msg: p.msg, client: p.client });
              break;
            case "4️⃣":
              notAnswered = false;
              yourAnswer = 3;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              countryFlagQuiz({ msg: p.msg, client: p.client });
              break;
          }
        }
      }
    });
  }
}

// Country to City
export function capitalCityQuiz(p: quizParams) {
  let notAnswered: boolean = true;
  if (qCount === CountrytoCity.questions.length) {
    isPlaying = false;
    resultEmbed(scoreAnswer, CountrytoCity.questions.length, p.msg);
    p.client.removeAllListeners("messageReactionAdd"); // prevent mem. leaks
    disableHoldingCommand(false);
    return (
      (CountrytoCity = country.newQuiz("country-to-capital")),
      (isPlaying = true),
      (qCount = 0),
      (scoreAnswer = 0)
    );
  }
  if (isPlaying) {
    quizQuestionEmbed({
      quiz: CountrytoCity,
      quizQ: CountrytoCity.questions[qCount],
      typeQuiz: 1,
      msg: p.msg,
    });
    p.client.on("messageReactionAdd", (reaction, user) => {
      if (user.bot) return;
      const emojiName = reaction.emoji.name;
      if (reaction.message.id === messageId) {
        if (notAnswered) {
          let yourAnswer: number;
          const answerKey = CountrytoCity.questions[qCount];
          switch (emojiName) {
            case "1️⃣":
              notAnswered = false;
              yourAnswer = 0;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              capitalCityQuiz({ msg: p.msg, client: p.client });
              break;
            case "2️⃣":
              notAnswered = false;
              yourAnswer = 1;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              capitalCityQuiz({ msg: p.msg, client: p.client });
              break;
            case "3️⃣":
              notAnswered = false;
              yourAnswer = 2;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              capitalCityQuiz({ msg: p.msg, client: p.client });
              break;
            case "4️⃣":
              notAnswered = false;
              yourAnswer = 3;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              capitalCityQuiz({ msg: p.msg, client: p.client });
              break;
          }
        }
      }
    });
  }
}

// City to Country
export function countryCapitalQuiz(p: quizParams) {
  let notAnswered: boolean = true;
  if (qCount === CitytoCountry.questions.length) {
    isPlaying = false;
    resultEmbed(scoreAnswer, CitytoCountry.questions.length, p.msg);
    p.client.removeAllListeners("messageReactionAdd"); // prevent mem. leaks
    disableHoldingCommand(false);
    return (
      (CitytoCountry = country.newQuiz("capital-to-country")),
      (isPlaying = true),
      (qCount = 0),
      (scoreAnswer = 0)
    );
  }
  if (isPlaying) {
    quizQuestionEmbed({
      quiz: CitytoCountry,
      quizQ: CitytoCountry.questions[qCount],
      typeQuiz: 2,
      msg: p.msg,
    });
    p.client.on("messageReactionAdd", (reaction, user) => {
      if (user.bot) return;
      const emojiName = reaction.emoji.name;
      if (reaction.message.id === messageId) {
        if (notAnswered) {
          let yourAnswer: number;
          const answerKey = CitytoCountry.questions[qCount];
          switch (emojiName) {
            case "1️⃣":
              notAnswered = false;
              yourAnswer = 0;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              countryCapitalQuiz({ msg: p.msg, client: p.client });
              break;
            case "2️⃣":
              notAnswered = false;
              yourAnswer = 1;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              countryCapitalQuiz({ msg: p.msg, client: p.client });
              break;
            case "3️⃣":
              notAnswered = false;
              yourAnswer = 2;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              countryCapitalQuiz({ msg: p.msg, client: p.client });
              break;
            case "4️⃣":
              notAnswered = false;
              yourAnswer = 3;
              p.msg.channel.send(
                verifyAnswer(answerKey.answer, answerKey.options[yourAnswer])
              );
              qCount++;
              countryCapitalQuiz({ msg: p.msg, client: p.client });
              break;
          }
        }
      }
    });
  }
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
function verifyAnswer(answer: string, input: string) {
  if (answer === input) {
    scoreAnswer += 1;
    return answerEmbed(true);
  } else if (answer != input) {
    return answerEmbed(false, answer.toUpperCase());
  }
}

// Embedss //

function answerEmbed(isRight: boolean, answer?: string) {
  if (isRight === true) {
    return new Discord.MessageEmbed()
      .setColor(randomColor().substring(1))
      .setAuthor("Transero the Quiz Whizz", avatar)
      .setDescription("You got the right answer.");
  } else {
    return new Discord.MessageEmbed()
      .setColor(randomColor().substring(1))
      .setAuthor("Transero the Quiz Whizz", avatar)
      .setDescription("You got the wrong answer.")
      .setFooter(`The answer is ${"**" + answer + "**"}`);
  }
}

function resultEmbed(score: number, question: number, msg: Discord.Message) {
  if (score === 5) {
    const embed = new Discord.MessageEmbed()
      .setColor(randomColor().substring(1))
      .setAuthor("Transero the Quiz Whizz", avatar)
      .addField("Results", "**Bingo**, you got everything correct ")
      .setFooter("Type `$trquiz` if you want to play again");
    msg.channel.send(embed);
  } else if (score < 2) {
    const embed = new Discord.MessageEmbed()
      .setColor(randomColor().substring(1))
      .setAuthor("Transero the Quiz Whizz", avatar)
      .addField("Results", `**Oh noo**, you gotta learn ${score}/${question}`)
      .setFooter("Type `$trquiz` if you want to try again");
    msg.channel.send(embed);
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor(randomColor().substring(1))
      .setAuthor("Transero the Quiz Whizz", avatar)
      .addField("Results", `**Eii**, you got ${score}/${question}`)
      .setFooter("Type `$trquiz` if you want to play again");
    msg.channel.send(embed);
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
    .setTitle(`Question ${qCount + 1}/${p.quiz.questions.length}`);
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
        messageId = message.id;
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
        messageId = message.id;
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
        messageId = message.id;
      })
      .catch((e) => console.error(e));
  } else {
    return console.error("[typeQuiz] only accept number from 0-2");
  }
}
