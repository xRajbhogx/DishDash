import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COLORS, FONT_FAMILY, FONT_SIZE, FONT_WEIGHT, SPACING, BORDER_RADIUS, SHADOW } from '../theme/theme';
import { useCart } from '../context/CartContext';
import type { RootStackParamList, TabsStackParamList } from './navigation';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

type CartNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<RootStackParamList, 'Cart'>,
    BottomTabNavigationProp<TabsStackParamList>
>;

// Mock user data — replace with real auth context when available
const MOCK_USER = {
    name: 'Aryan Gupta',
    address: '42, Sector 18, Noida, UP 201301',
    avatar: 'AG',
};

const CartScreen = (): React.ReactElement => {
    const { top, bottom } = useSafeAreaInsets();
    const theme = (useColorScheme() ?? 'light') as ThemeMode;
    const themeColors = COLORS[theme];
    const styles = useMemo(() => getStyles(themeColors, top, bottom), [themeColors, top, bottom]);
    const navigation = useNavigation<CartNavigationProp>();
    const { items, cartCount, clearCart, addToCart, removeFromCart, decrementQuantity } = useCart();

    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxesAndFees = Math.round(itemTotal * 0.1);
    const deliveryFee = itemTotal > 0 ? 49 : 0;
    const grandTotal = itemTotal + taxesAndFees + deliveryFee;

    const handleCheckout = () => {
        clearCart();
        navigation.navigate('Home', { screen: 'HomeMain' });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    hitSlop={12}
                    style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
                >
                    <Ionicons name="chevron-back" size={22} color={themeColors.text.title} />
                </Pressable>
                <Text style={styles.headerTitle}>Your Cart</Text>
                {cartCount > 0 ? (
                    <Pressable onPress={clearCart} style={({ pressed }) => [styles.clearAllButton, pressed && styles.pressed]}>
                        <Text style={styles.clearAllText}>Clear</Text>
                    </Pressable>
                ) : (
                    <View style={styles.headerPlaceholder} />
                )}
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Delivery Address Card */}
                <View style={styles.addressCard}>
                    <View style={styles.addressIconWrap}>
                        <Ionicons name="location" size={18} color={themeColors.buttonBg} />
                    </View>
                    <View style={styles.addressDetails}>
                        <Text style={styles.addressLabel}>Delivering to</Text>
                        <Text style={styles.addressName}>{MOCK_USER.name}</Text>
                        <Text style={styles.addressText} numberOfLines={1}>{MOCK_USER.address}</Text>
                    </View>
                    <Pressable style={styles.changeButton}>
                        <Text style={styles.changeText}>Change</Text>
                    </Pressable>
                </View>

                {cartCount > 0 ? (
                    <>
                        {/* Cart Items */}
                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionLabel}>
                                {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
                            </Text>

                            {items.map((item, index) => (
                                <View key={item.id}>
                                    <View style={styles.itemRow}>
                                        {/* Veg / Non-veg dot */}
                                        <View style={[styles.vegDotBox, { borderColor: item.isVeg ? themeColors.success : themeColors.danger }]}>
                                            <View style={[styles.vegDotInner, { backgroundColor: item.isVeg ? themeColors.success : themeColors.danger }]} />
                                        </View>

                                        {/* Image */}
                                        <View style={styles.itemImageWrap}>
                                            {item.imageUrl ? (
                                                <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
                                            ) : (
                                                <View style={[styles.itemImage, styles.itemImageFallback]}>
                                                    <Ionicons name="fast-food-outline" size={20} color={themeColors.iconDefault} />
                                                </View>
                                            )}
                                        </View>

                                        {/* Name + price */}
                                        <View style={styles.itemDetails}>
                                            <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                                            <Text style={styles.itemUnitPrice}>₹{item.price} per item</Text>
                                        </View>

                                        {/* Quantity controls */}
                                        <View style={styles.qtyWrap}>
                                            <Pressable
                                                onPress={() => {
                                                    if (item.quantity === 1) removeFromCart(item.id);
                                                    else decrementQuantity(item.id);
                                                }}
                                                hitSlop={8}
                                                style={styles.qtyBtn}
                                            >
                                                <Ionicons
                                                    name={item.quantity === 1 ? 'trash-outline' : 'remove'}
                                                    size={14}
                                                    color={themeColors.success}
                                                />
                                            </Pressable>
                                            <Text style={styles.qtyText}>{item.quantity}</Text>
                                            <Pressable
                                                onPress={() => addToCart(item)}
                                                hitSlop={8}
                                                style={styles.qtyBtn}
                                            >
                                                <Ionicons name="add" size={14} color={themeColors.success} />
                                            </Pressable>
                                        </View>

                                        <Text style={styles.itemTotal}>₹{item.price * item.quantity}</Text>
                                    </View>

                                    {index < items.length - 1 && <View style={styles.itemDivider} />}
                                </View>
                            ))}
                        </View>

                        {/* Coupon Banner */}
                        <Pressable style={styles.couponBanner}>
                            <Ionicons name="pricetag-outline" size={18} color={themeColors.buttonBg} />
                            <Text style={styles.couponText}>Apply coupon or promo code</Text>
                            <Ionicons name="chevron-forward" size={18} color={themeColors.chevron} />
                        </Pressable>

                        {/* Bill Details */}
                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionLabel}>Bill Details</Text>

                            <View style={styles.billRow}>
                                <Text style={styles.billLabel}>Item Total</Text>
                                <Text style={styles.billValue}>₹{itemTotal}</Text>
                            </View>
                            <View style={styles.billRow}>
                                <View style={styles.billLabelRow}>
                                    <Text style={styles.billLabel}>Delivery Fee</Text>
                                </View>
                                <Text style={styles.billValue}>₹{deliveryFee}</Text>
                            </View>
                            <View style={styles.billRow}>
                                <Text style={styles.billLabel}>Taxes & Charges</Text>
                                <Text style={styles.billValue}>₹{taxesAndFees}</Text>
                            </View>

                            <View style={styles.billDivider} />

                            <View style={styles.billRow}>
                                <Text style={styles.toPayLabel}>To Pay</Text>
                                <Text style={styles.toPayValue}>₹{grandTotal}</Text>
                            </View>
                        </View>

                        {/* Tip Banner */}
                        <View style={styles.tipBanner}>
                            <Ionicons name="heart" size={16} color={themeColors.buttonBg} />
                            <Text style={styles.tipText}>
                                100% of your tip goes to your delivery partner 🙏
                            </Text>
                        </View>
                    </>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="cart-outline" size={72} color={themeColors.divider} />
                        <Text style={styles.emptyTitle}>Your cart is empty</Text>
                        <Text style={styles.emptySubtitle}>Add items from a restaurant to get started</Text>
                        <Pressable
                            onPress={() => navigation.navigate('Home', { screen: 'HomeMain' })}
                            style={({ pressed }) => [styles.exploreButton, pressed && styles.pressed]}
                        >
                            <Text style={styles.exploreText}>Explore Restaurants</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>

            {/* Sticky Checkout Footer */}
            {cartCount > 0 && (
                <View style={styles.checkoutFooter}>
                    <View style={styles.checkoutLeft}>
                        <Text style={styles.checkoutCount}>{cartCount} items</Text>
                        <Text style={styles.checkoutAmount}>₹{grandTotal}</Text>
                    </View>
                    <Pressable
                        onPress={handleCheckout}
                        style={({ pressed }) => [styles.checkoutButton, pressed && styles.pressed]}
                    >
                        <Text style={styles.checkoutText}>Place Order</Text>
                        <Ionicons name="arrow-forward" size={16} color={themeColors.bg} />
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const getStyles = (colors: ThemeColors, top: number, bottom: number) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.sectionBg,
        paddingTop: top,
    },
    // ── Header ────────────────────────────────────────────
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        backgroundColor: colors.bg,
        borderBottomWidth: 1,
        borderBottomColor: colors.divider,
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.sectionBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: FONT_SIZE.lg,
        fontFamily: FONT_FAMILY.bold,
        fontWeight: FONT_WEIGHT.bold,
        color: colors.text.title,
    },
    clearAllButton: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
    },
    clearAllText: {
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT_FAMILY.medium,
        color: colors.danger,
    },
    headerPlaceholder: {
        width: 44,
    },
    scrollContent: {
        paddingBottom: bottom + 100,
    },
    // ── Address Card ──────────────────────────────────────
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bg,
        marginHorizontal: SPACING.md,
        marginTop: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: colors.divider,
        ...SHADOW.sm,
    },
    addressIconWrap: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.accentBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.sm,
    },
    addressDetails: {
        flex: 1,
    },
    addressLabel: {
        fontSize: 11,
        fontFamily: FONT_FAMILY.medium,
        color: colors.text.subtitle,
        marginBottom: 1,
    },
    addressName: {
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT_FAMILY.bold,
        color: colors.text.title,
    },
    addressText: {
        fontSize: 11,
        fontFamily: FONT_FAMILY.medium,
        color: colors.text.subtitle,
    },
    changeButton: {
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        backgroundColor: colors.accentBg,
        borderRadius: BORDER_RADIUS.sm,
        marginLeft: SPACING.sm,
    },
    changeText: {
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT_FAMILY.bold,
        color: colors.accentText,
    },
    // ── Section Card ──────────────────────────────────────
    sectionCard: {
        backgroundColor: colors.bg,
        marginHorizontal: SPACING.md,
        marginTop: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: colors.divider,
        ...SHADOW.sm,
    },
    sectionLabel: {
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT_FAMILY.bold,
        color: colors.text.subtitle,
        marginBottom: SPACING.md,
        letterSpacing: 0.3,
    },
    // ── Cart Item ─────────────────────────────────────────
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.sm,
    },
    vegDotBox: {
        width: 12,
        height: 12,
        borderWidth: 1.5,
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SPACING.sm,
        flexShrink: 0,
    },
    vegDotInner: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    itemImageWrap: {
        marginRight: SPACING.sm,
        flexShrink: 0,
    },
    itemImage: {
        width: 52,
        height: 52,
        borderRadius: BORDER_RADIUS.md,
    },
    itemImageFallback: {
        backgroundColor: colors.sectionBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemDetails: {
        flex: 1,
        marginRight: SPACING.sm,
    },
    itemName: {
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT_FAMILY.bold,
        color: colors.text.title,
        marginBottom: 2,
    },
    itemUnitPrice: {
        fontSize: 11,
        fontFamily: FONT_FAMILY.medium,
        color: colors.text.subtitle,
    },
    qtyWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.success,
        borderRadius: BORDER_RADIUS.sm,
        paddingHorizontal: 6,
        paddingVertical: 4,
        marginRight: SPACING.sm,
    },
    qtyBtn: {
        padding: 2,
    },
    qtyText: {
        fontSize: 13,
        fontFamily: FONT_FAMILY.bold,
        color: colors.text.title,
        marginHorizontal: 8,
        minWidth: 16,
        textAlign: 'center',
    },
    itemTotal: {
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT_FAMILY.bold,
        color: colors.text.title,
        minWidth: 48,
        textAlign: 'right',
    },
    itemDivider: {
        height: 1,
        backgroundColor: colors.divider,
        marginHorizontal: SPACING.xs,
    },
    // ── Coupon Banner ─────────────────────────────────────
    couponBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bg,
        marginHorizontal: SPACING.md,
        marginTop: SPACING.md,
        borderRadius: BORDER_RADIUS.lg,
        padding: SPACING.md,
        borderWidth: 1,
        borderColor: colors.divider,
        ...SHADOW.sm,
    },
    couponText: {
        flex: 1,
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT_FAMILY.medium,
        color: colors.text.title,
        marginLeft: SPACING.sm,
    },
    // ── Bill ──────────────────────────────────────────────
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SPACING.sm,
    },
    billLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    billLabel: {
        fontSize: 13,
        fontFamily: FONT_FAMILY.medium,
        color: colors.text.subtitle,
    },
    billValue: {
        fontSize: 13,
        fontFamily: FONT_FAMILY.medium,
        color: colors.text.title,
    },
    billDivider: {
        height: 1,
        backgroundColor: colors.divider,
        marginVertical: SPACING.sm,
    },
    toPayLabel: {
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.bold,
        color: colors.text.title,
    },
    toPayValue: {
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.bold,
        color: colors.text.title,
    },
    // ── Tip Banner ────────────────────────────────────────
    tipBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.hygieneBoxBg,
        marginHorizontal: SPACING.md,
        marginTop: SPACING.md,
        borderRadius: BORDER_RADIUS.md,
        paddingHorizontal: SPACING.md,
        paddingVertical: SPACING.sm,
        borderWidth: 1,
        borderColor: colors.accentBorder,
    },
    tipText: {
        flex: 1,
        fontSize: 12,
        fontFamily: FONT_FAMILY.medium,
        color: colors.text.subtitle,
        marginLeft: SPACING.sm,
    },
    // ── Empty State ───────────────────────────────────────
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: SPACING.xxxl,
        paddingHorizontal: SPACING.xl,
    },
    emptyTitle: {
        marginTop: SPACING.lg,
        fontSize: FONT_SIZE.xl,
        fontFamily: FONT_FAMILY.bold,
        color: colors.text.title,
    },
    emptySubtitle: {
        marginTop: SPACING.xs,
        fontSize: FONT_SIZE.sm,
        fontFamily: FONT_FAMILY.medium,
        color: colors.text.subtitle,
        textAlign: 'center',
    },
    exploreButton: {
        marginTop: SPACING.lg,
        backgroundColor: colors.buttonBg,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.full,
    },
    exploreText: {
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.bold,
        color: colors.bg,
    },
    // ── Checkout Footer ───────────────────────────────────
    checkoutFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.bg,
        paddingHorizontal: SPACING.md,
        paddingTop: SPACING.md,
        paddingBottom: bottom + SPACING.md,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
        ...SHADOW.md,
    },
    checkoutLeft: {
        flex: 1,
    },
    checkoutCount: {
        fontSize: 11,
        fontFamily: FONT_FAMILY.medium,
        color: colors.text.subtitle,
    },
    checkoutAmount: {
        fontSize: FONT_SIZE.xl,
        fontFamily: FONT_FAMILY.bold,
        color: colors.text.title,
    },
    checkoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.buttonBg,
        paddingHorizontal: SPACING.xl,
        paddingVertical: SPACING.md,
        borderRadius: BORDER_RADIUS.full,
        gap: 6,
    },
    checkoutText: {
        fontSize: FONT_SIZE.md,
        fontFamily: FONT_FAMILY.bold,
        fontWeight: FONT_WEIGHT.bold,
        color: colors.bg,
    },
    pressed: {
        opacity: 0.75,
    },
});

export default CartScreen;
