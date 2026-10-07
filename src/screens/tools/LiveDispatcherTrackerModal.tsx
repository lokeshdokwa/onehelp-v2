import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  StatusBar,
  Linking,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon, PhoneCallIcon, MapPinIcon } from '../../components/ui/Icons';

interface LiveDispatcherTrackerModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LiveDispatcherTrackerModal: React.FC<LiveDispatcherTrackerModalProps> = ({
  visible,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [etaMinutes, setEtaMinutes] = useState(4);
  const [vehicleOffset, setVehicleOffset] = useState(0);

  useEffect(() => {
    if (!visible) return;

    // Simulate vehicle movement along route
    const interval = setInterval(() => {
      setVehicleOffset((prev) => (prev >= 180 ? 0 : prev + 15));
    }, 1200);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent={true} onRequestClose={onClose}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn} activeOpacity={0.7}>
            <ArrowLeftIcon size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live Dispatcher Tracker</Text>
          <View style={{ width: 22 }} />
        </View>

        {/* Live Vector Map Simulation */}
        <View style={styles.mapCanvas}>
          <Svg width="100%" height="100%" viewBox="0 0 380 340">
            {/* Background land */}
            <Rect x="0" y="0" width="380" height="340" fill="#E2E8F0" />

            {/* Roads */}
            <Path d="M40 0 L60 340" stroke="#CBD5E1" strokeWidth="16" fill="none" />
            <Path d="M0 160 L380 160" stroke="#CBD5E1" strokeWidth="20" fill="none" />
            <Path d="M0 260 L380 230" stroke="#CBD5E1" strokeWidth="12" fill="none" />

            {/* Emergency Corridor Route (Green Highlight) */}
            <Path
              d="M40 40 L60 160 L300 160"
              stroke="#22C55E"
              strokeWidth="6"
              strokeDasharray="6 4"
              fill="none"
            />

            {/* User Target Marker */}
            <Circle cx="300" cy="160" r="18" fill="rgba(220, 38, 38, 0.25)" />
            <Circle cx="300" cy="160" r="8" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />

            {/* Moving Ambulance Marker */}
            <Circle
              cx={60 + (vehicleOffset * 1.33)}
              cy={160}
              r="14"
              fill="#2563EB"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </Svg>

          {/* Floating Vehicle Badge on Map */}
          <View style={styles.floatingVehicleBadge}>
            <Text style={styles.floatingEmoji}>🚑</Text>
            <View>
              <Text style={styles.floatingTitle}>Ambulance ALS-04</Text>
              <Text style={styles.floatingSub}>Speed: 52 km/h • Siren Active</Text>
            </View>
          </View>
        </View>

        {/* Dispatcher Details Card */}
        <View style={[styles.dispatchCard, { paddingBottom: Math.max(insets.bottom + 16, 28) }]}>
          <View style={styles.etaRow}>
            <View>
              <Text style={styles.etaLabel}>ESTIMATED ARRIVAL</Text>
              <Text style={styles.etaTime}>0{etaMinutes}:32 mins</Text>
            </View>
            <View style={styles.badgeLive}>
              <View style={styles.greenDot} />
              <Text style={styles.badgeLiveText}>LIVE DISPATCH</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.responderRow}>
            <View style={styles.responderAvatar}>
              <Text style={styles.responderEmoji}>👨‍⚕️</Text>
            </View>
            <View style={styles.responderInfo}>
              <Text style={styles.responderName}>Officer Dr. Rajat Sharma</Text>
              <Text style={styles.responderVehicle}>Unit: RJ14-EA-2026 (Advanced Life Support)</Text>
              <Text style={styles.responderDist}>Distance: 1.8 km away • JLN Flyover</Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.callResponderBtn}
              onPress={() => Linking.openURL('tel:108').catch(() => {})}
              activeOpacity={0.85}
            >
              <PhoneCallIcon size={18} color="#FFFFFF" />
              <Text style={styles.callResponderText}>Call Driver (108)</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeTrackerBtn} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.closeTrackerText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
    padding: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  mapCanvas: {
    flex: 1,
    backgroundColor: '#E2E8F0',
    position: 'relative',
  },
  floatingVehicleBadge: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  floatingEmoji: {
    fontSize: 24,
  },
  floatingTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  floatingSub: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: '600',
  },
  dispatchCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
  etaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  etaTime: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 2,
  },
  badgeLive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#16A34A',
  },
  badgeLiveText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#15803D',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 16,
  },
  responderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  responderAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  responderEmoji: {
    fontSize: 24,
  },
  responderInfo: {
    flex: 1,
  },
  responderName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  responderVehicle: {
    fontSize: 12,
    color: '#475569',
    marginTop: 2,
  },
  responderDist: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  callResponderBtn: {
    flex: 2,
    backgroundColor: '#16A34A',
    height: 48,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  callResponderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  closeTrackerBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeTrackerText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '700',
  },
});
