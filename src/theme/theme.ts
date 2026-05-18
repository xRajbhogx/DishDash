export const COLORS = {
    light:{
        bg: '#ffffffff',
        buttonBg: '#ff9924',
        text:{
            title: '#000000',
            subtitle: '#333333',
            theme: '#ff9924',
            input: '#555555',
        },
        tabBar: {
            bar: '#ffffffff',
            inactive: '#ffffffff',
            activePill: '#fff2e4ff',
            activeText: '#111111',
            activeIcon: '#111111',
            inactiveIcon: '#8e8e93',
            shadow: '#000000',
        },
        themedIcon: '#ff9924',
        border: '#E0E0E0',
        card: '#FFFFFF',
        avatar: '#FFF2E4',
        avatarText: '#FF7A00',
        sectionBg: '#F8F8F8',
        iconDefault: '#555555',
        danger: '#E23744',
        dangerBg: '#FFF5F5',
        success: '#1E824C',
        chevron: '#CCCCCC',
        switchTrack: '#D1D1D6',
        statusBadge: '#34C759',
    },
    dark: {
        bg: '#111111ff',
        buttonBg: '#ff9924',
        text:{
            title: '#FFFFFF',
            subtitle: '#CCCCCC',
            theme: '#ff9924',
            input: '#AAAAAA',
        },
        tabBar: {
            bar: '#000000ff',
            inactive: '#2c2c2cff',
            activePill: '#ff9924',
            activeText: '#111111',
            activeIcon: '#111111',
            inactiveIcon: '#fff6eaff',
            shadow: '#ffffff',
        },
        themedIcon: '#ff9924',
        border: '#464444ff',
        card: '#1A1A1A',
        avatar: '#3D2A10',
        avatarText: '#FF9924',
        sectionBg: '#111111',
        iconDefault: '#AAAAAA',
        danger: '#FF6B6B',
        dangerBg: '#2A1515',
        success: '#34C759',
        chevron: '#555555',
        switchTrack: '#555555',
        statusBadge: '#34C759',
    }
};

export const FONT_SIZE = {
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 28,
    xxxl: 32,
};

// constants/theme.ts

export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
};

export const BORDER_RADIUS = {
    sm: 6,
    md: 12,
    lg: 18,
    xl: 24,
    full: 9999,
};

export const FONT_WEIGHT = {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
} as const;

export const FONT_FAMILY = {
    regular: 'Inter-Regular',       
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
};

export const ICON_SIZE = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
};

export const SHADOW = {
    sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 2,
    },
    md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
    },
    lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.16,
        shadowRadius: 16,
        elevation: 10,
    },
};

// export const ANIMATION = {
//     duration: {
//         fast: 150,
//         normal: 250,
//         slow: 400,
//     },
//     // use with Reanimated 3 Easing
//     easing: {
//         easeIn: 'easeIn',
//         easeOut: 'easeOut',
//         spring: { damping: 15, stiffness: 120 },
//     },
// };

// export const Z_INDEX = {
//     base: 0,
//     card: 10,
//     modal: 50,
//     toast: 100,
//     tabBar: 20,
// };



// export const INPUT = {
//     height: {
//         sm: 40,
//         md: 48,
//         lg: 56,
//     },
//     borderWidth: 1,
// };