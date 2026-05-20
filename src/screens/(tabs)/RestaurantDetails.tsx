import React, { useMemo } from 'react';
import {
	Image,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	View,
	useColorScheme,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { BORDER_RADIUS, COLORS, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, SHADOW, SPACING } from '../../theme/theme';
import { FILTER_CHIPS, MENU_ITEMS, RESTAURANT_DETAILS_COPY } from '../../data/RestaurantDetailsData';
import { useCart } from '../../context/CartContext';
import MenuAddButton from '../../components/MenuAddButton';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

type RestaurantDetailsParams = {
	name?: string;
	priceForOne?: string;
	rating?: number;
	reviewCount?: string;
	distance?: string;
	area?: string;
	deliveryTime?: string;
};

type LocalRouteParams = {
	RestaurantDetails: RestaurantDetailsParams;
};

const formatPrice = (value: number): string => `₹${value}`;
const formatDeal = (value: number): string => `Get for ₹${value}`;

const RestaurantDetails = (): React.ReactElement => {
	const { top, bottom } = useSafeAreaInsets();
	const theme = (useColorScheme() ?? 'light') as ThemeMode;
	const themeColors = COLORS[theme];
	const styles = useMemo(() => getStyles(themeColors, top, bottom), [themeColors, top, bottom]);
	const navigation = useNavigation<NavigationProp<ParamListBase>>();
	const route = useRoute<RouteProp<LocalRouteParams, 'RestaurantDetails'>>();
	const { addToCart, cartCount, items } = useCart();

	const restaurantName = route.params?.name ?? 'Makhani Darbar';
	const priceForOne = route.params?.priceForOne ?? '₹150 for one';
	const rating = route.params?.rating ?? 4.0;
	const reviewCount = route.params?.reviewCount ?? '600+';
	const distance = route.params?.distance ?? '1.9 km';
	const area = route.params?.area ?? 'Rohini';
	const deliveryTime = route.params?.deliveryTime ?? '20-25 mins';

	return (
		<View style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

				<View style={styles.titleRow}>
					<View style={styles.titleLeft}>
						<Text style={styles.titleText}>{restaurantName}</Text>
						<Ionicons name="information-circle-outline" size={20} color={themeColors.iconDefault} />
					</View>
					<View style={styles.ratingStack}>
						<View style={styles.ratingPill}>
							<Ionicons name="star" size={12} color={themeColors.iconOnDark} />
							<Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
						</View>
						<Text style={styles.reviewCountText}>By {reviewCount}</Text>
					</View>
				</View>

				<View style={styles.infoRow}>
					<Ionicons name="location-outline" size={16} color={themeColors.iconDefault} />
					<Text style={styles.infoText}>{distance}</Text>
					<Text style={styles.dotText}>•</Text>
					<Text style={styles.infoText}>{area}</Text>
					<Ionicons name="chevron-down" size={16} color={themeColors.iconDefault} style={styles.rowChevron} />
				</View>

				<View style={styles.infoRow}>
					<Ionicons name="flash" size={16} color={themeColors.success} />
					<Text style={styles.infoText}>{deliveryTime}</Text>
					<Text style={styles.dotText}>•</Text>
					<Text style={styles.infoText}>Schedule for later</Text>
					<Ionicons name="chevron-down" size={16} color={themeColors.iconDefault} style={styles.rowChevron} />
				</View>

				<View style={styles.infoRow}>
					<Ionicons name="cash-outline" size={16} color={themeColors.iconDefault} />
					<Text style={styles.infoText}>{priceForOne}</Text>
				</View>

				<Pressable style={({ pressed }) => [styles.hygienePill, pressed && styles.hygienePillPressed]}>
					<Ionicons name="checkmark-circle" size={16} color={themeColors.success} />
					<Text style={styles.hygieneText}>Excellent hygiene</Text>
					<Ionicons name="chevron-down" size={16} color={themeColors.iconDefault} />
				</Pressable>

				<View style={styles.sectionDivider} />

				<Pressable style={({ pressed }) => [styles.offerHeaderRow, pressed && styles.offerRowPressed]}>
					<View style={styles.offerHeaderLeft}>
						<MaterialCommunityIcons name="brightness-percent" size={18} color={themeColors.accentText} />
						<Text style={styles.offerHeaderText}>{RESTAURANT_DETAILS_COPY.offerTitle}</Text>
					</View>
					<View style={styles.offerHeaderRight}>
						<Text style={styles.offerCountText}>{RESTAURANT_DETAILS_COPY.offerCount}</Text>
						<Ionicons name="chevron-down" size={16} color={themeColors.iconDefault} />
					</View>
				</Pressable>

				<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollContent}>
					{FILTER_CHIPS.map((chip) => {
						const chipStyle = chip.variant === 'active' ? styles.filterChipActive : styles.filterChip;
						const iconColor = chip.variant === 'success' ? themeColors.success : themeColors.text.title;

						return (
							<Pressable
								key={chip.id}
								style={({ pressed }) => [chipStyle, pressed && styles.filterChipPressed]}
							>
								<Ionicons name={chip.icon} size={16} color={iconColor} />
								<Text style={styles.filterChipText}>{chip.label}</Text>
								{chip.rightIcon && (
									<Ionicons name={chip.rightIcon} size={14} color={iconColor} />
								)}
							</Pressable>
						);
					})}
				</ScrollView>

				<View style={styles.menuSectionHeader}>
					<Text style={styles.menuSectionTitle}>{RESTAURANT_DETAILS_COPY.menuTitle}</Text>
					<Pressable hitSlop={10}>
						<Text style={styles.menuSectionLink}>{RESTAURANT_DETAILS_COPY.menuLink}</Text>
					</Pressable>
				</View>

				{MENU_ITEMS.map((item) => (
					<View key={item.id} style={styles.menuCard}>
						<View style={styles.menuCardLeft}>
							{item.isVeg && (
								<View style={styles.vegIndicator}>
									<View style={styles.vegDot} />
								</View>
							)}
							<Text style={styles.menuItemTitle}>{item.name}</Text>
							<View style={styles.menuPriceRow}>
								<Text style={styles.menuOriginalPrice}>{formatPrice(item.originalPrice)}</Text>
								<Text style={styles.menuDiscountedPrice}>{formatDeal(item.discountedPrice)}</Text>
							</View>
							<Text style={styles.menuDescription}>{item.description}</Text>
							{!item.eligibleForCoupons && (
								<Text style={styles.menuNote}>NOT ELIGIBLE FOR COUPONS</Text>
							)}
						</View>

						<View style={styles.menuCardRight}>
							<View style={styles.menuImageWrapper}>
								<Image
									source={typeof item.image === 'string' ? { uri: item.image } : item.image}
									style={styles.menuImage}
								/>
								<MenuAddButton 
									itemId={item.id}
									itemName={item.name}
									itemPrice={item.discountedPrice || item.originalPrice}
									isVeg={item.isVeg || false}
									imageUrl={typeof item.image === 'string' ? item.image : undefined}
								/>
							</View>
						</View>
					</View>
				))}

				<Pressable style={({ pressed }) => [styles.nextSectionRow, pressed && styles.offerRowPressed]}>
					<Text style={styles.nextSectionText}>{RESTAURANT_DETAILS_COPY.nextSectionTitle}</Text>
					<Ionicons name="chevron-down" size={16} color={themeColors.iconDefault} />
				</Pressable>
			</ScrollView>

			{/* Static cart banner — visible when cart is not empty */}
			{cartCount > 0 && (
				<View style={styles.cartBanner}>
					<View style={styles.cartBannerLeft}>
						<View style={styles.cartBannerBadge}>
							<Ionicons name="cart" size={13} color="#FFFFFF" />
							<Text style={styles.cartBannerBadgeText}>{cartCount}</Text>
						</View>
						<Text style={styles.cartBannerText}>
							{items.length} {items.length === 1 ? 'item' : 'items'} · ₹{items.reduce((s, i) => s + i.price * i.quantity, 0)}
						</Text>
					</View>
					<Pressable
						onPress={() => navigation.navigate('Cart')}
						style={({ pressed }) => [styles.cartBannerCTA, pressed && styles.cartBannerCTAPressed]}
					>
						<Text style={styles.cartBannerCTAText}>View Cart</Text>
						<Ionicons name="arrow-forward" size={14} color={themeColors.buttonBg} />
					</Pressable>
				</View>
			)}

			<Pressable style={({ pressed }) => [styles.menuButton, pressed && styles.menuButtonPressed]}>
				<Ionicons name="restaurant-outline" size={16} color={themeColors.iconOnDark} />
				<Text style={styles.menuButtonText}>Menu</Text>
			</Pressable>
		</View>
	);
};

const getStyles = (colors: ThemeColors, top: number, bottom: number) =>
	StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: colors.bg,
			paddingTop: top,
		},
		scrollContent: {
			paddingHorizontal: SPACING.md,
			paddingBottom: bottom + SPACING.xxxl,
		},
		headerRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: SPACING.md,
		},
		headerActions: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		backButton: {
			width: 40,
			height: 40,
			borderRadius: 20,
			borderWidth: 1,
			borderColor: colors.divider,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: colors.card,
		},
		headerIconButton: {
			width: 40,
			height: 40,
			borderRadius: 20,
			borderWidth: 1,
			borderColor: colors.divider,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: colors.card,
			marginLeft: SPACING.sm,
		},
		iconButtonPressed: {
			opacity: 0.75,
		},
		searchPill: {
			flexDirection: 'row',
			alignItems: 'center',
			borderWidth: 1,
			borderColor: colors.divider,
			borderRadius: BORDER_RADIUS.full,
			paddingHorizontal: SPACING.md,
			paddingVertical: 8,
			backgroundColor: colors.card,
		},
		searchPillPressed: {
			opacity: 0.85,
		},
		searchPillText: {
			marginLeft: 6,
			fontSize: FONT_SIZE.sm,
			fontFamily: FONT_FAMILY.medium,
			color: colors.text.title,
		},
		titleRow: {
			flexDirection: 'row',
			alignItems: 'flex-start',
			justifyContent: 'space-between',
			marginBottom: SPACING.xs,
		},
		titleLeft: {
			flexDirection: 'row',
			alignItems: 'center',
			flex: 1,
			marginRight: SPACING.sm,
		},
		titleText: {
			fontSize: FONT_SIZE.xxxl,
			fontFamily: FONT_FAMILY.bold,
			fontWeight: FONT_WEIGHT.bold,
			color: colors.text.title,
			marginRight: 6,
		},
		ratingStack: {
			alignItems: 'flex-end',
		},
		ratingPill: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.ratingBg,
			paddingHorizontal: 8,
			paddingVertical: 4,
			borderRadius: BORDER_RADIUS.md,
		},
		ratingText: {
			color: colors.ratingText,
			fontSize: 12,
			fontFamily: FONT_FAMILY.bold,
			fontWeight: FONT_WEIGHT.bold,
			marginLeft: 4,
		},
		reviewCountText: {
			fontSize: 11,
			fontFamily: FONT_FAMILY.medium,
			color: colors.text.subtitle,
			marginTop: 4,
		},
		infoRow: {
			flexDirection: 'row',
			alignItems: 'center',
			marginTop: SPACING.xs,
		},
		infoText: {
			fontSize: 13,
			fontFamily: FONT_FAMILY.medium,
			color: colors.text.subtitle,
			marginLeft: 6,
		},
		dotText: {
			fontSize: 12,
			fontFamily: FONT_FAMILY.medium,
			color: colors.text.subtitle,
			marginHorizontal: 6,
		},
		rowChevron: {
			marginLeft: 6,
		},
		hygienePill: {
			marginTop: SPACING.md,
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'flex-start',
			backgroundColor: colors.hygieneBoxBg,
			borderWidth: 1,
			borderColor: colors.accentBorder,
			borderRadius: BORDER_RADIUS.full,
			paddingHorizontal: SPACING.md,
			paddingVertical: 6,
			...SHADOW.sm,
		},
		hygienePillPressed: {
			opacity: 0.85,
		},
		hygieneText: {
			fontSize: 12,
			fontFamily: FONT_FAMILY.medium,
			color: colors.hygieneText,
			marginHorizontal: 6,
		},
		sectionDivider: {
			marginTop: SPACING.lg,
			borderBottomWidth: 1,
			borderBottomColor: colors.divider,
		},
		offerHeaderRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingVertical: SPACING.md,
			borderBottomWidth: 1,
			borderBottomColor: colors.divider,
		},
		offerRowPressed: {
			opacity: 0.85,
		},
		offerHeaderLeft: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		offerHeaderText: {
			marginLeft: 8,
			fontSize: FONT_SIZE.md,
			fontFamily: FONT_FAMILY.bold,
			color: colors.text.title,
		},
		offerHeaderRight: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		offerCountText: {
			fontSize: 12,
			fontFamily: FONT_FAMILY.medium,
			color: colors.text.subtitle,
			marginRight: 4,
		},
		filterScrollContent: {
			paddingVertical: SPACING.md,
		},
		filterChip: {
			flexDirection: 'row',
			alignItems: 'center',
			borderWidth: 1,
			borderColor: colors.border,
			borderRadius: BORDER_RADIUS.full,
			paddingHorizontal: SPACING.md,
			paddingVertical: 8,
			marginRight: SPACING.sm,
			backgroundColor: colors.bg,
		},
		filterChipActive: {
			flexDirection: 'row',
			alignItems: 'center',
			borderWidth: 1,
			borderColor: colors.accentBorder,
			borderRadius: BORDER_RADIUS.full,
			paddingHorizontal: SPACING.md,
			paddingVertical: 8,
			marginRight: SPACING.sm,
			backgroundColor: colors.hygieneBoxBg,
		},
		filterChipPressed: {
			opacity: 0.85,
		},
		filterChipText: {
			fontSize: 12,
			fontFamily: FONT_FAMILY.medium,
			color: colors.text.title,
			marginHorizontal: 6,
		},
		menuSectionHeader: {
			marginTop: SPACING.sm,
			marginBottom: SPACING.md,
		},
		menuSectionTitle: {
			fontSize: FONT_SIZE.lg,
			fontFamily: FONT_FAMILY.bold,
			color: colors.text.title,
			marginBottom: 4,
		},
		menuSectionLink: {
			fontSize: 12,
			fontFamily: FONT_FAMILY.medium,
			color: colors.text.subtitle,
			textDecorationLine: 'underline',
			textDecorationStyle: 'dotted',
		},
		menuCard: {
			flexDirection: 'row',
			paddingVertical: SPACING.md,
			borderBottomWidth: 1,
			borderBottomColor: colors.divider,
		},
		menuCardLeft: {
			flex: 1,
			paddingRight: SPACING.md,
		},
		menuCardRight: {
			width: 140,
			alignItems: 'flex-end',
		},
		vegIndicator: {
			width: 16,
			height: 16,
			borderRadius: 4,
			borderWidth: 1,
			borderColor: colors.success,
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: 6,
		},
		vegDot: {
			width: 8,
			height: 8,
			borderRadius: 4,
			backgroundColor: colors.success,
		},
		menuItemTitle: {
			fontSize: FONT_SIZE.md,
			fontFamily: FONT_FAMILY.bold,
			color: colors.text.title,
			marginBottom: 4,
		},
		menuPriceRow: {
			flexDirection: 'row',
			alignItems: 'center',
			marginBottom: 6,
		},
		menuOriginalPrice: {
			fontSize: 12,
			fontFamily: FONT_FAMILY.medium,
			color: colors.text.subtitle,
			textDecorationLine: 'line-through',
			marginRight: 8,
		},
		menuDiscountedPrice: {
			fontSize: 12,
			fontFamily: FONT_FAMILY.bold,
			color: colors.accentText,
		},
		menuDescription: {
			fontSize: 12,
			fontFamily: FONT_FAMILY.medium,
			color: colors.text.subtitle,
			lineHeight: 16,
			marginBottom: 6,
		},
		menuNote: {
			fontSize: 10,
			fontFamily: FONT_FAMILY.bold,
			color: colors.progressInactiveIcon,
			letterSpacing: 0.6,
		},
		menuImageWrapper: {
			width: 128,
			height: 96,
			borderRadius: BORDER_RADIUS.lg,
			position: 'relative',
		},
		menuImage: {
			width: '100%',
			height: '100%',
			resizeMode: 'cover',
			borderRadius: BORDER_RADIUS.lg,
		},
		addButton: {
			position: 'absolute',
			right: 8,
			bottom: -18,
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.bg,
			borderWidth: 1,
			borderColor: colors.success,
			borderRadius: BORDER_RADIUS.full,
			paddingHorizontal: SPACING.md,
			paddingVertical: 6,
			...SHADOW.sm,
		},
		addButtonPressed: {
			opacity: 0.85,
		},
		addButtonText: {
			fontSize: 12,
			fontFamily: FONT_FAMILY.bold,
			color: colors.success,
			marginRight: 6,
		},
		addButtonIcon: {
			width: 18,
			height: 18,
			borderRadius: 9,
			backgroundColor: colors.success,
			alignItems: 'center',
			justifyContent: 'center',
		},
		nextSectionRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingVertical: SPACING.md,
		},
		nextSectionText: {
			fontSize: FONT_SIZE.md,
			fontFamily: FONT_FAMILY.bold,
			color: colors.text.title,
		},
		menuButton: {
			position: 'absolute',
			right: SPACING.md,
			bottom: bottom + SPACING.lg,
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.tabBar.activeIcon,
			paddingHorizontal: SPACING.lg,
			paddingVertical: SPACING.sm,
			borderRadius: BORDER_RADIUS.full,
			...SHADOW.md,
		},
		menuButtonPressed: {
			opacity: 0.85,
		},
		menuButtonText: {
			color: colors.iconOnDark,
			fontSize: 13,
			fontFamily: FONT_FAMILY.bold,
			marginLeft: 8,
		},
		// Static cart banner above Menu button
		cartBanner: {
			position: 'absolute',
			bottom: bottom + SPACING.lg + 52, // 52 ≈ menu button height + gap
			left: SPACING.md,
			right: SPACING.md,
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.card,
			paddingHorizontal: SPACING.md,
			paddingVertical: 10,
			borderRadius: BORDER_RADIUS.xl,
			borderWidth: 1.5,
			borderColor: colors.buttonBg,
			...SHADOW.md,
		},
		cartBannerLeft: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
		},
		cartBannerBadge: {
			flexDirection: 'row',
			alignItems: 'center',
			backgroundColor: colors.buttonBg,
			borderRadius: BORDER_RADIUS.full,
			paddingHorizontal: 8,
			paddingVertical: 4,
			marginRight: SPACING.sm,
			gap: 4,
		},
		cartBannerBadgeText: {
			color: '#FFFFFF',
			fontSize: 12,
			fontFamily: FONT_FAMILY.bold,
		},
		cartBannerText: {
			fontSize: FONT_SIZE.sm,
			fontFamily: FONT_FAMILY.semibold,
			color: colors.text.title,
		},
		cartBannerCTA: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 4,
			borderWidth: 1.5,
			borderColor: colors.buttonBg,
			paddingHorizontal: SPACING.md,
			paddingVertical: 7,
			borderRadius: BORDER_RADIUS.full,
		},
		cartBannerCTAPressed: {
			opacity: 0.7,
		},
		cartBannerCTAText: {
			fontSize: FONT_SIZE.sm,
			fontFamily: FONT_FAMILY.bold,
			color: colors.buttonBg,
		},
	});

export default RestaurantDetails;
