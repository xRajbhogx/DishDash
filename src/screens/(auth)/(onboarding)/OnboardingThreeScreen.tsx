import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Image, useColorScheme, useWindowDimensions, PanResponder } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, BORDER_RADIUS, SHADOW } from '../../../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingThree'>;
type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const OnboardingThreeScreen = ({ navigation }: Props): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = React.useMemo(() => getStyles(themeColors), [themeColors]);

  const { width } = useWindowDimensions();
  const translateX = useSharedValue(width);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      translateX.value = width;
      translateX.value = withTiming(0, { duration: 600 });
    });
    return unsubscribe;
  }, [navigation, width]);

  const animatedScreenStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleBack = () => {
    translateX.value = withTiming(width, { duration: 600 });
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy) && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          handleBack();
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']} {...panResponder.panHandlers}>
      <Animated.View style={[styles.content, animatedScreenStyle]}>
        
        <View style={styles.mainContent}>
          <View style={styles.topSection}>
            <Animated.View style={styles.topIconWrapper} entering={FadeInDown.duration(600).delay(100)}>
              <View style={[StyleSheet.absoluteFill, styles.topIconBackground]} />
              <MaterialCommunityIcons 
                name="moped-outline" 
                size={40} 
                color={themeColors.tabBar.activePill} 
              />
            </Animated.View>
            <Animated.Text style={styles.titleText} entering={FadeInDown.duration(600).delay(200)}>
              Delivered with care,{'\n'}every time
            </Animated.Text>
            <Animated.Text style={styles.subtitleText} entering={FadeInDown.duration(600).delay(300)}>
              Careful packaging, on-time delivery,{'\n'}and real-time tracking to your{'\n'}doorstep.
            </Animated.Text>
          </View>

          <View style={styles.imageContainer}>
            <Animated.Image 
              source={require('../../../../assets/images/onboarding/thirdImage.png')}
              style={styles.mainImage}
              entering={FadeInDown.duration(600).delay(400)}
              resizeMode="contain"
            />
          </View>
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
                  index === 2 && styles.activeDot
                ]} 
              />
            ))}
          </View>

          <Pressable 
            onPress={() => navigation.navigate('Tabs')} 
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
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
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  skipButton: {
    width: 60,
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
  getStartedButton: {
    backgroundColor: colors.tabBar.activePill,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.sm,
  },
  getStartedText: {
    color: colors.bg,
    fontSize: FONT_SIZE.md,
    fontWeight: FONT_WEIGHT.bold,
  },
});

export default OnboardingThreeScreen;
