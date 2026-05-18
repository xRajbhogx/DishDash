import React, { useMemo, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Switch,
  useColorScheme,
  Appearance,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ProfileMenuItem from '../../components/ProfileMenuItem';
import ProfileStatCard from '../../components/ProfileStatCard';
import {
  COLORS,
  SPACING,
  FONT_SIZE,
  FONT_FAMILY,
  FONT_WEIGHT,
  BORDER_RADIUS,
  SHADOW,
} from '../../theme/theme';

type ThemeMode = keyof typeof COLORS;
type ThemeColors = (typeof COLORS)[ThemeMode];

const ProfileScreen = (): React.ReactElement => {
  const systemTheme = useColorScheme() ?? 'light';
  const [themeOverride, setThemeOverride] = useState<ThemeMode | null>(null);
  const theme: ThemeMode = themeOverride ?? (systemTheme as ThemeMode);
  const isDarkMode = theme === 'dark';
  const themeColors = COLORS[theme];
  const { top, bottom } = useSafeAreaInsets();
  const styles = useMemo(() => getStyles(themeColors), [themeColors]);

  const handleThemeToggle = useCallback((value: boolean) => {
    const nextTheme: ThemeMode = value ? 'dark' : 'light';
    setThemeOverride(nextTheme);
    Appearance.setColorScheme(nextTheme);
  }, []);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + SPACING.xxl + 80 }}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.headerTitle}>Profile</Text>
            <Text style={styles.headerSubtitle}>Manage your account and preferences</Text>
          </View>
          <View style={styles.headerActions}>
            <Pressable style={styles.headerIconButton} hitSlop={8}>
              <Ionicons name="notifications-outline" size={22} color={themeColors.text.title} />
            </Pressable>
            <Pressable style={styles.headerIconButton} hitSlop={8}>
              <Ionicons name="settings-outline" size={22} color={themeColors.text.title} />
            </Pressable>
          </View>
        </View>

        {/* User Card */}
        <Pressable style={[styles.userCard, SHADOW.sm]}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>AR</Text>
            <View style={styles.onlineBadge} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Arjun Rathore</Text>
            <Text style={styles.userPhone}>+91 98765 43210</Text>
            <Text style={styles.userEmail}>arjun@dishdash.com</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={themeColors.chevron} />
        </Pressable>

        {/* Stats Row */}
        <View style={[styles.statsRow, SHADOW.sm]}>
          <ProfileStatCard
            icon="bag-handle-outline"
            value="42"
            label="Orders"
            themeColors={themeColors}
          />
          <View style={styles.statsDivider} />
          <ProfileStatCard
            icon="star-outline"
            value="4.6"
            label="Rating"
            themeColors={themeColors}
          />
          <View style={styles.statsDivider} />
          <ProfileStatCard
            icon="heart-outline"
            value="12"
            label="Saved"
            themeColors={themeColors}
          />
          <View style={styles.statsDivider} />
          <ProfileStatCard
            icon="pricetag-outline"
            value="8"
            label="Offers"
            themeColors={themeColors}
          />
        </View>

        {/* Orders Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Orders</Text>
          <View style={styles.sectionCard}>
            <ProfileMenuItem
              icon="bag-handle-outline"
              label="My Orders"
              themeColors={themeColors}
            />
            <View style={styles.menuDivider} />
            <ProfileMenuItem
              icon="bookmark-outline"
              label="Reorder"
              themeColors={themeColors}
            />
            <View style={styles.menuDivider} />
            <ProfileMenuItem
              icon="heart-outline"
              label="Saved Restaurants"
              themeColors={themeColors}
            />
          </View>
        </View>

        {/* Account Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Account</Text>
          <View style={styles.sectionCard}>
            <ProfileMenuItem
              icon="person-outline"
              label="Personal Information"
              themeColors={themeColors}
            />
            <View style={styles.menuDivider} />
            <ProfileMenuItem
              icon="location-outline"
              label="Addresses"
              themeColors={themeColors}
            />
            <View style={styles.menuDivider} />
            <ProfileMenuItem
              icon="card-outline"
              label="Payment Methods"
              themeColors={themeColors}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionLabel}>Preferences</Text>
          <View style={styles.sectionCard}>
            <ProfileMenuItem
              icon="notifications-outline"
              label="Notifications"
              themeColors={themeColors}
            />
            <View style={styles.menuDivider} />
            <ProfileMenuItem
              icon="shield-checkmark-outline"
              label="Privacy & Security"
              themeColors={themeColors}
            />
            <View style={styles.menuDivider} />
            <ProfileMenuItem
              icon="moon-outline"
              label="Dark Mode"
              themeColors={themeColors}
              hideChevron
              rightElement={
                <Switch
                  value={isDarkMode}
                  onValueChange={handleThemeToggle}
                  trackColor={{ false: themeColors.switchTrack, true: themeColors.themedIcon }}
                  thumbColor="#FFFFFF"
                  style={styles.themeSwitch}
                />
              }
            />
          </View>
        </View>

        {/* Help & Support */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionCard}>
            <ProfileMenuItem
              icon="headset-outline"
              label="Help & Support"
              themeColors={themeColors}
            />
          </View>
        </View>

        {/* Log Out */}
        <Pressable style={({ pressed }) => [styles.logoutButton, { opacity: pressed ? 0.7 : 1 }]}>
          <Ionicons name="log-out-outline" size={20} color={themeColors.danger} style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>

      </ScrollView>
    </View>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: SPACING.md,
      marginTop: SPACING.md,
      marginBottom: SPACING.lg,
    },
    headerTitle: {
      fontSize: FONT_SIZE.xxxl,
      fontFamily: FONT_FAMILY.bold,
      color: colors.text.title,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: 13,
      fontFamily: FONT_FAMILY.medium,
      color: colors.text.subtitle,
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerIconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.sectionBg,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: SPACING.sm,
    },

    /* User Card */
    userCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: SPACING.md,
      marginBottom: SPACING.md,
      padding: SPACING.md,
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    avatarContainer: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.avatar,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: SPACING.md,
    },
    avatarText: {
      fontSize: FONT_SIZE.xl,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.bold,
      color: colors.avatarText,
    },
    onlineBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: colors.statusBadge,
      borderWidth: 2,
      borderColor: colors.card,
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
    userPhone: {
      fontSize: FONT_SIZE.sm,
      fontFamily: FONT_FAMILY.medium,
      color: colors.text.subtitle,
      marginBottom: 1,
    },
    userEmail: {
      fontSize: FONT_SIZE.sm,
      fontFamily: FONT_FAMILY.medium,
      color: colors.text.subtitle,
    },

    /* Stats */
    statsRow: {
      flexDirection: 'row',
      marginHorizontal: SPACING.md,
      marginBottom: SPACING.lg,
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statsDivider: {
      width: 1,
      backgroundColor: colors.border,
      marginVertical: SPACING.md,
    },

    /* Sections */
    sectionContainer: {
      marginBottom: SPACING.md,
      paddingHorizontal: SPACING.md,
    },
    sectionLabel: {
      fontSize: FONT_SIZE.sm,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.semibold,
      color: colors.text.subtitle,
      marginBottom: SPACING.sm,
      marginLeft: SPACING.xs,
    },
    sectionCard: {
      backgroundColor: colors.card,
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: 'hidden',
    },
    menuDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: SPACING.xxl,
    },

    /* Dark mode switch */
    themeSwitch: {
      transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
    },

    /* Log Out */
    logoutButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: SPACING.md,
      marginTop: SPACING.sm,
      marginBottom: SPACING.lg,
      paddingVertical: SPACING.md,
      borderRadius: BORDER_RADIUS.lg,
      borderWidth: 1,
      borderColor: colors.danger,
      backgroundColor: colors.dangerBg,
    },
    logoutIcon: {
      marginRight: SPACING.sm,
    },
    logoutText: {
      fontSize: FONT_SIZE.md,
      fontFamily: FONT_FAMILY.bold,
      fontWeight: FONT_WEIGHT.semibold,
      color: colors.danger,
    },
  });

export default ProfileScreen;
