export const COLORS = {
    light:{
        bg: '#ffffffff',
        buttonBg: '#ff9924',
        text:{
            title: '#000000',
            subtitle: '#333333',
            input: '#555555',
        },
        tabBar: {
            bar: '#1c1c1e',
            inactive: '#2c2c2e',
            activePill: '#ff9924',
            activeText: '#111111',
            activeIcon: '#111111',
            inactiveIcon: '#8e8e93',
            shadow: '#000000',
        },

    },
    dark: {
        bg: '#000000',
        buttonBg: '#ff9924',
        text:{
            title: '#FFFFFF',
            subtitle: '#CCCCCC',
            input: '#AAAAAA',
        },
        tabBar: {
            bar: '#8e8e8e',
            inactive: '#bababa',
            activePill: '#ff9924',
            activeText: '#111111',
            activeIcon: '#111111',
            inactiveIcon: '#373737',
            shadow: '#ffffff',
        },
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