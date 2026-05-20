import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Image, useColorScheme, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_FAMILY, SHADOW } from '../theme/theme';
import { RestaurantCardProps } from '../data/RestaurantCard';
import HygieneBadge from './HygieneBadge';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const SearchRestaurantCard = ({
  imageUrl,
  name,
  rating,
  reviewCount = '2.1k+',
  deliveryTime,
  tags = 'North Indian • Thali • Healthy',
  priceForOne = '₹150 for one',
  style,
}: RestaurantCardProps): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  return (
    <Pressable style={({ pressed }) => [styles.container, style, { opacity: pressed ? 0.9 : 1 }]}>
      {/* Left side Image container */}
      <View style={styles.imageWrapper}>
        <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.image} />
        {/* Hygiene Badge Overlapping */}
        <HygieneBadge variant="overlay-icon" style={{ position: 'absolute', bottom: -6, left: -6 }} />
      </View>

      {/* Middle side Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
        <Text style={styles.tagsText} numberOfLines={1}>{tags}</Text>
        
        {/* Rating and Reviews */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={10} color={themeColors.iconOnDark} />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.reviewCountText}>({reviewCount})</Text>
        </View>

        {/* Price and Delivery */}
        <View style={styles.priceDeliveryRow}>
          <Text style={styles.priceText}>{priceForOne}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Ionicons name="flash" size={14} color={themeColors.success} />
          <Text style={styles.deliveryText}>{deliveryTime}</Text>
        </View>
      </View>

      {/* Right side Hygiene Box */}
      <View style={styles.rightBadgeContainer}>
        <HygieneBadge variant="box" />
      </View>
    </Pressable>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    alignItems: 'center',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
    marginRight: SPACING.lg,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.md,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: FONT_SIZE.md,
    fontFamily: FONT_FAMILY.bold,
    color: colors.text.title,
    marginBottom: 4,
  },
  tagsText: {
    fontSize: FONT_SIZE.sm,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
    marginBottom: SPACING.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.ratingBg,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    color: colors.ratingText,
    fontSize: 12,
    fontFamily: FONT_FAMILY.bold,
    marginLeft: 2,
  },
  reviewCountText: {
    fontSize: 12,
    color: colors.text.subtitle,
    fontFamily: FONT_FAMILY.medium,
    marginLeft: 6,
  },
  priceDeliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
  },
  dotSeparator: {
    fontSize: 12,
    color: colors.text.subtitle,
    marginHorizontal: 6,
  },
  deliveryText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.medium,
    color: colors.text.subtitle,
    marginLeft: 2,
  },
  rightBadgeContainer: {
    marginLeft: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SearchRestaurantCard;