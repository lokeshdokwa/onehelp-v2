import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon, ChevronRightIcon } from '../../components/ui/Icons';

interface SurvivalGuidesScreenProps {
  onBack: () => void;
}

interface GuideItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  summary: string;
  steps: string[];
  vitalTip: string;
}

const GUIDES: GuideItem[] = [
  {
    id: 'cpr',
    title: 'Adult CPR (Cardiopulmonary Resuscitation)',
    category: 'Cardiac & Life Support',
    icon: '🫀',
    summary: 'Immediate action for an unresponsive person who is not breathing normally.',
    steps: [
      '1. Check responsiveness and call 108 / 112 immediately.',
      '2. Place heel of one hand in the center of the chest, interlock other hand on top.',
      '3. Push hard and fast: 100–120 compressions/minute (to the beat of "Stayin Alive").',
      '4. Allow full chest recoil between compressions (depth: at least 5 cm / 2 inches).',
      '5. Continue without stopping until AED or ambulance arrives.',
    ],
    vitalTip: 'Do NOT pause compressions for more than 10 seconds. Hands-only CPR saves lives.',
  },
  {
    id: 'choking',
    title: 'Choking (Heimlich Maneuver)',
    category: 'Airway Emergency',
    icon: '🗣️',
    summary: 'When victim cannot speak, cough or breathe and is clutching their throat.',
    steps: [
      '1. Stand behind the person and wrap your arms around their waist.',
      '2. Make a fist with one hand and place thumb-side just above their navel.',
      '3. Grasp fist with your other hand and deliver quick, inward and upward thrusts.',
      '4. Repeat thrusts until the airway obstruction is expelled.',
      '5. If victim becomes unconscious, lower to floor and begin CPR immediately.',
    ],
    vitalTip: 'Never perform blind finger sweeps in the mouth as it may push the object deeper.',
  },
  {
    id: 'fire_escape',
    title: 'Building Fire & Smoke Evacuation',
    category: 'Disaster Survival',
    icon: '🔥',
    summary: 'Escape safely from residential or commercial building fires.',
    steps: [
      '1. Drop to hands and knees — crawl low under smoke where air is cleaner.',
      '2. Feel closed door handles with back of hand; if hot, do NOT open.',
      '3. Use wet cloth over nose and mouth to filter toxic particulates.',
      '4. Never use elevators during a fire; use fire exit stairs exclusively.',
      '5. Once outside, stay out. Never re-enter a burning structure.',
    ],
    vitalTip: 'If clothes catch fire: STOP, DROP to the ground, and ROLL to extinguish flames.',
  },
  {
    id: 'earthquake',
    title: 'Earthquake Survival Protocol',
    category: 'Natural Disaster',
    icon: '🏚️',
    summary: 'Protect yourself during sudden seismic tremors and structural shaking.',
    steps: [
      '1. DROP down onto your hands and knees immediately.',
      '2. COVER your head and neck under a sturdy table or desk.',
      '3. HOLD ON to your shelter until shaking completely stops.',
      '4. Stay away from glass windows, exterior walls, and falling ceiling lights.',
      '5. If outdoors, move to an open clearing away from power lines and tall buildings.',
    ],
    vitalTip: 'Do NOT run outside during shaking. Most injuries occur from falling debris near doorways.',
  },
  {
    id: 'snake_bite',
    title: 'Venomous Snake Bite Protocol',
    category: 'Toxicology & Trauma',
    icon: '🐍',
    summary: 'Emergency response for Indian Cobra, Russell’s Viper, and Krait bites.',
    steps: [
      '1. Keep the victim calm and strictly still; movement accelerates venom circulation.',
      '2. Immobilize the bitten limb with a splint at or below heart level.',
      '3. Remove rings, watches, and tight clothing before swelling occurs.',
      '4. Rush immediately to nearest hospital equipped with polyvalent anti-venom.',
      '5. Note the snake physical characteristics if safe to do so.',
    ],
    vitalTip: 'DO NOT cut the wound, do NOT suck venom, and do NOT apply tight tourniquets.',
  },
  {
    id: 'electric_shock',
    title: 'High-Voltage Electric Shock',
    category: 'Electrical Hazard',
    icon: '⚡',
    summary: 'Safe rescue procedure for domestic or live wire electric shock.',
    steps: [
      '1. Do NOT touch the victim while they are still in contact with electrical source.',
      '2. Immediately switch off the main power circuit breaker or pull the plug.',
      '3. If switch inaccessible, use dry wooden stick or rubber object to push victim free.',
      '4. Check breathing and pulse; begin CPR immediately if heart has stopped.',
      '5. Treat electrical burns with clean dry dressing and call 108.',
    ],
    vitalTip: 'Stand on a dry wooden board or rubber mat when attempting separation rescue.',
  },
];

export const SurvivalGuidesScreen: React.FC<SurvivalGuidesScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();
  const [selectedGuide, setSelectedGuide] = useState<GuideItem | null>(null);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeftIcon size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Survival & First-Aid Guides</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>📚 100% Offline Medical & Disaster Knowledge</Text>
          <Text style={styles.bannerSub}>
            Standard first-responder protocols verified by ERSS & Red Cross. Accessible even with zero internet.
          </Text>
        </View>

        <View style={styles.guideList}>
          {GUIDES.map((guide) => (
            <TouchableOpacity
              key={guide.id}
              style={styles.guideCard}
              onPress={() => setSelectedGuide(guide)}
              activeOpacity={0.8}
            >
              <View style={styles.guideIconCircle}>
                <Text style={styles.guideEmoji}>{guide.icon}</Text>
              </View>
              <View style={styles.guideInfo}>
                <Text style={styles.guideTitle}>{guide.title}</Text>
                <Text style={styles.guideCategory}>{guide.category}</Text>
                <Text style={styles.guideSummary} numberOfLines={2}>
                  {guide.summary}
                </Text>
              </View>
              <ChevronRightIcon size={20} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Guide Detail Modal */}
      <Modal
        visible={selectedGuide !== null}
        animationType="slide"
        statusBarTranslucent={true}
        onRequestClose={() => setSelectedGuide(null)}
      >
        <View style={[styles.detailContainer, { paddingTop: Math.max(insets.top, 16) }]}>
          <View style={styles.detailHeader}>
            <TouchableOpacity
              onPress={() => setSelectedGuide(null)}
              style={styles.backBtn}
              activeOpacity={0.7}
            >
              <ArrowLeftIcon size={22} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.detailHeaderTitle}>Protocol Details</Text>
            <View style={{ width: 22 }} />
          </View>

          <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
            <View style={styles.detailHero}>
              <Text style={styles.detailEmoji}>{selectedGuide?.icon}</Text>
              <Text style={styles.detailTitle}>{selectedGuide?.title}</Text>
              <Text style={styles.detailCategory}>{selectedGuide?.category}</Text>
            </View>

            <View style={styles.vitalBox}>
              <Text style={styles.vitalTitle}>⚠️ CRITICAL LIFE-SAVING RULE</Text>
              <Text style={styles.vitalText}>{selectedGuide?.vitalTip}</Text>
            </View>

            <Text style={styles.stepsHeading}>Action Steps (Follow Sequentially):</Text>

            {selectedGuide?.steps.map((step, idx) => (
              <View key={idx} style={styles.stepRow}>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}

            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => setSelectedGuide(null)}
              activeOpacity={0.85}
            >
              <Text style={styles.doneBtnText}>Close Protocol</Text>
            </TouchableOpacity>
          </ScrollView>
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
    padding: 6,
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
  banner: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginBottom: 20,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E40AF',
  },
  bannerSub: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 4,
    lineHeight: 18,
  },
  guideList: {
    gap: 12,
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  guideIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },
  guideEmoji: {
    fontSize: 24,
  },
  guideInfo: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  guideCategory: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  guideSummary: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 16,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  detailHeaderTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  detailContent: {
    padding: 24,
    paddingBottom: 120,
  },
  detailHero: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detailEmoji: {
    fontSize: 56,
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
  },
  detailCategory: {
    fontSize: 13,
    color: '#2563EB',
    fontWeight: '700',
    marginTop: 4,
  },
  vitalBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FCA5A5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  vitalTitle: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  vitalText: {
    color: '#991B1B',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 6,
    lineHeight: 20,
  },
  stepsHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 14,
  },
  stepRow: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#1E293B',
    lineHeight: 22,
    fontWeight: '500',
  },
  doneBtn: {
    backgroundColor: '#0F172A',
    height: 50,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
