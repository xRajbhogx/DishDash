import React from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, FONT_FAMILY, FONT_WEIGHT, BORDER_RADIUS } from '../theme/theme';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface ProfileStatCardProps {
  icon: IoniconsName;
  value: string;
  label: string;
  themeColors: ThemeColors;
  style?: StyleProp<ViewStyle>;
}

const ProfileStatCard = ({
  icon,
  value,
  label,
  themeColors,
  style,
}: ProfileStatCardProps): React.ReactElement => {
  const styles = React.useMemo(() => getStyles(themeColors), [themeColors]);

  return (
    <View style={[styles.container, style]}>
      <Ionicons name={icon} size={18} color={themeColors.themedIcon} style={styles.icon} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: SPACING.md,
    },
    icon: {
      marginBottom: SPACING.xs,
    },
    value: {
      fontSize: FONT_SIZE.lg,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.text.title,
      marginBottom: 2,
    },
    label: {
      fontSize: FONT_SIZE.sm,
      fontFamily: FONT_FAMILY.medium,
      fontWeight: FONT_WEIGHT.normal,
      color: colors.text.subtitle,
    },
  });

export default ProfileStatCard;
