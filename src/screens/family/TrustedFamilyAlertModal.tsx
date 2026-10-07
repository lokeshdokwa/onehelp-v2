import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ArrowLeftIcon, CheckIcon, UsersIcon } from '../../components/ui/Icons';

interface TrustedFamilyAlertModalProps {
  onBack?: () => void;
  onSendAlert: () => void;
}

export const TrustedFamilyAlertModal: React.FC<TrustedFamilyAlertModalProps> = ({
  onBack,
  onSendAlert,
}) => {
  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerTitle}>Trusted Family Alert</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.content}>
        {/* Blue Circle Icon */}
        <View style={styles.iconCircle}>
          <UsersIcon size={44} color="#2563EB" />
        </View>

        {/* Title & Description */}
        <Text style={styles.title}>Notify Your Family</Text>
        <Text style={styles.subtitle}>
          Your trusted contacts will receive your location, message and status.
        </Text>

        {/* Checklist */}
        <View style={styles.checklistCard}>
          <CheckItem label="Live Location" />
          <CheckItem label="Emergency Message" />
          <CheckItem label="Your Health Status" isLast />
        </View>

        {/* Action Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.notifyBtn}
            onPress={onSendAlert}
            activeOpacity={0.85}
          >
            <Text style={styles.notifyBtnText}>Notify Family</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={onBack}>
            <Text style={styles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const CheckItem = ({ label, isLast = false }: { label: string; isLast?: boolean }) => (
  <View style={[styles.checkRow, !isLast && styles.checkRowBorder]}>
    <View style={styles.checkIcon}>
      <CheckIcon size={14} color="#16A34A" />
    </View>
    <Text style={styles.checkLabel}>{label}</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 28,
    alignItems: 'center',
    paddingTop: 36,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#BFDBFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    marginBottom: 32,
  },
  checklistCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  checkRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E293B',
  },
  footer: {
    width: '100%',
    marginTop: 'auto',
    paddingBottom: 24,
  },
  notifyBtn: {
    backgroundColor: '#2563EB',
    width: '100%',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  notifyBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelBtn: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 8,
  },
  cancelBtnText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '600',
  },
});
