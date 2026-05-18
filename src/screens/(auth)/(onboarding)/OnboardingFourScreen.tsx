import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, BORDER_RADIUS } from '../../../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingFour'>;

const OnboardingFourScreen = ({ navigation }: Props): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding Four</Text>
      <Pressable
        onPress={() => navigation.replace('Tabs')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.light.bg,
    padding: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.light.text.title,
    marginBottom: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.light.tabBar.activePill,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: BORDER_RADIUS.md,
  },
  buttonText: {
    color: COLORS.light.bg,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.semibold,
  },
});

export default OnboardingFourScreen;
