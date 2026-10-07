import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';

interface LostChildMatcherModalProps {
  visible: boolean;
  onClose: () => void;
}

interface MatchCandidate {
  id: string;
  name: string;
  age: string;
  lastSeen: string;
  similarity: number;
  missingSince: string;
  status: 'High Match' | 'Possible Match';
  policeCaseNo: string;
}

export const LostChildMatcherModal: React.FC<LostChildMatcherModalProps> = ({
  visible,
  onClose,
}) => {
  const [scanning, setScanning] = useState(false);
  const [scannedDone, setScannedDone] = useState(false);

  const sampleMatches: MatchCandidate[] = [
    {
      id: '1',
      name: 'Aarav Sharma',
      age: '7 Years',
      lastSeen: 'Gaurav Tower, Malviya Nagar, Jaipur',
      similarity: 94.6,
      missingSince: 'Yesterday, 4:00 PM',
      status: 'High Match',
      policeCaseNo: 'FIR-2026/8941',
    },
    {
      id: '2',
      name: 'Priya Meena',
      age: '6 Years',
      lastSeen: 'Sindhi Camp Bus Stand, Jaipur',
      similarity: 68.2,
      missingSince: '3 days ago',
      status: 'Possible Match',
      policeCaseNo: 'FIR-2026/8890',
    },
  ];

  const handleRunScan = () => {
    setScanning(true);
    setScannedDone(false);
    setTimeout(() => {
      setScanning(false);
      setScannedDone(true);
    }, 2400);
  };

  return (
    <Modal visible={visible} animationType="slide" statusBarTranslucent={true} onRequestClose={onClose}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0F172A" />

        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backBtn} activeOpacity={0.7}>
            <Text style={styles.backBtnText}>✕ Close</Text>
          </TouchableOpacity>
          <View style={styles.titleCol}>
            <Text style={styles.headerTitle}>Lost Child AI Face Matcher</Text>
            <Text style={styles.headerSub}>Edge On-Device Biometric Search</Text>
          </View>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* AI Scan Viewfinder Card */}
          <View style={styles.viewfinderCard}>
            <View style={styles.cameraBox}>
              <View style={styles.cornerTL} />
              <View style={styles.cornerTR} />
              <View style={styles.cornerBL} />
              <View style={styles.cornerBR} />

              <View style={styles.faceTarget}>
                <Text style={{ fontSize: 50 }}>👦</Text>
                {scanning && <View style={styles.scanLaser} />}
              </View>

              <View style={styles.camBadge}>
                <Text style={styles.camBadgeText}>
                  {scanning ? '⚡ Extracting 128-D Facial Embeddings...' : '📷 Live Edge Camera Feed'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.scanTriggerBtn, scanning && styles.scanTriggerBtnDisabled]}
              onPress={handleRunScan}
              disabled={scanning}
              activeOpacity={0.8}
            >
              <Text style={styles.scanTriggerText}>
                {scanning ? 'Analyzing Local Database...' : '🔍 Scan & Match Missing Registry'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Privacy & Offline Disclaimer */}
          <View style={styles.privacyCard}>
            <Text style={styles.privacyIcon}>🔒</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.privacyTitle}>100% Offline Edge Computing</Text>
              <Text style={styles.privacySub}>
                Zero photos uploaded to cloud. Biometric vectors are evaluated purely on-device against synced police missing child bulletins.
              </Text>
            </View>
          </View>

          {/* Matches Found */}
          {scannedDone && (
            <View style={styles.resultsSection}>
              <View style={styles.resultsHeaderRow}>
                <Text style={styles.resultsTitle}>Registry Matches ({sampleMatches.length})</Text>
                <View style={styles.verifiedPill}>
                  <Text style={styles.verifiedText}>Rajasthan Police DB</Text>
                </View>
              </View>

              {sampleMatches.map((item) => (
                <View key={item.id} style={styles.matchCard}>
                  <View style={styles.matchTopRow}>
                    <View style={styles.avatarCircle}>
                      <Text style={{ fontSize: 28 }}>👦</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.matchName}>{item.name}</Text>
                        <View style={[styles.confidenceBadge, item.similarity > 90 ? styles.badgeHigh : styles.badgeMed]}>
                          <Text style={styles.confidenceText}>{item.similarity}% Match</Text>
                        </View>
                      </View>
                      <Text style={styles.matchAge}>Age: {item.age} • Case: {item.policeCaseNo}</Text>
                      <Text style={styles.matchLastSeen}>📍 {item.lastSeen}</Text>
                      <Text style={styles.matchTime}>⏰ Missing: {item.missingSince}</Text>
                    </View>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.alertPoliceBtn}
                      onPress={() =>
                        Alert.alert(
                          'Emergency Dispatch Pinged',
                          `Immediate notification sent to Police Control Room (112) with your GPS coordinates and Case ID ${item.policeCaseNo}. Patrol unit diverted.`
                        )
                      }
                    >
                      <Text style={styles.alertPoliceText}>🚨 Alert 112 Dispatch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.detailsBtn}
                      onPress={() =>
                        Alert.alert(
                          `Child Details: ${item.name}`,
                          `Height: 3'8"\nClothing: Blue T-shirt & shorts\nContact Officer: Inspector Sharma (98290-XXXXX)\nFIR: ${item.policeCaseNo}`
                        )
                      }
                    >
                      <Text style={styles.detailsText}>View Bulletin</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  header: {
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#334155',
    borderRadius: 8,
  },
  backBtnText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 13,
  },
  titleCol: {
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  headerSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  viewfinderCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  cameraBox: {
    width: '100%',
    height: 180,
    backgroundColor: '#0B0F19',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  cornerTL: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#2563EB',
  },
  cornerTR: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 20,
    height: 20,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: '#2563EB',
  },
  cornerBL: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: '#2563EB',
  },
  cornerBR: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 20,
    height: 20,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#2563EB',
  },
  faceTarget: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLaser: {
    position: 'absolute',
    width: 140,
    height: 3,
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  camBadge: {
    position: 'absolute',
    bottom: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  camBadgeText: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '700',
  },
  scanTriggerBtn: {
    marginTop: 14,
    backgroundColor: '#2563EB',
    width: '100%',
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  scanTriggerBtnDisabled: {
    opacity: 0.6,
  },
  scanTriggerText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  privacyCard: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    marginTop: 14,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  privacyIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  privacyTitle: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 13,
  },
  privacySub: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 16,
    marginTop: 2,
  },
  resultsSection: {
    marginTop: 20,
  },
  resultsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultsTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  verifiedPill: {
    backgroundColor: '#065F46',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  verifiedText: {
    color: '#6EE7B7',
    fontSize: 10,
    fontWeight: '700',
  },
  matchCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  matchTopRow: {
    flexDirection: 'row',
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchName: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  confidenceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeHigh: {
    backgroundColor: '#DC2626',
  },
  badgeMed: {
    backgroundColor: '#D97706',
  },
  confidenceText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  matchAge: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  matchLastSeen: {
    color: '#CBD5E1',
    fontSize: 12,
    marginTop: 3,
  },
  matchTime: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  alertPoliceBtn: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  alertPoliceText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  detailsBtn: {
    backgroundColor: '#334155',
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsText: {
    color: '#F8FAFC',
    fontWeight: '600',
    fontSize: 12,
  },
});
