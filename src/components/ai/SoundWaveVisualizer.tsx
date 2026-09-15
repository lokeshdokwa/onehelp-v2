import React from 'react';
import { View, StyleSheet } from 'react-native';

export const SoundWaveVisualizer: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* SoundWave visualizer bars */}
      <View style={styles.bar} />
      <View style={[styles.bar, { height: 40 }]} />
      <View style={styles.bar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 50, gap: 4 },
  bar: { width: 4, height: 20, backgroundColor: '#E63946', borderRadius: 2 }
});
