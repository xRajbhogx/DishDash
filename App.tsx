import React from 'react';
import Navigation from './src/screens/navigation';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';

export default function App(): React.ReactElement {
  return (
    <AuthProvider>
      <CartProvider>
        <Navigation />
      </CartProvider>
    </AuthProvider>
  );
}