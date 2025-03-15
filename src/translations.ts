
/*
Task: Translations Type
Create a type Translations that describes an object with string keys, where:
Each key is a language code (e.g., en, ua), and the value is the translation.
Use an index signature to indicate that keys can be any string.
Allow for some languages to have missing translations (optional values).
Create an object appTranslations that conforms to the Translations type and contains translations of several phrases for different languages.
Dynamically access keys (e.g., through appTranslations[someVariable]) and verify how type annotation works.
Try accessing a non-existent key and ensure that the compiler warns about the possibility of undefined.
Add another type, for example, OptionalTranslations with an optional field, and try to align it with Translations to check the compatibility of index signatures with optional fields.
For example, create a type with a default? field.
*/

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
