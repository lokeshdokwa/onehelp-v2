import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { ShieldPlusIcon } from '../../components/ui/Icons';

interface PushNotificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export const PushNotificationModal: React.FC<PushNotificationModalProps> = ({
  visible,
  onClose,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.lockscreenContainer}>
          {/* Simulated Lock Screen Time */}
          <Text style={styles.lockTime}>9:41</Text>
          <Text style={styles.lockDate}>Mon, 14 Apr</Text>

          {/* Notification Card */}
          <View style={styles.notificationCard}>
            <View style={styles.notifHeader}>
              <View style={styles.notifHeaderLeft}>
                <ShieldPlusIcon size={18} color="#DC2626" />
                <Text style={styles.notifAppName}>OneHelp</Text>
              </View>
              <Text style={styles.notifTime}>now</Text>
            </View>

            <Text style={styles.notifTitle}>Emergency Alert</Text>
            <Text style={styles.notifBody}>
              Your family has been notified.{'\n'}Location shared: 26.9124°N, 75.7873°E
            </Text>
          </View>

          <TouchableOpacity style={styles.dismissBtn} onPress={onClose}>
            <Text style={styles.dismissText}>Dismiss Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  lockscreenContainer: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
  },
  lockTime: {
    fontSize: 64,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  lockDate: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 44,
  },
  notificationCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notifHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  notifAppName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
    textTransform: 'uppercase',
  },
  notifTime: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  notifTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#DC2626',
    marginBottom: 4,
  },
  notifBody: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    fontWeight: '500',
  },
  dismissBtn: {
    marginTop: 36,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
  },
  dismissText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
