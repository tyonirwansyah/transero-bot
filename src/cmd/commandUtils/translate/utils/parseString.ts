import ISO6391 from "iso-639-1";
import { languages } from "./languages";

export function parseSentence(words: string[] | string, parseNum = 1): string {
  if (words === null) return "";
  if (words === undefined) return "";
  if (words[1] === "") return "";
  let sentence = "";
  for (let i = parseNum; i < words.length; i++) {
    sentence += words[i] + " ";
  }
  return sentence;
}

export function parseLanguage(lang: string): string {
  // Chinese => Traditional or Simplified
  if (lang.startsWith("zh")) {
    let words;
    const capitalize =
      lang.slice(3, 5) === "cn" || "tw" ? lang.slice(3, 5).toUpperCase() : "";
    const word = lang.slice(0, 3);
    if (capitalize === "TW" || capitalize === "CN") {
      words = word + capitalize;
      return words;
    }
    return "";
  }
  // Main Code
  const languageConvert = ISO6391.getName(lang).toLowerCase();
  if (lang.length == 2 && languages.has(languageConvert)) {
    return languages.get(languageConvert);
  } else if (languages.has(lang)) {
    return languages.get(lang);
  } else {
    return "";
  }
}

export function parseMultiLanguages(
  lang: string[],
  amountLang: number
): string[] | null {
  let langs: string[] | null = [];
  if (lang.length === amountLang) return (langs = ["missingLang"]);
  if (langs) {
    for (let i = 1; i < amountLang + 1; i++) {
      langs.push(lang?.[i] as string);
    }
    if (langs.some((l) => l === undefined)) return (langs = ["missingLang"]);
    if (langs) {
      langs.forEach((lang, val) => {
        const languageConvert = ISO6391.getName(lang).toLowerCase();
        if (lang.length === 2 && languages.has(languageConvert)) {
          return (langs![val] = languages.get(languageConvert));
        } else if (languages.has(lang)) {
          return (langs![val] = languages.get(lang));
        } else {
          return (langs![val] = "");
        }
      });
    }
  }
  return langs;
}
