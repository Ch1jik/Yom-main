import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTrans from './en/translation.json';
import uaTrans from './ua/translation.json';
const resources = {
  en: {
    translation: enTrans
  },
  ua: {
    translation: uaTrans
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ua", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
