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
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import { useAuth } from '../../context/AuthContext';
import SocialButton from '../../components/atoms/SocialButton';
import Button from '../../components/molecules/Button';
import Header from '../../components/molecules/Header';
import InputField from '../../components/molecules/InputField';
import { COLORS, SPACING } from '../../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const LoginScreen = ({ navigation }: Props): React.ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login } = useAuth();
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  const handleLogin = async (): Promise<void> => {
    const success = await login(email, password);
    if (success) {
      alert('Login Successful!!');
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerWrapper}>
            <Header
              title="Sign In"
              subtitle="Let's experience the joy of telecare AI."
            />
          </View>

          <View style={styles.inputWrapper}>
            <InputField
              title="Email Address"
              placeHolder="elementary221b@gmail.com"
              icon="mail"
              value={email}
              onChangeText={setEmail}
            />
            <InputField
              title="Password"
              placeHolder="Enter your password..."
              icon="lock"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button 
              title="Sign In"
              handlePress={handleLogin}
            />
          </View>

          <View style={styles.socialWrapper}>
            <SocialButton icon="facebook-f" />
            <SocialButton icon="google" />
            <SocialButton icon="instagram" />
          </View>

          <View style={styles.footerWrapper}>
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.accentText}>
                  Sign Up.
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
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
      alignItems: 'center',
      paddingBottom: SPACING.xl,
    },
    headerWrapper: {
      paddingTop: 40,
      marginBottom: 50,
      width: '100%',
    },
    inputWrapper: {
      gap: 20,
      width: '100%',
    },
    buttonWrapper: {
      width: '100%',
      marginTop: 25,
    },
    socialWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 15,
      paddingTop: 35,
    },
    footerWrapper: {
      alignItems: 'center',
      paddingTop: 35,
      gap: 10,
    },
    footerRow: {
      flexDirection: 'row',
    },
    footerText: {
      color: colors.text.subtitle,
    },
    accentText: {
      color: colors.buttonBg,
      fontWeight: '600',
    },
    forgotText: {
      color: colors.buttonBg,
      textDecorationLine: 'underline',
    },
  });

export default LoginScreen;
