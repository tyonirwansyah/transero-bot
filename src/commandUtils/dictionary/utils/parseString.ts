import ISO6391 from "iso-639-1";
import { languages } from "./languages";

export function parseWord(words: string[]): string {
  if (words[1] === "") return "";
  let sentence = "";
  for (let i = 1; i < words.length; i++) {
    sentence += words[i] + "%20";
  }
  return sentence;
}

export function parseLang(lang: string): string {
  if (lang.startsWith("en-")) {
    const code = lang[3] + lang[4];
    const lg = "english" + code;
    if (languages.has(lg)) {
      return languages.get(lg);
    } else {
      return "";
    }
  }
  const languageConvert = ISO6391.getName(lang).toLowerCase();
  if (lang.length == 2 && languages.has(languageConvert)) {
    return languages.get(languageConvert);
  } else if (languages.has(lang)) {
    return languages.get(lang).toString();
  } else {
    return "";
  }
}
