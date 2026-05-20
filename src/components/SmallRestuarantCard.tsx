import React, { useMemo } from 'react';
import { StyleSheet, Text, View, Image, useColorScheme, StyleProp, ViewStyle, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, FONT_FAMILY, SHADOW } from '../theme/theme';
import { RestaurantCardProps } from '../data/RestaurantCard';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];


export const RestaurantCard = ({
  imageUrl,
  rating,
  name,
  deliveryTime,
  offerText,
  style,
}: RestaurantCardProps): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  return (
    <View style={[styles.container, style, SHADOW.md]}>
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl} style={styles.image} />
          {!!offerText && (
            <View style={styles.offerBadge}>
              <Text style={styles.offerText} numberOfLines={1} adjustsFontSizeToFit>{offerText}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.ratingPill}>
          <Ionicons name="star" size={FONT_SIZE.sm} color={themeColors.iconOnDark} />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.nameText} numberOfLines={1} adjustsFontSizeToFit>
          {name}
        </Text>
        <View style={styles.deliveryRow}>
          <Ionicons name="flash-sharp" size={FONT_SIZE.md} color={themeColors.success} />
          <Text style={styles.deliveryText} numberOfLines={1} adjustsFontSizeToFit>{deliveryTime}</Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.accentBg,
      borderRadius: BORDER_RADIUS.md,
      marginBottom: SPACING.xs,
      overflow: 'hidden',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
    },
    imageWrapper: {
      width: '100%',
      aspectRatio: 1.2, // Landscape ratio to make it look less bulky
      borderTopLeftRadius: BORDER_RADIUS.md,
      borderTopRightRadius: BORDER_RADIUS.md,
      overflow: 'hidden',
      padding: 10,
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    offerBadge: {
      position: 'absolute',
      top: 10,
      left: 0,
      backgroundColor: colors.offerBadgeBg,
      paddingHorizontal: SPACING.sm,
      paddingVertical: 4,
      borderTopRightRadius: BORDER_RADIUS.md,
      borderBottomRightRadius: BORDER_RADIUS.md,
      maxWidth: '90%',
    },
    offerText: {
      color: colors.iconOnDark,
      fontSize: FONT_SIZE.sm,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.bold,
    },
    ratingPill: {
      position: 'absolute',
      bottom: -10, // Overlaps bottom edge
      left: SPACING.xs,
      backgroundColor: colors.ratingBg,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: BORDER_RADIUS.full,
      borderWidth: 2,
      borderColor: colors.bg,
      zIndex: 10,
    },
    ratingText: {
      color: colors.ratingText,
      fontSize: 10,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.bold,
      marginLeft: 2,
    },
    infoContainer: {
      marginTop: 12, // Space for rating pill
      paddingHorizontal: SPACING.sm,
      paddingBottom: SPACING.xs,
      justifyContent: 'center',
    },
    nameText: {
      color: colors.text.title,
      fontSize: 13,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.bold,
      marginBottom: 2,
    },
    deliveryRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    deliveryText: {
      color: colors.success,
      fontSize: 10,
      fontFamily: FONT_FAMILY.semibold,
      fontWeight: FONT_WEIGHT.semibold,
      marginLeft: 2,
    },
  });

export default RestaurantCard;