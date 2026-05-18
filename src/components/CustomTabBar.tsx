import React from 'react';
import { Pressable, StyleSheet, View, useColorScheme, useWindowDimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BORDER_RADIUS, COLORS, FONT_WEIGHT, ICON_SIZE, SHADOW, SPACING } from '../theme/theme';

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

type TabRouteName = 'Home' | 'Search' | 'Orders' | 'Profile';

type ThemeMode = keyof typeof COLORS;

type ThemeColors = (typeof COLORS)[ThemeMode];

type SizeConfig = {
	edge: number;
	barPaddingHorizontal: number;
	barPaddingVertical: number;
	tabSize: number;
	activeMinWidth: number;
	activePaddingHorizontal: number;
	labelFontSize: number;
	labelSpacing: number;
	iconSize: number;
	tabSpacing: number;
	hitSlopHorizontal: number;
	hitSlopVertical: number;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getIconName = (routeName: string): TabIconName => {
	switch (routeName) {
		case 'Home':
			return 'home-outline';
		case 'Search':
			return 'search-outline';
		case 'Orders':
			return 'cart-outline';
		case 'Profile':
			return 'person-outline';
		default:
			return 'ellipse-outline';
	}
};

const getLabel = (routeName: string, label: string | undefined): string => {
	if (label) {
		return label;
	}

	return routeName;
};

const getBottomPadding = (bottomInset: number): number => {
	return Math.max(bottomInset, SPACING.sm + SPACING.xs);
};

const getScale = (width: number): number => {
	const baseWidth = 350;
	const scale = width / baseWidth;

	return Math.min(Math.max(scale, 0.85), 1.15);
};

const getSizeConfig = (width: number): SizeConfig => {
	const scale = getScale(width);

	return {
		edge: Math.round(SPACING.lg * scale),
		barPaddingHorizontal: Math.round(0 * scale),
		barPaddingVertical: Math.round(5 * scale),
		tabSize: Math.round(50 * scale),
		activeMinWidth: Math.round(96 * scale),
		activePaddingHorizontal: Math.round(SPACING.md * scale),
		labelFontSize: Math.round(14 * scale),
		labelSpacing: Math.round(SPACING.sm * scale),
		iconSize: Math.round(ICON_SIZE.md * scale),
		tabSpacing: Math.round(6 * scale),
		hitSlopHorizontal: Math.round(10 * scale),
		hitSlopVertical: Math.round(SPACING.sm * scale),
	};
};

const CustomTabBar = (props: BottomTabBarProps): React.ReactElement => {
	const { state, descriptors, navigation } = props;
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
	const theme = (useColorScheme() ?? 'light') as ThemeMode;
	const themeColors = COLORS[theme];
	const styles = getStyles(themeColors);
	const tabLayout = React.useMemo(() => LinearTransition.duration(200), []);

	const { dynamicStyles, iconSize, hitSlop } = React.useMemo(() => {
		const sizes = getSizeConfig(width);
		const inactiveRadius = Math.round(sizes.tabSize / 2);
		const hitSlopArea = {
			top: sizes.hitSlopVertical,
			bottom: sizes.hitSlopVertical,
			left: sizes.hitSlopHorizontal,
			right: sizes.hitSlopHorizontal,
		};

		return {
			iconSize: sizes.iconSize,
			hitSlop: hitSlopArea,
			dynamicStyles: StyleSheet.create({
				root: {
					left: sizes.edge,
					right: sizes.edge,
					paddingBottom: getBottomPadding(insets.bottom + SPACING.sm),
				},
				bar: {
					paddingHorizontal: sizes.barPaddingHorizontal,
					paddingVertical: sizes.barPaddingVertical,
				},
				tabItem: {
					marginHorizontal: sizes.tabSpacing,
				},
				tabItemActive: {
					height: sizes.tabSize,
					minWidth: sizes.activeMinWidth,
					paddingHorizontal: sizes.activePaddingHorizontal,
				},
				tabItemInactive: {
					width: sizes.tabSize,
					height: sizes.tabSize,
					borderRadius: inactiveRadius,
				},
				activeLabel: {
					fontSize: sizes.labelFontSize,
					marginLeft: sizes.labelSpacing,
				},
			}),
		};
	}, [insets.bottom, width]);

	return (
		<View style={[styles.root, dynamicStyles.root]} pointerEvents="box-none">
			<View style={[styles.bar, dynamicStyles.bar]}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const isFocused = state.index === index;
					const tabLabel =
						typeof options.tabBarLabel === 'string'
							? options.tabBarLabel
							: typeof options.title === 'string'
								? options.title
								: undefined;
					const label = getLabel(route.name, tabLabel);
					const iconName = getIconName(route.name);

					const onPress = (): void => {
						const event = navigation.emit({
							type: 'tabPress',
							target: route.key,
							canPreventDefault: true,
						});

						if (!isFocused && !event.defaultPrevented) {
							navigation.navigate(route.name as TabRouteName);
						}
					};

					const onLongPress = (): void => {
						navigation.emit({
							type: 'tabLongPress',
							target: route.key,
						});
					};

					return (
						<AnimatedPressable
							key={route.key}
							accessibilityRole="button"
							accessibilityState={isFocused ? { selected: true } : undefined}
							accessibilityLabel={options.tabBarAccessibilityLabel}
							hitSlop={hitSlop}
							onPress={onPress}
							onLongPress={onLongPress}
							layout={tabLayout}
							style={[
								styles.tabItem,
								dynamicStyles.tabItem,
								isFocused
									? [styles.tabItemActive, dynamicStyles.tabItemActive]
									: [styles.tabItemInactive, dynamicStyles.tabItemInactive],
							]}
						>
							{isFocused ? (
								<View style={styles.activeContent}>
									<Ionicons name={iconName} size={iconSize} color={themeColors.tabBar.activeIcon} />
									<Animated.Text
										entering={FadeIn.duration(160)}
										exiting={FadeOut.duration(120)}
										style={[styles.activeLabel, dynamicStyles.activeLabel]}
									>
										{label}
									</Animated.Text>
								</View>
							) : (
								<Ionicons name={iconName} size={iconSize} color={themeColors.tabBar.inactiveIcon} />
							)}
						</AnimatedPressable>
					);
				})}
			</View>
		</View>
	);
};

export default CustomTabBar;

const getStyles = (colors: ThemeColors) => StyleSheet.create({
	root: {
		position: 'absolute',
		bottom: 0,
		alignItems: 'center',
	},
	bar: {
		width: '100%',
		backgroundColor: colors.tabBar.bar,
		borderRadius: BORDER_RADIUS.full,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowColor: colors.tabBar.shadow,
		shadowOpacity: SHADOW.lg.shadowOpacity,
		shadowRadius: SHADOW.lg.shadowRadius,
		shadowOffset: SHADOW.lg.shadowOffset,
		elevation: SHADOW.lg.elevation,
	},
	tabItem: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		overflow: 'hidden',
	},
	tabItemActive: {
		backgroundColor: colors.tabBar.activePill,
		borderRadius: BORDER_RADIUS.full,
	},
	tabItemInactive: {
		backgroundColor: colors.tabBar.inactive,
	},
	activeContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeLabel: {
		color: colors.tabBar.activeText,
		fontWeight: FONT_WEIGHT.semibold,
	},
});

