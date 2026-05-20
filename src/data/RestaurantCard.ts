import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";
import { FOOD_IMAGES, RESTAURANT_IMAGES } from "./MockImages";

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

export const DUMMY_DATA = [
  {
    id: 'r1',
    imageUrl: FOOD_IMAGES.pizzaClassic,
    rating: 4.6,
    name: 'Crimson Slice',
    deliveryTime: '15-20 mins',
    priceForOne: '₹180 for one',
    offerText: '₹120 OFF',
  },
  {
    id: 'r2',
    imageUrl: FOOD_IMAGES.saladBowl,
    rating: 4.4,
    name: 'Green & Grain',
    deliveryTime: '20-25 mins',
    priceForOne: '₹170 for one',
  },
  {
    id: 'r3',
    imageUrl: FOOD_IMAGES.pastaBowl,
    rating: 4.3,
    name: 'Roma Pasta Co.',
    deliveryTime: '25-30 mins',
    priceForOne: '₹220 for one',
    offerText: '₹80 OFF',
  },
  {
    id: 'r4',
    imageUrl: FOOD_IMAGES.burgerStack,
    rating: 4.5,
    name: 'Grill Street',
    deliveryTime: '18-22 mins',
    priceForOne: '₹190 for one',
  },
  {
    id: 'r5',
    imageUrl: FOOD_IMAGES.healthyBowl,
    rating: 4.7,
    name: 'Bowl & Bliss',
    deliveryTime: '14-18 mins',
    priceForOne: '₹160 for one',
    offerText: '₹60 OFF',
  },
  {
    id: 'r6',
    imageUrl: FOOD_IMAGES.noodlesWok,
    rating: 4.2,
    name: 'Midnight Wok',
    deliveryTime: '20-25 mins',
    priceForOne: '₹140 for one',
  },
  {
    id: 'r7',
    imageUrl: FOOD_IMAGES.flatbread,
    rating: 4.1,
    name: 'Brick Oven Co.',
    deliveryTime: '22-28 mins',
    priceForOne: '₹200 for one',
  },
  {
    id: 'r8',
    imageUrl: FOOD_IMAGES.sushiPlatter,
    rating: 4.8,
    name: 'Sushi Tide',
    deliveryTime: '30-35 mins',
    priceForOne: '₹260 for one',
    offerText: '₹150 OFF',
  },
  {
    id: 'r9',
    imageUrl: FOOD_IMAGES.dessertPlate,
    rating: 4.3,
    name: 'Sweet Atlas',
    deliveryTime: '12-18 mins',
    priceForOne: '₹130 for one',
  },
];

export const FEATURED_DATA = [
  {
    id: 'f1',
    imageUrl: RESTAURANT_IMAGES.warmBistro,
    name: "La Pino'z Pizza",
    rating: 4.0,
    reviewCount: '2K+',
    deliveryTime: 'Near & Fast',
    priceForOne: '₹200 for one',
    offerText: 'Flat ₹80 OFF above ₹149',
    isGold: true,
  },
  {
    id: 'f2',
    imageUrl: RESTAURANT_IMAGES.eveningDining,
    name: "Burger King",
    rating: 4.2,
    reviewCount: '5K+',
    deliveryTime: '25-30 mins',
    priceForOne: '₹170 for one',
    offerText: 'Flat ₹50 OFF above ₹199',
    isGold: false,
  },
  {
    id: 'f3',
    imageUrl: RESTAURANT_IMAGES.modernCafe,
    name: 'Cafe Nova',
    rating: 4.6,
    reviewCount: '3.2K+',
    deliveryTime: '20-25 mins',
    priceForOne: '₹210 for one',
    offerText: 'Flat ₹70 OFF above ₹199',
    isGold: true,
  },
];

export const CATEGORIES_DATA = [
  { id: '1', name: 'Explore', imageUrl: FOOD_IMAGES.breakfastBoard, isSpecial: true },
  { id: '2', name: 'All', imageUrl: FOOD_IMAGES.pizzaClassic, isSelected: true },
  { id: '3', name: 'Waffles', imageUrl: FOOD_IMAGES.dessertPlate },
  { id: '4', name: 'Pizza', imageUrl: FOOD_IMAGES.flatbread },
  { id: '5', name: 'Burger', imageUrl: FOOD_IMAGES.burgerStack },
  { id: '6', name: 'Salads', imageUrl: FOOD_IMAGES.saladBowl },
];