import React, { useState, useMemo } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import Button from '../../components/molecules/Button';
import ForgotMethod from '../../components/molecules/ForgotMethod';
import { COLORS, SPACING, BORDER_RADIUS } from '../../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;
type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const ForgotPasswordScreen = ({ navigation }: Props): React.ReactElement => {
  const [selectedMethod, setSelectedMethod] = useState<string>('2fa');
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  const handleReset = (): void => {
    alert('Password reset successfully!');
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.watermarkContainer}>
        <MaterialIcons name="lock" size={200} color={theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.02)'} />
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Feather name="chevron-left" size={24} color={themeColors.text.title} />
          </TouchableOpacity>

          <View style={styles.headerWrapper}>
            <Text style={styles.headerText}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Select which methods you'd like to reset.
            </Text>
          </View>

          <View style={styles.methodsContainer}>
            <ForgotMethod
              title="Email Address"
              subtitle="Send via email address securely."
              icon="mail"
              isSelected={selectedMethod === 'email'}
              onPress={() => setSelectedMethod('email')}
            />
            <ForgotMethod
              title="2 Factor Authentication"
              subtitle="Send via 2FA securely."
              icon="smartphone"
              isSelected={selectedMethod === '2fa'}
              onPress={() => setSelectedMethod('2fa')}
            />
            <ForgotMethod
              title="Google Authenticator"
              subtitle="Send via authenticator securely."
              icon="lock"
              isSelected={selectedMethod === 'auth'}
              onPress={() => setSelectedMethod('auth')}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button 
              title="Reset Password" 
              handlePress={handleReset}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    safeContainer: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    container: {
      flex: 1,
      width: '100%',
    },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 25,
      paddingBottom: SPACING.xl,
    },
    backButton: {
      width: 50,
      height: 50,
      borderRadius: BORDER_RADIUS.md,
      backgroundColor: colors.sectionBg,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    headerWrapper: {
      marginTop: 30,
      marginBottom: 30,
    },
    headerText: {
      color: colors.text.title,
      fontSize: 32,
      fontWeight: '900',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      color: colors.text.subtitle,
    },
    methodsContainer: {
      gap: 15,
      width: '100%',
    },
    buttonWrapper: {
      width: '100%',
      marginTop: 30,
    },
    watermarkContainer: {
      position: 'absolute',
      bottom: -50,
      left: -30,
      zIndex: 0,
    },
  });

export default ForgotPasswordScreen;
