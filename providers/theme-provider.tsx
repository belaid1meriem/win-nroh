import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, useColorScheme as useSystemColorScheme } from 'react-native';
import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark' | 'system';
const STORAGE_KEY = '@theme_mode';

interface ThemeContextValue {
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const { setColorScheme } = useNativewindColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  const applyColorScheme = (mode: ThemeMode) => {
    if (mode === 'system') {
      Appearance.setColorScheme(null);
    } else {
      setColorScheme(mode);
    }
  };

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const mode: ThemeMode =
        stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
      setThemeModeState(mode);
      applyColorScheme(mode);
    })();
  }, []);

  const setThemeMode = async (mode: ThemeMode) => {
    setThemeModeState(mode);
    applyColorScheme(mode);
    await AsyncStorage.setItem(STORAGE_KEY, mode);
  };

  const isDark = themeMode === 'system' ? systemColorScheme === 'dark' : themeMode === 'dark';

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDark,
        setThemeMode,
        toggleTheme: () => setThemeMode(isDark ? 'light' : 'dark'),
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}