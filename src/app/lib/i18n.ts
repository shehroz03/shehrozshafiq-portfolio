import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from '../translations/en.json';
import esTranslations from '../translations/es.json';
import deTranslations from '../translations/de.json';
import hiTranslations from '../translations/hi.json';
import arTranslations from '../translations/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      de: { translation: deTranslations },
      hi: { translation: hiTranslations },
      ar: { translation: arTranslations },
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

if (typeof document !== 'undefined') {
  document.documentElement.dir = i18n.dir();
}

export default i18n;
