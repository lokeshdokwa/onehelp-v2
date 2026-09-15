/**
 * OneHelp Design System — Spacing & Radius Scales
 *
 * 4px base unit grid system.
 * All spacing in the app derives from this scale.
 */

export const Spacing = {
  /** 4px — micro spacing */
  xs: 4,
  /** 8px — tight spacing */
  sm: 8,
  /** 16px — standard spacing */
  md: 16,
  /** 24px — comfortable spacing */
  lg: 24,
  /** 32px — generous spacing */
  xl: 32,
  /** 48px — section spacing */
  xxl: 48,
  /** 64px — major section dividers */
  xxxl: 64,
} as const;

export const Radius = {
  /** 8px — subtle rounding */
  sm: 8,
  /** 12px — standard card rounding */
  md: 12,
  /** 16px — elevated modal rounding */
  lg: 16,
  /** 24px — button rounding */
  xl: 24,
  /** 9999px — fully circular (badges, dots) */
  full: 9999,
} as const;

export const Elevation = {
  /** No elevation */
  none: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  /** Subtle lift — cards */
  low: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  /** Medium lift — modals, floating buttons */
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  /** High lift — SOS button, critical alerts */
  high: {
    shadowColor: '#E63946',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
} as const;

export type SpacingToken = keyof typeof Spacing;
export type RadiusToken = keyof typeof Radius;
