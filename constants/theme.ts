import { vars } from 'nativewind';

export const themes = {
  light: vars({
    // Base
    '--color-background': '#FCFAF6',
    '--color-foreground': '#172B2F',

    // Cards / Surfaces
    '--color-card': '#FFFFFF',
    '--color-card-foreground': '#172B2F',
    '--color-popover': '#FFFFFF',
    '--color-popover-foreground': '#172B2F',

    // Brand
    '--color-primary': '#087F8C',
    '--color-primary-dark': '#05616B',
    '--color-primary-light': '#DDF3F2',
    '--color-primary-foreground': '#FFFFFF',

    // Secondary
    '--color-secondary': '#66777A',
    '--color-secondary-foreground': '#FFFFFF',

    // Muted
    '--color-muted': '#F1F4F3',
    '--color-muted-foreground': '#66777A',

    // Accent
    '--color-accent': '#F4A261',
    '--color-accent-light': '#FFF0E3',
    '--color-accent-foreground': '#172B2F',

    // Status
    '--color-success': '#5F8D4E',
    '--color-success-foreground': '#FFFFFF',
    '--color-destructive': '#D95D59',
    '--color-destructive-foreground': '#FFFFFF',

    // Borders / Inputs
    '--color-border': '#E4E9E8',
    '--color-input': '#E4E9E8',

    // Focus
    '--color-ring': '#087F8C',
  }),

  dark: vars({
    // Base
    '--color-background': '#101A1C',
    '--color-foreground': '#F3F6F5',

    // Cards / Surfaces
    '--color-card': '#172426',
    '--color-card-foreground': '#F3F6F5',
    '--color-popover': '#172426',
    '--color-popover-foreground': '#F3F6F5',

    // Brand
    '--color-primary': '#2BA6AD',
    '--color-primary-dark': '#1B7D83',
    '--color-primary-light': '#123C40',
    '--color-primary-foreground': '#FFFFFF',

    // Secondary
    '--color-secondary': '#9EAEAF',
    '--color-secondary-foreground': '#101A1C',

    // Muted
    '--color-muted': '#203033',
    '--color-muted-foreground': '#9EAEAF',

    // Accent
    '--color-accent': '#F4A261',
    '--color-accent-light': '#3A2A20',
    '--color-accent-foreground': '#101A1C',

    // Status
    '--color-success': '#78A866',
    '--color-success-foreground': '#FFFFFF',
    '--color-destructive': '#E87571',
    '--color-destructive-foreground': '#101A1C',

    // Borders / Inputs
    '--color-border': '#2B3B3D',
    '--color-input': '#2B3B3D',

    // Focus
    '--color-ring': '#2BA6AD',
  }),
};