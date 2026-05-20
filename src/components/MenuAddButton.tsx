import React, { useEffect, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSpring,
  FadeIn, 
  FadeOut
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BORDER_RADIUS, COLORS, FONT_FAMILY, FONT_WEIGHT, SHADOW } from '../theme/theme';
import { useCart } from '../context/CartContext';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

interface MenuAddButtonProps {
  itemId: string;
  itemName: string;
  itemPrice: number;
  isVeg: boolean;
  imageUrl?: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function MenuAddButton({ itemId, itemName, itemPrice, isVeg, imageUrl }: MenuAddButtonProps): React.ReactElement {
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);
  
  const { items, addToCart, decrementQuantity, removeFromCart } = useCart();
  const cartItem = items.find(i => i.id === itemId);
  const quantity = cartItem ? cartItem.quantity : 0;
  
  const scale = useSharedValue(1);
  const widthVal = useSharedValue(90);
  
  useEffect(() => {
    if (quantity > 0) {
      widthVal.value = withSpring(110, { damping: 15 });
    } else {
      widthVal.value = withSpring(90, { damping: 15 });
    }
  }, [quantity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      width: widthVal.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.92, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  if (quantity === 0) {
    return (
      <AnimatedPressable
        style={[styles.addButton, animatedStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => addToCart({ id: itemId, name: itemName, price: itemPrice, quantity: 1, isVeg, imageUrl })}
      >
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={styles.addContent}>
          <Text style={styles.addButtonText}>ADD</Text>
          <View style={styles.addButtonIcon}>
            <Ionicons name="add" size={12} color={themeColors.iconOnDark} />
          </View>
        </Animated.View>
      </AnimatedPressable>
    );
  }

  return (
    <Animated.View style={[styles.addButton, animatedStyle]}>
      <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={styles.quantityContent}>
        <Pressable 
          onPress={() => {
            if (quantity === 1) {
              removeFromCart(itemId);
            } else {
              decrementQuantity(itemId);
            }
          }}
          style={styles.actionIcon}
          hitSlop={8}
        >
          <Ionicons name="remove" size={14} color={themeColors.success} />
        </Pressable>
        
        <Text style={styles.quantityText}>{quantity}</Text>
        
        <Pressable 
          onPress={() => addToCart({ id: itemId, name: itemName, price: itemPrice, quantity: 1, isVeg, imageUrl })}
          style={styles.actionIcon}
          hitSlop={8}
        >
          <Ionicons name="add" size={14} color={themeColors.success} />
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
}

const getStyles = (colors: ThemeColors) => StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 8,
    bottom: -18,
    height: 32,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.success,
    borderRadius: BORDER_RADIUS.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOW.sm,
  },
  addContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    paddingHorizontal: 8,
  },
  quantityContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
  },
  addButtonText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.bold,
    fontWeight: FONT_WEIGHT.bold,
    color: colors.success,
    marginRight: 4,
  },
  addButtonIcon: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.bold,
    fontWeight: FONT_WEIGHT.bold,
    color: colors.success,
  },
  actionIcon: {
    padding: 2,
  }
});
