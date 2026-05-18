import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
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

export type TabsStackParamList = {
	Home: undefined;
	Search: undefined;
	Orders: undefined;
	Profile: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const TabsStack = createBottomTabNavigator<TabsStackParamList>();

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
