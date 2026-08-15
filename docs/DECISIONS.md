# Decisions

| Concern | Choice | Why |
|---|---|---|
| Framework | Expo (managed, EAS Build) | OTA updates, cloud builds, no native config until we need a custom native module |
| Styling | NativeWind v4 stable + Tailwind v3 | Stable, unchanging token contract |
| UI primitives | react-native-reusables | Matches NativeWind, we own the component code |
| Navigation | Expo Router | File-based, typed routes, deep linking |
| Server state | TanStack Query | No hand-rolled loading/error/cache state |
| Client state | Zustand | Minimal boilerplate, works with persistence middleware |
| Persistence | AsyncStorage (hot-path state) / SecureStore (tokens/secrets) | AsyncStorage easier to test with Expo, no prebuild needed |
| Forms | react-hook-form + zod | Type-safe validation, minimal re-renders |
| Backend | Supabase | Generate TS types from schema |
| i18n | i18next + react-i18next + expo-localization | See Stage 2 for RTL |


## Notes
- SDK 54 template (as of Aug 2026) ships without the old demo files (explore/hello-wave/parallax/etc.) — Stage 0.2 cleanup step skipped, nothing to remove.
- Windows + metro-config: `metro-config/src/loadConfig.js` uses a raw `import(absolutePath)` on Windows absolute paths, which Node's ESM loader rejects (`ERR_UNSUPPORTED_ESM_URL_SCHEME`). Patched via patch-package to wrap with `pathToFileURL()`. See patches/metro-config+0.83.3.patch. Do not remove.