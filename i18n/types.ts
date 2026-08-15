type Language = 'ar' | 'fr';
const FALLBACK_LANGUAGE: Language = 'fr';
const RTLlanguages: Language[] = ['ar'];
const _isRTL = (lang: Language) => RTLlanguages.includes(lang);
const LANGUAGE_STORAGE_KEY = '@app_language';

export type { Language };
export { FALLBACK_LANGUAGE, _isRTL, LANGUAGE_STORAGE_KEY };