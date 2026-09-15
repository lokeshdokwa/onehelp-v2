import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { TypographyText } from './Typography';
import { useUserStore } from '../../store/useUserStore';
import { defaultTheme } from '../../theme/defaultTheme';
import { childTheme } from '../../theme/childTheme';
import { seniorTheme } from '../../theme/seniorTheme';

export type ButtonVariant = 'primary' | 'secondary' | 'emergency' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  icon,
  style,
  disabled,
  ...props
}) => {
  const { ageMode } = useUserStore();
  
  let theme = defaultTheme;
  if (ageMode === 'child') theme = childTheme;
  if (ageMode === 'senior') theme = seniorTheme;

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.info,
          borderColor: theme.colors.info,
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.surfaceElevated,
          borderColor: theme.colors.borderStrong,
          borderWidth: 1,
        };
      case 'emergency':
        return {
          backgroundColor: theme.colors.emergency,
          borderColor: theme.colors.emergency,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
        };
    }
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textMuted;
    if (variant === 'ghost' || variant === 'secondary') return theme.colors.textPrimary;
    return theme.colors.textInverse;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || isLoading}
      style={[
        styles.base,
        {
          height: theme.buttonHeight,
          borderRadius: theme.radius.xl,
        },
        getVariantStyles(),
        disabled && { opacity: 0.5 },
        style,
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          {icon && icon}
          <TypographyText
            variant="title"
            color={getTextColor()}
            style={icon ? { marginLeft: theme.spacing.sm } : undefined}
          >
            {title}
          </TypographyText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
