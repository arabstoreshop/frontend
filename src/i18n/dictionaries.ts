export const dictionaries = {
  ar: () => import("./dictionaries/ar.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: "ar" | "en") => {
  if (!dictionaries[locale]) {
    return dictionaries.ar();
  }
  return dictionaries[locale]();
};
