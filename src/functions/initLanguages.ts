import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LANG } from "utils/enums";
import eng from "../translations/eng";
import rus from "../translations/rus";
import { getCachedLanguage } from "./getCachedLanguage";

const lang = getCachedLanguage()

export const initLanguages = () => {
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          ...eng
        }
      },
      ru: {
        translation: {
          ...rus
        }
      }
    },
    lng: lang,
    fallbackLng: LANG.ENG,

    interpolation: {
      escapeValue: false
    }
  });
};
