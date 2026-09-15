import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TypographyText } from '../ui/Typography';

export const StressScoreBadge: React.FC<{ score: number }> = ({ score }) => {
  let color = 'green';
  if (score > 50) color = 'orange';
  if (score > 80) color = 'red';

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <TypographyText variant="caption" color="#FFF">Stress: {score}%</TypographyText>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 }
});
