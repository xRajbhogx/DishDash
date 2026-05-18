import React from 'react';
import { StyleSheet, Text, View, ViewStyle, StyleProp } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BORDER_RADIUS, FONT_FAMILY, SHADOW } from '../theme/theme';

interface HygieneBadgeProps {
  variant?: 'overlay-icon' | 'overlay-text' | 'box';
  style?: StyleProp<ViewStyle>;
}

export const HygieneBadge = ({ variant = 'overlay-text', style }: HygieneBadgeProps) => {
  if (variant === 'overlay-icon') {
    return (
      <View style={[styles.overlayIcon, SHADOW.sm, style]}>
        <MaterialCommunityIcons name="shield-check-outline" size={16} color="#FF7A00" />
      </View>
    );
  }

  if (variant === 'box') {
    return (
      <View style={[styles.box, style]}>
        <MaterialCommunityIcons name="shield-check-outline" size={20} color="#FF7A00" />
        <Text style={styles.boxText}>Hygiene</Text>
        <Text style={styles.boxText}>Certified</Text>
      </View>
    );
  }

  // default: overlay-text
  return (
    <View style={[styles.overlayText, SHADOW.sm, style]}>
      <MaterialCommunityIcons name="shield-check-outline" size={14} color="#FF7A00" />
      <View style={styles.overlayTextContainer}>
        <Text style={styles.overlaySmallText}>Hygiene</Text>
        <Text style={styles.overlaySmallText}>Certified</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlayIcon: {
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: BORDER_RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  overlayTextContainer: {
    marginLeft: 2,
  },
  overlaySmallText: {
    fontSize: 7,
    fontFamily: FONT_FAMILY.bold,
    color: '#333333',
    lineHeight: 9,
  },
  box: {
    backgroundColor: '#FFF8F5',
    borderWidth: 1,
    borderColor: '#FFE0D1',
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
  },
  boxText: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.medium,
    color: '#333333',
    textAlign: 'center',
    marginTop: 2,
  }
});

export default HygieneBadge;
