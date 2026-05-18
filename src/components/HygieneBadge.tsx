import React from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp, useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, FONT_FAMILY, SHADOW } from '../theme/theme';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

interface HygieneBadgeProps {
  variant?: 'overlay-icon' | 'overlay-text' | 'box';
  style?: StyleProp<ViewStyle>;
}

export const HygieneBadge = ({ variant = 'overlay-text', style }: HygieneBadgeProps) => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = React.useMemo(() => getStyles(themeColors), [themeColors]);

  if (variant === 'overlay-icon') {
    return (
      <View style={[styles.overlayIcon, SHADOW.sm, style]}>
        <MaterialCommunityIcons name="shield-check-outline" size={16} color={themeColors.themedIcon} />
      </View>
    );
  }

  if (variant === 'box') {
    return (
      <View style={[styles.box, style]}>
        <MaterialCommunityIcons name="shield-check-outline" size={20} color={themeColors.themedIcon} />
        <Text style={styles.boxText}>Hygiene</Text>
        <Text style={styles.boxText}>Certified</Text>
      </View>
    );
  }

  // default: overlay-text
  return (
    <View style={[styles.overlayText, SHADOW.sm, style]}>
      <MaterialCommunityIcons name="shield-check-outline" size={14} color={themeColors.themedIcon} />
      <View style={styles.overlayTextContainer}>
        <Text style={styles.overlaySmallText}>Hygiene</Text>
        <Text style={styles.overlaySmallText}>Certified</Text>
      </View>
    </View>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  overlayIcon: {
    backgroundColor: colors.hygieneBg,
    padding: 4,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    backgroundColor: colors.hygieneBg,
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  overlayTextContainer: {
    marginLeft: 2,
  },
  overlaySmallText: {
    fontSize: 7,
    fontFamily: FONT_FAMILY.bold,
    color: colors.hygieneText,
    lineHeight: 9,
  },
  box: {
    backgroundColor: colors.hygieneBoxBg,
    borderWidth: 1,
    borderColor: colors.accentBorder,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
  },
  boxText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.medium,
    color: colors.hygieneText,
    textAlign: 'center',
    marginTop: 2,
  }
});

export default HygieneBadge;
