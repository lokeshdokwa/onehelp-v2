import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TypographyText } from '../ui/Typography';
import { useSOSStore } from '../../store/useSOSStore';
import { Card } from '../ui/Card';

export const DispatchStatusCard: React.FC = () => {
  const { status, dispatchMethod, responderETA } = useSOSStore();

  if (status !== 'dispatched') return null;

  return (
    <Card elevated style={styles.card}>
      <TypographyText variant="title">Dispatch Status</TypographyText>
      <TypographyText variant="body">Method: {dispatchMethod}</TypographyText>
      {responderETA > 0 && <TypographyText variant="body" color="green">ETA: {responderETA} mins</TypographyText>}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { marginTop: 16, padding: 16 },
});
