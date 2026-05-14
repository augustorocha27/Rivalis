export const colors = {
  background: '#07111F',
  backgroundSoft: '#0A1626',
  surface: '#0E1B2D',
  surfaceElevated: '#13243A',
  primary: '#003478',
  primaryDark: '#001D45',
  primaryLight: '#0066B3',
  accent: '#00AEEF',
  accentSoft: 'rgba(0, 174, 239, 0.16)',
  success: '#56D8FF',
  warning: '#F6C65B',
  danger: '#7FA7D9',
  highlight: '#FFFFFF',
  silver: '#C7D0DD',
  textPrimary: '#FFFFFF',
  textSecondary: '#A8B3C5',
  textMuted: '#6C7890',
  border: 'rgba(255,255,255,0.12)',
  glass: 'rgba(255,255,255,0.07)',
  blackTransparent: 'rgba(0,0,0,0.38)',
} as const;

export const gradients = {
  appBackground: ['#07111F', '#0B1D33', '#07111F'] as const,
  hero: ['rgba(0, 102, 179, 0.34)', 'rgba(0, 174, 239, 0.16)', 'rgba(7, 17, 31, 0.72)'] as const,
  primaryButton: ['#00AEEF', '#0066B3', '#003478'] as const,
  cyanButton: ['#56D8FF', '#00AEEF', '#0066B3'] as const,
  card: ['rgba(255,255,255,0.13)', 'rgba(255,255,255,0.045)'] as const,
  cardWinner: ['rgba(0,174,239,0.24)', 'rgba(14,27,45,0.96)'] as const,
  cardLoser: ['rgba(127,167,217,0.18)', 'rgba(14,27,45,0.96)'] as const,
  sheet: ['#13243A', '#0E1B2D', '#07111F'] as const,
  premiumPanel: ['rgba(0,52,120,0.42)', 'rgba(14,27,45,0.9)', 'rgba(7,17,31,0.96)'] as const,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  huge: 48,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 30,
  pill: 999,
} as const;

export const fonts = {
  headingBold: 'Montserrat_800ExtraBold',
  heading: 'Montserrat_700Bold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
} as const;

export const shadows = {
  primaryGlow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.38,
    shadowRadius: 24,
    elevation: 10,
  },
  cyanGlow: {
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.34,
    shadowRadius: 20,
    elevation: 8,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.34,
    shadowRadius: 24,
    elevation: 8,
  },
} as const;
