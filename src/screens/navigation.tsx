import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen';
import LoginScreen from './(auth)/LoginScreen';
import OnboardingScreen from './(auth)/OnboardingScreen';
import OtpScreen from './(auth)/OtpScreen';
import RegisterScreen from './(auth)/RegisterScreen';
import OrdersScreen from './(tabs)/OrdersScreen';
import ProfileScreen from './(tabs)/ProfileScreen';
import SearchScreen from './(tabs)/SearchScreen';

export type RootStackParamList = {
	Onboarding: undefined;
	Login: undefined;
	Register: undefined;
	Otp: undefined;
	Tabs: undefined;
};

export type TabsStackParamList = {
	Home: undefined;
	Search: undefined;
	Orders: undefined;
	Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const TabsStack = createBottomTabNavigator<TabsStackParamList>();

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICON_BY_ROUTE: Record<keyof TabsStackParamList, TabIconName> = {
	Home: 'home-outline',
	Search: 'search-outline',
	Orders: 'receipt-outline',
	Profile: 'person-outline',
};

const TabsNavigator = (): React.ReactElement => {
	return (
		<TabsStack.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ color, size }) => (
					<Ionicons name={TAB_ICON_BY_ROUTE[route.name]} color={color} size={size} />
				),
			})}
		>
			<TabsStack.Screen name="Home" component={HomeScreen} />
			<TabsStack.Screen name="Search" component={SearchScreen} />
			<TabsStack.Screen name="Orders" component={OrdersScreen} />
			<TabsStack.Screen name="Profile" component={ProfileScreen} />
		</TabsStack.Navigator>
	);
};

const Navigation = (): React.ReactElement => {
	return (
		<NavigationContainer>
			<RootStack.Navigator initialRouteName="Onboarding">
				<RootStack.Screen name="Onboarding" component={OnboardingScreen} />
				<RootStack.Screen name="Login" component={LoginScreen} />
				<RootStack.Screen name="Register" component={RegisterScreen} />
				<RootStack.Screen name="Otp" component={OtpScreen} />
				<RootStack.Screen
					name="Tabs"
					component={TabsNavigator}
					options={{ headerShown: false }}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
