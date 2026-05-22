import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { ONBOARDING_SPLASH } from '../../../data/OnboardingData';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = ({ navigation }: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ONBOARDING_SPLASH.title}</Text>
      <Text style={styles.subtitle}>{ONBOARDING_SPLASH.subtitle}</Text>
      <Pressable
        onPress={() => navigation.replace('Login')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{ONBOARDING_SPLASH.ctaLabel}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#111827',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
