import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAccessibilityStore } from '../../store/useAccessibilityStore';

export const SeniorModeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { seniorModeActive } = useAccessibilityStore();
  
  if (!seniorModeActive) return <>{children}</>;

  return (
    <View style={styles.seniorContainer}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  seniorContainer: { flex: 1, backgroundColor: '#FFFDF9' } // higher contrast bg
});
