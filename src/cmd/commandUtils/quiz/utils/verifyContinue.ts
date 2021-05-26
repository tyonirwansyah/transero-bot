import {
  gameMode,
  countryFlagQuiz,
  capitalCityQuiz,
  countryCapitalQuiz,
} from "../quiz";
import {
  listenContinueAnswersParams,
  continueQuizParams,
} from "../quizInterface";
import * as Discord from "discord.js";
import { endEmbed } from "./embed";

export function listenContinueAnswers(
  p: listenContinueAnswersParams
): Promise<void> {
  return p.msg.channel
    .send(p.embed)
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
      endEmbed({ msg: p.msg });
      break;
  }
}
