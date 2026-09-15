import React from 'react';
import { ViewStyle, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView as RNSafeAreaView, NativeSafeAreaViewProps } from 'react-native-safe-area-context';
import { useUserStore } from '../../store/useUserStore';
import { defaultTheme } from '../../theme/defaultTheme';
import { childTheme } from '../../theme/childTheme';
import { seniorTheme } from '../../theme/seniorTheme';

interface CustomSafeAreaViewProps extends NativeSafeAreaViewProps {
  backgroundColor?: string;
}

export const SafeAreaView: React.FC<CustomSafeAreaViewProps> = ({
  style,
  backgroundColor,
  children,
  ...props
}) => {
  const { ageMode } = useUserStore();
  
  let theme = defaultTheme;
  if (ageMode === 'child') theme = childTheme;
  if (ageMode === 'senior') theme = seniorTheme;

  const bg = backgroundColor || theme.colors.background;

  return (
    <RNSafeAreaView style={[styles.container, { backgroundColor: bg }, style]} {...props}>
      <StatusBar barStyle="light-content" backgroundColor={bg} />
      {children}
    </RNSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
