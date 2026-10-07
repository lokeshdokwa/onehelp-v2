/**
 * OneHelp Design System — Color Tokens
 * Matching the mobile app Figma design specifications.
 */

export const Colors = {
  // Brand & Accent
  primary: '#2563EB', // Royal Blue
  primaryDark: '#1D4ED8',
  primaryLight: '#EFF6FF',
  primaryOverlay: 'rgba(37, 99, 235, 0.1)',

  // Emergency (Red)
  emergency: '#DC2626',
  emergencyDark: '#991B1B',
  emergencyLight: '#FEF2F2',
  emergencyBorder: '#F87171',
  emergencyText: '#EF4444',
  emergencyDim: '#FEE2E2',
  emergencyGradientStart: '#EF4444',
  emergencyGradientEnd: '#B91C1C',
  emergencyOverlay: 'rgba(220, 38, 38, 0.12)',

  // Safe / Success (Green)
  safe: '#16A34A',
  safeDark: '#15803D',
  safeLight: '#F0FDF4',
  safeDim: '#DCFCE7',
  safeBorder: '#86EFAC',
  safeOverlay: 'rgba(22, 163, 74, 0.12)',

  // Warning (Orange / Amber)
  warning: '#D97706',
  warningLight: '#FFFBEB',
  warningDim: '#FEF3C7',
  warningBorder: '#FCD34D',

  // Info (Sky / Cyan)
  info: '#2563EB',
  infoLight: '#F0F9FF',
  infoDim: '#DBEAFE',

  // Neutrals / Light Theme (Main)
  white: '#FFFFFF',
  black: '#000000',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  card: '#FFFFFF',
  cardSecondary: '#F1F5F9',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderStrong: '#CBD5E1',

  // Text
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',

  // Mesh & Satellite
  mesh: '#A78BFA',
  meshDim: '#F3E8FF',
  meshOverlay: 'rgba(167, 139, 250, 0.15)',
  satellite: '#0284C7',

  // Transparent Overlays
  safeOverlayStrong: 'rgba(22, 163, 74, 0.2)',
  warningOverlay: 'rgba(217, 119, 6, 0.15)',
  infoOverlay: 'rgba(37, 99, 235, 0.15)',
  blackOverlay: 'rgba(0, 0, 0, 0.6)',

  // Dark Canvas (used by Modals, Duress PIN, Widgets, Night Flow)
  darkBackground: '#0F172A',
  darkCard: '#1E293B',
  darkCardElevated: '#334155',
  darkBorder: '#334155',
  darkText: '#F8FAFC',
  darkTextMuted: '#94A3B8',
} as const;

export type ColorToken = keyof typeof Colors;
