import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const HazardPin: React.FC<{ type: string }> = ({ type }) => {
  return (
    <View style={styles.pin}>
      <Icon name="warning" size={24} color="#FFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  pin: { backgroundColor: '#E63946', borderRadius: 16, padding: 4 }
});
