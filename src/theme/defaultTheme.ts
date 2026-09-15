/**
 * OneHelp — Default Adult Theme (14–59 years)
 *
 * Standard design system values. Dense information layout.
 * Full access to all features.
 */

import { Colors } from './colors';
import { Typography, TypographyStyle } from './typography';
import { Spacing, Radius } from './spacing';

export interface OneHelpTheme {
  mode: 'adult' | 'child' | 'senior';
  colors: Record<string, string>;
  typography: Record<string, TypographyStyle>;
  spacing: typeof Spacing;
  radius: typeof Radius;
  buttonHeight: number;
  tabIconSize: number;
  minTouchTarget: number;
  sosButtonSize: number;
  fontScale: number;
  animationSpeed: number;
  labels: {
    sosButton: string;
    sosHint: string;
    safeStatus: string;
    fakeCall: string;
    siren: string;
    morseFlash: string;
    signLanguage: string;
  };
}

export const defaultTheme: OneHelpTheme = {
  mode: 'adult',
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  radius: Radius,
  buttonHeight: 52,
  tabIconSize: 24,
  minTouchTarget: 44,
  sosButtonSize: 180,
  fontScale: 1.0,
  animationSpeed: 1.0,
  labels: {
    sosButton: 'Hold SOS',
    sosHint: 'Hold 3 seconds to send alert',
    safeStatus: 'Status: Nominal',
    fakeCall: 'Fake Call',
    siren: 'Siren',
    morseFlash: 'Morse SOS',
    signLanguage: 'Sign Lang.',
  },
};
