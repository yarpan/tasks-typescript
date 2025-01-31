
type Translations = {
  [key: string]: string | undefined;
};

const appTranslations: Translations = {
  en: "Victory",
  ua: "Перемога",
  pl: "Zwycięstwo",
  ro: "Victorie",
  de: "Sieg",
  it: undefined,
  jp: undefined,
};

const languageCode = "ua";
console.log(appTranslations[languageCode]); 
console.log(appTranslations["it"]);

type OptionalTranslations = {
  default?: string;
  [key: string]: string | undefined;
};

const optionalTranslations: Translations | OptionalTranslations= {
  en: "Victory",
  ua: "Перемога",
  pl: "Zwycięstwo",
  ro: "Victorie",
  de: "Sieg",
  it: undefined,
  jp: undefined,
};
