import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TypographyText } from '../../components/ui/Typography';
import { SEED_GUIDES } from '../../database/seeds/guideSeeds';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const SurvivalGuidesTab: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={SEED_GUIDES}
        keyExtractor={i => i.title}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <Icon name={item.icon_name || 'book'} size={24} color="#1D3557" />
            <View style={styles.textContainer}>
              <TypographyText variant="title">{item.title}</TypographyText>
              <TypographyText variant="caption">{item.category.toUpperCase()}</TypographyText>
            </View>
            <Icon name="chevron-right" size={24} color="#CCC" />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#EEE' },
  textContainer: { flex: 1, marginLeft: 16 },
});
