import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { Card } from '../../components/ui/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const FamilyCirclesTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.row}>
          <Icon name="user" size={24} />
          <View style={styles.info}>
            <TypographyText variant="title">Mom</TypographyText>
            <TypographyText variant="caption" color="green">Safe • 2km away</TypographyText>
          </View>
          <Icon name="chat" size={24} />
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center' },
  info: { flex: 1, marginLeft: 16 },
});
