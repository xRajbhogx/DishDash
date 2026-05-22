# DishDash 🍔
Demo video --> https://drive.google.com/file/d/1b7IbZgo4I066fedciEyiW9bhzC1pitM5/view?usp=sharing

A food delivery app built with React Native and Expo. The focus of this project is navigation — every major React Navigation pattern is used: nested stacks, bottom tabs, a drawer, conditional auth flow, deep linking, and programmatic navigation.

This README maps each evaluation item to the exact file or files that implement it in the current codebase.

---

## Project Requirements
Instructions

Build a Food Delivery App UI in React Native using Expo.

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

Implementation details for the checklist are mapped below.



## Tech Stack

| | |
|---|---|
| Framework | React Native + Expo SDK 55 |
| Language | TypeScript |
| Navigation | React Navigation v7 |
| Auth persistence | AsyncStorage |
| Icons | @expo/vector-icons (bundled with Expo) |
| Animations | react-native-reanimated v4 |

---

## Implementation Map

| Evaluation area | Exact files in this project |
|---|---|
| Project setup | [App.tsx](App.tsx), [app.json](app.json), [src/screens/navigation.tsx](src/screens/navigation.tsx) |
| Stack navigation | [src/screens/navigation.tsx](src/screens/navigation.tsx), [src/screens/(auth)/(onboarding)/OnboardingScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingScreen.tsx), [src/screens/(auth)/(onboarding)/OnboardingOneScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingOneScreen.tsx), [src/screens/(auth)/(onboarding)/OnboardingTwoScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingTwoScreen.tsx), [src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx), [src/screens/(tabs)/RestaurantDetails.tsx](src/screens/(tabs)/RestaurantDetails.tsx), [src/screens/CartScreen.tsx](src/screens/CartScreen.tsx) |
| Bottom tab navigation | [src/screens/navigation.tsx](src/screens/navigation.tsx), [src/components/CustomTabBar.tsx](src/components/CustomTabBar.tsx), [src/screens/(tabs)/SearchScreen.tsx](src/screens/(tabs)/SearchScreen.tsx), [src/screens/(tabs)/OrdersScreen.tsx](src/screens/(tabs)/OrdersScreen.tsx), [src/screens/(tabs)/ProfileScreen.tsx](src/screens/(tabs)/ProfileScreen.tsx) |
| Drawer navigation | [src/screens/navigation.tsx](src/screens/navigation.tsx), [src/components/CustomDrawerContent.tsx](src/components/CustomDrawerContent.tsx), [src/screens/(tabs)/ProfileScreen.tsx](src/screens/(tabs)/ProfileScreen.tsx), [src/data/ProfileData.ts](src/data/ProfileData.ts) |
| Auth flow | [src/context/AuthContext.tsx](src/context/AuthContext.tsx), [src/screens/navigation.tsx](src/screens/navigation.tsx), [src/screens/(auth)/LoginScreen.tsx](src/screens/(auth)/LoginScreen.tsx), [src/screens/(auth)/RegisterScreen.tsx](src/screens/(auth)/RegisterScreen.tsx), [src/screens/(auth)/ForgotPasswordScreen.tsx](src/screens/(auth)/ForgotPasswordScreen.tsx) |
| Deep linking | [app.json](app.json), [src/screens/navigation.tsx](src/screens/navigation.tsx) |
| Programmatic navigation | [src/screens/(auth)/(onboarding)/OnboardingScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingScreen.tsx) uses `replace`, [src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx) uses `reset`, [src/screens/(tabs)/RestaurantDetails.tsx](src/screens/(tabs)/RestaurantDetails.tsx) and [src/screens/CartScreen.tsx](src/screens/CartScreen.tsx) use `navigate` and `goBack`, [src/screens/(auth)/LoginScreen.tsx](src/screens/(auth)/LoginScreen.tsx) navigates to Register and Forgot Password |
| UI and UX | [src/components/CustomTabBar.tsx](src/components/CustomTabBar.tsx), [src/screens/(auth)/(onboarding)/OnboardingOneScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingOneScreen.tsx), [src/screens/(auth)/(onboarding)/OnboardingTwoScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingTwoScreen.tsx), [src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx), [src/screens/(tabs)/RestaurantDetails.tsx](src/screens/(tabs)/RestaurantDetails.tsx), [src/screens/CartScreen.tsx](src/screens/CartScreen.tsx) |
| README and demo | This file and the demo link at the top of the README |
| Overall understanding | [src/screens/navigation.tsx](src/screens/navigation.tsx) is the source of truth for nested navigator decisions |

---

## How to Run Locally

```bash
git clone https://github.com/xRajbhogx/DishDash.git
cd DishDash
bun install        # or npm install
npx expo start
```

Scan the QR code with Expo Go, or press `a` / `i` for Android/iOS simulator.

---

## Navigation Structure

```
App.tsx
└── AuthProvider
    └── CartProvider
        └── Navigation (NavigationContainer)
            ├── [Unauthenticated]
            │     └── AuthStack (Stack)
    │           ├── OnboardingScreen
            │           ├── OnboardingOneScreen
            │           ├── OnboardingTwoScreen
            │           ├── OnboardingThreeScreen
            │           ├── LoginScreen
            │           ├── RegisterScreen
            │           ├── ForgotPasswordScreen
            │           └── OtpScreen
            └── [Authenticated]
      └── RootStack
        ├── Tabs (DrawerNavigator)
        │     └── TabsGroup (BottomTabNavigator)
        │           ├── Home
        │           │     └── HomeStack (Stack)
        │           │           ├── HomeScreen
        │           │           └── RestaurantDetails  ← tab bar hidden
        │           ├── SearchScreen
        │           ├── OrdersScreen  ← badge when cart > 0
        │           └── ProfileScreen  ← opens drawer
        └── CartScreen  ← root stack screen, tab bar hidden
```

### Why the structure is set up this way

**HomeStack nested inside the Home tab** — RestaurantDetails lives inside a stack so the bottom tab bar can be hidden on that screen without affecting the other tabs.

**Drawer wraps the tabs** — The drawer navigator is mounted above the tab navigator in [src/screens/navigation.tsx](src/screens/navigation.tsx), but it is intentionally opened from the Profile screen through `navigation.openDrawer()`. That keeps the drawer available for account actions without making it part of every screen's primary gesture path.

**Onboarding in AuthStack, not a separate navigator** — Onboarding is part of the pre-auth flow, so it belongs in the same stack as Login. The onboarding splash uses `replace`, and the final onboarding screen uses `reset`, so the auth stack does not keep stale onboarding history.

---

## Auth Flow

1. On launch, [src/context/AuthContext.tsx](src/context/AuthContext.tsx) reads `@auth_user` from AsyncStorage.
2. If no token is found, [src/screens/navigation.tsx](src/screens/navigation.tsx) renders the auth stack.
3. On login or sign up, the token is saved to AsyncStorage and `isAuthenticated` flips to `true`.
4. When auth state is restored after reload, the app goes straight to the authenticated root stack.
5. Logout is handled in [src/components/CustomDrawerContent.tsx](src/components/CustomDrawerContent.tsx) and [src/screens/(tabs)/ProfileScreen.tsx](src/screens/(tabs)/ProfileScreen.tsx); `logout()` clears AsyncStorage and the navigator switches back to the auth stack.

---

## Programmatic Navigation

| Method | Used where |
|---|---|
| `navigate` | [src/screens/(auth)/LoginScreen.tsx](src/screens/(auth)/LoginScreen.tsx) → Register/ForgotPassword, [src/screens/(auth)/(onboarding)/OnboardingOneScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingOneScreen.tsx) → OnboardingTwo, [src/screens/(auth)/(onboarding)/OnboardingTwoScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingTwoScreen.tsx) → OnboardingThree, [src/components/cards/FeaturedRestaurantCard.tsx](src/components/cards/FeaturedRestaurantCard.tsx) and [src/components/cards/SmallRestaurantCard.tsx](src/components/cards/SmallRestaurantCard.tsx) → RestaurantDetails with params, [src/components/cards/SearchRestaurantCard.tsx](src/components/cards/SearchRestaurantCard.tsx) → nested Home > RestaurantDetails with params, [src/screens/(tabs)/RestaurantDetails.tsx](src/screens/(tabs)/RestaurantDetails.tsx) → Cart, [src/screens/CartScreen.tsx](src/screens/CartScreen.tsx) → Home |
| `goBack` | [src/screens/navigation.tsx](src/screens/navigation.tsx) back button on RestaurantDetails, [src/screens/CartScreen.tsx](src/screens/CartScreen.tsx), [src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx), [src/screens/(auth)/ForgotPasswordScreen.tsx](src/screens/(auth)/ForgotPasswordScreen.tsx) |
| `replace` | [src/screens/(auth)/(onboarding)/OnboardingScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingScreen.tsx) replaces the onboarding splash with Login |
| `reset` | [src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx](src/screens/(auth)/(onboarding)/OnboardingThreeScreen.tsx) resets the stack before landing on Login |

---

## Passing Params

Restaurant cards pass the restaurant data into `RestaurantDetails` from the list screens:

```typescript
navigation.navigate('RestaurantDetails', {
  name,
  priceForOne: priceForOne ?? '₹150 for one',
  rating,
  reviewCount,
  deliveryTime,
});
```

The detail screen reads them via `route.params` and uses `name` as the header title. The same destination is also reached from [src/components/cards/SearchRestaurantCard.tsx](src/components/cards/SearchRestaurantCard.tsx) via the nested `Home -> RestaurantDetails` path.

---

## Orders Badge

`CartContext` tracks item count. `CustomTabBar` reads `cartCount` and renders it as a badge on the Orders tab when the cart is non-empty:

```typescript
tabBarBadge: cartCount > 0 ? cartCount : undefined
```

---

## Deep Linking

Scheme is configured in `app.json`:

```json
"scheme": "foodapp"
```

Linking config in `navigation.tsx` maps `restaurant/:id` directly to `RestaurantDetails` inside the nested tab stack:

```typescript
const linking: LinkingOptions<RootParamList> = {
  prefixes: ['foodapp://', 'dishdash://', 'DishDash://'],
  config: {
    screens: {
      Tabs: {
        screens: {
          TabsGroup: {
            screens: {
              Home: {
                screens: {
                  RestaurantDetails: 'restaurant/:id',
                },
              },
            },
          },
        },
      },
    },
  },
};
```

**Test on Android emulator:**
```bash
adb shell am start -W -a android.intent.action.VIEW -d "foodapp://restaurant/123"
```

**Test with Expo Go on a real device:**
```bash
npx uri-scheme open foodapp://restaurant/123 --android
```

The app navigates directly to RestaurantDetails with the `id` param populated from the URL.

---

## Folder Structure

```
src/
├── components/
│   ├── atoms/
│   │   └── SocialButton.tsx
│   ├── cards/
│   │   ├── FeaturedRestaurantCard.tsx
│   │   ├── SearchRestaurantCard.tsx
│   │   └── SmallRestaurantCard.tsx
│   ├── CustomDrawerContent.tsx    # avatar + user name + drawer actions
│   ├── CustomTabBar.tsx           # tab icons, cart badge, animated cart banner
│   ├── MenuAddButton.tsx
│   └── ...
├── context/
│   ├── AuthContext.tsx            # isAuthenticated + login/logout
│   └── CartContext.tsx            # cart items + cartCount
├── data/
│   ├── RestaurantCard.ts
│   ├── RestaurantDetailsData.ts
│   ├── OrdersData.ts
│   └── ...
├── screens/
│   ├── (auth)/
│   │   ├── (onboarding)/
│   │   │   ├── OnboardingScreen.tsx
│   │   │   ├── OnboardingOneScreen.tsx
│   │   │   ├── OnboardingTwoScreen.tsx
│   │   │   └── OnboardingThreeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── ForgotPasswordScreen.tsx
│   │   └── OtpScreen.tsx
│   ├── (tabs)/
│   │   ├── HomeScreen.tsx
│   │   ├── RestaurantDetails.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── OrdersScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── CartScreen.tsx             # root stack screen with its own header and back button
│   └── navigation.tsx             # root stack, tabs, drawer, and deep-link config
└── theme/
    └── theme.ts
```

---

## Assumptions

- Login is mocked — any non-empty email and password will authenticate.
- Restaurant and order data is hardcoded locally; no external API calls are made.
- The Orders screen shows a static list. The cart badge on the tab reflects real-time cart state; the order history list does not.
- Deep linking is configured in [app.json](app.json) and [src/screens/navigation.tsx](src/screens/navigation.tsx). The example URI in this project is `foodapp://restaurant/123`.
