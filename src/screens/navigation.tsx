import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './(tabs)/HomeScreen';
import LoginScreen from './(auth)/LoginScreen';
import OnboardingScreen from './(auth)/(onboarding)/OnboardingScreen';
import OnboardingOneScreen from './(auth)/(onboarding)/OnboardingOneScreen';
import OnboardingTwoScreen from './(auth)/(onboarding)/OnboardingTwoScreen';
import OnboardingThreeScreen from './(auth)/(onboarding)/OnboardingThreeScreen';
import OtpScreen from './(auth)/OtpScreen';
import RegisterScreen from './(auth)/RegisterScreen';
import OrdersScreen from './(tabs)/OrdersScreen';
import ProfileScreen from './(tabs)/ProfileScreen';
import SearchScreen from './(tabs)/SearchScreen';
import RestaurantDetails from './(tabs)/RestaurantDetails';
import CustomTabBar from '../components/CustomTabBar';

export type RootStackParamList = {
	Onboarding: undefined;
	OnboardingOne: undefined;
	OnboardingTwo: undefined;
	OnboardingThree: undefined;
	Login: undefined;
	Register: undefined;
	Otp: undefined;
	Tabs: undefined;
};

export type HomeStackParamList = {
	HomeMain: undefined;
	RestaurantDetails: {
		name?: string;
		priceForOne?: string;
		rating?: number;
		reviewCount?: string;
		distance?: string;
		area?: string;
		deliveryTime?: string;
	};
};

export type TabsStackParamList = {
	Home: NavigatorScreenParams<HomeStackParamList>;
	Search: undefined;
	Orders: undefined;
	Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const TabsStack = createBottomTabNavigator<TabsStackParamList>();

const HomeStackNavigator = (): React.ReactElement => {
	return (
		<HomeStack.Navigator screenOptions={{ headerShown: false }}>
			<HomeStack.Screen name="HomeMain" component={HomeScreen} />
			<HomeStack.Screen name="RestaurantDetails" component={RestaurantDetails} />
		</HomeStack.Navigator>
	);
};

const TabsNavigator = (): React.ReactElement => {
	return (
		<TabsStack.Navigator
			initialRouteName="Home"
			tabBar={(props) => <CustomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: styles.tabBarStyle,
			}}
		>
			<TabsStack.Screen name="Home" component={HomeStackNavigator} />
			<TabsStack.Screen name="Search" component={SearchScreen} />
			<TabsStack.Screen name="Orders" component={OrdersScreen} />
			<TabsStack.Screen name="Profile" component={ProfileScreen} />
		</TabsStack.Navigator>
	);
};

const Navigation = (): React.ReactElement => {
	return (
		<NavigationContainer>
			<RootStack.Navigator 
                initialRouteName="OnboardingOne"
                screenOptions={{ headerShown: false }}>
				<RootStack.Screen name="Onboarding" component={OnboardingScreen} />
				<RootStack.Screen name="OnboardingOne" component={OnboardingOneScreen} options={{ animation: 'none' }} />
				<RootStack.Screen name="OnboardingTwo" component={OnboardingTwoScreen} options={{ animation: 'none' }} />
				<RootStack.Screen name="OnboardingThree" component={OnboardingThreeScreen} options={{ animation: 'none' }} />
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

const styles = StyleSheet.create({
	tabBarStyle: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 0,
	},
});
