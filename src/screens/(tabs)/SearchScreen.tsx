import React, { useMemo } from 'react';
import { StyleSheet, View, Text, ScrollView, TextInput, Pressable, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import SearchRestaurantCard from '../../components/SearchRestaurantCard';
import { COLORS, SPACING, FONT_SIZE, FONT_FAMILY, BORDER_RADIUS, SHADOW } from '../../theme/theme';
import { IMAGES } from '../../constants/images';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

import { POPULAR_SEARCHES, RECENT_SEARCHES, RECOMMENDED_RESULTS } from '../../constants/SearchData';

const SearchScreen = (): React.ReactElement => {
  const { top, bottom } = useSafeAreaInsets();
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: bottom + SPACING.xxl + 80 }} 
      >
        
        {/* Header Section (No Back Arrow) */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerTitle}>Search</Text>
            <Text style={styles.headerSubtitle}>Find certified restaurants and cuisines</Text>
          </View>
          <Pressable style={styles.filterButton}>
            <Feather name="sliders" size={20} color={themeColors.text.title} />
          </Pressable>
        </View>

        {/* Search Input */}
        <View style={[styles.searchInputContainer, SHADOW.md]}>
          <Ionicons name="search-outline" size={20} color="#777" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search for restaurants, cuisines or dishes"
            placeholderTextColor="#999"
          />
          <Ionicons name="mic-outline" size={20} color="#777" />
        </View>

        {/* Popular Searches */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {POPULAR_SEARCHES.map((item, index) => (
              <Pressable key={item.id} style={[styles.popularChip, index === 0 && { marginLeft: SPACING.md }]}>
                {item.type === 'emoji' ? (
                  <Text style={styles.popularChipIconText}>{item.icon}</Text>
                ) : (
                  <Ionicons name={item.icon as any} size={16} color={themeColors.text.title} style={styles.popularChipIconVec} />
                )}
                <Text style={styles.popularChipText}>{item.name}</Text>
              </Pressable>
            ))}
            {/* Added padding right for scroll view by appending a spacer */}
            <View style={{ width: SPACING.md }} />
          </ScrollView>
        </View>

        {/* Recent Searches */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitleInline}>Recent Searches</Text>
            <Pressable hitSlop={10}>
              <Text style={styles.clearAllText}>Clear All</Text>
            </Pressable>
          </View>
          
          <View style={styles.recentList}>
            {RECENT_SEARCHES.map((item) => (
              <View key={item.id} style={styles.recentItem}>
                <Ionicons name="time-outline" size={20} color="#666" style={styles.recentIcon} />
                <View style={styles.recentTextContainer}>
                  <Text style={styles.recentName}>{item.name}</Text>
                  <Text style={styles.recentSubtitle}>{item.subtitle}</Text>
                </View>
                <Pressable hitSlop={10}>
                  <Ionicons name="close-outline" size={20} color="#999" />
                </Pressable>
              </View>
            ))}
          </View>
        </View>

        {/* Recommended for you */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitleInline}>Recommended for you</Text>
            <Pressable hitSlop={10}>
              <Text style={styles.clearAllText}>See all</Text>
            </Pressable>
          </View>

          <View style={styles.recommendedList}>
             {RECOMMENDED_RESULTS.map((item) => (
                <SearchRestaurantCard 
                  key={item.id}
                  imageUrl={item.imageUrl}
                  name={item.name}
                  rating={item.rating}
                  deliveryTime={item.deliveryTime}
                  reviewCount={item.reviewCount}
                  tags={item.tags}
                  priceForOne={item.priceForOne}
                />
             ))}
          </View>
        </View>

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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF5EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.md,
    height: 48,
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.medium,
    fontSize: FONT_SIZE.sm,
    color: colors.text.title,
  },
  sectionContainer: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  sectionTitleInline: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
  },
  popularChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    marginRight: SPACING.sm,
    backgroundColor: colors.tabBar.activePill,
    opacity: 0.89,
  },
  popularChipIconText: {
    fontSize: 16,
    marginRight: 6,
  },
  popularChipIconVec: {
    marginRight: 6,
  },
  popularChipText: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.semibold,
    color: colors.text.title,
  },
  clearAllText: {
    color: '#FF7A00',
    fontSize: 13,
    fontFamily: FONT_FAMILY.medium,
  },
  recentList: {
    paddingHorizontal: SPACING.md,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  recentIcon: {
    marginRight: SPACING.md,
  },
  recentTextContainer: {
    flex: 1,
  },
  recentName: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.semibold,
    color: colors.text.title,
    marginBottom: 2,
  },
  recentSubtitle: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
  },
  recommendedList: {
    // Empty for now, padding is handled in the card
  }
});

export default SearchScreen;
