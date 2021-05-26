import iso from "iso-3166-1";

// Convert to png

export function flagToPng(url: string): string {
  const countryIso = url.substring(30).replace(".svg", "");
  const isoCode = iso.whereAlpha3(countryIso);
  const newUrl = `https://flagcdn.com/w160/${
    isoCode === undefined ? "" : isoCode.alpha2.toLowerCase()
  }.png`;
  return newUrl;
}
