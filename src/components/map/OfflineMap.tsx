import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TypographyText } from '../ui/Typography';

export const OfflineMap: React.FC<{ lat: number, lng: number }> = ({ lat, lng }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: lat, longitude: lng }} />
      </MapView>
      <View style={styles.overlay}>
        <TypographyText variant="caption" align="center" style={{ backgroundColor: 'rgba(255,255,255,0.8)', padding: 4, borderRadius: 4 }}>
          Lat: {lat.toFixed(4)}, Lng: {lng.toFixed(4)}
        </TypographyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#A8DADC', overflow: 'hidden', borderRadius: 8 },
  map: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 10, left: 0, right: 0, alignItems: 'center' }
});
