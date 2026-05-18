import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Image, useColorScheme, Pressable, ImageSourcePropType } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY, SHADOW } from '../theme/theme';
import { RestaurantCardProps } from '../constants/RestaurantCard';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];


export const FeaturedRestaurantCard = ({
  imageUrl,
  name,
  rating,
  reviewCount,
  deliveryTime,
  offerText,
  isGold,
}: RestaurantCardProps): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  return (
    <Pressable style={({ pressed }) => [styles.container, SHADOW.sm, { opacity: pressed ? 0.95 : 1 }]}>
      <View style={styles.imageContainer}>
        <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.image} />
        
        <Pressable style={styles.bookmarkButton}>
          <Ionicons name="bookmark-outline" size={24} color="#FFFFFF" />
        </Pressable>

        {isGold && (
          <View style={styles.goldBanner}>
            <Text style={styles.goldBannerText}>Free delivery with Gold</Text>
          </View>
        )}
        
        {/* Placeholder for Page Indicators */}
        <View style={styles.pageIndicators}>
           <View style={[styles.dot, styles.activeDot]} />
           <View style={styles.dot} />
           <View style={styles.dot} />
           <View style={styles.dot} />
           <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.ratingPill}>
              <Ionicons name="star" size={12} color="#FFFFFF" />
              <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.reviewCountText}>By {reviewCount}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="flash" size={18} color="#1E824C" />
          <Text style={styles.deliveryText}>{deliveryTime}</Text>
        </View>

        <View style={styles.offerRow}>
          <MaterialCommunityIcons name="brightness-percent" size={18} color="#1C64F2" />
          <Text style={styles.offerText}>{offerText}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  imageContainer: {
    width: '100%',
    height: 220,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bookmarkButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    zIndex: 10,
  },
  goldBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#1C64F2', 
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  goldBannerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: FONT_FAMILY.bold,
    fontWeight: 'bold',
  },
  pageIndicators: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginLeft: 4,
  },
  activeDot: {
    width: 16,
    backgroundColor: '#FFFFFF',
  },
  detailsContainer: {
    padding: SPACING.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  nameText: {
    fontSize: FONT_SIZE.xxl,
    fontFamily: FONT_FAMILY.bold,
    fontWeight: 'bold',
    color: colors.text.title,
    flex: 1,
  },
  ratingContainer: {
    alignItems: 'flex-end',
    marginLeft: SPACING.md,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E824C',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: FONT_FAMILY.bold,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  reviewCountText: {
    fontSize: 10,
    color: colors.text.subtitle,
    marginTop: 2,
    fontFamily: FONT_FAMILY.medium,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  deliveryText: {
    color: '#1E824C',
    fontSize: 14,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: '500',
    marginLeft: 4,
  },
  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerText: {
    color: colors.text.subtitle,
    fontSize: 14,
    fontFamily: FONT_FAMILY.medium,
    fontWeight: '500',
    marginLeft: 6,
  }
});

export default FeaturedRestaurantCard;
