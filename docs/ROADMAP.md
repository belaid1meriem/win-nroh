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


## Stage 2 — Internationalisation & RTL

24. Lire la doc i18next Quick Start avant tout code — https://react.i18next.com/guides/quick-start
25. Lire la doc Expo Localization pour la détection de locale — https://docs.expo.dev/versions/latest/sdk/localization/
26. Lire la doc React Native `I18nManager` pour comprendre `isRTL`/`allowRTL`/`forceRTL` — https://reactnative.dev/docs/i18nmanager
27. Installer : `npx expo install expo-localization` puis `npm install i18next react-i18next` — https://react.i18next.com/guides/quick-start
28. Créer les fichiers de traduction `i18n/locales/ar.json` et `i18n/locales/fr.json`.
29. Centraliser `FALLBACK_LANGUAGE` et la détection RTL dans `i18n/types.ts` — une seule source de vérité, pas de valeur par défaut dupliquée.
30. Créer `i18n/index.ts` avec l'init i18next + `expo-localization` pour la langue initiale.
31. Installer `expo-updates` (nécessaire pour redémarrer l'app après un flip RTL) : `npx expo install expo-updates` — https://docs.expo.dev/versions/latest/sdk/updates/
32. Créer `i18n/set-app-language.ts` : `allowRTL()` + `forceRTL()` + `Updates.reloadAsync()` (uniquement hors `__DEV__`, le flip RTL ne peut pas être simulé fiablement en Expo Go).
33. **Piège à retenir** : `I18nManager.isRTL` est calculé par le natif au démarrage — pas une valeur qu'on assigne, elle ne se met à jour qu'après un vrai redémarrage natif de l'app.
34. Ajouter la persistance du choix de langue via AsyncStorage dans `set-app-language.ts` — https://react-native-async-storage.github.io/async-storage/docs/usage/
35. Rendre l'init i18next asynchrone (lecture AsyncStorage avant `i18n.init()`) pour éviter un flash de la mauvaise langue au démarrage.
36. Gater le rendu de l'app derrière cette init avec `expo-splash-screen` (`preventAutoHideAsync` / `hideAsync`) — https://docs.expo.dev/versions/latest/sdk/splash-screen/

## Notes Stage 2

37. Vérification visuelle du flip RTL et du switch de langue **différée au Stage 10 (EAS Build)** — Expo Go ne peut pas simuler un redémarrage natif complet.