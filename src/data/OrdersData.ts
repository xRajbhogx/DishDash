import { FOOD_IMAGES } from './MockImages';

export const FILTER_TABS = ['All Orders', 'Ongoing', 'Completed', 'Cancelled'];

export const ONGOING_ORDER = {
  id: '#AR78945',
  restaurant: 'Apni Rasoi',
  tags: 'North Indian • Healthy',
  status: 'Preparing your order',
  arrivingIn: '15-20 mins',
  image: FOOD_IMAGES.healthyBowl,
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
    image: FOOD_IMAGES.pastaBowl,
  },
  {
    id: '#HBC34211',
    restaurant: 'Healthy Bowl Co.',
    tags: 'Healthy • Salad • Clean Eating',
    date: '10 May 2024 • 7:45 PM',
    price: '₹250',
    status: 'Delivered',
    image: FOOD_IMAGES.saladBowl,
  },
  {
    id: '#PE22109',
    restaurant: 'Pizza Express',
    tags: 'Pizza • Italian',
    date: '08 May 2024 • 8:10 PM',
    price: '₹410',
    status: 'Delivered',
    image: FOOD_IMAGES.pizzaClassic,
  },
  {
    id: '#SW23888',
    restaurant: 'Sushi Tide',
    tags: 'Japanese • Sushi',
    date: '05 May 2024 • 6:50 PM',
    price: '₹520',
    status: 'Delivered',
    image: FOOD_IMAGES.sushiPlatter,
  },
  {
    id: '#BW48102',
    restaurant: 'Midnight Wok',
    tags: 'Chinese • Noodles',
    date: '02 May 2024 • 9:10 PM',
    price: '₹280',
    status: 'Delivered',
    image: FOOD_IMAGES.noodlesWok,
  },
];
