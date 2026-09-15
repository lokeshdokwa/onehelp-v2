import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const AmbulanceMarker: React.FC = () => {
  return (
    <View style={styles.marker}>
      <Icon name="ambulance" size={20} color="#FFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  marker: { backgroundColor: '#E63946', borderRadius: 16, padding: 4, borderWidth: 2, borderColor: '#FFF' }
});
