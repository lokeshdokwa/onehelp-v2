import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ShieldPlusIcon,
  SettingsIcon,
  MapPinIcon,
  WifiIcon,
  BatteryIcon,
  ChevronRightIcon,
  PoliceServiceIcon,
  FireServiceIcon,
  AmbulanceServiceIcon,
  DisasterServiceIcon,
} from '../../components/ui/Icons';
import { useSOSStore } from '../../store/useSOSStore';
import { useLocationStore } from '../../store/useLocationStore';
import { useDeviceStatusStore } from '../../store/useDeviceStatusStore';
import { DeviceStatusService } from '../../services/DeviceStatusService';

interface HomeScreenProps {
  onTriggerSOS: () => void;
  onOpenSettings: () => void;
  onOpenFamily: () => void;
  onOpenMap?: () => void;
  onOpenService?: (service: 'police' | 'fire' | 'ambulance' | 'disaster') => void;
  onOpenToolsModal?: () => void;
  onOpenAIAssistant?: () => void;
  onOpenLostChild?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onTriggerSOS,
  onOpenSettings,
  onOpenFamily,
  onOpenMap,
  onOpenService,
  onOpenToolsModal,
  onOpenAIAssistant,
  onOpenLostChild,
}) => {
  const { status } = useSOSStore();
  const location = useLocationStore((s) => s.location);
  const address = useLocationStore((s) => s.address);
  const { batteryLevel, isOnline, networkType, isLocating } = useDeviceStatusStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    DeviceStatusService.start();
  }, []);
  const [selectedService, setSelectedService] = useState<{
    type: 'police' | 'fire' | 'ambulance' | 'disaster';
    title: string;
    number: string;
    desc: string;
    color: string;
  } | null>(null);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <View style={styles.brandRow}>
            <ShieldPlusIcon size={28} color="#DC2626" />
            <Text style={styles.brandTitle}>OneHelp</Text>
          </View>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={onOpenSettings}
            activeOpacity={0.7}
          >
            <SettingsIcon size={22} color="#475569" />
          </TouchableOpacity>
        </View>

        {/* Location & Status Bar */}
        <TouchableOpacity
          style={styles.locationBar}
          onPress={() => {
            const full = useLocationStore.getState().fullAddress;
            Alert.alert(
              '📍 Real GPS Hardware Location',
              `Sector / Area: ${address || 'Locating...'}\n${full ? `\nFull Address:\n${full}\n` : ''}\nCoordinates: ${location ? `${location.latitude.toFixed(5)}°, ${location.longitude.toFixed(5)}°` : 'Acquiring'}\nAccuracy: ±${location ? location.accuracy.toFixed(0) : 10}m\nProvider: Android Hardware GPS & Google Geocoder`,
              [
                { text: 'View Map', onPress: onOpenMap },
                { text: 'OK', style: 'cancel' }
              ]
            );
          }}
          activeOpacity={0.75}
        >
          <View style={styles.locationLeft}>
            <MapPinIcon size={18} color="#2563EB" />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.locationLabel}>Your Location</Text>
              <Text style={styles.locationValue} numberOfLines={1} ellipsizeMode="tail">
                {address || (isLocating ? 'Detecting GPS...' : location ? `${location.latitude.toFixed(4)}°, ${location.longitude.toFixed(4)}°` : 'Tap to acquire GPS')}
              </Text>
              {location ? (
                <Text style={styles.locationCoords} numberOfLines={1}>
                  {`${location.latitude.toFixed(4)}°, ${location.longitude.toFixed(4)}°`}
                </Text>
              ) : (
                <Text style={styles.locationCoords}>GPS Active • Auto-sync</Text>
              )}
            </View>
          </View>

          <View style={styles.statusGroup}>
            <TouchableOpacity
              style={[
                styles.statusPill,
                !isOnline && { backgroundColor: '#FEF2F2', borderColor: '#FECACA' },
              ]}
              onPress={() =>
                Alert.alert(
                  'Real Network Status',
                  isOnline
                    ? `Status: Online (${networkType.toUpperCase()})\nInternet Connection: Verified\nOffline Local Database: Ready`
                    : 'Status: Offline\nNo Internet Connection Detected\nOffline Fallback: Active'
                )
              }
              activeOpacity={0.7}
            >
              <WifiIcon size={13} color={isOnline ? '#16A34A' : '#DC2626'} />
              <Text style={[styles.statusValue, { color: isOnline ? '#16A34A' : '#DC2626' }]}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.statusPill}
              onPress={() =>
                Alert.alert(
                  'Hardware Battery Level',
                  `Level: ${batteryLevel}%\nHardware: Android BatteryManager\nStatus: Live Read`
                )
              }
              activeOpacity={0.7}
            >
              <BatteryIcon
                size={14}
                color={batteryLevel <= 20 ? '#DC2626' : batteryLevel <= 50 ? '#F59E0B' : '#16A34A'}
              />
              <Text
                style={[
                  styles.statusValue,
                  {
                    color:
                      batteryLevel <= 20
                        ? '#DC2626'
                        : batteryLevel <= 50
                        ? '#D97706'
                        : '#16A34A',
                  },
                ]}
              >
                {batteryLevel}%
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Hero SOS Button Section */}
        <View style={styles.sosContainer}>
          {/* Subtle Outer Glow Rings */}
          <View style={styles.pulseRing3} />
          <View style={styles.pulseRing2} />
          <View style={styles.pulseRing1} />

          {/* Main SOS Button */}
          <TouchableOpacity
            style={styles.sosButton}
            onPress={onTriggerSOS}
            activeOpacity={0.88}
          >
            <Text style={styles.sosText}>SOS</Text>
            <Text style={styles.sosSubtext}>Press for Emergency</Text>
          </TouchableOpacity>
        </View>

        {/* Trusted Contacts Card */}
        <TouchableOpacity
          style={styles.contactsCard}
          onPress={onOpenFamily}
          activeOpacity={0.8}
        >
          <View style={styles.contactsLeft}>
            <View style={styles.contactsIconCircle}>
              <Text style={styles.contactsIconEmoji}>👥</Text>
            </View>
            <View>
              <Text style={styles.contactsTitle}>Trusted Contacts</Text>
              <Text style={styles.contactsSubtitle}>3 contacts • Tap to manage</Text>
            </View>
          </View>
          <ChevronRightIcon size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Emergency Services Grid */}
        <View style={styles.servicesSection}>
          <Text style={styles.servicesTitle}>Emergency Services</Text>

          <View style={styles.servicesGrid}>
            <TouchableOpacity
              style={styles.serviceBtn}
              onPress={() =>
                setSelectedService({
                  type: 'police',
                  title: 'Police Emergency',
                  number: '112',
                  desc: 'Immediate dispatch for safety, crime reporting, or personal distress.',
                  color: '#2563EB',
                })
              }
              activeOpacity={0.8}
            >
              <PoliceServiceIcon size={46} />
              <Text style={styles.serviceText}>Police</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceBtn}
              onPress={() =>
                setSelectedService({
                  type: 'fire',
                  title: 'Fire Brigade',
                  number: '101',
                  desc: 'Fire accidents, hazardous leaks, and building evacuation.',
                  color: '#DC2626',
                })
              }
              activeOpacity={0.8}
            >
              <FireServiceIcon size={46} />
              <Text style={styles.serviceText}>Fire</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceBtn}
              onPress={() =>
                setSelectedService({
                  type: 'ambulance',
                  title: 'Medical Ambulance',
                  number: '108',
                  desc: 'Emergency patient transit, cardiac response & trauma care.',
                  color: '#16A34A',
                })
              }
              activeOpacity={0.8}
            >
              <AmbulanceServiceIcon size={46} />
              <Text style={styles.serviceText}>Ambulance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceBtn}
              onPress={() =>
                setSelectedService({
                  type: 'disaster',
                  title: 'Disaster Relief Helpline',
                  number: '1077',
                  desc: 'Floods, severe weather, structural hazards & rescue coordination.',
                  color: '#D97706',
                })
              }
              activeOpacity={0.8}
            >
              <DisasterServiceIcon size={46} />
              <Text style={styles.serviceText}>Disaster</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Emergency Assistant Offline Card */}
        {onOpenAIAssistant && (
          <TouchableOpacity
            style={styles.aiAssistantCard}
            onPress={onOpenAIAssistant}
            activeOpacity={0.8}
          >
            <View style={styles.aiCardLeft}>
              <View style={styles.aiIconBubble}>
                <Text style={styles.aiIconEmoji}>🤖</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.aiTitleRow}>
                  <Text style={styles.aiCardTitle}>AI Emergency Assistant</Text>
                  <View style={styles.aiOfflinePill}>
                    <Text style={styles.aiOfflinePillText}>100% OFFLINE</Text>
                  </View>
                </View>
                <Text style={styles.aiCardSubtitle} numberOfLines={1}>
                  Instant medical triage, CPR & disaster guidance
                </Text>
              </View>
            </View>
            <ChevronRightIcon size={18} color="#2563EB" />
          </TouchableOpacity>
        )}

        {/* SIH Feature #26: Lost Child AI Face Matcher Button */}
        {onOpenLostChild && (
          <TouchableOpacity
            style={[styles.aiAssistantCard, { marginTop: 10, borderColor: '#FEE2E2', backgroundColor: '#FFF5F5' }]}
            onPress={onOpenLostChild}
            activeOpacity={0.8}
          >
            <View style={styles.aiCardLeft}>
              <View style={[styles.aiIconBubble, { backgroundColor: '#FEE2E2' }]}>
                <Text style={styles.aiIconEmoji}>👦</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.aiTitleRow}>
                  <Text style={[styles.aiCardTitle, { color: '#991B1B' }]}>Lost Child AI Face Matcher</Text>
                  <View style={[styles.aiOfflinePill, { backgroundColor: '#DC2626' }]}>
                    <Text style={styles.aiOfflinePillText}>100% OFFLINE</Text>
                  </View>
                </View>
                <Text style={[styles.aiCardSubtitle, { color: '#7F1D1D' }]} numberOfLines={1}>
                  On-device biometric match • Rajasthan Police DB
                </Text>
              </View>
            </View>
            <ChevronRightIcon size={18} color="#DC2626" />
          </TouchableOpacity>
        )}

        {/* Bottom Helper Bar for Quick Trigger Simulator */}
        {onOpenToolsModal && (
          <TouchableOpacity
            style={styles.testTriggersBtn}
            onPress={onOpenToolsModal}
            activeOpacity={0.8}
          >
            <Text style={styles.testTriggersText}>⚡ Quick Triggers & Simulation Tools</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Emergency Service Action Modal */}
      <Modal
        visible={selectedService !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedService(null)}
      >
        <View style={styles.serviceModalOverlay}>
          <View style={styles.serviceModalCard}>
            <View
              style={[
                styles.serviceBadgeHeader,
                { backgroundColor: selectedService?.color || '#DC2626' },
              ]}
            >
              <Text style={styles.serviceModalTitle}>
                {selectedService?.title}
              </Text>
              <Text style={styles.serviceModalNumber}>
                Direct Helpline: {selectedService?.number}
              </Text>
            </View>

            <Text style={styles.serviceModalDesc}>
              {selectedService?.desc}
            </Text>

            <TouchableOpacity
              style={[
                styles.serviceCallBtn,
                { backgroundColor: selectedService?.color || '#2563EB' },
              ]}
              onPress={() => {
                const num = selectedService?.number;
                setSelectedService(null);
                if (num) {
                  Linking.openURL(`tel:${num}`).catch(() => {
                    Alert.alert('Calling unavailable', `Please dial ${num} directly.`);
                  });
                }
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.serviceCallBtnText}>
                📞 Call Now ({selectedService?.number})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceSosBtn}
              onPress={() => {
                setSelectedService(null);
                onTriggerSOS();
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.serviceSosBtnText}>
                🚨 Send Emergency SOS Alert
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.serviceCancelBtn}
              onPress={() => setSelectedService(null)}
            >
              <Text style={styles.serviceCancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 110,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  locationLeft: {
    flexDirection: 'row',
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    gap: 10,
    marginRight: 8,
  },
  locationLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  locationValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  locationCoords: {
    fontSize: 10,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 1,
  },
  statusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statusLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#64748B',
  },
  statusValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#16A34A',
  },
  sosContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    marginVertical: 10,
  },
  pulseRing3: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  pulseRing2: {
    position: 'absolute',
    width: 215,
    height: 215,
    borderRadius: 107.5,
    backgroundColor: 'rgba(239, 68, 68, 0.14)',
  },
  pulseRing1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(239, 68, 68, 0.22)',
  },
  sosButton: {
    width: 155,
    height: 155,
    borderRadius: 77.5,
    backgroundColor: '#DC2626',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  sosText: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 2,
  },
  sosSubtext: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  contactsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  contactsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactsIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactsIconEmoji: {
    fontSize: 18,
  },
  contactsTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  contactsSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
  },
  servicesSection: {
    marginTop: 4,
  },
  servicesTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceBtn: {
    alignItems: 'center',
    flex: 1,
  },
  serviceText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },
  aiAssistantCard: {
    marginTop: 22,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  aiCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    marginRight: 8,
  },
  aiIconBubble: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  aiIconEmoji: {
    fontSize: 22,
  },
  aiTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  aiCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  aiOfflinePill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  aiOfflinePillText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#16A34A',
  },
  aiCardSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  testTriggersBtn: {
    marginTop: 14,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  testTriggersText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
  },
  serviceModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  serviceModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '100%',
    maxWidth: 360,
    overflow: 'hidden',
    paddingBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  serviceBadgeHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  serviceModalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  serviceModalNumber: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '600',
  },
  serviceModalDesc: {
    fontSize: 14,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 24,
    marginTop: 18,
    marginBottom: 20,
  },
  serviceCallBtn: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  serviceCallBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  serviceSosBtn: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#F87171',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  serviceSosBtnText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '700',
  },
  serviceCancelBtn: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  serviceCancelBtnText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
