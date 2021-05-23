import { checkAnswersParams } from "../quizInterface";
import { verifyAnswer } from "../quiz";

export function checkAnswers(p: checkAnswersParams): void {
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
