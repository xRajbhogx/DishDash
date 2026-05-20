import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Image, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, FONT_FAMILY, BORDER_RADIUS, SHADOW } from '../../theme/theme';
import { useCart } from '../../context/CartContext';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import HygieneBadge from '../../components/HygieneBadge';
import { ONGOING_ORDER, COMPLETED_ORDERS } from '../../data/OrdersData';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const OrdersScreen = (): React.ReactElement => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const screenStyles = useMemo(() => getStyles(themeColors), [themeColors]);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const { items, cartCount } = useCart();
  
  // Always show both tabs; Cart tab defaults when has items
  const TABS = ['Cart', 'All Orders'];
  const [activeTab, setActiveTab] = useState<string>('Cart');

  return (
    <View style={[screenStyles.container, { paddingTop: top }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + SPACING.xxl + 80 }}
      >
        {/* Header */}
        <View style={screenStyles.headerContainer}>
          <View style={screenStyles.headerTextContainer}>
            <Text style={screenStyles.headerTitle}>Orders</Text>
            <Text style={screenStyles.headerSubtitle}>Track, reorder or view your past orders</Text>
          </View>
          <Pressable style={screenStyles.helpButton}>
            <Ionicons name="help-buoy-outline" size={24} color={themeColors.text.title} />
          </Pressable>
        </View>

        {/* Tabs — always shown */}
        <View style={screenStyles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={screenStyles.tabsScroll}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <Pressable
                  key={tab}
                  style={[screenStyles.tabButton, isActive && screenStyles.activeTabButton]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[screenStyles.tabText, isActive && screenStyles.activeTabText]}>
                    {tab}
                  </Text>
                  {tab === 'Cart' && cartCount > 0 && (
                    <View style={screenStyles.badgeContainer}>
                      <Text style={screenStyles.badgeText}>{cartCount}</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Tab Content */}
        {activeTab === 'Cart' ? (
          <View style={screenStyles.sectionContainer}>
            {cartCount > 0 ? (
              <>
                <View style={screenStyles.cartItemsContainer}>
                  {items.map((item, index) => (
                    <View key={item.id}>
                      <View style={screenStyles.itemRow}>
                        <View style={[screenStyles.vegIndicator, { borderColor: item.isVeg ? themeColors.success : themeColors.danger }]}>
                          <View style={[screenStyles.vegDot, { backgroundColor: item.isVeg ? themeColors.success : themeColors.danger }]} />
                        </View>

                        {/* Small image */}
                        <View style={screenStyles.itemThumb}>
                          {item.imageUrl ? (
                            <Image source={{ uri: item.imageUrl }} style={screenStyles.itemThumbImage} />
                          ) : (
                            <View style={[screenStyles.itemThumbImage, screenStyles.itemThumbFallback]}>
                              <Ionicons name="fast-food-outline" size={16} color={themeColors.iconDefault} />
                            </View>
                          )}
                        </View>

                        <View style={screenStyles.itemInfo}>
                          <Text style={screenStyles.itemText} numberOfLines={1}>{item.name}</Text>
                          <Text style={screenStyles.itemSubPrice}>₹{item.price} each</Text>
                        </View>

                        <Text style={screenStyles.itemPrice}>₹{item.price * item.quantity}</Text>
                        <Text style={screenStyles.itemQtyBadge}>×{item.quantity}</Text>
                      </View>
                      {index < items.length - 1 && <View style={screenStyles.miniDivider} />}
                    </View>
                  ))}
                </View>

                {/* Total summary strip */}
                <View style={screenStyles.cartSummaryStrip}>
                  <Text style={screenStyles.cartSummaryText}>
                    {cartCount} items • ₹{items.reduce((s, i) => s + i.price * i.quantity, 0)}
                  </Text>
                  <Pressable
                    onPress={() => navigation.navigate('Cart')}
                    style={({ pressed }) => [screenStyles.viewCartButton, pressed && screenStyles.pressed]}
                  >
                    <Text style={screenStyles.viewCartText}>View Cart & Checkout</Text>
                    <Ionicons name="arrow-forward" size={14} color={themeColors.bg} />
                  </Pressable>
                </View>
              </>
            ) : (
              <View style={screenStyles.emptyCartBox}>
                <Ionicons name="cart-outline" size={48} color={themeColors.divider} />
                <Text style={screenStyles.emptyCartTitle}>Your cart is empty</Text>
                <Text style={screenStyles.emptyCartSub}>Add items from a restaurant to see them here</Text>
              </View>
            )}
          </View>
        ) : (
          <>
            {/* Ongoing Order */}
            <View style={screenStyles.sectionContainer}>
              <Text style={screenStyles.sectionTitle}>ONGOING ORDER</Text>
              <View style={screenStyles.ongoingCard}>
                {/* Top Info */}
                <View style={screenStyles.ongoingCardTop}>
                  <View style={screenStyles.imageWrapper}>
                    <Image source={{ uri: ONGOING_ORDER.image }} style={screenStyles.foodImage} />
                    <HygieneBadge style={{ position: 'absolute', bottom: -8, left: -8 }} />
                  </View>
                  
                  <View style={screenStyles.ongoingDetails}>
                    <View style={screenStyles.ongoingHeaderRow}>
                      <Text style={screenStyles.restaurantName}>{ONGOING_ORDER.restaurant}</Text>
                      <Pressable hitSlop={10}>
                        <Ionicons name="ellipsis-vertical" size={18} color={themeColors.iconDefault} />
                      </Pressable>
                    </View>
                    <Text style={screenStyles.tagsText}>{ONGOING_ORDER.tags}</Text>
                    <Text style={screenStyles.orderIdText}>Order ID: {ONGOING_ORDER.id}</Text>
                    
                    <View style={screenStyles.statusRow}>
                      <Ionicons name="time" size={16} color={themeColors.accentText} />
                      <Text style={screenStyles.statusText}>{ONGOING_ORDER.status}</Text>
                    </View>
                    <Text style={screenStyles.arrivingText}>
                      Arriving in <Text style={screenStyles.highlightTime}>{ONGOING_ORDER.arrivingIn}</Text>
                    </Text>
                  </View>

                  <View style={screenStyles.trackOrderButtonContainer}>
                    <Pressable style={screenStyles.trackOrderButton}>
                      <Text style={screenStyles.trackOrderText}>Track Order</Text>
                    </Pressable>
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={screenStyles.progressContainer}>
                  <View style={screenStyles.progressLineBackground} />
                  <View style={[screenStyles.progressLineActive, { width: '33%' }]} />
                  
                  <View style={screenStyles.progressStep}>
                    <View style={[screenStyles.progressIconCircle, screenStyles.progressIconCircleActive]}>
                      <Ionicons name="bag-handle" size={16} color={themeColors.iconOnDark} />
                    </View>
                    <Text style={[screenStyles.progressStepText, screenStyles.progressStepTextActive]}>Confirmed</Text>
                  </View>
                  
                  <View style={screenStyles.progressStep}>
                    <View style={[screenStyles.progressIconCircle, screenStyles.progressIconCircleActive]}>
                      <MaterialCommunityIcons name="bowl-mix" size={16} color={themeColors.iconOnDark} />
                    </View>
                    <Text style={[screenStyles.progressStepText, screenStyles.progressStepTextActive]}>Preparing</Text>
                  </View>
                  
                  <View style={screenStyles.progressStep}>
                    <View style={screenStyles.progressIconCircle}>
                      <MaterialCommunityIcons name="moped" size={16} color={themeColors.progressInactiveIcon} />
                    </View>
                    <Text style={screenStyles.progressStepText}>On the way</Text>
                  </View>
                  
                  <View style={screenStyles.progressStep}>
                    <View style={screenStyles.progressIconCircle}>
                      <Ionicons name="checkmark" size={16} color={themeColors.progressInactiveIcon} />
                    </View>
                    <Text style={screenStyles.progressStepText}>Delivered</Text>
                  </View>
                </View>

                {/* Footer Buttons */}
                <View style={screenStyles.ongoingFooter}>
                  <Pressable style={screenStyles.footerAction}>
                    <Ionicons name="receipt-outline" size={18} color={themeColors.iconDefault} />
                    <Text style={screenStyles.footerActionText}>View Details</Text>
                  </Pressable>
                  <View style={screenStyles.footerDivider} />
                  <Pressable style={screenStyles.footerAction}>
                    <Ionicons name="headset-outline" size={18} color={themeColors.iconDefault} />
                    <Text style={screenStyles.footerActionText}>Get Help</Text>
                  </Pressable>
                </View>
              </View>
            </View>

            {/* Completed Orders */}
            <View style={screenStyles.sectionContainer}>
              <Text style={screenStyles.sectionTitle}>COMPLETED ORDERS</Text>
              {COMPLETED_ORDERS.map((order, index) => (
                <View key={index} style={screenStyles.completedCard}>
                  <View style={screenStyles.imageWrapper}>
                    <Image source={{ uri: order.image }} style={screenStyles.foodImage} />
                    <HygieneBadge style={{ position: 'absolute', bottom: -8, left: -8 }} />
                  </View>

                  <View style={screenStyles.completedDetails}>
                    <View style={screenStyles.completedHeaderRow}>
                      <Text style={screenStyles.restaurantName}>{order.restaurant}</Text>
                      <View style={screenStyles.completedRightInfo}>
                        <Text style={screenStyles.deliveredText}>{order.status}</Text>
                        <Pressable hitSlop={10}>
                          <Ionicons name="ellipsis-vertical" size={16} color={themeColors.iconDefault} style={{ marginLeft: 6 }} />
                        </Pressable>
                      </View>
                    </View>
                    <Text style={screenStyles.tagsText}>{order.tags}</Text>
                    <Text style={screenStyles.orderIdText}>Order ID: {order.id}</Text>
                    
                    <View style={screenStyles.dateRow}>
                      <Ionicons name="calendar-outline" size={14} color={themeColors.iconDefault} />
                      <Text style={screenStyles.dateText}>{order.date}</Text>
                    </View>

                    <View style={screenStyles.priceReorderRow}>
                      <Text style={screenStyles.priceText}>{order.price}</Text>
                      <Pressable style={screenStyles.reorderButton}>
                        <Text style={screenStyles.reorderText}>Reorder</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Premium Banner */}
            <View style={screenStyles.premiumBanner}>
              <View style={screenStyles.premiumIconContainer}>
                <MaterialCommunityIcons name="crown" size={28} color={themeColors.accentText} />
              </View>
              <View style={screenStyles.premiumTextContainer}>
                <Text style={screenStyles.premiumTitle}>You're a Premium Member</Text>
                <Text style={screenStyles.premiumSubtitle}>Enjoy exclusive benefits and priority support on every order.</Text>
              </View>
              <Pressable style={screenStyles.premiumButton}>
                <Text style={screenStyles.premiumButtonText}>View Benefits</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FONT_SIZE.xxxl,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
  },
  helpButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accentBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    marginBottom: SPACING.lg,
  },
  tabsScroll: {
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SPACING.sm,
    marginRight: SPACING.lg,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: colors.accentText,
  },
  tabText: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.semibold,
    color: colors.text.subtitle,
  },
  activeTabText: {
    color: colors.accentText,
  },
  badgeContainer: {
    backgroundColor: colors.badgeBg,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  badgeText: {
    color: colors.badgeText,
    fontSize: 10,
    fontFamily: FONT_FAMILY.bold,
  },
  sectionContainer: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.subtitle,
    marginBottom: SPACING.md,
    letterSpacing: 0.5,
  },
  ongoingCard: {
    backgroundColor: colors.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: SPACING.md,
    ...SHADOW.sm,
  },
  ongoingCardTop: {
    flexDirection: 'row',
    marginBottom: SPACING.lg,
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.md,
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.md,
    resizeMode: 'cover',
  },
  ongoingDetails: {
    flex: 1,
    minWidth: '50%',
  },
  ongoingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  restaurantName: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    marginBottom: 2,
  },
  tagsText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
    marginBottom: 2,
  },
  orderIdText: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.medium,
    color: colors.progressInactiveIcon,
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  statusText: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    marginLeft: 4,
  },
  arrivingText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
  },
  highlightTime: {
    color: colors.accentText,
    fontFamily: FONT_FAMILY.bold,
  },
  trackOrderButtonContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: -30,
  },
  trackOrderButton: {
    backgroundColor: colors.accentBg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
  },
  trackOrderText: {
    color: colors.accentText,
    fontSize: 12,
    fontFamily: FONT_FAMILY.bold,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.lg,
    position: 'relative',
  },
  progressLineBackground: {
    position: 'absolute',
    top: 15,
    left: '15%',
    right: '15%',
    height: 2,
    backgroundColor: colors.divider,
    zIndex: 0,
  },
  progressLineActive: {
    position: 'absolute',
    top: 15,
    left: '15%',
    height: 2,
    backgroundColor: colors.accentText,
    zIndex: 1,
  },
  progressStep: {
    alignItems: 'center',
    zIndex: 2,
    width: 60,
  },
  progressIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.progressBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressIconCircleActive: {
    backgroundColor: colors.badgeBg,
  },
  progressStepText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.medium,
    color: colors.progressInactiveIcon,
    textAlign: 'center',
  },
  progressStepTextActive: {
    color: colors.accentText,
    fontFamily: FONT_FAMILY.bold,
  },
  ongoingFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: SPACING.md,
  },
  footerAction: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerActionText: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    marginLeft: 6,
  },
  footerDivider: {
    width: 1,
    backgroundColor: colors.divider,
  },
  completedCard: {
    backgroundColor: colors.card,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: SPACING.md,
    flexDirection: 'row',
    marginBottom: SPACING.md,
    ...SHADOW.sm,
  },
  completedDetails: {
    flex: 1,
  },
  completedHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  completedRightInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveredText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.bold,
    color: colors.success,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    marginTop: 4,
  },
  dateText: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.medium,
    color: colors.iconDefault,
    marginLeft: 4,
  },
  priceReorderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
  },
  reorderButton: {
    backgroundColor: colors.accentBg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  reorderText: {
    color: colors.accentText,
    fontSize: 12,
    fontFamily: FONT_FAMILY.bold,
  },
  premiumBanner: {
    marginHorizontal: SPACING.md,
    backgroundColor: colors.hygieneBoxBg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  premiumIconContainer: {
    backgroundColor: colors.accentBg,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  premiumTextContainer: {
    flex: 1,
  },
  premiumTitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    marginBottom: 2,
  },
  premiumSubtitle: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
    lineHeight: 16,
  },
  premiumButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.accentText,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.sm,
    marginLeft: SPACING.sm,
  },
  premiumButtonText: {
    color: colors.accentText,
    fontSize: 11,
    fontFamily: FONT_FAMILY.bold,
  },
  // Cart styles
  cartItemsContainer: {
    backgroundColor: colors.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: SPACING.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  itemInfo: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  vegIndicator: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    flexShrink: 0,
  },
  vegDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  itemThumb: {
    marginRight: SPACING.sm,
    flexShrink: 0,
  },
  itemThumbImage: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.sm,
  },
  itemThumbFallback: {
    backgroundColor: colors.sectionBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    marginBottom: 1,
  },
  itemSubPrice: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
  },
  itemPrice: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    marginRight: 4,
  },
  itemQtyBadge: {
    fontSize: 11,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
    minWidth: 20,
    textAlign: 'right',
  },
  miniDivider: {
    height: 1,
    backgroundColor: colors.divider,
    marginHorizontal: SPACING.xs,
  },
  cartSummaryStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  cartSummaryText: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.semibold,
    color: colors.text.subtitle,
  },
  viewCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.buttonBg,
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: BORDER_RADIUS.full,
  },
  viewCartText: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.bold,
    color: colors.bg,
  },
  emptyCartBox: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyCartTitle: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    marginTop: SPACING.md,
  },
  emptyCartSub: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default OrdersScreen;

