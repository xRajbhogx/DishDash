import React from 'react';
import { Pressable, StyleSheet, Text, View, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZE, FONT_FAMILY, FONT_WEIGHT } from '../theme/theme';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface ProfileMenuItemProps {
  icon: IoniconsName;
  label: string;
  /** Color for the icon; defaults to themeColors.iconDefault */
  iconColor?: string;
  /** Optional element rendered on the right (replaces chevron when provided) */
  rightElement?: React.ReactNode;
  /** Hide the trailing chevron even when no rightElement is passed */
  hideChevron?: boolean;
  onPress?: () => void;
  themeColors: ThemeColors;
  style?: StyleProp<ViewStyle>;
}

const ProfileMenuItem = ({
  icon,
  label,
  iconColor,
  rightElement,
  hideChevron = false,
  onPress,
  themeColors,
  style,
}: ProfileMenuItemProps): React.ReactElement => {
  const styles = React.useMemo(() => getStyles(themeColors), [themeColors]);

  return (
    <Pressable
      style={({ pressed }) => [styles.row, { opacity: pressed ? 0.7 : 1 }, style]}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={20}
        color={iconColor ?? themeColors.iconDefault}
        style={styles.icon}
      />
      <Text style={styles.label}>{label}</Text>
      {rightElement ?? (
        !hideChevron && (
          <Ionicons name="chevron-forward" size={18} color={themeColors.chevron} />
        )
      )}
    </Pressable>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: SPACING.md,
      paddingHorizontal: SPACING.md,
    },
    icon: {
      marginRight: SPACING.md,
    },
    label: {
      flex: 1,
      fontSize: FONT_SIZE.md,
      fontFamily: FONT_FAMILY.medium,
      fontWeight: FONT_WEIGHT.normal,
      color: colors.text.title,
    },
  });

export default ProfileMenuItem;
