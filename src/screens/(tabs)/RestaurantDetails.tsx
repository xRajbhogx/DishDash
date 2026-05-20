import React, { useMemo } from 'react';
import {
	Image,
	ImageSourcePropType,
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
import { IMAGES } from '../../constants/images';

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

type MenuItem = {
	id: string;
	name: string;
	description: string;
	originalPrice: string;
	discountedPrice: string;
	image: ImageSourcePropType;
	isVeg: boolean;
	eligibleForCoupons: boolean;
};

const MENU_ITEMS: MenuItem[] = [
	{
		id: 'm1',
		name: 'Veg Delight',
		description: 'Indulge in the perfect blend of smoky Tandoori Paneer Tikka and hearty R...more',
		originalPrice: '₹679',
		discountedPrice: 'Get for ₹339',
		image: IMAGES.onboarding.third,
		isVeg: true,
		eligibleForCoupons: false,
	},
];

const RestaurantDetails = (): React.ReactElement => {
	const { top, bottom } = useSafeAreaInsets();
	const theme = (useColorScheme() ?? 'light') as ThemeMode;
	const themeColors = COLORS[theme];
	const styles = useMemo(() => getStyles(themeColors, top, bottom), [themeColors, top, bottom]);
	const navigation = useNavigation<NavigationProp<ParamListBase>>();
	const route = useRoute<RouteProp<LocalRouteParams, 'RestaurantDetails'>>();

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
				<View style={styles.headerRow}>
					<Pressable
						onPress={() => navigation.goBack()}
						style={({ pressed }) => [styles.backButton, pressed && styles.iconButtonPressed]}
						hitSlop={10}
					>
						<Ionicons name="chevron-back" size={22} color={themeColors.text.title} />
					</Pressable>

					<View style={styles.headerActions}>
						<Pressable
							style={({ pressed }) => [styles.searchPill, pressed && styles.searchPillPressed]}
							hitSlop={6}
						>
							<Ionicons name="search-outline" size={16} color={themeColors.text.title} />
							<Text style={styles.searchPillText}>Search</Text>
						</Pressable>
						<Pressable
							style={({ pressed }) => [styles.headerIconButton, pressed && styles.iconButtonPressed]}
							hitSlop={8}
						>
							<Ionicons name="person-add-outline" size={18} color={themeColors.text.title} />
						</Pressable>
						<Pressable
							style={({ pressed }) => [styles.headerIconButton, pressed && styles.iconButtonPressed]}
							hitSlop={8}
						>
							<Ionicons name="ellipsis-vertical" size={18} color={themeColors.text.title} />
						</Pressable>
					</View>
				</View>

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
						<Text style={styles.offerHeaderText}>Items at 50% off</Text>
					</View>
					<View style={styles.offerHeaderRight}>
						<Text style={styles.offerCountText}>5 offers</Text>
						<Ionicons name="chevron-down" size={16} color={themeColors.iconDefault} />
					</View>
				</Pressable>

				<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScrollContent}>
					<Pressable style={({ pressed }) => [styles.filterChip, pressed && styles.filterChipPressed]}>
						<Ionicons name="options-outline" size={16} color={themeColors.text.title} />
						<Text style={styles.filterChipText}>Filters (1)</Text>
						<Ionicons name="chevron-down" size={14} color={themeColors.text.title} />
					</Pressable>
					<Pressable style={({ pressed }) => [styles.filterChipActive, pressed && styles.filterChipPressed]}>
						<Ionicons name="eye-off-outline" size={16} color={themeColors.text.title} />
						<Text style={styles.filterChipText}>Hide non-veg</Text>
						<Ionicons name="close" size={14} color={themeColors.text.title} />
					</Pressable>
					<Pressable style={({ pressed }) => [styles.filterChip, pressed && styles.filterChipPressed]}>
						<Ionicons name="checkmark-circle-outline" size={16} color={themeColors.success} />
						<Text style={styles.filterChipText}>Highly rated</Text>
					</Pressable>
				</ScrollView>

				<View style={styles.menuSectionHeader}>
					<Text style={styles.menuSectionTitle}>Items at 50% off</Text>
					<Pressable hitSlop={10}>
						<Text style={styles.menuSectionLink}>View coupon details</Text>
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
								<Text style={styles.menuOriginalPrice}>{item.originalPrice}</Text>
								<Text style={styles.menuDiscountedPrice}>{item.discountedPrice}</Text>
							</View>
							<Text style={styles.menuDescription}>{item.description}</Text>
							{!item.eligibleForCoupons && (
								<Text style={styles.menuNote}>NOT ELIGIBLE FOR COUPONS</Text>
							)}
						</View>

						<View style={styles.menuCardRight}>
							<View style={styles.menuImageWrapper}>
								<Image source={item.image} style={styles.menuImage} />
								<Pressable style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}>
									<Text style={styles.addButtonText}>ADD</Text>
									<View style={styles.addButtonIcon}>
										<Ionicons name="add" size={14} color={themeColors.iconOnDark} />
									</View>
								</Pressable>
							</View>
						</View>
					</View>
				))}

				<Pressable style={({ pressed }) => [styles.nextSectionRow, pressed && styles.offerRowPressed]}>
					<Text style={styles.nextSectionText}>Items starting at ₹79</Text>
					<Ionicons name="chevron-down" size={16} color={themeColors.iconDefault} />
				</Pressable>
			</ScrollView>

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
	});

export default RestaurantDetails;
