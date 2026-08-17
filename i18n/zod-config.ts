import * as z from "zod";
import fr from "zod/v4/locales/fr.js";
import ar from "zod/v4/locales/ar.js";

const locales = {
  fr,
  ar,
} as const;

export function configureZod(locale: keyof typeof locales) {
  z.config(locales[locale]());
}
