import { StyleSheet, Text, View, useColorScheme, FlatList, Pressable, Switch, Image } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import React, { useMemo } from 'react'
import RestaurantCard from '../../components/SmallRestuarantCard'
import FeaturedRestaurantCard from '../../components/FeaturedRestaurantCard'
import { COLORS, SPACING, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY, BORDER_RADIUS, SHADOW } from '../../theme/theme'
import { CATEGORIES_DATA, DUMMY_DATA, FEATURED_DATA } from '../../constants/RestaurantCard'
type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];



const HomeScreen = (): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light' ) as ThemeMode;
  const themeColors = COLORS[theme];
  const {bottom} = useSafeAreaInsets();
  const styles = useMemo(() => getStyles(themeColors, bottom), [themeColors, bottom]);

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
            <Text style={styles.addressSubtitle} numberOfLines={1}>REMOVED</Text>
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
                      source={item.imageUrl} 
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
          data={DUMMY_DATA}
          keyExtractor={(item) => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
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
            </View>
          )}
          renderItem={({ item }) => (
            <RestaurantCard 
              imageUrl={item.imageUrl}
              rating={item.rating}
              name={item.name}
              deliveryTime={item.deliveryTime}
              offerText={item.offerText}
              style={styles.card}
            />
          )}
          ListFooterComponent={() => (
            <View style={styles.featuredSection}>
              <Text style={styles.featuredTitle}>78 RESTAURANTS DELIVERING TO YOU</Text>
              {/* <Text style={styles.featuredSubtitle}>Featured</Text> */}
              
              {FEATURED_DATA.map((item) => (
                <FeaturedRestaurantCard
                  key={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  rating={item.rating}
                  reviewCount={item.reviewCount}
                  deliveryTime={item.deliveryTime}
                  offerText={item.offerText}
                  isGold={item.isGold}
                />
              ))}
            </View>
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
      paddingTop: SPACING.md, // reduced slightly to fit everything nicely
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
    marginLeft: -SPACING.md, // Make list bleed to edges
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
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: SPACING.sm, // spacing between rows
  },
  card: {
    flex: 1,
    marginHorizontal: SPACING.xs, // small gap between columns
  },
  featuredSection: {
    marginTop: SPACING.lg,
    paddingTop: SPACING.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  featuredTitle: {
    color: colors.text.subtitle,
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.regular,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: SPACING.md,
  },
  featuredSubtitle: {
    color: colors.text.subtitle,
    fontSize: FONT_SIZE.lg,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: '500',
    marginBottom: SPACING.lg,
  },
});

export default HomeScreen