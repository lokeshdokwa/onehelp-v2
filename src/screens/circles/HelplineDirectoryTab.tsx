import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { SEED_HELPLINES } from '../../database/seeds/helplineSeeds';

export const HelplineDirectoryTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={SEED_HELPLINES}
        keyExtractor={i => i.name}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <View>
              <TypographyText variant="title">{item.name}</TypographyText>
              <TypographyText variant="caption">{item.category.toUpperCase()}</TypographyText>
            </View>
            <TypographyText variant="title" color="#E63946">{item.number}</TypographyText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: '#EEE' },
});
