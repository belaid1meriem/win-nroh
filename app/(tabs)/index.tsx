import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '@/i18n/set-app-language';

export default function HomeScreen() {
  const { t, i18n } = useTranslation();

  return (
    <View className="flex-1 bg-background items-center justify-center gap-4">
      <Text className="text-foreground text-xl font-bold">{t('welcome')}</Text>
      <Text className="text-muted-foreground">Current: {i18n.language}</Text>

      <View className="flex-row gap-2">
        <Pressable onPress={() => setAppLanguage('fr')} className="bg-primary px-4 py-2 rounded-md">
          <Text className="text-primary-foreground">Français</Text>
        </Pressable>
        <Pressable onPress={() => setAppLanguage('ar')} className="bg-primary px-4 py-2 rounded-md">
          <Text className="text-primary-foreground">العربية</Text>
        </Pressable>
      </View>
    </View>
  );
}