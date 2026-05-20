import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { IMAGES } from "../constants/images";

export interface RestaurantCardProps {
  imageUrl: string | ImageSourcePropType;
  rating: number;
  name: string;
  deliveryTime: string;
  reviewCount?: string;
  offerText?: string;
  style?: StyleProp<ViewStyle>;
  isGold?: boolean;
  tags?: string;
  priceForOne?: string;
}

export const DUMMY_DATA = Array.from({ length: 9 }).map((_, index) => ({
  id: index.toString(),
  imageUrl: IMAGES.onboarding.third,
  rating: 4.5,
  name: 'Apni Rasoi',
  deliveryTime: '15-20 mins',
  offerText: index % 4 === 0 ? '₹120 OFF' : undefined,
}));

export const FEATURED_DATA = [
  {
    id: 'f1',
    imageUrl: IMAGES.onboarding.first,
    name: "La Pino'z Pizza",
    rating: 4.0,
    reviewCount: '2K+',
    deliveryTime: 'Near & Fast',
    offerText: 'Flat ₹80 OFF above ₹149',
    isGold: true,
  },
  {
    id: 'f2',
    imageUrl: IMAGES.onboarding.third,
    name: "Burger King",
    rating: 4.2,
    reviewCount: '5K+',
    deliveryTime: '25-30 mins',
    offerText: 'Flat ₹50 OFF above ₹199',
    isGold: false,
  },
];

export const CATEGORIES_DATA = [
  { id: '1', name: 'Explore', imageUrl: IMAGES.onboarding.first, isSpecial: true },
  { id: '2', name: 'All', imageUrl: IMAGES.onboarding.third, isSelected: true },
  { id: '3', name: 'Waffles', imageUrl: IMAGES.onboarding.first },
  { id: '4', name: 'Pizza', imageUrl: IMAGES.onboarding.third },
  { id: '5', name: 'Burger', imageUrl: IMAGES.onboarding.first },
];