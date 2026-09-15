import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TypographyText } from '../ui/Typography';
import { useSOSStore } from '../../store/useSOSStore';

export const SOSActiveScreen: React.FC = () => {
  const { dispatchMethod, dispatchTimestamp } = useSOSStore();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TypographyText variant="display" color="#FFF">EMERGENCY ACTIVE</TypographyText>
      </View>
      <View style={styles.content}>
        <TypographyText variant="body" color="#FFF">Transmitting location...</TypographyText>
        <TypographyText variant="caption" color="#FFF">Via: {dispatchMethod.toUpperCase()}</TypographyText>
        {dispatchTimestamp > 0 && <TypographyText variant="caption" color="#FFF">Dispatched at: {new Date(dispatchTimestamp).toLocaleTimeString()}</TypographyText>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, backgroundColor: '#8B0000', zIndex: 500, padding: 24, justifyContent: 'space-between' },
  header: { marginTop: 60, alignItems: 'center' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
