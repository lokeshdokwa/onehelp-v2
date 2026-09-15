/**
 * OneHelp — Child Theme (under 14 years)
 *
 * Friendlier color palette (deep blue background), larger touch targets,
 * simplified labels, more whitespace, cartoon-style iconography.
 * No medical dossier form — parents fill it via linked adult account.
 */

import { Colors } from './colors';
import { scaleTypography } from './typography';
import { Spacing, Radius } from './spacing';
import { OneHelpTheme } from './defaultTheme';

const childColors = {
  ...Colors,
  background: '#0D1A2E',
  surface: '#152238',
  surfaceElevated: '#1C2D48',
  emergency: '#FF4D6D',
  emergencyDim: '#2D1520',
  emergencyText: '#FF7A92',
  safe: '#39D98A',
  safeDim: '#122D1A',
};

export const childTheme: OneHelpTheme = {
  mode: 'child',
  colors: childColors,
  typography: scaleTypography(1.2),
  spacing: Spacing,
  radius: Radius,
  buttonHeight: 64,
  tabIconSize: 28,
  minTouchTarget: 56,
  sosButtonSize: 220,
  fontScale: 1.2,
  animationSpeed: 1.0,
  labels: {
    sosButton: 'Call for Help',
    sosHint: 'Hold for 3 seconds to call for help',
    safeStatus: 'You are safe!',
    fakeCall: 'Pretend Call',
    siren: 'Loud Alarm',
    morseFlash: 'Flash Light',
    signLanguage: 'Hand Signs',
  },
};
