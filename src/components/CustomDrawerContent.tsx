import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, useColorScheme } from 'react-native';
import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { COLORS, SPACING, FONT_SIZE, FONT_FAMILY, FONT_WEIGHT } from '../theme/theme';
import { PROFILE_USER } from '../data/ProfileData';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const CustomDrawerContent = (props: DrawerContentComponentProps): React.ReactElement => {
  const { logout } = useAuth();
  const theme = (useColorScheme() ?? 'light') as ThemeMode;
  const themeColors = COLORS[theme];
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  const handleLogout = async (): Promise<void> => {
    props.navigation.closeDrawer();
    await logout();
  };

  const menuItems = [
    {
      label: 'My Orders',
      icon: 'receipt-outline' as const,
      onPress: () => {
        props.navigation.closeDrawer();
        props.navigation.navigate('TabsGroup', { screen: 'Orders' });
      },
    },
    {
      label: 'Settings',
      icon: 'settings-outline' as const,
      onPress: () => {
        props.navigation.closeDrawer();
        alert('Settings pressed!');
      },
    },
    {
      label: 'Help',
      icon: 'help-circle-outline' as const,
      onPress: () => {
        props.navigation.closeDrawer();
        alert('Help pressed!');
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{PROFILE_USER.initials}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{PROFILE_USER.name}</Text>
          <Text style={styles.userEmail}>{PROFILE_USER.email}</Text>
        </View>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContent}>
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Ionicons name={item.icon} size={22} color={themeColors.text.title} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={22} color={themeColors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    header: {
      paddingHorizontal: SPACING.lg,
      paddingTop: 60,
      paddingBottom: SPACING.xl,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      flexDirection: 'row',
      alignItems: 'center',
      gap: SPACING.md,
      backgroundColor: colors.sectionBg,
    },
    avatarContainer: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.avatar,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: FONT_SIZE.xl,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.avatarText,
    },
    userInfo: {
      flex: 1,
    },
    userName: {
      fontSize: FONT_SIZE.lg,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.semibold,
      color: colors.text.title,
      marginBottom: 2,
    },
    userEmail: {
      fontSize: 12,
      color: colors.text.subtitle,
      fontFamily: FONT_FAMILY.medium,
    },
    scrollContent: {
      paddingTop: SPACING.md,
    },
    menuList: {
      gap: 5,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: SPACING.lg,
      gap: 15,
    },
    menuLabel: {
      fontSize: FONT_SIZE.md,
      fontFamily: FONT_FAMILY.medium,
      color: colors.text.title,
    },
    footer: {
      paddingHorizontal: SPACING.lg,
      paddingVertical: 25,
      borderTopWidth: 1,
      borderTopColor: colors.border,
      backgroundColor: colors.sectionBg,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      paddingVertical: 8,
    },
    logoutText: {
      fontSize: FONT_SIZE.md,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.danger,
    },
  });

export default CustomDrawerContent;
