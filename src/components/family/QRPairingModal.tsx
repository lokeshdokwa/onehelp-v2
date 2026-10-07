import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Alert } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';

export const QRPairingModal: React.FC<{ visible: boolean; onClose: () => void }> = ({
  visible,
  onClose,
}) => {
  const [tab, setTab] = useState<'myQR' | 'scan'>('myQR');

  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Private Family Circle</Text>
          <Text style={styles.subtitle}>
            Encrypted zero-cloud peer pairing for offline mesh emergency alerts
          </Text>

          {/* Toggle Tab */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'myQR' && styles.tabBtnActive]}
              onPress={() => setTab('myQR')}
            >
              <Text style={[styles.tabText, tab === 'myQR' && styles.tabTextActive]}>
                My QR Code
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabBtn, tab === 'scan' && styles.tabBtnActive]}
              onPress={() => setTab('scan')}
            >
              <Text style={[styles.tabText, tab === 'scan' && styles.tabTextActive]}>
                Scan Camera
              </Text>
            </TouchableOpacity>
          </View>

          {tab === 'myQR' ? (
            <View style={styles.qrContainer}>
              {/* Vector Simulated QR Code */}
              <Svg width={180} height={180} viewBox="0 0 180 180">
                <Rect x="0" y="0" width="180" height="180" fill="#FFFFFF" />
                {/* Top-Left Finder */}
                <Rect x="10" y="10" width="46" height="46" fill="#0F172A" rx="4" />
                <Rect x="16" y="16" width="34" height="34" fill="#FFFFFF" rx="2" />
                <Rect x="22" y="22" width="22" height="22" fill="#2563EB" rx="2" />

                {/* Top-Right Finder */}
                <Rect x="124" y="10" width="46" height="46" fill="#0F172A" rx="4" />
                <Rect x="130" y="16" width="34" height="34" fill="#FFFFFF" rx="2" />
                <Rect x="136" y="22" width="22" height="22" fill="#2563EB" rx="2" />

                {/* Bottom-Left Finder */}
                <Rect x="10" y="124" width="46" height="46" fill="#0F172A" rx="4" />
                <Rect x="16" y="130" width="34" height="34" fill="#FFFFFF" rx="2" />
                <Rect x="22" y="136" width="22" height="22" fill="#2563EB" rx="2" />

                {/* Pattern Data Dots */}
                <Rect x="66" y="14" width="10" height="10" fill="#0F172A" />
                <Rect x="84" y="14" width="10" height="10" fill="#0F172A" />
                <Rect x="102" y="22" width="10" height="10" fill="#0F172A" />
                <Rect x="66" y="38" width="10" height="10" fill="#0F172A" />
                <Rect x="84" y="44" width="10" height="10" fill="#0F172A" />
                <Rect x="102" y="52" width="10" height="10" fill="#0F172A" />

                <Rect x="14" y="70" width="10" height="10" fill="#0F172A" />
                <Rect x="30" y="80" width="10" height="10" fill="#0F172A" />
                <Rect x="46" y="70" width="10" height="10" fill="#0F172A" />
                <Rect x="66" y="70" width="12" height="12" fill="#2563EB" />
                <Rect x="84" y="80" width="12" height="12" fill="#0F172A" />
                <Rect x="102" y="70" width="10" height="10" fill="#0F172A" />
                <Rect x="124" y="74" width="10" height="10" fill="#0F172A" />
                <Rect x="142" y="84" width="10" height="10" fill="#0F172A" />
                <Rect x="160" y="70" width="10" height="10" fill="#0F172A" />

                <Rect x="66" y="104" width="10" height="10" fill="#0F172A" />
                <Rect x="84" y="112" width="10" height="10" fill="#2563EB" />
                <Rect x="102" y="104" width="10" height="10" fill="#0F172A" />
                <Rect x="124" y="104" width="12" height="12" fill="#0F172A" />
                <Rect x="146" y="112" width="10" height="10" fill="#0F172A" />
                <Rect x="160" y="128" width="10" height="10" fill="#0F172A" />

                <Rect x="66" y="138" width="10" height="10" fill="#0F172A" />
                <Rect x="84" y="146" width="10" height="10" fill="#0F172A" />
                <Rect x="102" y="138" width="10" height="10" fill="#0F172A" />
                <Rect x="120" y="146" width="10" height="10" fill="#2563EB" />
                <Rect x="138" y="154" width="10" height="10" fill="#0F172A" />
                <Rect x="156" y="146" width="10" height="10" fill="#0F172A" />
              </Svg>
              <Text style={styles.codeText}>ONEHELP-CIR-9842</Text>
              <Text style={styles.expiryText}>Pairing key refreshes every 24h</Text>
            </View>
          ) : (
            <View style={styles.scannerBox}>
              <Text style={{ fontSize: 44, marginBottom: 8 }}>📷</Text>
              <Text style={styles.scannerTitle}>Align Family Member QR Code</Text>
              <Text style={styles.scannerSub}>Point rear camera at other device</Text>
              <TouchableOpacity
                style={styles.simulateScanBtn}
                onPress={() => {
                  Alert.alert(
                    'Device Paired!',
                    '✓ Successfully connected to Mummy (Device ID: VIVO-X90-MESH). Encrypted offline mesh alert channel established.'
                  );
                  onClose();
                }}
              >
                <Text style={styles.simulateScanText}>Simulate Successful Scan</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeBtnText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    padding: 24,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    padding: 22,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 17,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
    width: '100%',
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 9,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  qrContainer: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  codeText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '800',
    color: '#2563EB',
    letterSpacing: 1.5,
  },
  expiryText: {
    marginTop: 4,
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  scannerBox: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  scannerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  scannerSub: {
    color: '#94A3B8',
    fontSize: 11,
    marginBottom: 16,
  },
  simulateScanBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  simulateScanText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  closeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  closeBtnText: {
    color: '#64748B',
    fontWeight: '700',
    fontSize: 14,
  },
});
