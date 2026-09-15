import React from 'react';
import { View, StyleSheet } from 'react-native';

export const FaceScanOverlay: React.FC = () => {
  return (
    <View style={styles.overlay}>
      <View style={styles.scanArea} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center' },
  scanArea: { width: 250, height: 250, borderWidth: 4, borderColor: '#00F', borderRadius: 16 }
});
