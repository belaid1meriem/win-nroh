import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ar from './locales/ar.json';
import fr from './locales/fr.json';
import { FALLBACK_LANGUAGE, LANGUAGE_STORAGE_KEY } from './types';


export async function initI18n() {
  const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  const initialLang = storedLang ?? Localization.getLocales()[0]?.languageCode ?? FALLBACK_LANGUAGE;

  await i18n.use(initReactI18next).init({
    resources: {
      ar: { translation: ar },
      fr: { translation: fr },
    },
    lng: initialLang,
    fallbackLng: FALLBACK_LANGUAGE,
    interpolation: { escapeValue: false },
  });
}

export default i18n;