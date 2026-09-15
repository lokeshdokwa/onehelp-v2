/**
 * OneHelp — Senior Theme (60+ years)
 *
 * 1.5x font scale, minimum 18px anywhere, 72px button heights,
 * full-width emergency button, high contrast text, voice prompts,
 * slower animations, one-task screens with no information overload.
 * Auto-enabled if device font scale > 1.3 in OS settings.
 */

import { Colors } from './colors';
import { scaleTypography } from './typography';
import { Spacing, Radius } from './spacing';
import { OneHelpTheme } from './defaultTheme';

const seniorColors = {
  ...Colors,
  textPrimary: '#F5F5F5',
  textSecondary: '#B0B5C5',
};

export const seniorTheme: OneHelpTheme = {
  mode: 'senior',
  colors: seniorColors,
  typography: scaleTypography(1.5, 18),
  spacing: Spacing,
  radius: Radius,
  buttonHeight: 72,
  tabIconSize: 32,
  minTouchTarget: 64,
  sosButtonSize: 240,
  fontScale: 1.5,
  animationSpeed: 0.6,
  labels: {
    sosButton: 'Emergency Help',
    sosHint: 'Press and hold for 3 seconds',
    safeStatus: 'You are safe',
    fakeCall: 'Fake Call',
    siren: 'Loud Siren',
    morseFlash: 'Flash Light',
    signLanguage: 'Sign Language',
  },
};
