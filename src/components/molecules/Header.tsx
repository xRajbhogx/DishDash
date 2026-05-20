import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { COLORS, FONT_SIZE, FONT_FAMILY, FONT_WEIGHT } from '../../theme/theme';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: HeaderProps): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/icon.png')}
        style={styles.logo}
      /> 
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: 80,
      height: 80,
      borderRadius: 20,
      marginBottom: 20,
    },
    headerText: {
      color: colors.text.title,
      fontSize: 32,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.extrabold,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.subtitle,
      fontFamily: FONT_FAMILY.regular,
      textAlign: 'center',
      paddingHorizontal: 20,
    },
  });

export default Header;
