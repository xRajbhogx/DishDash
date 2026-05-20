# DishDash 🍔

A food delivery app built with React Native and Expo. The focus of this project is navigation — every major React Navigation pattern is used: nested stacks, bottom tabs, a drawer, conditional auth flow, deep linking, and programmatic navigation.

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
----


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
            │
            ├── [Unauthenticated]
            │     └── AuthStack (Stack)
            │           ├── OnboardingScreen       ← multi-step, shown once
            │           ├── OnboardingOneScreen
            │           ├── OnboardingTwoScreen
            │           ├── OnboardingThreeScreen
            │           ├── LoginScreen
            │           ├── RegisterScreen
            │           ├── ForgotPasswordScreen
            │           └── OtpScreen
            │
            └── [Authenticated]
                  └── MainTabs (BottomTabNavigator)
                        │
                        ├── Home (Tab)
                        │     └── HomeStack (Stack)   ← nested navigator
                        │           ├── HomeScreen
                        │           ├── RestaurantDetails  ← tab bar hidden
                        │           └── CartScreen         ← tab bar hidden
                        │
                        ├── Search (Tab)
                        │     └── SearchScreen
                        │
                        ├── Orders (Tab)             ← badge when cart > 0
                        │     └── OrdersScreen
                        │
                        └── Profile (Tab)
                              └── ProfileDrawer (DrawerNavigator)
                                    ├── ProfileScreen
                                    ├── My Orders
                                    ├── Settings
                                    ├── Help
                                    └── Logout → clears auth, resets to AuthStack
```

### Why the structure is set up this way

**HomeStack nested inside the Home tab** — RestaurantDetails and Cart need to live inside a stack so the bottom tab bar can be hidden on those screens. If they were registered at the tab level, hiding the tab bar would affect all tabs.

**Drawer scoped to Profile** — The drawer only contains account-level actions (Orders, Settings, Help, Logout), so wrapping just the Profile tab makes more sense than a global drawer that would compete with the bottom tab gestures.

**Onboarding in AuthStack, not a separate navigator** — Onboarding is part of the pre-auth flow, so it belongs in the same stack as Login. After the user completes onboarding and logs in, a `reset` call prevents them from navigating back to either.

---

## Auth Flow

1. On launch, `AuthContext` reads a `userToken` from AsyncStorage.
2. No token found → `AuthStack` renders (Onboarding → Login).
3. `hasSeenOnboarding` flag in AsyncStorage gates whether onboarding shows. First launch shows it; subsequent launches go straight to Login.
4. On login, token is saved to AsyncStorage, `isAuthenticated` flips to `true`, and the NavigationContainer re-renders `MainTabs`.
5. On app reload with a saved token → user lands directly on `MainTabs`, no login required.
6. Logout calls `logout()` (clears AsyncStorage), then `navigation.reset` wipes the stack and drops the user back to Login.

---

## Programmatic Navigation

| Method | Used where |
|---|---|
| `navigate` | HomeScreen → RestaurantDetails (with params), RestaurantDetails → Cart |
| `goBack` | Back buttons on RestaurantDetails and Cart |
| `replace` | Onboarding final step → HomeScreen (user can't swipe back) |
| `reset` | Logout → clears entire stack, renders LoginScreen |

---

## Passing Params

Restaurant name and delivery fee are passed from `HomeScreen` to `RestaurantDetails`:

```typescript
navigation.navigate('RestaurantDetails', {
  restaurantId: item.id,
  restaurantName: item.name,
  deliveryFee: item.deliveryFee,
});
```

The detail screen reads them via `route.params` and uses `restaurantName` as the header title.

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

Linking config in `navigation.tsx` maps `restaurant/:id` directly to `RestaurantDetails` inside the HomeStack:

```typescript
const linking: LinkingOptions<RootParamList> = {
  prefixes: ['foodapp://'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          Home: {
            screens: {
              RestaurantDetails: 'restaurant/:restaurantId',
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

The app navigates directly to RestaurantDetails with the `restaurantId` param populated from the URL.

---

## Folder Structure

```
src/
├── components/
│   ├── atoms/
│   │   └── SocialButton.tsx
│   ├── CustomDrawerContent.tsx    # avatar + user name
│   ├── CustomTabBar.tsx           # badge logic lives here
│   ├── FeaturedRestaurantCard.tsx
│   ├── MenuAddButton.tsx
│   ├── SearchRestaurantCard.tsx
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
│   ├── CartScreen.tsx
│   └── navigation.tsx             # all navigators in one place
└── theme/
    └── theme.ts
```

---

## Assumptions

- Login is mocked — any non-empty email and password will authenticate.
- Restaurant and order data is hardcoded locally; no external API calls are made.
- The Orders screen shows a static list. The cart badge on the tab reflects real-time cart state; the order history list does not.
- Deep linking navigates to RestaurantDetails regardless of auth state — if the user is unauthenticated, they see the Login screen first (React Navigation's default linking behaviour with a conditional navigator).
