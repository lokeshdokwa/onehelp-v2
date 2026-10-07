import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  ArrowLeftIcon,
  CheckIcon,
  PoliceServiceIcon,
  AmbulanceServiceIcon,
  FireServiceIcon,
  DisasterServiceIcon,
} from '../../components/ui/Icons';

interface MultiAgencyRoutingScreenProps {
  onBack?: () => void;
  onFinish?: () => void;
}

export const MultiAgencyRoutingScreen: React.FC<MultiAgencyRoutingScreenProps> = ({
  onBack,
  onFinish,
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
        <Text style={styles.headerTitle}>Multi-Agency Routing</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.introText}>Your request is being routed to...</Text>

        <View style={styles.agenciesList}>
          {/* Police */}
          <AgencyRow
            icon={<PoliceServiceIcon size={44} />}
            name="Police"
            status="Notified"
            timeRange="(0–15s)"
            isAlerted
          />

          {/* Ambulance */}
          <AgencyRow
            icon={<AmbulanceServiceIcon size={44} />}
            name="Ambulance"
            status="Notified"
            timeRange="(15–30s)"
            isAlerted
          />

          {/* Fire */}
          <AgencyRow
            icon={<FireServiceIcon size={44} />}
            name="Fire"
            status="Notified"
            timeRange="(30–45s)"
            isAlerted
          />

          {/* Disaster Management */}
          <AgencyRow
            icon={<DisasterServiceIcon size={44} />}
            name="Disaster Management"
            status="Notified"
            timeRange="(45–60s)"
            isAlerted
            isLast
          />
        </View>

        {/* All Agencies Alerted Pill */}
        <View style={styles.allAlertedPill}>
          <View style={styles.checkCircle}>
            <CheckIcon size={16} color="#FFFFFF" />
          </View>
          <Text style={styles.allAlertedText}>All agencies alerted</Text>
        </View>

        {onFinish && (
          <TouchableOpacity style={styles.viewAfterAlertBtn} onPress={onFinish} activeOpacity={0.85}>
            <Text style={styles.viewAfterAlertText}>View Dispatch Confirmation →</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const AgencyRow = ({
  icon,
  name,
  status,
  timeRange,
  isAlerted = true,
  isLast = false,
}: {
  icon: React.ReactNode;
  name: string;
  status: string;
  timeRange: string;
  isAlerted?: boolean;
  isLast?: boolean;
}) => (
  <View style={[styles.agencyCard, !isLast && styles.agencyCardMargin]}>
    <View style={styles.agencyIconCol}>{icon}</View>
    <View style={styles.agencyInfoCol}>
      <Text style={styles.agencyName}>{name}</Text>
      <View style={styles.statusRow}>
        <View style={styles.greenDot} />
        <Text style={styles.statusText}>{status}</Text>
      </View>
    </View>
    <Text style={styles.timeRangeText}>{timeRange}</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 36,
  },
  introText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 20,
  },
  agenciesList: {
    marginBottom: 32,
  },
  agencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  agencyCardMargin: {
    marginBottom: 12,
  },
  agencyIconCol: {
    marginRight: 14,
  },
  agencyInfoCol: {
    flex: 1,
  },
  agencyName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 3,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#16A34A',
  },
  timeRangeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  allAlertedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignSelf: 'center',
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allAlertedText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#15803D',
  },
  viewAfterAlertBtn: {
    marginTop: 28,
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  viewAfterAlertText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
