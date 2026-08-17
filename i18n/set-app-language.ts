import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
import { I18nManager } from 'react-native';
import i18n from '../i18n';
import { _isRTL, Language, LANGUAGE_STORAGE_KEY } from './types';
import { configureZod } from './zod-config';


export async function setAppLanguage(lang: Language) {
  const isRTL = _isRTL(lang);
  console.log('isRTL: ', isRTL)
  console.log('I18nManager.isRTL:', I18nManager.isRTL )
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  console.log('I18nManager.isRTL:', I18nManager.isRTL )
  if (I18nManager.isRTL !== isRTL) {
    console.log("HI FROM IF BLOC")
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    try {
      await Updates.reloadAsync();
    } catch (error) {
      console.log('nvm')
    }
    
  }
  console.log('I18nManager.isRTL:', I18nManager.isRTL )
  configureZod(lang);
}