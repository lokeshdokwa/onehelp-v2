import React from 'react';
import {
  Text,
  TextProps,
  StyleProp,
  TextStyle,
  StyleSheet,
} from 'react-native';
import { useAccessibilityStore } from '../../store/useAccessibilityStore';
import { useUserStore } from '../../store/useUserStore';
import { defaultTheme } from '../../theme/defaultTheme';
import { childTheme } from '../../theme/childTheme';
import { seniorTheme } from '../../theme/seniorTheme';
import { TypographyVariant, scaleTypography, Typography } from '../../theme/typography';

interface CustomTypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
}

export const TypographyText: React.FC<CustomTypographyProps> = ({
  variant = 'body',
  color,
  align = 'auto',
  style,
  children,
  ...props
}) => {
  const { ageMode } = useUserStore();
  const { seniorModeActive, fontScale: userFontScale, highContrast } = useAccessibilityStore();

  // Determine theme
  let theme = defaultTheme;
  if (seniorModeActive || ageMode === 'senior') {
    theme = seniorTheme;
  } else if (ageMode === 'child') {
    theme = childTheme;
  }

  // Get base typography style and scale it
  const baseScale = theme.fontScale * userFontScale;
  const scaledTypography = scaleTypography(baseScale, theme.mode === 'senior' ? 18 : 0);
  
  const variantStyle = scaledTypography[variant] || scaledTypography.body;
  const defaultColor = highContrast ? theme.colors.textPrimary : theme.colors.textPrimary;

  return (
    <Text
      style={[
        variantStyle,
        { color: color || defaultColor, textAlign: align },
        style,
      ]}
      allowFontScaling={false} // We handle scaling manually via stores
      maxFontSizeMultiplier={1}
      {...props}
    >
      {children}
    </Text>
  );
};
