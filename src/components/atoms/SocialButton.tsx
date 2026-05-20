import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS, BORDER_RADIUS } from '../../theme/theme';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

interface SocialButtonProp {
  icon: 'facebook-f' | 'google' | 'instagram';
}

const SocialButton = ({ icon }: SocialButtonProp): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  const handlePress = (): void => {
    alert(icon === 'facebook-f' ? 'facebook pressed!' : `${icon} pressed!`);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <FontAwesome6 name={icon} size={18} color={themeColors.text.title} />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.card,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: BORDER_RADIUS.md,
    },
  });

export default SocialButton;
