import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TypographyText } from '../ui/Typography';

export const SOSCountdown: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [count, setCount] = useState(3);
  const scale = new Animated.Value(1);

  useEffect(() => {
    if (count > 0) {
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.5, duration: 200, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 800, useNativeDriver: true })
      ]).start();
      
      const timer = setTimeout(() => setCount(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
    return undefined;
  }, [count]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.circle, { transform: [{ scale }] }]}>
        <TypographyText variant="display" color="#FFF" style={styles.text}>{count}</TypographyText>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  circle: { width: 150, height: 150, borderRadius: 75, backgroundColor: '#E63946', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 72, fontWeight: 'bold' }
});
