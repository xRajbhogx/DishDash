import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { COLORS, BORDER_RADIUS, SHADOW } from '../../theme/theme';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

interface MethodCardProps {
  title: string;
  subtitle: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  isSelected: boolean;
  onPress: () => void;
}

const ForgotMethod = ({ title, subtitle, icon, isSelected, onPress }: MethodCardProps): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors, isSelected), [themeColors, isSelected]);

  return (
    <TouchableOpacity 
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Feather name={icon} size={20} color={isSelected ? themeColors.buttonBg : themeColors.text.subtitle} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (colors: ThemeColors, isSelected: boolean) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderRadius: BORDER_RADIUS.xl,
      backgroundColor: colors.card,
      elevation: 2,
      shadowColor: colors.text.title,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      gap: 15,
      borderWidth: 2,
      borderColor: isSelected ? colors.buttonBg : colors.border,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: BORDER_RADIUS.md,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isSelected ? colors.avatar : colors.sectionBg,
    },
    textContainer: {
      flex: 1,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: colors.text.title,
      marginBottom: 4,
    },
    cardSubtitle: {
      fontSize: 14,
      color: colors.text.subtitle,
    },
  });

export default ForgotMethod;
