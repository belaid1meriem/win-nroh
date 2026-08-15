import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { I18nManager } from 'react-native';
import i18n from '../i18n';
import { _isRTL, Language, LANGUAGE_STORAGE_KEY } from './types';

export async function setAppLanguage(lang: Language) {
  const isRTL = _isRTL(lang);
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    if (!__DEV__) {
      await Updates.reloadAsync();
    }
  }
}