import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { SafeAreaView } from '../../components/ui/SafeAreaView';
import { TypographyText } from '../../components/ui/Typography';
import { useLocationStore } from '../../store/useLocationStore';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { defaultTheme } from '../../theme/defaultTheme';

export const MapScreen: React.FC = () => {
  const { location, gpsStatus } = useLocationStore();
  const [tracking, setTracking] = useState(false);

  const defaultLocation = {
    latitude: location?.latitude ?? 20.5937,
    longitude: location?.longitude ?? 78.9629,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleWhatsAppBlast = () => {
    const msg = encodeURIComponent(
      `🆘 EMERGENCY: I need help! My location: https://maps.google.com/?q=${defaultLocation.latitude},${defaultLocation.longitude}`
    );
    Linking.openURL(`whatsapp://send?text=${msg}`).catch(() =>
      Alert.alert('WhatsApp not installed')
    );
  };

  const handleTrackMe = () => {
    setTracking(!tracking);
    Alert.alert(
      tracking ? 'Track Me Off' : 'Track Me On',
      tracking ? 'Location sharing stopped.' : 'Sharing live location with your circle.'
    );
  };

  const handle2GChat = () => {
    Alert.alert('2G Chat', 'Offline mesh chat is not yet available in this area.');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TypographyText variant="title">Offline Map & Hazards</TypographyText>
          <TypographyText variant="caption">
            GPS Status: {gpsStatus.toUpperCase()}
          </TypographyText>
        </View>

        {/* Map */}
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={defaultLocation}
          >
            {location && (
              <Marker
                coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                title="You are here"
                pinColor={defaultTheme.colors.emergency}
              />
            )}
          </MapView>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.actionStrip}>
          <TouchableOpacity
            style={[styles.actionBtn, tracking && styles.actionBtnActive]}
            onPress={handleTrackMe}
          >
            <TypographyText variant="caption" style={styles.actionText}>
              {tracking ? '📍 TRACKING' : '📍 Track Me'}
            </TypographyText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.actionBtnWhatsApp]}
            onPress={handleWhatsAppBlast}
          >
            <TypographyText variant="caption" style={styles.actionText}>
              💬 WA Blast
            </TypographyText>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, styles.actionBtn2G]} onPress={handle2GChat}>
            <TypographyText variant="caption" style={styles.actionText}>
              📡 2G Chat
            </TypographyText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  actionStrip: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    paddingBottom: 8,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: defaultTheme.colors.surfaceElevated,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: defaultTheme.colors.border,
  },
  actionBtnActive: {
    backgroundColor: 'rgba(230, 57, 70, 0.2)',
    borderColor: defaultTheme.colors.emergency,
  },
  actionBtnWhatsApp: {
    backgroundColor: 'rgba(37, 211, 102, 0.15)',
    borderColor: '#25D366',
  },
  actionBtn2G: {
    backgroundColor: 'rgba(69, 123, 157, 0.2)',
    borderColor: defaultTheme.colors.info,
  },
  actionText: {
    fontWeight: '700',
    fontSize: 11,
  },
});
