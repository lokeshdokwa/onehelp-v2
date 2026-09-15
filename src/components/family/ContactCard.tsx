import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TypographyText } from '../ui/Typography';
import { Card } from '../ui/Card';

export const ContactCard: React.FC<{ name: string, phone: string, relation: string }> = ({ name, phone, relation }) => {
  return (
    <Card style={styles.card}>
      <TypographyText variant="title">{name}</TypographyText>
      <TypographyText variant="caption">{relation} • {phone}</TypographyText>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: { padding: 16, marginBottom: 12 }
});
