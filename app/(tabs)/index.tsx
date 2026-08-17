import { View, Text, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSession } from '@/providers/session-provider';
import { router } from 'expo-router';
import { useTheme } from '@/providers/theme-provider';
import { useOnboardingStore } from '@/stores/onboarding-store';


export default function HomeScreen() {
  const { t, i18n } = useTranslation();
  const { toggleTheme } = useTheme();
  const { signOut } = useSession();
  const resetOnboarding = useOnboardingStore((state)=>state.resetOnboarding)

  const reset = async ()=>{
    await signOut();
    resetOnboarding();
  }

  return (
    <View className="flex-1 bg-background items-center justify-center gap-4">
      <Text className="text-foreground text-xl font-bold">{t('welcome')}</Text>

      <View className="flex-row gap-2">
        <Pressable onPress={signOut} className="bg-primary px-4 py-2 rounded-md">
          <Text className="text-primary-foreground">Sign Out</Text>
        </Pressable>

        <Pressable onPress={toggleTheme} className="bg-primary px-4 py-2 rounded-md">
          <Text className="text-primary-foreground">toggle theme</Text>
        </Pressable>

        <Pressable onPress={reset} className="bg-primary px-4 py-2 rounded-md">
          <Text className="text-primary-foreground">Reset onboarding</Text>
        </Pressable>


      </View>
    </View>
  );
}