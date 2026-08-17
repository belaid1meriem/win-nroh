import {
  DarkTheme,
  DefaultTheme,
  type Theme,
} from '@react-navigation/native';

export const THEME = {
  light: {
    // Base
    background: 'hsl(40 50% 97.6%)',
    foreground: 'hsl(190 34.3% 13.7%)',

    // Surfaces
    card: 'hsl(0 0% 100%)',
    cardForeground: 'hsl(190 34.3% 13.7%)',

    popover: 'hsl(0 0% 100%)',
    popoverForeground: 'hsl(190 34.3% 13.7%)',

    // Brand
    primary: 'hsl(185.9 89.2% 29%)',
    primaryForeground: 'hsl(0 0% 100%)',

    primaryDark: 'hsl(185.9 91.1% 22%)',
    primaryLight: 'hsl(177.3 47.8% 91%)',

    // Secondary
    secondary: 'hsl(189 8.9% 43.9%)',
    secondaryForeground: 'hsl(0 0% 100%)',

    // Muted
    muted: 'hsl(160 12% 95.1%)',
    mutedForeground: 'hsl(189 8.9% 43.9%)',

    // Accent
    accent: 'hsl(26.5 87% 66.9%)',
    accentLight: 'hsl(27.9 100% 94.5%)',
    accentForeground: 'hsl(190 34.3% 13.7%)',

    // Status
    success: 'hsl(103.8 28.8% 42.9%)',
    successForeground: 'hsl(0 0% 100%)',

    destructive: 'hsl(1.9 62.7% 60%)',
    destructiveForeground: 'hsl(0 0% 100%)',

    // Borders / Inputs
    border: 'hsl(168 10.2% 90.4%)',
    input: 'hsl(168 10.2% 90.4%)',
    ring: 'hsl(185.9 89.2% 29%)',

    radius: '0.75rem',

    // Charts
    chart1: 'hsl(185.9 89.2% 29%)',
    chart2: 'hsl(26.5 87% 66.9%)',
    chart3: 'hsl(103.8 28.8% 42.9%)',
    chart4: 'hsl(177.3 47.8% 91%)',
    chart5: 'hsl(1.9 62.7% 60%)',
  },

  dark: {
    // Base
    background: 'hsl(190 27.3% 8.6%)',
    foreground: 'hsl(160 14.3% 95.9%)',

    // Surfaces
    card: 'hsl(188 24.6% 12%)',
    cardForeground: 'hsl(160 14.3% 95.9%)',

    popover: 'hsl(188 24.6% 12%)',
    popoverForeground: 'hsl(160 14.3% 95.9%)',

    // Brand
    primary: 'hsl(183.2 60.2% 42.4%)',
    primaryForeground: 'hsl(0 0% 100%)',

    primaryDark: 'hsl(183.5 65.8% 31%)',
    primaryLight: 'hsl(185.2 56.1% 16.1%)',

    // Secondary
    secondary: 'hsl(183.5 9.6% 65.3%)',
    secondaryForeground: 'hsl(190 27.3% 8.6%)',

    // Muted
    muted: 'hsl(189.5 22.9% 16.3%)',
    mutedForeground: 'hsl(183.5 9.6% 65.3%)',

    // Accent
    accent: 'hsl(26.5 87% 66.9%)',
    accentLight: 'hsl(23.1 28.9% 17.6%)',
    accentForeground: 'hsl(190 27.3% 8.6%)',

    // Status
    success: 'hsl(103.6 27.5% 52.9%)',
    successForeground: 'hsl(0 0% 100%)',

    destructive: 'hsl(2 72.1% 67.6%)',
    destructiveForeground: 'hsl(190 27.3% 8.6%)',

    // Borders / Inputs
    border: 'hsl(186.7 17.3% 20.4%)',
    input: 'hsl(186.7 17.3% 20.4%)',
    ring: 'hsl(183.2 60.2% 42.4%)',

    radius: '0.75rem',

    // Charts
    chart1: 'hsl(183.2 60.2% 42.4%)',
    chart2: 'hsl(26.5 87% 66.9%)',
    chart3: 'hsl(103.6 27.5% 52.9%)',
    chart4: 'hsl(177.3 47.8% 91%)',
    chart5: 'hsl(2 72.1% 67.6%)',
  },
};

export const NAV_THEME: Record<'light' | 'dark', Theme> = {
  light: {
    ...DefaultTheme,
    colors: {
      background: THEME.light.background,
      border: THEME.light.border,
      card: THEME.light.card,
      notification: THEME.light.destructive,
      primary: THEME.light.primary,
      text: THEME.light.foreground,
    },
  },

  dark: {
    ...DarkTheme,
    colors: {
      background: THEME.dark.background,
      border: THEME.dark.border,
      card: THEME.dark.card,
      notification: THEME.dark.destructive,
      primary: THEME.dark.primary,
      text: THEME.dark.foreground,
    },
  },
};