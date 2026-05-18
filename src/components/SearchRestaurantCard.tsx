import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Image, useColorScheme, Pressable } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_FAMILY, SHADOW } from '../theme/theme';
import { RestaurantCardProps } from '../constants/RestaurantCard';

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
        <View style={[styles.hygieneBadgeOverlapping, SHADOW.sm]}>
          <MaterialCommunityIcons name="shield-check-outline" size={16} color="#FF7A00" />
        </View>
      </View>

      {/* Middle side Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText} numberOfLines={1}>{name}</Text>
        <Text style={styles.tagsText} numberOfLines={1}>{tags}</Text>
        
        {/* Rating and Reviews */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={10} color="#FFFFFF" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.reviewCountText}>({reviewCount})</Text>
        </View>

        {/* Price and Delivery */}
        <View style={styles.priceDeliveryRow}>
          <Text style={styles.priceText}>{priceForOne}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Ionicons name="flash" size={14} color="#1E824C" />
          <Text style={styles.deliveryText}>{deliveryTime}</Text>
        </View>
      </View>

      {/* Right side Hygiene Box */}
      <View style={styles.rightBadgeContainer}>
        <View style={styles.hygieneBox}>
          <MaterialCommunityIcons name="shield-check-outline" size={20} color="#FF7A00" />
          <Text style={styles.hygieneBoxText}>Hygiene</Text>
          <Text style={styles.hygieneBoxText}>Certified</Text>
        </View>
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
    borderBottomColor: '#F2F2F2',
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
  hygieneBadgeOverlapping: {
    position: 'absolute',
    bottom: -6,
    left: -6,
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#1E824C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  ratingText: {
    color: '#FFFFFF',
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
  },
  hygieneBox: {
    backgroundColor: '#FFF8F5',
    borderWidth: 1,
    borderColor: '#FFE0D1',
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
  },
  hygieneBoxText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.medium,
    color: '#333333',
    textAlign: 'center',
    marginTop: 2,
  }
});

export default SearchRestaurantCard;