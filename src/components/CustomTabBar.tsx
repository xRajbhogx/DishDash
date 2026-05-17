import React from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TabIconName = React.ComponentProps<typeof Ionicons>['name'];

type TabRouteName = 'Home' | 'Search' | 'Orders' | 'Profile';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const COLORS = {
	bar: '#1c1c1e',
	inactive: '#2c2c2e',
	activePill: '#ffffff',
	activeText: '#111111',
	activeIcon: '#111111',
	inactiveIcon: '#8e8e93',
	shadow: '#000000',
};

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
	return Math.max(bottomInset, 12);
};

const getScale = (width: number): number => {
	const baseWidth = 350;
	const scale = width / baseWidth;

	return Math.min(Math.max(scale, 0.85), 1.15);
};

const getSizeConfig = (width: number) => {
	const scale = getScale(width);

	return {
		edge: Math.round(24 * scale),
		barPaddingHorizontal: Math.round(0 * scale),
		barPaddingVertical: Math.round(5 * scale),
		tabSize: Math.round(50 * scale),
		activeMinWidth: Math.round(96 * scale),
		activePaddingHorizontal: Math.round(16 * scale),
		labelFontSize: Math.round(14 * scale),
		labelSpacing: Math.round(8 * scale),
		iconSize: Math.round(20 * scale),
		tabSpacing: Math.round(6 * scale),
		hitSlopHorizontal: Math.round(10 * scale),
		hitSlopVertical: Math.round(8 * scale),
	};
};

const CustomTabBar = (props: BottomTabBarProps): React.ReactElement => {
	const { state, descriptors, navigation } = props;
	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();
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
					paddingBottom: getBottomPadding(insets.bottom + 8),
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
									<Ionicons name={iconName} size={iconSize} color={COLORS.activeIcon} />
									<Animated.Text
										entering={FadeIn.duration(160)}
										exiting={FadeOut.duration(120)}
										style={[styles.activeLabel, dynamicStyles.activeLabel]}
									>
										{label}
									</Animated.Text>
								</View>
							) : (
								<Ionicons name={iconName} size={iconSize} color={COLORS.inactiveIcon} />
							)}
						</AnimatedPressable>
					);
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		position: 'absolute',
		bottom: 0,
		alignItems: 'center',
	},
	bar: {
		width: '100%',
		backgroundColor: COLORS.bar,
		borderRadius: 999,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		shadowColor: COLORS.shadow,
		shadowOpacity: 0.2,
		shadowRadius: 12,
		shadowOffset: { width: 0, height: 6 },
		elevation: 8,
	},
	tabItem: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		overflow: 'hidden',
	},
	tabItemActive: {
		backgroundColor: COLORS.activePill,
		borderRadius: 999,
	},
	tabItemInactive: {
		backgroundColor: COLORS.inactive,
	},
	activeContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	activeLabel: {
		color: COLORS.activeText,
		fontWeight: '600',
	},
});

export default CustomTabBar;
