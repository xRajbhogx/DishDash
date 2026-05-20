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
import Button from '../../components/molecules/Button';
import Header from '../../components/molecules/Header';
import InputField from '../../components/molecules/InputField';
import { COLORS, SPACING } from '../../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;
type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const RegisterScreen = ({ navigation }: Props): React.ReactElement => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const { signUp } = useAuth();
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  const handleSignUp = async (): Promise<void> => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const success = await signUp(email, password);
    if (success) {
      alert('Sign Up successful !');
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
              title="Sign Up For Free"
              subtitle="Sign up in 1 minute for free!"
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
              placeHolder="*****************"
              icon="lock"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <InputField
              title="Password Confirmation"
              placeHolder="*****************"
              icon="lock"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
          </View>

          <View style={styles.buttonWrapper}>
            <Button 
              title="Sign Up"
              handlePress={handleSignUp}
            />
          </View>

          <View style={styles.footerWrapper}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.accentText}>
                Sign In.
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
    footerWrapper: {
      flexDirection: 'row',
      padding: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerText: {
      color: colors.text.subtitle,
    },
    accentText: {
      color: colors.buttonBg,
      fontWeight: '600',
    },
  });

export default RegisterScreen;
