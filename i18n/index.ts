import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import arAuth from './locales/ar/auth.json';
import frAuth from './locales/fr/auth.json';

import arSettings from './locales/ar/settings.json';
import frSettings from './locales/fr/settings.json';

import arOnboarding from './locales/ar/onboarding.json';
import frOnboarding from './locales/fr/onboarding.json';

import {
  FALLBACK_LANGUAGE,
  Language,
  LANGUAGE_STORAGE_KEY,
} from './types';

import { setAppLanguage } from './set-app-language';

export async function initI18n() {
  const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);

  const initialLang =
    storedLang ??
    Localization.getLocales()[0]?.languageCode ??
    FALLBACK_LANGUAGE;

  await i18n.use(initReactI18next).init({
    resources: {
      ar: {
        auth: arAuth,
        settings: arSettings,
        onboarding: arOnboarding,
      },
      fr: {
        auth: frAuth,
        settings: frSettings,
        onboarding: frOnboarding,
      },
    },

    ns: ['auth', 'settings', 'onboarding'],
    defaultNS: 'auth',

    lng: initialLang,
    fallbackLng: FALLBACK_LANGUAGE,

    interpolation: {
      escapeValue: false,
    },
  });

  await setAppLanguage(initialLang as Language);
}

export default i18n;