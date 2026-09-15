/**
 * OneHelp Design System — Typography Scale
 *
 * Primary typeface: DM Sans — geometric humanist sans-serif
 * Secondary: Space Grotesk — for numbers, data, status readouts
 *
 * No other font families are used.
 */

import { TextStyle } from 'react-native';

export interface TypographyStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export const Typography: Record<string, TypographyStyle> = {
  /** Display — SOS button and major headings only */
  display: {
    fontFamily: 'DMSans-Bold',
    fontSize: 36,
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  /** Headline — screen titles */
  headline: {
    fontFamily: 'DMSans-SemiBold',
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.2,
  },
  /** Title — section headers, card titles */
  title: {
    fontFamily: 'DMSans-Medium',
    fontSize: 17,
    lineHeight: 24,
    letterSpacing: 0,
  },
  /** Body — standard readable text */
  body: {
    fontFamily: 'DMSans-Regular',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  /** Caption — labels, meta info, timestamps */
  caption: {
    fontFamily: 'DMSans-Regular',
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.2,
  },
  /** Data — numbers, coordinates, stress scores */
  data: {
    fontFamily: 'SpaceGrotesk-Medium',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.3,
  },
  /** Mono — status codes, technical identifiers */
  mono: {
    fontFamily: 'SpaceGrotesk-Regular',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
} as const;

/**
 * Applies a font scale multiplier to all typography styles.
 * Used by child theme (1.2x) and senior theme (1.5x).
 */
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
