import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { COLORS, BORDER_RADIUS } from '../../theme/theme';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

interface InputProps {
  title: string;
  placeHolder: string;
  icon: React.ComponentProps<typeof Feather>['name'];
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const InputField = ({ title, placeHolder, icon, value, onChangeText, secureTextEntry }: InputProps): React.ReactElement => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors, isFocused), [themeColors, isFocused]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <View style={styles.inputWrapper}>
        <Feather name={icon} size={18} color={themeColors.text.subtitle} />
        <TextInput
          placeholder={placeHolder}
          placeholderTextColor={themeColors.text.input}
          style={styles.textInput}
          keyboardType={icon === 'mail' ? 'email-address' : 'default'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

const getStyles = (colors: ThemeColors, isFocused: boolean) =>
  StyleSheet.create({
    container: {
      gap: 5,
      paddingHorizontal: 25,
      width: '100%',
    },
    titleText: {
      color: colors.text.title,
      fontWeight: '600',
      marginLeft: 4,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      paddingHorizontal: 15,
      paddingVertical: 12,
      gap: 10,
      borderRadius: BORDER_RADIUS.md,
      elevation: 4,
      borderWidth: 2,
      borderColor: isFocused ? colors.buttonBg : colors.border,
      shadowColor: isFocused ? colors.buttonBg : colors.text.title,
      shadowOpacity: 0.1,
      shadowRadius: 4,
      shadowOffset: {
        height: 2,
        width: 0,
      },
    },
    textInput: {
      flex: 1,
      color: colors.text.title,
      paddingVertical: 0, // resets default OS padding
    },
  });

export default InputField;
