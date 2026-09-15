import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TypographyText } from '../ui/Typography';
import { Card } from '../ui/Card';

export const FamilyCircleCard: React.FC<{ name: string, status: string }> = ({ name, status }) => {
  return (
    <Card style={styles.card}>
      <TypographyText variant="title">{name}</TypographyText>
      <TypographyText variant="caption" color={status === 'Safe' ? 'green' : 'red'}>{status}</TypographyText>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
});
