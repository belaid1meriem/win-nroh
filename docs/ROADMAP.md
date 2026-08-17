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


## Stage 3 — Navigation

38. Lire la doc Expo Router "Authentication" (approche actuelle, pas le pattern manuel du roadmap original) — https://docs.expo.dev/router/advanced/authentication/
39. Lire la doc "Protected routes" pour comprendre le comportement de `Stack.Protected` — https://docs.expo.dev/router/advanced/protected/
40. **Écart assumé vs roadmap** : utiliser `Stack.Protected` (guard déclaratif, SDK 53+) au lieu du pattern manuel `if (!session) return <Redirect />` — recommandation actuelle de la doc officielle.
41. Créer un `SessionProvider` placeholder (state local) en attendant le vrai système d'auth du Stage 6.
42. Déclarer les groupes de routes protégés avec des guards strictement complémentaires : `guard={!!session}` / `guard={!session}` — jamais de trou ni de chevauchement entre les deux conditions.
43. Vérifier `typedRoutes: true` dans `app.json` (actif par défaut sur le template SDK 54) — https://docs.expo.dev/router/advanced/typed-routes/
44. Valider les typed routes en testant qu'un `href` invalide devient une erreur TypeScript à la compilation.
45. Vérifier le `scheme` dans `app.json` (généré automatiquement depuis le nom du projet) — https://docs.expo.dev/guides/deep-linking/
46. Documenter chaque route deep-link supportée dans `docs/DECISIONS.md` au fur et à mesure, avant d'en avoir besoin pour les notifications push.

## Notes Stage 3

47. Test deep link réel (`npx uri-scheme open`) différé — nécessite un simulateur iOS ou émulateur Android non disponible dans l'environnement de dev actuel.



## Stage 4 — State Management

48. Décider AsyncStorage vs MMKV avant d'installer quoi que ce soit — MMKV nécessite un dev build natif, incompatible avec Expo Go. Rester sur AsyncStorage tant que ce n'est pas un vrai besoin de perf (revoir au Stage 8).
49. Installer TanStack Query : `npm install @tanstack/react-query` — https://tanstack.com/query/latest/docs/framework/react/quick-start
50. Installer Zustand : `npx expo install zustand` — https://github.com/pmndrs/zustand
51. Créer `providers/query-provider.tsx` avec un `QueryClient` unique, config partagée (`staleTime`, `gcTime`, `retry`) — pas de config redéfinie par hook.
52. Créer un store Zustand minimal pour valider le pattern avant toute vraie feature — réservé au state client uniquement, jamais aux données serveur (ça, c'est le rôle de Query).
53. Pour un store qui doit persister : middleware `persist` + `createJSONStorage(() => AsyncStorage)` — https://zustand.docs.pmnd.rs/reference/middlewares/persist
54. Utiliser `partialize` pour exclure du state persisté : les fonctions, et tout état transitoire/UI (`isLoading`, `modalOpen`, erreurs temporaires) qui n'a plus de sens après un redémarrage.
55. Réserver SecureStore aux tokens d'authentification uniquement — sera câblé au Stage 6.

## Notes Stage 4

56. `partialize` filtre uniquement la *forme* de ce qui est écrit sur disque — un changement d'un champ non persisté déclenche quand même une écriture, `partialize` ne réduit pas la fréquence d'écriture, seulement son contenu.
57. Sélecteurs partout, jamais de destructuring complet du store dans un composant — `useStore((s) => s.user)` et non `const { user } = useStore()`, sinon re-render sur chaque changement du store entier.
58. Pour plusieurs champs à la fois : `useShallow` (Zustand v4.4+/v5), pas l'ancien `shallow` importé séparément — https://zustand.docs.pmnd.rs/hooks/use-shallow
59. State dérivé (total, isLoggedIn, liste filtrée) jamais stocké tel quel — soit calculé inline via sélecteur dans le composant, soit via une fonction getter dans le store (`total: () => get().items.reduce(...)`), jamais synchronisé manuellement à côté du state source.
60. Actions colocalisées dans le store, pas de reducers/dispatch séparés — la logique async (fetch, try/catch, isLoading/error) vit directement dans l'action, pas dans le composant appelant.
61. Un seul store mega vs plusieurs petits stores : trancher tôt. Plusieurs stores (`useAuthStore`, `useCartStore`...) sauf si les slices doivent lire l'état les unes des autres — dans ce cas, pattern slices avec `StateCreator` combiné.
62. Si pattern slices retenu : chaque slice typée séparément (`StateCreator<FullState, [], [], SliceState>`), combinées dans un seul `create<FullState>()((...a) => ({ ...sliceA(...a), ...sliceB(...a) }))` — jamais de store non typé.
63. `devtools` middleware pour debug (Flipper/Redux DevTools) — coût nul en prod si bien conditionné, à ajouter seulement si le debugging state devient pénible.
64. `immer` middleware réservé au state profondément imbriqué — mutation directe (`state.nested.deep.value = v`) au lieu de spread manuel sur plusieurs niveaux. Ne pas ajouter si le state reste plat, complexité inutile.


## Hydration (bloque au Stage 6 — auth)

65. `persist` lit le storage de façon async au démarrage — gap entre mount et state réellement chargé. Ne jamais tester `user`/`token` pour une redirection avant `useAuthStore.persist.hasHydrated()` à true, sinon flash de "non connecté" à chaque lancement.
66. Écran de chargement/splash tant que `hasHydrated()` est false — `onFinishHydration()` pour s'abonner à l'événement, pas de polling.
67. Prévoir `version` + `migrate` dans les options `persist` dès qu'un champ persisté change de forme — même en dev, éviter les crashs silencieux sur state persisté obsolète au prochain hot reload.


## Stage 5 — Backend & Data Layer

57. Installer le client Supabase : `npx expo install @supabase/supabase-js react-native-url-polyfill` — https://supabase.com/docs/reference/javascript/installing
58. Suivre le tutoriel Expo/Supabase pour la config client React Native (polyfills, storage) — https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native
59. Créer `lib/supabase.ts`, typer le client avec `createClient<Database>(...)` — pas de client non typé.
60. Générer les types depuis le schéma réel : `npx supabase gen types typescript --project-id <id> > supabase/database.ts` — https://supabase.com/docs/guides/api/rest/generating-types
61. Utiliser les helpers générés `Tables<>` / `Enums<>` plutôt que de retaper les types à la main (`Database['public']['Tables'][...]`).
62. Créer une couche `services/` — les écrans n'appellent jamais `supabase.from(...)` directement, seuls les fichiers de `services/` le font.
63. Typer le retour des fonctions de service avec `QueryData<typeof maRequête>` pour les jointures — le type s'infère automatiquement de la requête, pas écrit à la main.
64. Chaque service lève l'erreur (`throw`) plutôt que de l'avaler silencieusement — TanStack Query doit la recevoir pour gérer retry/état d'erreur correctement.
65. Mapper les erreurs backend en messages utilisateur **dans chaque service**, contextuellement — jamais une table de correspondance générique globale (le même code d'erreur Postgres a un sens différent selon la table/l'opération).
66. `QueryCache`/`MutationCache` du `QueryClient` (Stage 4) servent uniquement de filet de logging générique — pas de mapping de message là.

## Notes Stage 5

67. `lib/supabase.ts` utilise AsyncStorage pour la session (tutoriel officiel) — à migrer vers SecureStore au Stage 6 pour la sécurité du refresh token (voir décision Stage 0/1).
68. Vérification des types en CI contre le schéma live — différée au Stage 9/10.