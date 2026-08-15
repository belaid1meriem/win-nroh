# Roadmap — Configs réalisées

## Stage 0 — Fondations & Tooling

1. Décider la stack et la documenter dans `docs/DECISIONS.md` avant tout code.
2. Initialiser le projet : `npx create-expo-app@latest . --template default@sdk-54` — https://docs.expo.dev/get-started/create-a-project/
3. Nettoyer le code de démo du template (si présent) avec `git rm`.
4. Vérifier `strict: true` dans `tsconfig.json` (activé par défaut Expo SDK 54) — https://www.typescriptlang.org/tsconfig#strict
5. Vérifier ESLint via `eslint-config-expo/flat` (préconfiguré) — https://docs.expo.dev/guides/using-eslint/
6. Vérifier icônes/splash + lancer `npx expo-doctor` — https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/
7. Créer `.env.example` (committé) et vérifier `.gitignore` pour les vrais `.env*` — https://docs.expo.dev/guides/environment-variables/

## Stage 1 — Design System & Theming

8. Installer NativeWind v4 + Tailwind v3 : `npx expo install nativewind tailwindcss@^3 react-native-reanimated react-native-safe-area-context` — https://www.nativewind.dev/docs/getting-started/installation
9. Créer `babel.config.js` avec `jsxImportSource: 'nativewind'` + plugin Reanimated en dernier — https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/
10. Créer `metro.config.js` avec `withNativeWind(config, { input: './global.css' })` — https://www.nativewind.dev/docs/api/with-nativewind
11. Créer `global.css` avec les 3 directives `@tailwind` (syntaxe v3, pas de bloc `@theme` qui est réservé à v4) — https://tailwindcss.com/docs/upgrade-guide (voir différences v3/v4)
12. Créer `tailwind.config.js` avec `presets: [require('nativewind/preset')]` + `theme.extend.colors` mappés sur des `var(--color-x)` — https://www.nativewind.dev/docs/customization/colors
13. Importer `global.css` dans `app/_layout.tsx`.
14. Créer `providers/theme-provider.tsx` (Context + AsyncStorage) pour un choix persistant light/dark/system — https://docs.expo.dev/develop/user-interface/color-themes/
15. Supprimer les doublons de source de vérité couleur (`constants/theme.ts`, `hooks/use-theme-color.ts`) — un seul vocabulaire de tokens.
16. Pour une couleur native brute (ex. React Navigation tab bar), lire la même variable via `useUnstableNativeVariable` — https://www.nativewind.dev/docs/api/vars
17. Retirer `darkMode: 'class'` de `tailwind.config.js` — casse le suivi système sur NativeWind natif.
18. **Ne pas** utiliser le pattern CSS `.dark {}` (shadcn/web) pour les tokens dark — non fiable sur natif (bug connu) : https://github.com/nativewind/nativewind/issues/702
19. Définir les tokens light/dark via `vars()` dans `theme/tokens.ts`, appliqués en `style` sur un `View` racine selon `isDark` — https://www.nativewind.dev/docs/guides/themes
20. Créer `app/dev/theme-preview.tsx` (route Expo Router automatique) pour valider visuellement chaque primitive UI en light/dark + switch de mode.

## Notes environnement (Windows-spécifique)

21. Bug `ERR_UNSUPPORTED_ESM_URL_SCHEME` sous Windows : patcher `metro-config/src/loadConfig.js` avec `pathToFileURL()`, figé via `patch-package` — https://github.com/sindresorhus/patch-package
22. Bug `Cannot find module 'babel-preset-expo'` (hoisting npm) : le déclarer en dépendance directe via `npx expo install babel-preset-expo`.
23. Metro annonçant `127.0.0.1` au lieu de l'IP locale : forcer via `$env:REACT_NATIVE_PACKAGER_HOSTNAME` + `--lan`, et ouvrir le port 8081 dans le Pare-feu Windows — https://docs.expo.dev/more/expo-cli/#local-connection-troubleshooting