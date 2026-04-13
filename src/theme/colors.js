export const colors = {
  background: '#0A0A0F',
  surface: '#141420',
  surfaceLight: '#1C1C2E',
  surfaceHighlight: '#252540',

  primary: '#E94560',
  primaryDark: '#C73A52',
  secondary: '#0F3460',
  accent: '#533483',

  success: '#00C9A7',
  warning: '#FFC93C',
  info: '#4DA8DA',
  danger: '#E94560',

  text: '#EAEAEA',
  textSecondary: '#8E8EA0',
  textMuted: '#5A5A6E',

  border: '#2A2A3C',
  borderLight: '#3A3A4C',

  white: '#FFFFFF',
  black: '#000000',

  cardColors: {
    blue: '#1A3A5C',
    red: '#5C1A2A',
    yellow: '#5C4A1A',
    green: '#1A5C3A',
  },

  gradient: {
    primary: ['#E94560', '#533483'],
    dark: ['#141420', '#0A0A0F'],
    card: ['#1C1C2E', '#141420'],
  },
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  large: {
    shadowColor: '#E94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const typography = {
  hero: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  body: {
    fontSize: 15,
    fontWeight: '400',
  },
  caption: {
    fontSize: 13,
    fontWeight: '400',
  },
  small: {
    fontSize: 11,
    fontWeight: '400',
  },
};
