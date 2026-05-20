import { IMAGES } from '../constants/images';

export const POPULAR_SEARCHES = [
  { id: '1', name: 'Pizza', icon: '🍕', type: 'emoji' },
  { id: '2', name: 'Biryani', icon: '🍲', type: 'emoji' },
  { id: '3', name: 'Burger', icon: '🍔', type: 'emoji' },
  { id: '4', name: 'Noodles', icon: '🍜', type: 'emoji' },
  { id: '5', name: 'More', icon: 'grid-outline', type: 'icon' },
];

export const RECENT_SEARCHES = [
  { id: '1', name: 'Apni Rasoi', subtitle: 'North Indian' },
  { id: '2', name: 'Healthy Bowl', subtitle: 'Salad, Healthy' },
  { id: '3', name: 'Pizza Express', subtitle: 'Pizza' },
  { id: '4', name: 'The Good Kitchen', subtitle: 'Continental' },
];

export const RECOMMENDED_RESULTS = [
  {
    id: '1',
    name: 'Apni Rasoi',
    tags: 'North Indian • Thali • Healthy',
    rating: 4.5,
    reviewCount: '2.1k+',
    priceForOne: '₹150 for one',
    deliveryTime: '15-20 mins',
    imageUrl: IMAGES.onboarding.first, 
  },
  {
    id: '2',
    name: 'The Good Kitchen',
    tags: 'Continental • Pasta • Healthy',
    rating: 4.4,
    reviewCount: '1.8k+',
    priceForOne: '₹200 for one',
    deliveryTime: '20-25 mins',
    imageUrl: IMAGES.onboarding.third,
  },
  {
    id: '3',
    name: 'Healthy Bowl Co.',
    tags: 'Healthy • Salad • Clean Eating',
    rating: 4.6,
    reviewCount: '1.5k+',
    priceForOne: '₹180 for one',
    deliveryTime: '15-20 mins',
    imageUrl: IMAGES.onboarding.first, 
  },
  {
    id: '4',
    name: 'Wok Express',
    tags: 'Chinese • Noodles • Fast Food',
    rating: 4.2,
    reviewCount: '1.2k+',
    priceForOne: '₹140 for one',
    deliveryTime: '25-30 mins',
    imageUrl: IMAGES.onboarding.third,
  }
];
