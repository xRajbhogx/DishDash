import { IMAGES } from './images';

export const FILTER_TABS = ['All Orders', 'Ongoing', 'Completed', 'Cancelled'];

export const ONGOING_ORDER = {
  id: '#AR78945',
  restaurant: 'Apni Rasoi',
  tags: 'North Indian • Healthy',
  status: 'Preparing your order',
  arrivingIn: '15-20 mins',
  image: IMAGES.onboarding.first,
  progress: 2, // 1: Confirmed, 2: Preparing, 3: On the way, 4: Delivered
};

export const COMPLETED_ORDERS = [
  {
    id: '#TGK45612',
    restaurant: 'The Good Kitchen',
    tags: 'Continental • Pasta',
    date: '12 May 2024 • 1:20 PM',
    price: '₹320 ',
    status: 'Delivered',
    image: IMAGES.onboarding.third,
  },
  {
    id: '#HBC34211',
    restaurant: 'Healthy Bowl Co.',
    tags: 'Healthy • Salad • Clean Eating',
    date: '10 May 2024 • 7:45 PM',
    price: '₹250',
    status: 'Delivered',
    image: IMAGES.onboarding.first,
  },
  {
    id: '#PE22109',
    restaurant: 'Pizza Express',
    tags: 'Pizza • Italian',
    date: '08 May 2024 • 8:10 PM',
    price: '₹410',
    status: 'Delivered',
    image: IMAGES.onboarding.third,
  }
];
