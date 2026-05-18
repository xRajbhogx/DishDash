import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, BORDER_RADIUS, SHADOW } from '../../../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingTwo'>;
type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const FEATURES: { id: string; icon: IconName; title: string; subtitle: string }[] = [
  {
    id: '1',
    icon: 'shield-check-outline',
    title: 'Hygiene Certified',
    subtitle: 'Verified clean kitchens and safe practices',
  },
  {
    id: '2',
    icon: 'clipboard-check-outline',
    title: 'Regular Inspections',
    subtitle: 'Routine quality and hygiene checks',
  },
  {
    id: '3',
    icon: 'medal-outline',
    title: 'Only the Best',
    subtitle: 'Carefully selected restaurants, always',
  },
];

const OnboardingTwoScreen = ({ navigation }: Props): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = React.useMemo(() => getStyles(themeColors), [themeColors]);

  const { height, width } = useWindowDimensions();
  const translateY = useSharedValue(height);
  const translateX = useSharedValue(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (Math.abs(translateX.value) > 0) {
        // Coming back from OnboardingThree
        translateX.value = withTiming(0, { duration: 600 });
      } else {
        // Coming from OnboardingOne
        translateY.value = height;
        translateY.value = withTiming(0, { duration: 600 });
      }
    });
    return unsubscribe;
  }, [navigation, height]);

  const animatedScreenStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
    };
  });

  const handleNext = () => {
    translateX.value = withTiming(-width, { duration: 600 });
    setTimeout(() => {
      navigation.navigate('OnboardingThree');
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Animated.View style={[styles.content, animatedScreenStyle]}>
        
        <View style={styles.mainContent}>
          <View style={styles.topSection}>
            <Animated.View style={styles.topIconWrapper} entering={FadeInDown.duration(600).delay(100)}>
              <View style={[StyleSheet.absoluteFill, styles.topIconBackground]} />
              <MaterialCommunityIcons 
                name="storefront-outline" 
                size={40} 
                color={themeColors.tabBar.activePill} 
              />
            </Animated.View>
            <Animated.Text style={styles.titleText} entering={FadeInDown.duration(600).delay(200)}>
              Certified for{'\n'}your confidence
            </Animated.Text>
            <Animated.Text style={styles.subtitleText} entering={FadeInDown.duration(600).delay(300)}>
              We partner only with restaurants that meet our strict hygiene and quality standards.
            </Animated.Text>
          </View>

          <Animated.View style={styles.cardContainer} entering={FadeInDown.duration(600).delay(400)}>
            {FEATURES.map((item, index) => (
              <View key={item.id}>
                <View style={styles.featureRow}>
                  <View style={styles.iconWrapper}>
                    <View style={[StyleSheet.absoluteFill, styles.iconBackground]} />
                    <MaterialCommunityIcons 
                      name={item.icon} 
                      size={24} 
                      color={themeColors.tabBar.activePill} 
                    />
                  </View>
                  <View style={styles.featureTextContainer}>
                    <Text style={styles.featureTitle}>{item.title}</Text>
                    <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                {index < FEATURES.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </Animated.View>
        </View>

        <Animated.View style={styles.bottomSection} entering={FadeInUp.duration(600).delay(600)}>
          <Pressable 
            onPress={() => navigation.navigate('Tabs')}
            hitSlop={8}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>

          <View style={styles.pagination}>
            {[0, 1, 2].map((index) => (
              <View 
                key={index} 
                style={[
                  styles.dot, 
                  index === 1 && styles.activeDot
                ]} 
              />
            ))}
          </View>

          <Pressable 
            onPress={handleNext} 
            style={styles.nextButton}
          >
            <AntDesign name="arrow-right" size={24} color={themeColors.bg} />
          </Pressable>
        </Animated.View>

      </Animated.View>
    </SafeAreaView>
  );
};

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
  },
  topSection: {
    marginTop: SPACING.xl,
  },
  topIconWrapper: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  topIconBackground: {
    backgroundColor: colors.tabBar.activePill,
    opacity: 0.12,
    borderRadius: BORDER_RADIUS.full,
  },
  titleText: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.extrabold,
    color: colors.text.title,
    lineHeight: FONT_SIZE.xxxl * 1.2,
    marginBottom: SPACING.md,
  },
  subtitleText: {
    fontSize: FONT_SIZE.md,
    color: colors.text.subtitle,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: FONT_SIZE.md * 1.5,
  },
  cardContainer: {
    backgroundColor: colors.bg,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginTop: SPACING.xl,
    ...SHADOW.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  iconBackground: {
    backgroundColor: colors.tabBar.activePill,
    opacity: 0.12,
    borderRadius: BORDER_RADIUS.full,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: FONT_SIZE.md + 2,
    fontWeight: FONT_WEIGHT.bold,
    color: colors.text.title,
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: FONT_SIZE.sm + 1,
    color: colors.text.subtitle,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: (FONT_SIZE.sm + 1) * 1.4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.text.input,
    opacity: 0.1,
    marginVertical: SPACING.xs,
    marginLeft: 52 + SPACING.md,
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  skipButton: {
    width: 56, // to balance the next button width for flex spacing
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  skipText: {
    fontSize: FONT_SIZE.md,
    color: colors.text.title,
    fontWeight: FONT_WEIGHT.medium,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.text.input,
    opacity: 0.2,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.tabBar.activePill,
    opacity: 1,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: colors.buttonBg,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.sm,
  },
});

export default OnboardingTwoScreen;
