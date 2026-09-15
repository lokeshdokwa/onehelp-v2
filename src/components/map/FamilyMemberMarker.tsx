import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const FamilyMemberMarker: React.FC = () => {
  return (
    <View style={styles.marker}>
      <Icon name="user" size={20} color="#FFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: { backgroundColor: '#457B9D', borderRadius: 16, padding: 4, borderWidth: 2, borderColor: '#FFF' }
});
