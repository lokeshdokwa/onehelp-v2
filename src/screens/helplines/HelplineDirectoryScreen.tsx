import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Linking,
  StatusBar,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  PhoneCallIcon,
  ChevronRightIcon,
  ShieldPlusIcon,
  ArrowLeftIcon,
} from '../../components/ui/Icons';
import { SEED_HELPLINES } from '../../database/seeds/helplineSeeds';

interface HelplineDirectoryScreenProps {
  onBack?: () => void;
}

export const HelplineDirectoryScreen: React.FC<HelplineDirectoryScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  const filtered = SEED_HELPLINES.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.number.includes(search) ||
      h.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`).catch(() => {});
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          {onBack ? (
            <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
              <ArrowLeftIcon size={22} color="#0F172A" />
            </TouchableOpacity>
          ) : null}
          <View>
            <Text style={styles.headerTitle}>Helplines (Offline)</Text>
            <Text style={styles.headerSub}>Available offline • Instant one-tap calling</Text>
          </View>
        </View>
      </View>

      {/* Search Input */}
      <View style={styles.searchWrap}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or number (e.g. Police, 108)..."
          placeholderTextColor="#94A3B8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Helplines List */}
      <FlatList
        data={filtered}
        keyExtractor={(item, idx) => `${item.name}-${idx}`}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.helplineCard}
            onPress={() => handleCall(item.number)}
            activeOpacity={0.8}
          >
            <View style={styles.iconCircle}>
              <PhoneCallIcon size={18} color="#2563EB" />
            </View>

            <View style={styles.infoCol}>
              <Text style={styles.helplineName}>{item.name}</Text>
              <Text style={styles.helplineCat}>
                {item.category.toUpperCase()} • {(item.state ?? 'national').toUpperCase()}
              </Text>
            </View>

            <View style={styles.phoneCol}>
              <Text style={styles.phoneNumber}>{item.number}</Text>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={styles.footerNote}>
            <Text style={styles.footerNoteText}>
              ✓ Complete offline directory • Last updated Today
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    padding: 6,
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  headerSub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  searchWrap: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 14,
    color: '#0F172A',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  helplineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 1,
  },
  helplineName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  helplineCat: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 2,
  },
  phoneCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  phoneNumber: {
    fontSize: 15,
    fontWeight: '800',
    color: '#DC2626',
  },
  footerNote: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  footerNoteText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
