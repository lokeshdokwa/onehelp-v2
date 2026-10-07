/**
 * OneHelp — Default Theme
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
  animationSpeed?: number;
  labels?: Record<string, string>;
}

export const defaultTheme: OneHelpTheme = {
  mode: 'adult',
  colors: Colors as Record<string, string>,
  typography: Typography,
  spacing: Spacing,
  radius: Radius,
  buttonHeight: 48,
  tabIconSize: 22,
  minTouchTarget: 44,
  sosButtonSize: 180,
  fontScale: 1.0,
};
