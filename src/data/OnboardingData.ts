import { IMAGES } from '../constants/images';
import type { ComponentProps } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const ONBOARDING_SPLASH = {
  title: 'Dish Dash',
  subtitle: 'Fast, fresh, and delivered.',
  ctaLabel: 'Get Started',
};

export const ONBOARDING_ONE = {
  titlePrefix: 'Only certified\nrestaurants.\n',
  titleHighlight: 'Only the best.',
  subtitle: 'Every restaurant on our platform is certified for hygiene, quality, and safety.',
  swipeLabel: 'Swipe up to get started',
  icon: IMAGES.onboarding.shield,
  image: IMAGES.onboarding.first,
};

export const ONBOARDING_TWO = {
  title: 'Certified for\nyour confidence',
  subtitle: 'We partner only with restaurants that meet our strict hygiene and quality standards.',
};

export const ONBOARDING_THREE = {
  title: 'Delivered with care,\nevery time',
  subtitle: 'Careful packaging, on-time delivery, and real-time tracking to your doorstep.',
  image: IMAGES.onboarding.third,
  skipLabel: 'Skip',
  ctaLabel: 'Get Started',
};

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

export const ONBOARDING_FEATURES: { id: string; icon: IconName; title: string; subtitle: string }[] = [
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
