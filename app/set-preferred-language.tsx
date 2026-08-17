import { View, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTheme } from '@/providers/theme-provider';
import { THEME } from '@/lib/theme';
import { Language } from '@/i18n/types';
import { setAppLanguage } from '@/i18n/set-app-language';

const languages: {
  key: Language;
  label: string;
  icon: string;
  iconClassName: string;
}[] = [
  {
    key: 'ar',
    label: 'العربية',
    icon: 'ع',
    iconClassName: 'text-3xl text-accent',
  },
  {
    key: 'fr',
    label: 'Français',
    icon: 'FR',
    iconClassName: 'text-3xl text-accent',
  },
];

export default function LanguageScreen() {
  const { t, i18n } = useTranslation('settings');
  const { isDark } = useTheme();
  const colors = isDark ? THEME.dark : THEME.light;

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    i18n.language as Language
  );

  const handleSave = async () => {
    await setAppLanguage(selectedLanguage);
    router.replace('/(auth)/sign-up');
  };

  return (
    <View className="flex-1 justify-center bg-background px-5">
      {/* Title */}
      <View className="items-center mt-6">
        <Text className="text-foreground text-2xl font-tajawal-bold text-center">
          {t('language.title')}
        </Text>
      </View>

      {/* Description */}
      <View className="items-center mt-8 px-4">
        <Text className="text-muted-foreground text-sm font-tajawal-medium text-center leading-6">
          {t('language.description')}
        </Text>
      </View>

      {/* Languages */}
      <View className="gap-4 mt-8">
        {languages.map((language) => {
          const selected = selectedLanguage === language.key;

          return (
            <Pressable
              key={language.key}
              onPress={() => setSelectedLanguage(language.key)}
            >
              <Card
                className={`h-20 rounded-xl px-4 flex-row items-center bg-background ${
                  selected
                    ? 'border-2 border-primary'
                    : 'border border-border'
                }`}
              >
                <Text
                  className='font-tajawal-bold text 6xl text-accent'
                >
                  {language.icon}
                </Text>

                <View className="flex-1 ml-3">
                  <Text className="text-foreground text-base font-tajawal-bold">
                    {language.label}
                  </Text>
                </View>

                {selected && (
                  <View className="h-5 w-5 rounded-full bg-primary items-center justify-center">
                    <Ionicons
                      name="checkmark"
                      size={13}
                      color={colors.primaryForeground}
                    />
                  </View>
                )}
              </Card>
            </Pressable>
          );
        })}
      </View>

      {/* Save */}
      <Button
        onPress={handleSave}
        className="h-14 rounded-xl mt-16"
      >
        <Text className="text-primary-foreground font-tajawal-bold text-base">
          {t('language.save')}
        </Text>
      </Button>
    </View>
  );
}