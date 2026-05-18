# AGENTS.md

## Project
Food Delivery App UI in React Native using Expo.

The goal of this assignment is to practice all major React Navigation patterns in one complete app. This is not just a screen design task. Your main focus should be navigation structure, nested navigators, params, auth flow, deep linking and smooth screen movement.

Your app should include:
*   Expo React Native project setup
*   Onboarding screens (3 screens max) with dynamic interactive animations
*   Stack Navigator flow: `OnboardingOne` → `OnboardingTwo` → `OnboardingThree` → `Tabs` (and auth-related transitions)
*   Pass restaurant name and price from Home to Restaurant Detail using params
*   Custom stack header with title, back label, and header color
*   Bottom Tab Navigator with: Home, Search, Orders, Profile
*   Vector icons for all tabs
*   Badge on Orders tab when the cart is not empty
*   Restaurant Stack nested inside Home tab
*   Hide bottom tab bar on Restaurant Detail and Cart screens
*   Drawer Navigator accessible from Profile: My Orders, Settings, Help, Logout
*   Custom drawer content with user avatar and name
*   Conditional auth flow: Unauthenticated users see Login stack, Authenticated users see main app
*   Persist mock auth state and redirect correctly after app reload
*   Screen transition animations
*   Programmatic navigation using: `navigate`, `goBack`, `replace`, `reset`
*   Deep link support: `foodapp://restaurant/123` should open Restaurant Detail directly

---

## Rules

You should think like a senior mobile developer:
- **Read this file** before writing code.
- **Expo SDK 55 Docs**: Use standard APIs matching [Expo SDK 55 docs](https://docs.expo.dev/versions/v55.0.0/).
- **No new libraries** without user approval.
- **Strict TypeScript**: Do not use `any`. Type all parameters, variables, and return values.
- **JSX return types**: Avoid explicit `JSX.Element` return types; use `React.ReactElement` (or let TypeScript infer it) to prevent namespace conflicts.
- **StyleSheet only**: No inline style objects at all. All styles must go inside `StyleSheet.create` at the bottom of the file.
- **One component per file**: Split if it gets too complex.
- **No Dead Code**: Remove all unused variables, imports, and logs. Add clear comments explaining *why* a piece of code exists instead of *what* it does.
- **Consistency**: Keep the app uniform. Sizing, colors, borders, and margins must follow standard system themes.

---

## Stack & State Management

*   **Stack**: Expo SDK 55 · React Native · TypeScript (strict) · React Navigation · `react-native-reanimated` (v4/v3).
*   **Theme Integration**: Always dynamically resolve theme and stylesheet tokens using the core design system:
    ```typescript
    type ThemeMode = keyof typeof COLORS;
    type ThemeColors = (typeof COLORS)[ThemeMode];
    ```
*   **State Management**: Prefer local component state for UI states, Zustand for shared client state, MMKV/AsyncStorage for offline persistence, and mock services for API layers.

---

## Modern Patterns & Guidelines

### 1. Reanimated Custom Transitions (`translateX` / `translateY`)
To achieve highly controlled custom transitions between screens (like sliding left/right or up/down) without double animations, set `options={{ animation: 'none' }}` in the navigation container/router for those screens.
Then, control the position transitions manually in the screen components using Reanimated:
```typescript
const { width } = useWindowDimensions();
const translateX = useSharedValue(width);

useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // Coming into view: slide to 0
    translateX.value = withTiming(0, { duration: 600 });
  });
  return unsubscribe;
}, [navigation, width]);
```

### 2. Focus-Sensitive Screen History
When implementing sliding transitions to and from screens (e.g., from `ScreenTwo` to `ScreenThree`), track whether you are navigating forward or coming back so that your exit animation matches the entry:
```typescript
useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    if (Math.abs(translateX.value) > 0) {
      // Coming back from the next screen: slide back from the left
      translateX.value = withTiming(0, { duration: 600 });
    } else {
      // First entry: slide from bottom or default
      translateY.value = withTiming(0, { duration: 600 });
    }
  });
  return unsubscribe;
}, [navigation]);
```
 
### 3. Gesture-Based Swipe Controls
Combine `PanResponder` or `react-native-gesture-handler` with Reanimated variables to let the user swipe in the direction of the transition to go back/forward. This provides an intuitive, high-fidelity experience:
```typescript
const panResponder = React.useRef(
  PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Set responder only for significant horizontal movement
      return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        handleBack();
      }
    },
  })
).current;
```

### 4. Dynamic Theme Styling
Never hardcode styles. To keep your components performant and clean, use `React.useMemo` to construct theme styles dynamically without recreating the StyleSheet object on every frame:
```typescript
const theme = (useColorScheme() ?? 'light') as ThemeMode;
const themeColors = COLORS[theme];
const styles = React.useMemo(() => getStyles(themeColors), [themeColors]);
```

---

## Naming Conventions

| Entity | Style | Example |
| :--- | :--- | :--- |
| **Files** | kebab-case or PascalCase (matching existing) | `profile-card.tsx` / `ProfileCard.tsx` |
| **Components** | PascalCase | `ProfileCard` |
| **Hooks** | `use` + camelCase | `useSession` |
| **Services** | camelCase + `.service.ts` | `profile.service.ts` |
| **Constants** | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |
| **StyleSheets** | camelCase | `styles.container` |

---

## Key Coding Patterns

**Styles Definition**: Sourced dynamically, defined cleanly at the bottom, and never typed inline:
```typescript
const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: SPACING.xl,
  },
});
```

**Layout Deprecations**: Avoid using deprecated reanimated layout properties (such as the old `Layout` from Reanimated). Use `LinearTransition` or specific custom timing methods to smooth out lists and transitions.