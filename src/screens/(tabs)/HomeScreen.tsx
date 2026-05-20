import { StyleSheet, Text, View, useColorScheme, FlatList, Pressable, Switch, Image, useWindowDimensions } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import React, { useMemo } from 'react'
import RestaurantCard from '../../components/SmallRestuarantCard'
import FeaturedRestaurantCard from '../../components/FeaturedRestaurantCard'
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY, BORDER_RADIUS, SHADOW } from '../../theme/theme'
import { CATEGORIES_DATA, DUMMY_DATA, FEATURED_DATA } from '../../data/RestaurantCard'
type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const HomeScreen = (): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light' ) as ThemeMode;
  const themeColors = COLORS[theme];
  const {bottom} = useSafeAreaInsets();
  const styles = useMemo(() => getStyles(themeColors, bottom), [themeColors, bottom]);
  
  const { width } = useWindowDimensions();
  const columnWidth = useMemo(() => (width - SPACING.md * 3) / 2, [width]);

  const chunkedRecommended = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < DUMMY_DATA.length; i += 2) {
      chunks.push(DUMMY_DATA.slice(i, i + 2));
    }
    return chunks;
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.addressTitleRow}>
              <Ionicons name="location" size={28} color={themeColors.danger} />
              <Text style={styles.addressTitle}>Home</Text>
              <Ionicons name="chevron-down" size={20} color={themeColors.text.title} />
            </View>
            <Text style={styles.addressSubtitle} numberOfLines={1}>House-23, Sector-89, Dwarka, Del...</Text>
          </View>

          {/* Categories Horizontal List */}
          <View style={styles.categoriesSection}>
            <FlatList
              data={CATEGORIES_DATA}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.categoriesContent}
              renderItem={({ item }) => (
                <Pressable style={styles.categoryItem}>
                  <View style={styles.categoryImageWrapper}>
                    <Image 
                      source={typeof item.imageUrl === 'string' ? { uri: item.imageUrl } : item.imageUrl}
                      style={item.isSpecial ? styles.specialCategoryImage : styles.categoryImage} 
                    />
                  </View>
                  <Text style={[styles.categoryName, item.isSelected && styles.categoryNameSelected]}>
                    {item.name}
                  </Text>
                  {item.isSelected && <View style={styles.categoryIndicator} />}
                </Pressable>
              )}
            />
          </View>
        </View>

        <FlatList
          data={FEATURED_DATA}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={() => (
            <View>
              <View style={styles.filtersRow}>
                <Pressable style={({ pressed }) => [styles.filterPill, { opacity: pressed ? 0.7 : 1 }, SHADOW.sm]}>
                  <Ionicons name="options-outline" size={16} color={themeColors.text.title} />
                  <Text style={styles.filterPillText}>Filters</Text>
                  <Ionicons name="caret-down" size={12} color={themeColors.text.title} />
                </Pressable>

                <Pressable style={({ pressed }) => [styles.filterPill, { opacity: pressed ? 0.7 : 1 }, SHADOW.sm]}>
                  <Ionicons name="flash" size={16} color={themeColors.success} />
                  <Text style={styles.filterPillText}>Near & Fast</Text>
                </Pressable>

                <View style={styles.vegToggleContainer}>
                  <Text style={styles.vegText}>VEG</Text>
                  <Switch 
                    value={false}
                    onValueChange={() => {}}
                    trackColor={{ false: themeColors.switchTrack, true: themeColors.statusBadge }}
                    thumbColor={themeColors.iconOnDark}
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                  />
                </View>
              </View>

              <Text style={styles.headerTitle}>RECOMMENDED FOR YOU</Text>

              <FlatList
                data={chunkedRecommended}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => `col-${index}`}
                contentContainerStyle={styles.recommendedContent}
                renderItem={({ item: columnItems }) => (
                  <View style={styles.recommendedColumn}>
                    {columnItems.map((item) => (
                      <RestaurantCard 
                        key={item.id}
                        imageUrl={item.imageUrl}
                        rating={item.rating}
                        name={item.name}
                        deliveryTime={item.deliveryTime}
                        priceForOne={item.priceForOne}
                        offerText={item.offerText}
                        style={[styles.recommendedCard, { width: columnWidth }]}
                      />
                    ))}
                  </View>
                )}
              />

              <Text style={styles.featuredTitle}>78 RESTAURANTS DELIVERING TO YOU</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <FeaturedRestaurantCard
              imageUrl={item.imageUrl}
              name={item.name}
              rating={item.rating}
              reviewCount={item.reviewCount}
              deliveryTime={item.deliveryTime}
              priceForOne={item.priceForOne}
              offerText={item.offerText}
              isGold={item.isGold}
            />
          )}
        />
      </View>
    </SafeAreaView>
  )
}

const getStyles = (colors: ThemeColors, bottom: number) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingBottom: bottom
  },
  container: {
      flex: 1,
      paddingHorizontal: SPACING.md,
      paddingTop: SPACING.md,
  },
  headerContainer: {
  },
  addressContainer: {
    marginBottom: SPACING.md,
  },
  addressTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -4,
  },
  addressTitle: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.bold,
    fontWeight: FONT_WEIGHT.normal,
    color: colors.text.title,
    marginHorizontal: 4,
  },
  addressSubtitle: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.regular,
    color: colors.text.subtitle,
    marginTop: 2,
    marginLeft: 4, 
  },
  filtersRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    marginRight: SPACING.sm,
  },
  filterPillText: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.regular,
    fontWeight: FONT_WEIGHT.normal,
    color: colors.text.title,
    marginHorizontal: 4,
  },
  vegToggleContainer: {
    marginLeft: 'auto', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  vegText: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.bold,
    fontWeight: FONT_WEIGHT.extrabold,
    color: colors.text.title,
  },
  headerTitle: {
    color: colors.text.subtitle,
    fontSize: FONT_SIZE.sm, 
    fontFamily: FONT_FAMILY.bold,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 1.5,
    marginBottom: SPACING.md,
  },
  categoriesSection: {
    marginLeft: -SPACING.md,
    marginRight: -SPACING.md,
  },
  categoriesContent: {
    paddingHorizontal: SPACING.md,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  categoryImageWrapper: {
    marginBottom: SPACING.xs,
  },
  categoryImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    resizeMode: 'cover',
  },
  specialCategoryImage: {
    width: 64,
    height: 80,
    borderRadius: BORDER_RADIUS.sm,
    resizeMode: 'cover',
  },
  categoryName: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: '500',
    color: colors.text.title,
    marginBottom: 4,
  },
  categoryNameSelected: {
    fontFamily: FONT_FAMILY.bold,
    fontWeight: 'bold',
  },
  categoryIndicator: {
    width: '60%',
    height: 3,
    backgroundColor: colors.danger,
    borderRadius: 2,
  },
  listContent: {
    paddingBottom: SPACING.xl,
  },
  recommendedContent: {
    paddingBottom: SPACING.md,
  },
  recommendedColumn: {
    marginRight: SPACING.md,
    gap: SPACING.md,
  },
  recommendedCard: {
    marginBottom: 0,
  },
  featuredTitle: {
    color: colors.text.subtitle,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.regular,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
});

export default HomeScreen