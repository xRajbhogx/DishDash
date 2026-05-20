import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { COLORS, BORDER_RADIUS } from '../../theme/theme';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

interface ButtonProp {
  title: string;
  handlePress: () => void;
}

const Button = ({ title, handlePress }: ButtonProp): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity 
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Text style={styles.text}>{title}</Text>
        <FontAwesome6 name="arrow-right-long" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    wrapper: {
      width: '100%',
      paddingHorizontal: 25,
      justifyContent: 'center',
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: colors.buttonBg,
      paddingHorizontal: 20,
      paddingVertical: 15,
      gap: 10,
      borderRadius: BORDER_RADIUS.lg,
      elevation: 5,
      shadowColor: colors.buttonBg,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.4,
      shadowRadius: 5,
    },
    text: {
      color: 'white',
      fontWeight: '600',
      fontSize: 16,
    },
  });

export default Button;
