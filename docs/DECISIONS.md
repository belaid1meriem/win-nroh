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
- Dark mode: CSS `.dark {}` selector approach (shadcn web pattern) is unreliable on native NativeWind (GitHub issue #702). Using `vars()` + wrapping View instead — see theme/tokens.ts.

## Stage 2 notes
- RTL flip + language switch: visual verification requires an EAS standalone build (Expo Go can't simulate native restart). Deferred to Stage 10.
- Language persisted via AsyncStorage (`@app_language`), app render gated behind async i18n init + expo-splash-screen to avoid FOUC-style language flash.

## Stage 3 notes
- Used `Stack.Protected` (Expo Router SDK 53+) instead of the roadmap's manual `if (!session) return <Redirect />` pattern — current official doc recommendation, declarative guard with automatic history cleanup. See https://docs.expo.dev/router/advanced/authentication/
- `SessionProvider` is a placeholder (local state only) until real auth is wired in Stage 6.
- Deep link testing (`npx uri-scheme open winnroh://...`) requires an iOS simulator or Android emulator — deferred, not available in current dev environment.


## Stage 4 notes
- Using AsyncStorage instead of MMKV for now — MMKV requires a native dev build (incompatible with Expo Go), not worth the setup cost yet. Revisit at Stage 8 (Performance) if needed.
- Zustand persist middleware uses `createJSONStorage(() => AsyncStorage)` for any store needing persistence (see stores/example-persisted-store.ts as reference pattern).
- SecureStore reserved for auth tokens only — will be wired in Stage 6.


## Stage 5 notes
- lib/supabase.ts uses AsyncStorage for session storage (per official Supabase/Expo tutorial) — TODO Stage 6: swap to SecureStore adapter for refresh token security (see Stage 0/1 decision on AsyncStorage vs SecureStore).

## Stage 6 notes
- Session storage: LargeSecureStore (AES-256 key in SecureStore, encrypted blob in AsyncStorage) — needed because SecureStore's 2048 byte limit is exceeded by OAuth session data. See official Supabase Expo Social Auth guide.