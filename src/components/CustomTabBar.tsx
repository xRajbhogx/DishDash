import React from 'react';
import { Pressable, StyleSheet, View, Text, useColorScheme, useWindowDimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationState } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
	FadeIn,
	FadeOut,
	LinearTransition,
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withSequence,
	withTiming,
	withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BORDER_RADIUS, COLORS, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, ICON_SIZE, SHADOW, SPACING } from '../theme/theme';
import { useCart } from '../context/CartContext';

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
		case 'Home':    return 'home-outline';
		case 'Search':  return 'search-outline';
		case 'Orders':  return 'cart-outline';
		case 'Profile': return 'person-outline';
		default:        return 'ellipse-outline';
	}
};

const getLabel = (routeName: string, label: string | undefined): string =>
	label ?? routeName;

const getBottomPadding = (bottomInset: number): number =>
	Math.max(bottomInset, SPACING.sm + SPACING.xs);

const getScale = (width: number): number => {
	const scale = width / 350;
	return Math.min(Math.max(scale, 0.85), 1.15);
};

const getSizeConfig = (width: number): SizeConfig => {
	const scale = getScale(width);
	return {
		edge: Math.round(SPACING.lg * scale),
		barPaddingHorizontal: 0,
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

const getNestedRouteName = (
	state: NavigationState | Partial<NavigationState> | undefined,
): string | undefined => {
	if (!state || state.index === undefined || !state.routes) return undefined;
	const active = state.routes[state.index];
	if (!active) return undefined;
	const nested = active.state as NavigationState | Partial<NavigationState> | undefined;
	if (nested?.index !== undefined && nested.routes) {
		return getNestedRouteName(nested) ?? active.name;
	}
	return active.name;
};

const HIDDEN_ROUTE_NAMES = ['RestaurantDetails', 'Cart'];

// ── Animated floating cart banner ─────────────────────────────────────────────
const FloatingCartBanner = ({
	cartCount,
	themeColors,
	styles,
	onPress,
}: {
	cartCount: number;
	themeColors: ThemeColors;
	styles: ReturnType<typeof getStyles>;
	onPress: () => void;
}) => {
	const nudge = useSharedValue(0);
	const scale = useSharedValue(1);

	// Gentle pulse + nudge to draw attention
	React.useEffect(() => {
		nudge.value = withRepeat(
			withSequence(
				withTiming(-3, { duration: 180 }),
				withTiming(3,  { duration: 180 }),
				withTiming(0,  { duration: 180 }),
			),
			-1,
			false,
		);
		scale.value = withRepeat(
			withSequence(
				withTiming(1.03, { duration: 600 }),
				withTiming(1.00, { duration: 600 }),
			),
			-1,
			true,
		);
	}, []);

	const animStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: nudge.value }, { scale: scale.value }],
	}));

	const handlePressIn = () => {
		scale.value = withSpring(0.96);
	};
	const handlePressOut = () => {
		scale.value = withSpring(1.0);
	};

	return (
		<Animated.View
			style={[styles.floatingBox, animStyle]}
			entering={FadeIn.duration(300)}
			exiting={FadeOut.duration(200)}
		>
			{/* Cart count pill */}
			<View style={styles.floatingBadge}>
				<Ionicons name="cart" size={14} color="#FFFFFF" />
				<Text style={styles.floatingBadgeText}>{cartCount}</Text>
			</View>

			<Text style={styles.floatingBoxText}>
				{cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
			</Text>

			<Pressable
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				onPress={onPress}
				style={styles.floatingCTA}
			>
				<Text style={styles.floatingCTAText}>View Cart</Text>
				<Ionicons name="arrow-forward" size={13} color="#FFFFFF" />
			</Pressable>
		</Animated.View>
	);
};

// ── Main Component ─────────────────────────────────────────────────────────────
const CustomTabBar = (props: BottomTabBarProps): React.ReactElement | null => {
	const { state, descriptors, navigation } = props;
	const insets        = useSafeAreaInsets();
	const { width }     = useWindowDimensions();
	const theme         = (useColorScheme() ?? 'light') as ThemeMode;
	const themeColors   = COLORS[theme];
	const styles        = getStyles(themeColors);
	const tabLayout     = React.useMemo(() => LinearTransition.duration(200), []);
	const { cartCount } = useCart();

	const { dynamicStyles, iconSize, hitSlop } = React.useMemo(() => {
		const sizes = getSizeConfig(width);
		const inactiveRadius = Math.round(sizes.tabSize / 2);
		const hitSlopArea = {
			top:    sizes.hitSlopVertical,
			bottom: sizes.hitSlopVertical,
			left:   sizes.hitSlopHorizontal,
			right:  sizes.hitSlopHorizontal,
		};
		return {
			iconSize: sizes.iconSize,
			hitSlop:  hitSlopArea,
			dynamicStyles: StyleSheet.create({
				root:          { left: sizes.edge, right: sizes.edge, paddingBottom: getBottomPadding(insets.bottom + SPACING.sm) },
				bar:           { paddingHorizontal: sizes.barPaddingHorizontal, paddingVertical: sizes.barPaddingVertical },
				tabItem:       { marginHorizontal: sizes.tabSpacing },
				tabItemActive: { height: sizes.tabSize, minWidth: sizes.activeMinWidth, paddingHorizontal: sizes.activePaddingHorizontal },
				tabItemInactive:{ width: sizes.tabSize, height: sizes.tabSize, borderRadius: inactiveRadius },
				activeLabel:   { fontSize: sizes.labelFontSize, marginLeft: sizes.labelSpacing },
			}),
		};
	}, [insets.bottom, width]);

	const activeRouteName = getNestedRouteName(state);
	if (activeRouteName && HIDDEN_ROUTE_NAMES.includes(activeRouteName)) {
		return null;
	}

	return (
		<View style={[styles.root, dynamicStyles.root]} pointerEvents="box-none">
			{/* Animated floating cart banner */}
			{cartCount > 0 && activeRouteName !== 'Cart' && (
				<FloatingCartBanner
					cartCount={cartCount}
					themeColors={themeColors}
					styles={styles}
					onPress={() => navigation.navigate('Cart')}
				/>
			)}

			{/* Tab Bar */}
			<View style={[styles.bar, dynamicStyles.bar]}>
				{state.routes.map((route, index) => {
					const { options } = descriptors[route.key];
					const isFocused   = state.index === index;
					const tabLabel    =
						typeof options.tabBarLabel === 'string'   ? options.tabBarLabel :
						typeof options.title       === 'string'   ? options.title       : undefined;
					const label    = getLabel(route.name, tabLabel);
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
						navigation.emit({ type: 'tabLongPress', target: route.key });
					};

					const showBadge = route.name === 'Orders' && cartCount > 0;

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
									? [styles.tabItemActive,   dynamicStyles.tabItemActive]
									: [styles.tabItemInactive, dynamicStyles.tabItemInactive],
							]}
						>
							{isFocused ? (
								<View style={styles.activeContent}>
									<View>
										<Ionicons name={iconName} size={iconSize} color={themeColors.tabBar.activeIcon} />
										{showBadge && <View style={styles.badgeDot} />}
									</View>
									<Animated.Text
										entering={FadeIn.duration(160)}
										exiting={FadeOut.duration(120)}
										style={[styles.activeLabel, dynamicStyles.activeLabel]}
									>
										{label}
									</Animated.Text>
									{/* Numeric badge visible when active */}
									{showBadge && (
										<Animated.View
											style={styles.numericBadge}
											entering={FadeIn.duration(200)}
											exiting={FadeOut.duration(150)}
										>
											<Text style={styles.numericBadgeText}>{cartCount}</Text>
										</Animated.View>
									)}
								</View>
							) : (
								<View>
									<Ionicons name={iconName} size={iconSize} color={themeColors.tabBar.inactiveIcon} />
									{showBadge && <View style={styles.badgeDot} />}
									{/* Numeric badge visible when inactive */}
									{showBadge && (
										<View style={styles.numericBadgeInactive}>
											<Text style={styles.numericBadgeText}>{cartCount}</Text>
										</View>
									)}
								</View>
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
	// ── Badge dot (small) ─────────────────────────────
	badgeDot: {
		position: 'absolute',
		top: -2,
		right: -4,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: colors.badgeBg,
	},
	// ── Numeric badge (active tab) ────────────────────
	numericBadge: {
		marginLeft: 6,
		backgroundColor: colors.badgeBg,
		borderRadius: BORDER_RADIUS.full,
		minWidth: 20,
		height: 20,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 5,
	},
	// ── Numeric badge (inactive tab, absolute) ────────
	numericBadgeInactive: {
		position: 'absolute',
		top: -6,
		right: -10,
		backgroundColor: colors.badgeBg,
		borderRadius: BORDER_RADIUS.full,
		minWidth: 18,
		height: 18,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 4,
		borderWidth: 2,
		borderColor: colors.tabBar.bar,
	},
	numericBadgeText: {
		color: colors.badgeText,
		fontSize: 10,
		fontFamily: FONT_FAMILY.bold,
		fontWeight: FONT_WEIGHT.bold,
	},
	// ── Floating cart banner ──────────────────────────
	floatingBox: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#1A1A1A',          // rich dark bg regardless of theme
		paddingHorizontal: SPACING.md,
		paddingVertical: 10,
		borderRadius: BORDER_RADIUS.xl,
		width: '100%',
		marginBottom: SPACING.sm,
		...SHADOW.lg,
	},
	floatingBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.buttonBg,    // orange pill
		borderRadius: BORDER_RADIUS.full,
		paddingHorizontal: 8,
		paddingVertical: 4,
		marginRight: SPACING.sm,
		gap: 4,
	},
	floatingBadgeText: {
		color: '#FFFFFF',
		fontSize: 12,
		fontFamily: FONT_FAMILY.bold,
		fontWeight: FONT_WEIGHT.bold,
	},
	floatingBoxText: {
		flex: 1,
		color: '#FFFFFF',
		fontSize: FONT_SIZE.sm,
		fontFamily: FONT_FAMILY.semibold,
	},
	floatingCTA: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
		backgroundColor: colors.buttonBg,
		paddingHorizontal: SPACING.md,
		paddingVertical: 8,
		borderRadius: BORDER_RADIUS.full,
	},
	floatingCTAText: {
		color: '#FFFFFF',
		fontSize: FONT_SIZE.sm,
		fontFamily: FONT_FAMILY.bold,
		fontWeight: FONT_WEIGHT.bold,
	},
});
