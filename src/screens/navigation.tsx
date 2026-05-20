import React from 'react';
import { StyleSheet, ActivityIndicator, View, useColorScheme, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, NavigatorScreenParams, LinkingOptions } from '@react-navigation/native';
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
import ForgotPasswordScreen from './(auth)/ForgotPasswordScreen';
import OrdersScreen from './(tabs)/OrdersScreen';
import ProfileScreen from './(tabs)/ProfileScreen';
import SearchScreen from './(tabs)/SearchScreen';
import RestaurantDetails from './(tabs)/RestaurantDetails';
import CustomTabBar from '../components/CustomTabBar';
import CartScreen from './CartScreen';
import { useAuth } from '../context/AuthContext';
import { COLORS, FONT_FAMILY, FONT_SIZE } from '../theme/theme';

import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';

type ThemeMode = keyof typeof COLORS;

export type RootStackParamList = {
	Onboarding: undefined;
	OnboardingOne: undefined;
	OnboardingTwo: undefined;
	OnboardingThree: undefined;
	Login: undefined;
	Register: undefined;
	ForgotPassword: undefined;
	Otp: undefined;
	Tabs: undefined;
	Cart: undefined;
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

export type DrawerParamList = {
	TabsGroup: NavigatorScreenParams<TabsStackParamList>;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const TabsStack = createBottomTabNavigator<TabsStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();

const HomeStackNavigator = (): React.ReactElement => {
	const theme = (useColorScheme() ?? 'light') as ThemeMode;
	const themeColors = COLORS[theme];

	return (
		<HomeStack.Navigator screenOptions={{ headerShown: false }}>
			<HomeStack.Screen name="HomeMain" component={HomeScreen} />
			<HomeStack.Screen 
				name="RestaurantDetails" 
				component={RestaurantDetails} 
				options={({ route, navigation }) => ({
					headerShown: true,
					headerTitleAlign: 'center',
					headerTitle: () => (
						<Text style={{ 
							fontSize: FONT_SIZE.lg, 
							fontFamily: FONT_FAMILY.bold, 
							color: themeColors.text.title 
						}}>
							{route.params?.name || 'Restaurant Details'}
						</Text>
					),
					headerStyle: {
						backgroundColor: themeColors.bg,
					},
					headerShadowVisible: false,
					headerLeft: () => (
						<Pressable 
							onPress={() => navigation.goBack()}
							style={({ pressed }) => ({
								width: 40,
								height: 40,
								borderRadius: 20,
								backgroundColor: themeColors.sectionBg,
								justifyContent: 'center',
								alignItems: 'center',
								marginLeft: 4,
								opacity: pressed ? 0.7 : 1,
							})}
						>
							<Ionicons name="chevron-back" size={24} color={themeColors.text.title} />
						</Pressable>
					),
					headerRight: () => (
						<View style={{ flexDirection: 'row', gap: 8, marginRight: 4 }}>
							<Pressable 
								style={({ pressed }) => ({
									width: 40,
									height: 40,
									borderRadius: 20,
									backgroundColor: themeColors.sectionBg,
									justifyContent: 'center',
									alignItems: 'center',
									opacity: pressed ? 0.7 : 1,
								})}
							>
								<Ionicons name="share-social-outline" size={20} color={themeColors.text.title} />
							</Pressable>
							<Pressable 
								style={({ pressed }) => ({
									width: 40,
									height: 40,
									borderRadius: 20,
									backgroundColor: themeColors.sectionBg,
									justifyContent: 'center',
									alignItems: 'center',
									opacity: pressed ? 0.7 : 1,
								})}
							>
								<Ionicons name="heart-outline" size={22} color={themeColors.text.title} />
							</Pressable>
						</View>
					),
				})}
			/>
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

const DrawerNavigator = (): React.ReactElement => {
	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				headerShown: false,
				drawerType: 'slide',
			}}
		>
			<Drawer.Screen name="TabsGroup" component={TabsNavigator} />
		</Drawer.Navigator>
	);
};

const Navigation = (): React.ReactElement => {
	const { isAuthenticated, isLoading } = useAuth();
	const theme = (useColorScheme() ?? 'light') as ThemeMode;
	const themeColors = COLORS[theme];

	const linking: LinkingOptions<RootStackParamList> = {
		prefixes: ['dishdash://', 'DishDash://'],
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

	if (isLoading) {
		return (
			<View style={[styles.loadingContainer, { backgroundColor: themeColors.bg }]}>
				<ActivityIndicator size="large" color={themeColors.buttonBg} />
			</View>
		);
	}

	return (
		<NavigationContainer linking={linking}>
			<RootStack.Navigator screenOptions={{ headerShown: false }}>
				{isAuthenticated ? (
					<>
						<RootStack.Screen
							name="Tabs"
							component={DrawerNavigator}
							options={{ headerShown: false }}
						/>
						<RootStack.Screen name="Cart" component={CartScreen} />
					</>
				) : (
					<>
						<RootStack.Screen name="OnboardingOne" component={OnboardingOneScreen} options={{ animation: 'none' }} />
						<RootStack.Screen name="OnboardingTwo" component={OnboardingTwoScreen} options={{ animation: 'none' }} />
						<RootStack.Screen name="OnboardingThree" component={OnboardingThreeScreen} options={{ animation: 'none' }} />
						<RootStack.Screen name="Login" component={LoginScreen} />
						<RootStack.Screen name="Register" component={RegisterScreen} />
						<RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
						<RootStack.Screen name="Onboarding" component={OnboardingScreen} />
						<RootStack.Screen name="Otp" component={OtpScreen} />
					</>
				)}
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
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
