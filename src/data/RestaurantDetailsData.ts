import type { ComponentProps } from 'react';
import { ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FOOD_IMAGES } from './MockImages';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  image: string | ImageSourcePropType;
  isVeg: boolean;
  eligibleForCoupons: boolean;
};

export type FilterChip = {
  id: string;
  label: string;
  icon: IoniconsName;
  rightIcon?: IoniconsName;
  variant: 'default' | 'active' | 'success';
};

export const RESTAURANT_DETAILS_COPY = {
  offerTitle: 'Items at 50% off',
  offerCount: '5 offers',
  menuTitle: 'Items at 50% off',
  menuLink: 'View coupon details',
  nextSectionTitle: 'Items starting at Rs 79',
};

export const FILTER_CHIPS: FilterChip[] = [
  {
    id: 'filters',
    label: 'Filters (1)',
    icon: 'options-outline',
    rightIcon: 'chevron-down',
    variant: 'default',
  },
  {
    id: 'hide-non-veg',
    label: 'Hide non-veg',
    icon: 'eye-off-outline',
    rightIcon: 'close',
    variant: 'active',
  },
  {
    id: 'highly-rated',
    label: 'Highly rated',
    icon: 'checkmark-circle-outline',
    variant: 'success',
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Veg Delight',
    description: 'Indulge in the perfect blend of smoky paneer tikka and hearty gravy.',
    originalPrice: 679,
    discountedPrice: 339,
    image: FOOD_IMAGES.pastaBowl,
    isVeg: true,
    eligibleForCoupons: false,
  },
  {
    id: 'm2',
    name: 'Tandoori Feast Bowl',
    description: 'Charred veggies, creamy makhani, and soft naan bites in one bowl.',
    originalPrice: 559,
    discountedPrice: 289,
    image: FOOD_IMAGES.healthyBowl,
    isVeg: true,
    eligibleForCoupons: true,
  },
  {
    id: 'm3',
    name: 'Spice Route Biriyani',
    description: 'Fragrant basmati rice with saffron, herbs, and slow-cooked masala.',
    originalPrice: 699,
    discountedPrice: 349,
    image: FOOD_IMAGES.burgerStack,
    isVeg: false,
    eligibleForCoupons: true,
  },
  {
    id: 'm4',
    name: 'Midnight Wok Noodles',
    description: 'Wok-tossed noodles with crunchy vegetables and house sauces.',
    originalPrice: 449,
    discountedPrice: 229,
    image: FOOD_IMAGES.noodlesWok,
    isVeg: true,
    eligibleForCoupons: true,
  },
];
