import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
  Switch,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  UserIcon,
  ShieldPlusIcon,
  HeartPulseIcon,
} from '../../components/ui/Icons';

interface SettingsScreenProps {
  onBack?: () => void;
  onOpenMedicalDossier: () => void;
  onOpenOfflineMode?: () => void;
  onOpenShakeSettings?: () => void;
  onOpenSurvivalGuides?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack,
  onOpenMedicalDossier,
  onOpenOfflineMode,
  onOpenShakeSettings,
  onOpenSurvivalGuides,
}) => {
  const insets = useSafeAreaInsets();
  const [seniorMode, setSeniorMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Lokesh Shankhala',
    age: '22',
    bloodGroup: 'B+',
    allergies: 'None',
    medicalConditions: 'None',
    emergencyNotes: 'Diabetic alert / Penicillin safe',
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tempProfile, setTempProfile] = useState(profile);
  const [prescriptionCount, setPrescriptionCount] = useState(1);

  const handleSaveProfile = () => {
    setProfile(tempProfile);
    setEditModalOpen(false);
    Alert.alert('Profile Updated', 'Your emergency dossier details have been saved locally.');
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
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Profile Card */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => {
            setTempProfile(profile);
            setEditModalOpen(true);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile.name}</Text>
            <Text style={styles.profileEdit}>Edit your details (Age {profile.age}, {profile.bloodGroup})</Text>
          </View>
          <ChevronRightIcon size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Medical Dossier Highlight Card */}
        <TouchableOpacity
          style={styles.medicalCard}
          onPress={onOpenMedicalDossier}
          activeOpacity={0.85}
        >
          <View style={styles.medicalIconCircle}>
            <HeartPulseIcon size={22} color="#DC2626" />
          </View>
          <View style={styles.medicalInfo}>
            <Text style={styles.medicalTitle}>Medical Dossier</Text>
            <Text style={styles.medicalSub}>Your encrypted health information</Text>
          </View>
          <ChevronRightIcon size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Basic Information Section */}
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={styles.sectionHeader}>Basic Information</Text>
            <TouchableOpacity onPress={() => { setTempProfile(profile); setEditModalOpen(true); }}>
              <Text style={{ fontSize: 13, color: '#2563EB', fontWeight: '700' }}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoTable}>
            <InfoRow label="Name" value={profile.name} />
            <InfoRow label="Age" value={profile.age} />
            <InfoRow label="Blood Group" value={profile.bloodGroup} />
            <InfoRow label="Allergies" value={profile.allergies} />
            <InfoRow label="Medical Conditions" value={profile.medicalConditions} />
            <InfoRow label="Emergency Notes" value={profile.emergencyNotes} isLast />
          </View>
        </View>

        {/* Documents Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Documents</Text>
          <View style={styles.docsRow}>
            <TouchableOpacity
              style={styles.docBtn}
              onPress={() =>
                Alert.alert(
                  'Medical Report (CBC_Report_2026.pdf)',
                  '✓ Verified & Encrypted in SQLite secure database.\nSize: 1.4 MB\nDate: 04-Oct-2026',
                  [{ text: 'Close' }]
                )
              }
              activeOpacity={0.8}
            >
              <Text style={styles.docIcon}>📄</Text>
              <Text style={styles.docTitle}>Medical Report</Text>
              <Text style={styles.docSub}>View (1 Attached)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.docBtn}
              onPress={() =>
                Alert.alert(
                  'Prescription Documents',
                  'Would you like to attach a new medical prescription for responders?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Add Prescription',
                      onPress: () => {
                        setPrescriptionCount((c) => c + 1);
                        Alert.alert('Saved', 'New prescription attached to emergency profile.');
                      },
                    },
                  ]
                )
              }
              activeOpacity={0.8}
            >
              <Text style={styles.docIcon}>💊</Text>
              <Text style={styles.docTitle}>Prescription</Text>
              <Text style={styles.docSub}>
                {prescriptionCount > 0 ? `${prescriptionCount} Attached` : 'Upload'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* App Preferences & Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>App Preferences & Tools</Text>
          <View style={styles.menuCard}>
            <View style={[styles.menuItem, styles.menuItemBorder]}>
              <Text style={styles.menuIcon}>👓</Text>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Senior Citizen & Accessibility</Text>
                <Text style={styles.menuSub}>Large text, high-contrast, audio readout</Text>
              </View>
              <Switch
                value={seniorMode}
                onValueChange={(val) => {
                  setSeniorMode(val);
                  Alert.alert(
                    val ? 'Senior Mode Active' : 'Standard Mode Restored',
                    val
                      ? '✓ Enhanced contrast, enlarged icons, and direct 1-tap voice emergency alerts activated.'
                      : '✓ Returned to normal UI scale.'
                  );
                }}
                thumbColor={seniorMode ? '#2563EB' : '#94A3B8'}
                trackColor={{ false: '#E2E8F0', true: '#93C5FD' }}
              />
            </View>

            {onOpenSurvivalGuides && (
              <MenuRow
                icon="🩺"
                title="Survival & First-Aid Guides"
                subtitle="Offline CPR, Choking & Disaster Protocols"
                onPress={onOpenSurvivalGuides}
              />
            )}

            {onOpenShakeSettings && (
              <MenuRow
                icon="📳"
                title="Shake & Power Trigger"
                subtitle="Configure auto-SOS sensitivity"
                onPress={onOpenShakeSettings}
              />
            )}
            {onOpenOfflineMode && (
              <MenuRow
                icon="📡"
                title="Offline Mode Status"
                subtitle="Cached maps, contacts & local AI"
                onPress={onOpenOfflineMode}
              />
            )}
            <MenuRow
              icon="🌐"
              title="Language"
              subtitle="English (Tap to switch)"
              onPress={() =>
                Alert.alert('Change App Language', 'Select preferred emergency voice & text language:', [
                  { text: 'English', onPress: () => {} },
                  { text: 'हिंदी (Hindi)', onPress: () => Alert.alert('भाषा', 'भाषा हिंदी पर सेट कर दी गई है।') },
                  { text: 'বাংলা (Bengali)' },
                  { text: 'Cancel', style: 'cancel' },
                ])
              }
            />
            <MenuRow
              icon="ℹ️"
              title="About OneHelp"
              subtitle="v1.0.0 (Production Engine)"
              onPress={() =>
                Alert.alert(
                  'OneHelp — Emergency Response',
                  'Version: 1.0.0\nArchitecture: Offline-First Zero Trust\nEncryption: AES-256 GCM\nLocal Database: SQLite WAL\nEmergency GPS: Background High-Precision\n\nYour Safety. Our Priority.'
                )
              }
            />
            <MenuRow
              icon="❓"
              title="Help & Support"
              subtitle="Emergency hotline & guide"
              onPress={() =>
                Alert.alert(
                  'OneHelp Support',
                  '• For Immediate Police Help: Dial 112\n• Medical Emergency: Dial 108\n• Fire Distress: Dial 101\n• Helpline Directory: Accessible 100% offline via Helplines tab.'
                )
              }
              isLast
            />
          </View>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalOpen(false)}
      >
        <View style={styles.editModalOverlay}>
          <View style={styles.editModalCard}>
            <Text style={styles.editModalTitle}>Edit Emergency Profile</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={tempProfile.name}
                onChangeText={(t) => setTempProfile({ ...tempProfile, name: t })}
                placeholder="Name"
                placeholderTextColor="#94A3B8"
              />

              <Text style={styles.inputLabel}>Age</Text>
              <TextInput
                style={styles.textInput}
                value={tempProfile.age}
                onChangeText={(t) => setTempProfile({ ...tempProfile, age: t })}
                keyboardType="numeric"
                placeholder="Age"
                placeholderTextColor="#94A3B8"
              />

              <Text style={styles.inputLabel}>Blood Group</Text>
              <TextInput
                style={styles.textInput}
                value={tempProfile.bloodGroup}
                onChangeText={(t) => setTempProfile({ ...tempProfile, bloodGroup: t })}
                placeholder="Blood Group (e.g. O+, B+, A-)"
                placeholderTextColor="#94A3B8"
              />

              <Text style={styles.inputLabel}>Allergies</Text>
              <TextInput
                style={styles.textInput}
                value={tempProfile.allergies}
                onChangeText={(t) => setTempProfile({ ...tempProfile, allergies: t })}
                placeholder="Allergies (e.g. Penicillin, Peanuts)"
                placeholderTextColor="#94A3B8"
              />

              <Text style={styles.inputLabel}>Emergency Medical Notes</Text>
              <TextInput
                style={[styles.textInput, { height: 70, textAlignVertical: 'top' }]}
                value={tempProfile.emergencyNotes}
                onChangeText={(t) => setTempProfile({ ...tempProfile, emergencyNotes: t })}
                multiline
                placeholder="Notes for first responders"
                placeholderTextColor="#94A3B8"
              />

              <View style={styles.editActions}>
                <TouchableOpacity
                  style={styles.editCancelBtn}
                  onPress={() => setEditModalOpen(false)}
                >
                  <Text style={styles.editCancelText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.editSaveBtn}
                  onPress={handleSaveProfile}
                >
                  <Text style={styles.editSaveText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const InfoRow = ({
  label,
  value,
  isLast = false,
}: {
  label: string;
  value: string;
  isLast?: boolean;
}) => (
  <View style={[styles.infoRow, !isLast && styles.infoRowBorder]}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const MenuRow = ({
  icon,
  title,
  subtitle,
  onPress,
  isLast = false,
}: {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  isLast?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.menuItem, !isLast && styles.menuItemBorder]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.menuIcon}>{icon}</Text>
    <View style={styles.menuTextCol}>
      <Text style={styles.menuTitle}>{title}</Text>
      <Text style={styles.menuSub}>{subtitle}</Text>
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
    paddingBottom: 110,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 22,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  profileEdit: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '600',
    marginTop: 2,
  },
  medicalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: 20,
  },
  medicalIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  medicalInfo: {
    flex: 1,
  },
  medicalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#DC2626',
  },
  medicalSub: {
    fontSize: 12,
    color: '#991B1B',
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  infoTable: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  infoRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '700',
  },
  docsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  docBtn: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
  },
  docIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  docTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  docSub: {
    fontSize: 11,
    color: '#2563EB',
    fontWeight: '600',
    marginTop: 2,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  menuTextCol: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  editModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  editModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 22,
    width: '100%',
    maxHeight: '85%',
  },
  editModalTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 14,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
    marginBottom: 10,
  },
  editCancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  editCancelText: {
    color: '#64748B',
    fontWeight: '600',
    fontSize: 14,
  },
  editSaveBtn: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  editSaveText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
