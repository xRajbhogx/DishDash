# AGENTS.md

## Project
Food Delivery App UI in React Native using Expo.

The goal of this assignment is to practice all major React Navigation patterns in one complete app. This is not just a screen design task. Your main focus should be navigation structure, nested navigators, params, auth flow, deep linking and smooth screen movement.

Your app should include:

    Expo React Native project setup

    Onboarding screen with a Get Started button

    Stack Navigator flow
    Onboarding → Home → Restaurant Detail → Cart

    Pass restaurant name and price from Home to Restaurant Detail using params

    Custom stack header with title, back label and header color

    Bottom Tab Navigator with:

        Home

        Search

        Orders

        Profile

    Vector icons for all tabs

    Badge on Orders tab when cart is not empty

    Restaurant Stack nested inside Home tab

    Hide bottom tab bar on Restaurant Detail and Cart screens

    Drawer Navigator accessible from Profile

    Drawer items:

        My Orders

        Settings

        Help

        Logout

    Custom drawer content with user avatar and name

    Conditional auth flow:

        Unauthenticated users see Login stack

        Authenticated users see main app

    Persist mock auth state and redirect correctly after app reload

    Screen transition animations

    Programmatic navigation using:

        navigate

        goBack

        replace

        reset

    Deep link support foodapp://restaurant/123 should open Restaurant Detail directly


## Rules

You should think like a senior mobile developer,

- Read this file before writing code
- Use Expo SDK 55 docs: https://docs.expo.dev/versions/v55.0.0/
- No new libraries without user approval
- Strict TypeScript. No `any`. Type all return values.
- Avoid `JSX.Element` return types; use `React.ReactElement` (or omit) to prevent JSX namespace errors.
- StyleSheet only for styles. No inline style objects at all.
- One component per file. Split if it gets too complicated.
- Comments explain _why_ or _what_ depending on the situation. No dead code.
- The app should be consistent overall.
- No hardcoded values for font, sizes, border, etc in the screen, must be used from theme/theme.ts... if using specify where and why its better


## Stack

Expo SDK 55(https://expo.dev/changelog/sdk-55) · React Native · TypeScript (strict) · React navigation · react-native-reanimated(https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/animating-styles-and-props)
If a new library would clearly improve the project, explain why first and ask for approval before adding it.

## State Management

Use the simplest state solution that fits the problem.

Prefer:

local component state for local UI
Zustand for shared client state
AsyncStorage or MMKV for persistence when needed
server data from Supabase or backend functions for real backend state

Do not use global state when local state is enough.

## Decision Making

If something is unclear, incomplete, or could be improved:

suggest a better approach
explain tradeoffs clearly
keep the recommendation practical
ask before adding new dependencies

eg: “This could be done manually, but react-native-reanimated would make the animation smoother and easier to maintain. Do you want me to add it?”
Do not install or use new libraries without user approval.



## Naming

| Thing       | Style                     | Example              |
| ----------- | ------------------------- | -------------------- |
| Files       | kebab-case                | `ProfileCard.tsx`   |
| Components  | PascalCase                | `ProfileCard`        |
| Hooks       | `use` + camelCase         | `useSession`         |
| Services    | camelCase + `.service.ts` | `profile.service.ts` |
| Constants   | SCREAMING_SNAKE           | `MAX_RETRY_COUNT`    |
| StyleSheets | camelCase                 | `styles.container`   |

## Key Patterns

**Styles** — defined at bottom of file, never inline

```ts
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
});
```

**Services** — all data fetching here, never inside components

```ts
export async function getProfile(userId: string) {
  const res = await fetch(`/api/profile/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
}
```

**Types** — colocate with the file that owns them, not in a separate folder

## Philosophy

Build feature by feature. Smallest useful version first. Readable over clever. Refactor only when duplication hits 3+ times. If a better approach exists, say so and ask before acting.


'Layout' is deprecated.ts(6385)
LinearTransition.d.ts(18, 5): The declaration was marked as deprecated here.
(alias) const Layout: typeof LinearTransition
import Layout
@deprecated — Please use LinearTransition instead.