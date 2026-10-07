/**
 * OneHelp Design System — Typography Scale
 * Safe cross-platform typography definitions with fallback.
 */

import { Platform } from 'react-native';

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
}

const defaultFont = Platform.select({
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
});

const boldFont = Platform.select({
  ios: 'System',
  android: 'sans-serif-medium',
  default: 'sans-serif',
});

export const Typography: Record<string, TypographyStyle> = {
  /** Display — major titles and SOS */
  display: {
    fontFamily: boldFont,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.5,
    fontWeight: '800',
  },
  /** Headline — screen titles */
  headline: {
    fontFamily: boldFont,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.3,
    fontWeight: '700',
  },
  /** Title — card headers & section titles */
  title: {
    fontFamily: boldFont,
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: -0.2,
    fontWeight: '600',
  },
  /** Body — standard readable text */
  body: {
    fontFamily: defaultFont,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
    fontWeight: '400',
  },
  /** Caption — labels, meta info, timestamps */
  caption: {
    fontFamily: defaultFont,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.1,
    fontWeight: '400',
  },
  /** Data — numbers, coordinates, timers */
  data: {
    fontFamily: defaultFont,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.2,
    fontWeight: '600',
  },
  /** Mono — status codes */
  mono: {
    fontFamily: Platform.select({ ios: 'Courier', default: 'monospace' }),
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.3,
    fontWeight: '500',
  },
} as const;

export function scaleTypography(
  scale: number,
  minFontSize: number = 0,
): Record<string, TypographyStyle> {
  const scaled: Record<string, TypographyStyle> = {};
  for (const [key, style] of Object.entries(Typography)) {
    const newFontSize = Math.max(Math.round(style.fontSize * scale), minFontSize);
    const lineHeightRatio = style.lineHeight / style.fontSize;
    scaled[key] = {
      ...style,
      fontSize: newFontSize,
      lineHeight: Math.round(newFontSize * lineHeightRatio),
    };
  }
  return scaled;
}

export type TypographyVariant = keyof typeof Typography;
