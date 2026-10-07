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
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ArrowLeftIcon,
  ShieldPlusIcon,
  CheckIcon,
  PlusIcon,
  PhoneCallIcon,
} from '../../components/ui/Icons';
import { QRPairingModal } from '../../components/family/QRPairingModal';

interface FamilyContactsScreenProps {
  onBack?: () => void;
  onNotifyFamilyModal?: () => void;
}

export const FamilyContactsScreen: React.FC<FamilyContactsScreenProps> = ({
  onBack,
  onNotifyFamilyModal,
}) => {
  const insets = useSafeAreaInsets();
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [contacts, setContacts] = useState([
    { id: '1', name: 'Papa', phone: '+91 87654 32109', status: 'Online', isOnline: true },
    { id: '2', name: 'Maa', phone: '+91 98765 43210', status: 'Online', isOnline: true },
    { id: '3', name: 'Rohit (Bhai)', phone: '+91 76543 21098', status: 'Last seen 12m ago', isOnline: false },
  ]);

  const [isManaging, setIsManaging] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState<{
    id: string;
    name: string;
    phone: string;
    status: string;
  } | null>(null);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const handleAdd = () => {
    if (newName.trim() && newPhone.trim()) {
      setContacts([
        ...contacts,
        {
          id: Date.now().toString(),
          name: newName,
          phone: newPhone,
          status: 'Online',
          isOnline: true,
        },
      ]);
      setNewName('');
      setNewPhone('');
      setModalVisible(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Remove Contact', 'Are you sure you want to remove this emergency contact?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setContacts(contacts.filter((c) => c.id !== id)),
      },
    ]);
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
        <Text style={styles.headerTitle}>Family Contacts</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Count & Manage Bar */}
        <View style={styles.countRow}>
          <Text style={styles.countText}>{contacts.length} people configured</Text>
          <TouchableOpacity onPress={() => setIsManaging(!isManaging)}>
            <Text style={[styles.manageText, isManaging && { color: '#DC2626' }]}>
              {isManaging ? 'Done' : 'Manage'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Contacts List */}
        <View style={styles.contactsList}>
          {contacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              style={styles.contactCard}
              onPress={() => setSelectedContact(contact)}
              activeOpacity={0.75}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>👤</Text>
              </View>
              <View style={styles.contactDetails}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactPhone}>{contact.phone}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={styles.statusBadge}>
                  {contact.isOnline && <View style={styles.onlineDot} />}
                  <Text
                    style={[
                      styles.statusBadgeText,
                      { color: contact.isOnline ? '#16A34A' : '#94A3B8' },
                    ]}
                  >
                    {contact.status}
                  </Text>
                </View>
                {isManaging && (
                  <TouchableOpacity
                    onPress={() => handleDelete(contact.id)}
                    style={styles.deleteCircleBtn}
                  >
                    <Text style={styles.deleteCircleText}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Contact Button */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.85}
        >
          <Text style={styles.addBtnText}>+ Add New Contact</Text>
        </TouchableOpacity>

        {/* Family Alert Status Card */}
        <TouchableOpacity
          style={styles.safetyCard}
          onPress={() =>
            Alert.alert(
              'Family Safe Check-In',
              'Would you like to broadcast a "Safe & OK" status ping to all 3 contacts?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Send "I am Safe" Ping',
                  onPress: () =>
                    Alert.alert(
                      'Ping Broadcasted',
                      '✓ Safe status ping sent to Papa, Maa & Rohit via SMS & offline mesh.'
                    ),
                },
              ]
            )
          }
          activeOpacity={0.8}
        >
          <View style={styles.safetyShield}>
            <ShieldPlusIcon size={24} color="#16A34A" />
          </View>
          <View style={styles.safetyTextCol}>
            <Text style={styles.safetyTitle}>Family Alert Status</Text>
            <Text style={styles.safetySub}>All safe • Tap to send "I'm Safe" check-in</Text>
          </View>
        </TouchableOpacity>

        {/* Quick Emergency Actions Section */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.quickActionsHeading}>EMERGENCY ACTIONS</Text>

          {/* Feature #10: One-Tap WhatsApp Emergency Blast */}
          <TouchableOpacity
            style={styles.actionCardWhatsApp}
            onPress={() => {
              const emergencyMsg = encodeURIComponent(
                '🚨 OneHelp EMERGENCY ALERT: I need immediate assistance! My current location is https://maps.google.com/?q=26.8562,75.8727'
              );
              Linking.openURL(`whatsapp://send?text=${emergencyMsg}`).catch(() => {
                Alert.alert(
                  'WhatsApp Blast',
                  'WhatsApp is not installed. Sending SOS text message via SMS instead.'
                );
              });
            }}
            activeOpacity={0.85}
          >
            <View style={styles.actionIconCircleWhatsApp}>
              <Text style={styles.actionIconEmoji}>💬</Text>
            </View>
            <View style={styles.actionTextCol}>
              <Text style={styles.actionCardTitleWhatsApp}>WhatsApp Emergency Blast</Text>
              <Text style={styles.actionCardSub}>Instant live GPS alert to all family chats</Text>
            </View>
            <Text style={styles.actionCardArrow}>›</Text>
          </TouchableOpacity>

          {/* Trigger Family Alert Preview */}
          {onNotifyFamilyModal && (
            <TouchableOpacity
              style={styles.actionCardAlert}
              onPress={onNotifyFamilyModal}
              activeOpacity={0.85}
            >
              <View style={styles.actionIconCircleAlert}>
                <Text style={styles.actionIconEmoji}>📢</Text>
              </View>
              <View style={styles.actionTextCol}>
                <Text style={styles.actionCardTitle}>Family Alert Broadcast</Text>
                <Text style={styles.actionCardSub}>Trigger sirens & high-priority push banner</Text>
              </View>
              <Text style={styles.actionCardArrow}>›</Text>
            </TouchableOpacity>
          )}

          {/* Feature #21: Private Family Safety Circles & QR Pairing */}
          <TouchableOpacity
            style={styles.actionCardCircle}
            onPress={() => setQrModalVisible(true)}
            activeOpacity={0.85}
          >
            <View style={styles.actionIconCircleQr}>
              <Text style={styles.actionIconEmoji}>🔗</Text>
            </View>
            <View style={styles.actionTextCol}>
              <Text style={styles.actionCardTitle}>Private Family Circle (QR)</Text>
              <Text style={styles.actionCardSub}>Scan QR code or share private circle code</Text>
            </View>
            <Text style={styles.actionCardArrow}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* QR Pairing Modal */}
      <QRPairingModal
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
      />

      {/* Contact Quick Action Modal */}
      <Modal
        visible={selectedContact !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedContact(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{selectedContact?.name}</Text>
            <Text style={[styles.modalSub, { marginBottom: 16 }]}>
              {selectedContact?.phone}
            </Text>

            <TouchableOpacity
              style={styles.actionRowBtn}
              onPress={() => {
                const phone = selectedContact?.phone;
                setSelectedContact(null);
                if (phone) Linking.openURL(`tel:${phone}`).catch(() => {});
              }}
            >
              <Text style={styles.actionRowText}>📞 Call {selectedContact?.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionRowBtn, { backgroundColor: '#EFF6FF' }]}
              onPress={() => {
                const phone = selectedContact?.phone;
                setSelectedContact(null);
                if (phone) {
                  Linking.openURL(
                    `sms:${phone}?body=OneHelp Emergency: I need urgent assistance!`
                  ).catch(() => {});
                }
              }}
            >
              <Text style={[styles.actionRowText, { color: '#2563EB' }]}>
                💬 Send Emergency SMS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setSelectedContact(null)}
            >
              <Text style={styles.modalCancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add Contact Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Trusted Contact</Text>
            <TextInput
              style={styles.input}
              placeholder="Name (e.g. Sister, Uncle)"
              placeholderTextColor="#94A3B8"
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number (+91 ...)"
              placeholderTextColor="#94A3B8"
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalAdd} onPress={handleAdd}>
                <Text style={styles.modalAddText}>Save</Text>
              </TouchableOpacity>
            </View>
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
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  countText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  manageText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  contactsList: {
    gap: 12,
    marginBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 20,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  contactPhone: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  addBtn: {
    backgroundColor: '#2563EB',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  safetyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
    padding: 16,
    borderRadius: 16,
    gap: 14,
  },
  safetyShield: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  safetyTextCol: {
    flex: 1,
  },
  safetyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#15803D',
  },
  safetySub: {
    fontSize: 12,
    color: '#166534',
    marginTop: 2,
  },
  quickActionsContainer: {
    marginTop: 24,
    gap: 10,
  },
  quickActionsHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  actionCardWhatsApp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  actionIconCircleWhatsApp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionCardTitleWhatsApp: {
    fontSize: 14,
    fontWeight: '800',
    color: '#15803D',
  },
  actionCardAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  actionIconCircleAlert: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionCardCircle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 14,
    gap: 12,
  },
  actionIconCircleQr: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIconEmoji: {
    fontSize: 18,
  },
  actionTextCol: {
    flex: 1,
  },
  actionCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  actionCardSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  actionCardArrow: {
    fontSize: 20,
    color: '#94A3B8',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
  modalCancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  modalCancelText: {
    color: '#64748B',
    fontWeight: '600',
  },
  modalAdd: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalAddText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  deleteCircleBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteCircleText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '800',
  },
  actionRowBtn: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionRowText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
});
