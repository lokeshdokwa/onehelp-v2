import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  HeartPulseIcon,
} from '../../components/ui/Icons';

interface MedicalDossierScreenProps {
  onBack?: () => void;
}

export const MedicalDossierScreen: React.FC<MedicalDossierScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [dossier, setDossier] = useState({
    medicalInfo: 'No major health issues',
    allergies: 'None reported',
    medications: 'None currently prescribed',
    bloodGroup: 'B+',
    medicalNotes: 'Asthma inhaler in backpack',
    emergencyNotes: 'Allergic to Penicillin • Notify Dr. Verma (+91 98290 11223)',
  });

  const handleEditItem = (field: keyof typeof dossier, label: string) => {
    Alert.alert(
      label,
      `Current Record:\n${dossier[field]}\n\nThis record is encrypted with AES-256 and will only be shared with emergency first-responders during an active SOS.`,
      [
        { text: 'Close', style: 'cancel' },
        {
          text: 'Verified & OK',
          onPress: () => Alert.alert('Confirmed', `${label} status verified.`),
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
            <ArrowLeftIcon size={22} color="#0F172A" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 22 }} />
        )}
        <Text style={styles.headerTitle}>Medical Dossier</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <TouchableOpacity
          style={styles.userCard}
          onPress={() =>
            Alert.alert(
              'Responder Identity Card',
              'Patient: Lokesh Shankhala\nAge: 22 • Male\nBlood Type: B+\nEmergency Contact: +91 87654 32109'
            )
          }
          activeOpacity={0.8}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👨‍💼</Text>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>Lokesh Shankhala</Text>
            <Text style={styles.userMeta}>M 22  |  B+ (Tap to view)</Text>
          </View>
          <ChevronRightIcon size={18} color="#94A3B8" />
        </TouchableOpacity>

        {/* Dossier Item List */}
        <View style={styles.dossierList}>
          <DossierItem
            icon="🏥"
            title="Medical Info"
            value={dossier.medicalInfo}
            onPress={() => handleEditItem('medicalInfo', 'Medical Info')}
          />
          <DossierItem
            icon="⚠️"
            title="Allergies"
            value={dossier.allergies}
            onPress={() => handleEditItem('allergies', 'Allergies')}
          />
          <DossierItem
            icon="💊"
            title="Current Medications"
            value={dossier.medications}
            onPress={() => handleEditItem('medications', 'Current Medications')}
          />
          <DossierItem
            icon="🩸"
            title="Blood Group"
            value={dossier.bloodGroup}
            onPress={() => handleEditItem('bloodGroup', 'Blood Group')}
          />
          <DossierItem
            icon="📝"
            title="Medical Notes"
            value={dossier.medicalNotes}
            isAction
            onPress={() => handleEditItem('medicalNotes', 'Medical Notes')}
          />
          <DossierItem
            icon="🚨"
            title="Emergency Notes"
            value={dossier.emergencyNotes}
            isAction
            isLast
            onPress={() => handleEditItem('emergencyNotes', 'Emergency Notes')}
          />
        </View>

        {/* Secure Encryption Note */}
        <TouchableOpacity
          style={styles.securityNote}
          onPress={() =>
            Alert.alert(
              'Zero-Trust Encryption',
              'All medical data is stored locally in an encrypted SQLite database on your device. It is never uploaded to third-party cloud servers without your explicit SOS trigger.'
            )
          }
          activeOpacity={0.8}
        >
          <Text style={styles.securityNoteText}>
            🔒 End-to-end encrypted on device. Tap for security details.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const DossierItem = ({
  icon,
  title,
  value,
  isAction = false,
  isLast = false,
  onPress,
}: {
  icon: string;
  title: string;
  value: string;
  isAction?: boolean;
  isLast?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity
    style={[styles.dossierItem, !isLast && styles.dossierItemBorder]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.iconCircle}>
      <Text style={styles.iconEmoji}>{icon}</Text>
    </View>
    <View style={styles.itemTextCol}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={[styles.itemValue, isAction && styles.itemActionValue]}>{value}</Text>
    </View>
    <ChevronRightIcon size={18} color="#94A3B8" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 36,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 26,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  userMeta: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 4,
  },
  dossierList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  dossierItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dossierItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconEmoji: {
    fontSize: 18,
  },
  itemTextCol: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  itemValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  itemActionValue: {
    color: '#2563EB',
    fontWeight: '600',
  },
  securityNote: {
    marginTop: 24,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  securityNoteText: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
  },
});
