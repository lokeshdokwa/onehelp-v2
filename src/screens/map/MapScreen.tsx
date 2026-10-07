import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Polygon } from 'react-native-svg';
import {
  ArrowLeftIcon,
  AlertTriangleIcon,
  RefreshIcon,
  MapPinIcon,
} from '../../components/ui/Icons';
import { useLocationStore } from '../../store/useLocationStore';

interface MapScreenProps {
  onBack?: () => void;
}

export const MapScreen: React.FC<MapScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const { location, address } = useLocationStore();
  const [selectedHazard, setSelectedHazard] = useState<string | null>('flood');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');

  const currentArea = address || (location ? `${location.latitude.toFixed(3)}°, ${location.longitude.toFixed(3)}°` : 'Current Area');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Updated just now');
      Alert.alert('Hazard Map Updated', `Offline vector tiles and hazard telemetry refreshed for ${currentArea}.`);
    }, 800);
  };

  const handleShowAdvisory = () => {
    Alert.alert(
      '⚠️ Active Hazard Advisory',
      `Monitored Sector: ${currentArea}\nCoordinates: ${location ? `${location.latitude.toFixed(4)}°, ${location.longitude.toFixed(4)}°` : 'GPS Acquired'}\n\nStatus: Monitored Zone (Safe with cautionary advisory)\nEmergency response units standing by.`,
      [{ text: 'Understood' }]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <ArrowLeftIcon size={22} color="#0F172A" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 22 }} />
        )}
        <Text style={styles.headerTitle}>Live Hazard Map</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Warning Alert Banner */}
      <TouchableOpacity
        style={styles.warningBanner}
        onPress={handleShowAdvisory}
        activeOpacity={0.8}
      >
        <AlertTriangleIcon size={22} color="#DC2626" />
        <View style={styles.warningTextCol}>
          <Text style={styles.warningTitle}>Danger Zone Ahead (Tap for Advisory)</Text>
          <Text style={styles.warningSub}>Flood risk area detected • Tap for detour routes</Text>
        </View>
      </TouchableOpacity>

      {/* Map Graphic Canvas */}
      <View style={styles.mapCanvas}>
        <Svg width="100%" height="100%" viewBox="0 0 380 440">
          {/* Base Map Roads & Land */}
          <Rect x="0" y="0" width="380" height="440" fill="#F1F5F9" />

          {/* Waterway / River */}
          <Path
            d="M-20 60 Q 100 90, 160 180 T 260 320 T 300 460"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="28"
          />

          {/* Road Network */}
          <Path d="M0 120 L380 140" stroke="#CBD5E1" strokeWidth="8" />
          <Path d="M0 240 L380 200" stroke="#CBD5E1" strokeWidth="6" />
          <Path d="M0 360 L380 340" stroke="#CBD5E1" strokeWidth="6" />
          <Path d="M80 0 L110 440" stroke="#CBD5E1" strokeWidth="6" />
          <Path d="M220 0 L200 440" stroke="#CBD5E1" strokeWidth="8" />
          <Path d="M320 0 L310 440" stroke="#CBD5E1" strokeWidth="5" />

          {/* Danger Zone Shaded Polygon (Red overlay) */}
          {(selectedHazard === 'flood' || selectedHazard === null) && (
            <Polygon
              points="140,80 280,110 310,240 180,260 120,180"
              fill="rgba(239, 68, 68, 0.22)"
              stroke="#DC2626"
              strokeWidth="2"
              strokeDasharray="6 4"
            />
          )}

          {/* User Location Marker (Blue pulse) */}
          <Circle cx="100" cy="300" r="16" fill="rgba(37, 99, 235, 0.2)" />
          <Circle cx="100" cy="300" r="7" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />

          {/* Hazard Marker 1: Flood Risk (Red pin) */}
          {(selectedHazard === 'flood' || selectedHazard === null) && (
            <G x={210} y={150}>
              <Circle cx="12" cy="12" r="14" fill="#DC2626" />
              <Path d="M12 6L7 16H17L12 6Z" fill="#FFF" />
            </G>
          )}

          {/* Hazard Marker 2: Fire Risk */}
          {(selectedHazard === 'fire' || selectedHazard === null) && (
            <G x={250} y={210}>
              <Circle cx="12" cy="12" r="14" fill="#EA580C" />
              <Path d="M12 6C12 6 15 9 15 12C15 13.6 13.5 15 12 15C10.5 15 9 13.6 9 12C9 9 12 6 12 6Z" fill="#FFF" />
            </G>
          )}

          {/* Hazard Marker 3: Landslide Risk */}
          {(selectedHazard === 'landslide' || selectedHazard === null) && (
            <G x={140} y={220}>
              <Circle cx="12" cy="12" r="14" fill="#D97706" />
              <Path d="M8 15L16 15L12 9Z" fill="#FFF" />
            </G>
          )}
        </Svg>

        {/* Floating Hazard Info Callout */}
        <TouchableOpacity
          style={styles.hazardOverlayBadge}
          onPress={() =>
            Alert.alert(
              `Active Telemetry: ${currentArea}`,
              `1. Local Sector: ${currentArea}\n2. Offline Hazard Grid: Active\n3. GPS Lat/Lng: ${location ? `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}` : 'Active'}\n4. Nearest Response Hub: Station Alerted`
            )
          }
          activeOpacity={0.8}
        >
          <Text style={styles.hazardOverlayTitle}>⚠️ Telemetry: {currentArea} (Tap Info)</Text>
        </TouchableOpacity>
      </View>

      {/* Legend & Refresh Footer */}
      <View style={styles.footerBar}>
        <View style={styles.legendGroup}>
          <TouchableOpacity
            style={[
              styles.legendItem,
              selectedHazard === 'flood' && styles.legendItemActive,
            ]}
            onPress={() =>
              setSelectedHazard(selectedHazard === 'flood' ? null : 'flood')
            }
          >
            <View style={[styles.legendDot, { backgroundColor: '#DC2626' }]} />
            <Text style={styles.legendText}>Flood</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.legendItem,
              selectedHazard === 'fire' && styles.legendItemActive,
            ]}
            onPress={() =>
              setSelectedHazard(selectedHazard === 'fire' ? null : 'fire')
            }
          >
            <View style={[styles.legendDot, { backgroundColor: '#EA580C' }]} />
            <Text style={styles.legendText}>Fire</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.legendItem,
              selectedHazard === 'landslide' && styles.legendItemActive,
            ]}
            onPress={() =>
              setSelectedHazard(selectedHazard === 'landslide' ? null : 'landslide')
            }
          >
            <View style={[styles.legendDot, { backgroundColor: '#D97706' }]} />
            <Text style={styles.legendText}>Landslide</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.refreshBtn}
          onPress={handleRefresh}
          activeOpacity={0.8}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <ActivityIndicator size="small" color="#2563EB" />
          ) : (
            <>
              <RefreshIcon size={16} color="#2563EB" />
              <Text style={styles.refreshText}>Refresh</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

// SVG Group component helper
const G = ({ x, y, children }: { x: number; y: number; children: React.ReactNode }) => (
  <View style={{ position: 'absolute', left: x, top: y }}>
    <Svg width={30} height={30} viewBox="0 0 24 24">
      {children}
    </Svg>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 12,
    borderRadius: 14,
    gap: 12,
  },
  warningTextCol: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#DC2626',
  },
  warningSub: {
    fontSize: 12,
    fontWeight: '500',
    color: '#991B1B',
    marginTop: 2,
  },
  mapCanvas: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    position: 'relative',
    overflow: 'hidden',
  },
  hazardOverlayBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hazardOverlayTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },
  footerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  legendGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  legendItemActive: {
    backgroundColor: '#F1F5F9',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
  refreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  refreshText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
});
