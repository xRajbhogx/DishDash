import type { ComponentProps } from 'react';
import { Ionicons } from '@expo/vector-icons';

export type IoniconsName = ComponentProps<typeof Ionicons>['name'];

export type ProfileUser = {
  initials: string;
  name: string;
  phone: string;
  email: string;
};

export type ProfileStat = {
  id: string;
  icon: IoniconsName;
  value: string;
  label: string;
};

export type ProfileMenuItemData = {
  id: string;
  icon: IoniconsName;
  label: string;
  type?: 'toggle' | 'default';
};

export type ProfileSection = {
  id: string;
  title?: string;
  items: ProfileMenuItemData[];
};

export const PROFILE_HEADER = {
  title: 'Profile',
  subtitle: 'Manage your account and preferences',
};

export const PROFILE_USER: ProfileUser = {
  initials: 'AR',
  name: 'Arjun Rathore',
  phone: '+91 98765 43210',
  email: 'arjun@dishdash.com',
};

export const PROFILE_STATS: ProfileStat[] = [
  { id: 'orders', icon: 'bag-handle-outline', value: '42', label: 'Orders' },
  { id: 'rating', icon: 'star-outline', value: '4.6', label: 'Rating' },
  { id: 'saved', icon: 'heart-outline', value: '12', label: 'Saved' },
  { id: 'offers', icon: 'pricetag-outline', value: '8', label: 'Offers' },
];

export const PROFILE_SECTIONS: ProfileSection[] = [
  {
    id: 'orders',
    title: 'Orders',
    items: [
      { id: 'my-orders', icon: 'bag-handle-outline', label: 'My Orders' },
      { id: 'reorder', icon: 'bookmark-outline', label: 'Reorder' },
      { id: 'saved', icon: 'heart-outline', label: 'Saved Restaurants' },
    ],
  },
  {
    id: 'account',
    title: 'Account',
    items: [
      { id: 'personal', icon: 'person-outline', label: 'Personal Information' },
      { id: 'addresses', icon: 'location-outline', label: 'Addresses' },
      { id: 'payments', icon: 'card-outline', label: 'Payment Methods' },
    ],
  },
  {
    id: 'preferences',
    title: 'Preferences',
    items: [
      { id: 'notifications', icon: 'notifications-outline', label: 'Notifications' },
      { id: 'privacy', icon: 'shield-checkmark-outline', label: 'Privacy & Security' },
      { id: 'dark-mode', icon: 'moon-outline', label: 'Dark Mode', type: 'toggle' },
    ],
  },
  {
    id: 'support',
    items: [
      { id: 'help', icon: 'headset-outline', label: 'Help & Support' },
    ],
  },
];

export const PROFILE_ACTIONS = {
  logoutLabel: 'Log Out',
};
