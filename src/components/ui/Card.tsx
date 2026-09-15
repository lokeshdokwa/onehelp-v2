import React from 'react';
import { View, ViewProps, StyleSheet, ViewStyle } from 'react-native';
import { useUserStore } from '../../store/useUserStore';
import { defaultTheme } from '../../theme/defaultTheme';
import { childTheme } from '../../theme/childTheme';
import { seniorTheme } from '../../theme/seniorTheme';
import { Elevation } from '../../theme/spacing';

interface CardProps extends ViewProps {
  elevated?: boolean;
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  elevated = false,
  padded = true,
  style,
  children,
  ...props
}) => {
  const { ageMode } = useUserStore();
  
  let theme = defaultTheme;
  if (ageMode === 'child') theme = childTheme;
  if (ageMode === 'senior') theme = seniorTheme;

  const cardStyle: ViewStyle = {
    backgroundColor: elevated ? theme.colors.surfaceElevated : theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: padded ? theme.spacing.md : 0,
    borderColor: theme.colors.border,
    borderWidth: elevated ? 0 : 1,
    ...(elevated ? Elevation.low : Elevation.none),
  };

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
};
