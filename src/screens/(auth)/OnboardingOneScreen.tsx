import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, PanResponder, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import { COLORS, FONT_SIZE, FONT_WEIGHT, SPACING, BORDER_RADIUS, SHADOW } from '../../theme/theme';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardingOne'>;
type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const OnboardingOneScreen = ({ navigation }: Props): React.ReactElement => {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = React.useMemo(() => getStyles(themeColors), [themeColors]);

  const bounceValue = useSharedValue(0);

  useEffect(() => {
    bounceValue.value = withRepeat(
      withSequence(
        withTiming(-10, { duration: 600 }),
        withTiming(0, { duration: 600 })
      ),
      -1,
      true
    );
  }, [bounceValue]);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: bounceValue.value }],
    };
  });

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 10;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -50) {
          navigation.navigate('OnboardingTwo');
        }
      },
    })
  ).current;

  return (
    <SafeAreaView style={styles.container} edges={['top']} {...panResponder.panHandlers}>
      <View style={styles.content}>
        {/* Top Content */}
        <View style={styles.topContainer}>
          <Animated.Image 
            source={require('../../../assets/images/onboarding/shield.png')}
            style={styles.topIcon}
            entering={FadeInDown.duration(600).delay(100)}
            resizeMode="contain"
          />
          <Animated.Text style={styles.titleText} entering={FadeInDown.duration(600).delay(200)}>
            Only certified{'\n'}restaurants.{'\n'}
            <Text style={styles.highlightText}>Only the best.</Text>
          </Animated.Text>
          
          <Animated.Text style={styles.subtitleText} entering={FadeInDown.duration(600).delay(300)}>
            Every restaurant on our platform is certified for hygiene, quality, and safety.
          </Animated.Text>
        </View>

        {/* Main Image and Card */}
        <View style={styles.imageContainer}>
          <Animated.Image 
            source={require('../../../assets/images/onboarding/firstImage.png')}
            style={styles.mainImage}
            entering={FadeInDown.duration(600).delay(400)}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Actions */}
        <Animated.View style={[styles.bottomContainer, SHADOW.md]} entering={FadeInUp.duration(600).delay(700)}>
          <View style={styles.pillIndicator} />
          <Text style={styles.swipeText}>Swipe up to get started</Text>
          
          <Pressable onPress={() => navigation.navigate('OnboardingTwo')} style={styles.nextButtonContainer}>
            <Animated.View style={[styles.nextButton, animatedIconStyle]}>
              <Entypo name="chevron-up" size={FONT_SIZE.xxxl} color={themeColors.tabBar.activeText} />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </View>
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
    justifyContent: 'space-between',
  },
  topContainer: {
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.lg,
  },
  topIcon: {
    width: 50,
    height: 50,
    marginBottom: SPACING.sm,
  },
  titleText: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: FONT_WEIGHT.extrabold,
    color: colors.text.title,
    lineHeight: FONT_SIZE.xxxl * 1.2,
    marginBottom: SPACING.md,
  },
  highlightText: {
    color: colors.tabBar.activePill,
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
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  floatingCard: {
    marginBottom: SPACING.xxxl,
    marginLeft: SPACING.xl,
    backgroundColor: colors.bg,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOW.md,
    width: '75%',
    zIndex: 10,
  },
  cardIconContainer: {
    marginRight: SPACING.md,
  },
  cardShieldIcon: {
    width: 36,
    height: 36,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FONT_SIZE.sm + 2,
    fontWeight: FONT_WEIGHT.bold,
    color: colors.text.title,
    marginBottom: SPACING.xs,
  },
  cardSubtitle: {
    fontSize: FONT_SIZE.sm,
    color: colors.text.subtitle,
    fontWeight: FONT_WEIGHT.normal,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: SPACING.xl,
    backgroundColor: colors.bg,
    borderTopLeftRadius: BORDER_RADIUS.lg,
    borderTopRightRadius: BORDER_RADIUS.lg,
  },
  pillIndicator: {
    width: 32,
    height: 3,
    marginTop: SPACING.sm,
    backgroundColor: colors.text.input,
    borderRadius: BORDER_RADIUS.full,
    opacity: 0.4,
    marginBottom: SPACING.md,
  },
  swipeText: {
    fontSize: FONT_SIZE.md,
    color: colors.text.subtitle,
    fontWeight: FONT_WEIGHT.medium,
    marginBottom: SPACING.md,
  },
  nextButtonContainer: {
    padding: SPACING.sm,
  },
  nextButton: {
    width: 64,
    height: 64,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: colors.tabBar.activePill,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.sm,
  },
});

export default OnboardingOneScreen;

