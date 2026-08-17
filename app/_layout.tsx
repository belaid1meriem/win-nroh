import '../global.css';

import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import {
  Tajawal_400Regular,
  Tajawal_500Medium,
  Tajawal_700Bold,
  Tajawal_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/tajawal';

import {
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';

import { ThemeProvider, useTheme } from '@/providers/theme-provider';
import { NAV_THEME } from '@/lib/theme';
import { initI18n } from '@/i18n';

import { SessionProvider, useSession } from '@/providers/session-provider';
import { QueryProvider } from '@/providers/query-provider';

import { PortalHost } from '@rn-primitives/portal';
import { useOnboardingStore } from '@/stores/onboarding-store';

SplashScreen.preventAutoHideAsync();


function RootLayoutNav() {
  const { isDark } = useTheme();
  const { session } = useSession();
  const onboardingCompleted  = useOnboardingStore((state) => state.isCompleted)


  const colorScheme = isDark ? 'dark' : 'light';

  return (
    <NavigationThemeProvider value={NAV_THEME[colorScheme]}>
      <Stack>
        <Stack.Protected guard={!onboardingCompleted && !session}>
          <Stack.Screen
          options={{ headerShown: false }}
          name="onboarding"
        />
        </Stack.Protected>

        <Stack.Protected guard={onboardingCompleted && !session}>
          <Stack.Screen
            name="(auth)"
            options={{
              headerShown: true,
              title: '',
              headerTransparent: true,
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="forget-password"
            options={{
              headerShown: true,
              title: '',
              headerTransparent: true,
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
        </Stack.Protected>

        <Stack.Protected guard={!!session}>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="update-password"
            options={{
              headerShown: true,
              title: '',
              headerTransparent: true,
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="change-password"
            options={{
              headerShown: true,
              title: '',
              headerTransparent: true,
              headerTitle: '',
              headerShadowVisible: false,
            }}
          />
        </Stack.Protected>

        <Stack.Screen
          name="set-preferred-language"
          options={{
            headerShown: true,
            title: '',
            headerTransparent: true,
            headerTitle: '',
            headerShadowVisible: false,
          }}
        />
      </Stack>

      <StatusBar style={isDark ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [loaded, error] = useFonts({
    Tajawal_400Regular,
    Tajawal_500Medium,
    Tajawal_700Bold,
    Tajawal_800ExtraBold,
  });


  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Load everything in parallel
        await Promise.all([
          initI18n(),
        ]);

        setIsReady(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.log('Error preparing app:', error);
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    if (loaded || error) {
      prepareApp();
    }
  }, [loaded, error]);

  // Show nothing while preparing (splash screen is visible)
  if (!isReady) {
    return null;
  }

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider>
      <QueryProvider>
        <SessionProvider>
          <RootLayoutNav />
          <PortalHost />
        </SessionProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}