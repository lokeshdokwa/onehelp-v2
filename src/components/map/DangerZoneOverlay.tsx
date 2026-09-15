import React from 'react';
import { View, StyleSheet } from 'react-native';

export const DangerZoneOverlay: React.FC<{ active: boolean }> = ({ active }) => {
  if (!active) return null;
  return <View style={styles.overlay} />;
};

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(230, 57, 70, 0.2)', pointerEvents: 'none' }
});
