import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TypographyText } from '../ui/Typography';
import { Card } from '../ui/Card';

const SIGNS = ['Help', 'Police', 'Ambulance', 'Fire', 'Pain', 'Thirsty', 'Hungry', 'Lost'];

export const SignLanguageGrid: React.FC = () => {
  return (
    <FlatList
      data={SIGNS}
      numColumns={2}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.gridItem}>
          <Card style={styles.card}>
            <TypographyText variant="title" align="center">{item}</TypographyText>
          </Card>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  gridItem: { flex: 1, margin: 8 },
  card: { height: 100, justifyContent: 'center', alignItems: 'center' }
});
