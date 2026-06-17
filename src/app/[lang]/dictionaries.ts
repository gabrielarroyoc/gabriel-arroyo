import "server-only";

import pt from "@/dictionaries/pt.json";
import en from "@/dictionaries/en.json";

const dictionaries = {
  pt: () => Promise.resolve(pt),
  en: () => Promise.resolve(en),
};

export type Locale = keyof typeof dictionaries;
export type Dictionary = typeof pt;

export const locales: Locale[] = ["pt", "en"];
export const defaultLocale: Locale = "pt";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();
