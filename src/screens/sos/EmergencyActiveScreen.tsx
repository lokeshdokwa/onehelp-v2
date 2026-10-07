import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  MapPinIcon,
  BatteryIcon,
  WifiIcon,
  CheckIcon,
  PoliceServiceIcon,
  AmbulanceServiceIcon,
  FireServiceIcon,
  DisasterServiceIcon,
} from '../../components/ui/Icons';
import { useLocationStore } from '../../store/useLocationStore';
import { useDeviceStatusStore } from '../../store/useDeviceStatusStore';

interface EmergencyActiveScreenProps {
  onCancel: () => void;
  onViewMap?: () => void;
  onViewRouting?: () => void;
  onViewLiveTracker?: () => void;
}

export const EmergencyActiveScreen: React.FC<EmergencyActiveScreenProps> = ({
  onCancel,
  onViewMap,
  onViewRouting,
  onViewLiveTracker,
}) => {
  const insets = useSafeAreaInsets();
  const location = useLocationStore((s) => s.location);
  const address = useLocationStore((s) => s.address);
  const fullAddress = useLocationStore((s) => s.fullAddress);
  const { batteryLevel, isOnline } = useDeviceStatusStore();
  const [seconds, setSeconds] = useState(272); // 00:04:32
  const [recPulse, setRecPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    const pulseInterval = setInterval(() => {
      setRecPulse((p) => !p);
    }, 700);
    return () => {
      clearInterval(interval);
      clearInterval(pulseInterval);
    };
  }, []);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    const pad = (n: number) => (n < 10 ? `0${n}` : n);
    return `00:${pad(mins)}:${pad(secs)}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#DC2626" />

      {/* Top Emergency Red Banner */}
      <View style={[styles.topBanner, { paddingTop: Math.max(insets.top, 20) }]}>
        <Text style={styles.bannerTitle}>Emergency Active</Text>

        {/* Circular Timer with Cancel Button */}
        <View style={styles.timerCircle}>
          <Text style={styles.timerText}>{formatTimer(seconds)}</Text>
          <Text style={styles.timerSubtext}>Emergency in Progress</Text>
          <TouchableOpacity style={styles.cancelBtn} onPress={onCancel} activeOpacity={0.8}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Live Location Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeaderLeft}>
              <MapPinIcon size={20} color="#DC2626" />
              <Text style={styles.cardTitle}>Live Location</Text>
            </View>
            {onViewMap && (
              <TouchableOpacity onPress={onViewMap}>
                <Text style={styles.viewMapLink}>View Map</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.coordinatesText}>
            {location ? `${location.latitude.toFixed(4)}° N, ${location.longitude.toFixed(4)}° E` : 'Locating GPS Coordinates...'}
          </Text>
          <Text style={styles.addressText}>
            {fullAddress || address || 'Fetching local emergency address...'}
          </Text>

          {/* Mini Map Thumbnail */}
          <View style={styles.mapThumb}>
            <View style={styles.mapRoad1} />
            <View style={styles.mapRoad2} />
            <View style={styles.mapPinContainer}>
              <MapPinIcon size={24} color="#DC2626" />
            </View>
          </View>
        </View>

        {/* Status Indicators (3 Pills: Compact Battery, Compact Network, Spacious Audio Rec) */}
        <View style={styles.statusRow}>
          <View style={styles.batteryPill}>
            <BatteryIcon
              size={14}
              color={batteryLevel <= 20 ? '#DC2626' : batteryLevel <= 50 ? '#F59E0B' : '#16A34A'}
            />
            <Text
              style={[
                styles.statusText,
                { color: batteryLevel <= 20 ? '#DC2626' : '#334155' },
              ]}
            >
              {batteryLevel}%
            </Text>
          </View>
          <View style={[styles.networkPill, !isOnline && styles.offlinePill]}>
            <WifiIcon size={14} color={isOnline ? '#16A34A' : '#DC2626'} />
            <Text style={[styles.statusText, { color: isOnline ? '#16A34A' : '#DC2626' }]}>
              {isOnline ? 'Online' : 'Offline'}
            </Text>
          </View>
          <View style={styles.audioPill}>
            <View style={[styles.recDotCircle, { opacity: recPulse ? 1 : 0.25 }]} />
            <Text style={styles.audioStatusText} numberOfLines={1}>Recording 10s audio</Text>
          </View>
        </View>

        {/* Trusted Contacts Notification Card */}
        <View style={styles.notifiedCard}>
          <View style={styles.checkCircle}>
            <CheckIcon size={16} color="#FFFFFF" />
          </View>
          <View style={styles.notifiedTextCol}>
            <Text style={styles.notifiedTitle}>Trusted Contacts Notified</Text>
            <Text style={styles.notifiedSub}>Your family has been alerted via SMS & WhatsApp.</Text>
          </View>
        </View>

        {/* Live Dispatcher Tracker Card (SIH Feature #8) */}
        {onViewLiveTracker && (
          <TouchableOpacity
            style={styles.liveTrackerCard}
            onPress={onViewLiveTracker}
            activeOpacity={0.85}
          >
            <View style={styles.liveTrackerTopRow}>
              <View style={styles.liveTrackerBadge}>
                <Text style={styles.liveTrackerDot}>●</Text>
                <Text style={styles.liveTrackerBadgeText}>LIVE VEHICLE TELEMETRY</Text>
              </View>
              <Text style={styles.liveTrackerEta}>ETA: 04:32 MINS</Text>
            </View>
            <Text style={styles.liveTrackerTitle}>Ambulance Unit RJ14-EA-2026</Text>
            <Text style={styles.liveTrackerSub}>
              {`Dr. Rajat Sharma en route towards ${address || 'your location'} (0.8 km). Tap to view live moving map & direct driver call ›`}
            </Text>
          </TouchableOpacity>
        )}

        {/* Automatic Routing Card */}
        <TouchableOpacity
          style={styles.routingCard}
          onPress={onViewRouting}
          activeOpacity={0.85}
        >
          <View style={styles.routingHeader}>
            <Text style={styles.routingTitle}>Automatic Routing</Text>
            <Text style={styles.routingSub}>Finding best response team...</Text>
          </View>

          <View style={styles.agenciesRow}>
            <View style={styles.agencyBadge}>
              <PoliceServiceIcon size={34} />
              <Text style={styles.agencyName}>Police</Text>
            </View>
            <View style={styles.agencyBadge}>
              <AmbulanceServiceIcon size={34} />
              <Text style={styles.agencyName}>Ambulance</Text>
            </View>
            <View style={styles.agencyBadge}>
              <FireServiceIcon size={34} />
              <Text style={styles.agencyName}>Fire</Text>
            </View>
            <View style={styles.agencyBadge}>
              <DisasterServiceIcon size={34} />
              <Text style={styles.agencyName}>Disaster</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBanner: {
    backgroundColor: '#DC2626',
    paddingTop: 16,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.2,
    marginBottom: 16,
  },
  timerCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  timerSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 10,
  },
  cancelBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 14,
  },
  cancelBtnText: {
    color: '#DC2626',
    fontWeight: '800',
    fontSize: 12,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  viewMapLink: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
  },
  coordinatesText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
    marginTop: 2,
  },
  addressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 2,
    marginBottom: 12,
  },
  mapThumb: {
    height: 80,
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapRoad1: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    height: 8,
    backgroundColor: '#BAE6FD',
    transform: [{ rotate: '-12deg' }],
  },
  mapRoad2: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#BAE6FD',
    transform: [{ rotate: '25deg' }],
  },
  mapPinContainer: {
    zIndex: 5,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  batteryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexShrink: 0,
  },
  networkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexShrink: 0,
  },
  offlinePill: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  audioPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#FFF1F2',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECDD3',
  },
  recDotCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DC2626',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  audioStatusText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#BE123C',
  },
  notifiedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    gap: 12,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifiedTextCol: {
    flex: 1,
  },
  notifiedTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#15803D',
  },
  notifiedSub: {
    fontSize: 12,
    color: '#166534',
    marginTop: 2,
  },
  liveTrackerCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  liveTrackerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  liveTrackerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#064E3B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  liveTrackerDot: {
    color: '#10B981',
    fontSize: 10,
    marginRight: 4,
  },
  liveTrackerBadgeText: {
    color: '#6EE7B7',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveTrackerEta: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '800',
  },
  liveTrackerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  liveTrackerSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
  },
  routingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  routingHeader: {
    marginBottom: 12,
  },
  routingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  routingSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  agenciesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  agencyBadge: {
    alignItems: 'center',
    flex: 1,
  },
  agencyName: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '600',
    color: '#475569',
  },
});
