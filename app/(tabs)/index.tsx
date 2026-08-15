import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { setAppLanguage } from '@/i18n/set-app-language';
import { useExampleStore } from '@/stores/example-store';

export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const { count, increment, reset } = useExampleStore();

  return (
    <View className="flex-1 bg-background items-center justify-center gap-4">
      <Text className="text-foreground text-xl font-bold">{t('welcome')}</Text>
      <Text className="text-muted-foreground">Count: {count}</Text>

      <View className="flex-row gap-2">
        <Pressable onPress={increment} className="bg-primary px-4 py-2 rounded-md">
          <Text className="text-primary-foreground">Increment</Text>
        </Pressable>
        <Pressable onPress={reset} className="bg-primary px-4 py-2 rounded-md">
          <Text className="text-primary-foreground">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}