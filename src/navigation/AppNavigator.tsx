import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Modal, BackHandler, ToastAndroid, Platform } from 'react-native';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { EmergencyActiveScreen } from '../screens/sos/EmergencyActiveScreen';
import { MultiAgencyRoutingScreen } from '../screens/sos/MultiAgencyRoutingScreen';
import { AfterAlertScreen } from '../screens/sos/AfterAlertScreen';
import { PanicButtonFlowModal } from '../screens/sos/PanicButtonFlowModal';
import { VoiceStressScreen } from '../screens/ai/VoiceStressScreen';
import { MedicalDossierScreen } from '../screens/profile/MedicalDossierScreen';
import { OfflineModeScreen } from '../screens/offline/OfflineModeScreen';
import { ShakeTriggerSettingsScreen } from '../screens/tools/ShakeTriggerSettingsScreen';
import { TrustedFamilyAlertModal } from '../screens/family/TrustedFamilyAlertModal';
import { ShakeDetectedModal } from '../screens/tools/ShakeDetectedModal';
import { DuressPINScreen } from '../screens/auth/DuressPINScreen';
import { VoiceCommandModal } from '../screens/ai/VoiceCommandModal';
import { PushNotificationModal } from '../screens/tools/PushNotificationModal';
import { QuickAccessWidget } from '../screens/widgets/QuickAccessWidget';
import { QuickToolsModal } from '../screens/tools/QuickToolsModal';
import { FakeCallModal } from '../screens/tools/FakeCallModal';
import { LoudSirenModal } from '../screens/tools/LoudSirenModal';
import { MorseCodeStrobeModal } from '../screens/tools/MorseCodeStrobeModal';
import { SurvivalGuidesScreen } from '../screens/profile/SurvivalGuidesScreen';
import { LiveDispatcherTrackerModal } from '../screens/tools/LiveDispatcherTrackerModal';
import { LostChildMatcherModal } from '../screens/ai/LostChildMatcherModal';
import { LowBandwidthChatModal } from '../screens/tools/LowBandwidthChatModal';
import { SafeWalkModal } from '../screens/tools/SafeWalkModal';

export type RootStackParamList = {
  OnboardingWelcome: undefined;
  OnboardingAgeSelect: undefined;
  OnboardingPermissions: undefined;
  OnboardingContactSetup: undefined;
  OnboardingPINSetup: undefined;
  MainApp: undefined;
};

type AppStep = 'splash' | 'onboarding' | 'login' | 'main';

export const navigationRef = createNavigationContainerRef<any>();

export const AppNavigator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('main');

  // SOS & Emergency Flows
  const [panicModalVisible, setPanicModalVisible] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [isRoutingActive, setIsRoutingActive] = useState(false);
  const [isAfterAlertActive, setIsAfterAlertActive] = useState(false);

  // Auxiliary Screens & Modals
  const [activeSubScreen, setActiveSubScreen] = useState<
    | null
    | 'voiceStress'
    | 'medicalDossier'
    | 'offlineMode'
    | 'shakeSettings'
    | 'duressPIN'
    | 'trustedFamilyAlert'
  >(null);

  // Quick Tools & Feature Modals
  const [quickToolsVisible, setQuickToolsVisible] = useState(false);
  const [shakeModalVisible, setShakeModalVisible] = useState(false);
  const [voiceModalVisible, setVoiceModalVisible] = useState(false);
  const [pushNotifVisible, setPushNotifVisible] = useState(false);
  const [widgetModalVisible, setWidgetModalVisible] = useState(false);
  const [fakeCallVisible, setFakeCallVisible] = useState(false);
  const [sirenVisible, setSirenVisible] = useState(false);
  const [morseVisible, setMorseVisible] = useState(false);
  const [survivalGuidesVisible, setSurvivalGuidesVisible] = useState(false);
  const [liveTrackerVisible, setLiveTrackerVisible] = useState(false);
  const [lostChildVisible, setLostChildVisible] = useState(false);
  const [lowChatVisible, setLowChatVisible] = useState(false);
  const [safeWalkVisible, setSafeWalkVisible] = useState(false);

  const lastBackPressedRef = useRef<number>(0);

  // Comprehensive Android Hardware Back Press Handler
  useEffect(() => {
    const onBackPress = () => {
      // 1. Close any visible modal first
      if (fakeCallVisible) {
        setFakeCallVisible(false);
        return true;
      }
      if (sirenVisible) {
        setSirenVisible(false);
        return true;
      }
      if (morseVisible) {
        setMorseVisible(false);
        return true;
      }
      if (survivalGuidesVisible) {
        setSurvivalGuidesVisible(false);
        return true;
      }
      if (liveTrackerVisible) {
        setLiveTrackerVisible(false);
        return true;
      }
      if (lostChildVisible) {
        setLostChildVisible(false);
        return true;
      }
      if (lowChatVisible) {
        setLowChatVisible(false);
        return true;
      }
      if (safeWalkVisible) {
        setSafeWalkVisible(false);
        return true;
      }
      if (quickToolsVisible) {
        setQuickToolsVisible(false);
        return true;
      }
      if (widgetModalVisible) {
        setWidgetModalVisible(false);
        return true;
      }
      if (pushNotifVisible) {
        setPushNotifVisible(false);
        return true;
      }
      if (voiceModalVisible) {
        setVoiceModalVisible(false);
        return true;
      }
      if (shakeModalVisible) {
        setShakeModalVisible(false);
        return true;
      }
      if (panicModalVisible) {
        setPanicModalVisible(false);
        return true;
      }

      // 2. Close auxiliary sub-screens and return to dashboard
      if (activeSubScreen !== null) {
        setActiveSubScreen(null);
        return true;
      }

      // 3. Handle emergency flow back navigation
      if (isRoutingActive) {
        setIsRoutingActive(false);
        setIsEmergencyActive(true);
        return true;
      }
      if (isAfterAlertActive) {
        setIsAfterAlertActive(false);
        setIsEmergencyActive(false);
        return true;
      }
      if (isEmergencyActive) {
        setIsEmergencyActive(false);
        return true;
      }

      // 4. Return from Login to Onboarding
      if (currentStep === 'login') {
        setCurrentStep('onboarding');
        return true;
      }

      // 5. In Main dashboard tabs
      if (currentStep === 'main') {
        if (navigationRef.isReady()) {
          const currentRoute = navigationRef.getCurrentRoute()?.name;
          // If on Map, Helplines, Family, or More: navigate back to Home tab
          if (currentRoute && currentRoute !== 'Home') {
            navigationRef.navigate('Home');
            return true;
          }
        }

        // On Home tab: prevent instant exit, require double tap within 2s
        const now = Date.now();
        if (now - lastBackPressedRef.current < 2000) {
          BackHandler.exitApp();
          return true;
        }
        lastBackPressedRef.current = now;
        if (Platform.OS === 'android') {
          ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
        }
        return true;
      }

      return false;
    };

    const backSubscription = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );
    return () => backSubscription.remove();
  }, [
    currentStep,
    quickToolsVisible,
    widgetModalVisible,
    pushNotifVisible,
    voiceModalVisible,
    shakeModalVisible,
    panicModalVisible,
    fakeCallVisible,
    sirenVisible,
    morseVisible,
    survivalGuidesVisible,
    liveTrackerVisible,
    lostChildVisible,
    lowChatVisible,
    safeWalkVisible,
    activeSubScreen,
    isRoutingActive,
    isAfterAlertActive,
    isEmergencyActive,
  ]);

  // Handlers
  const handleTriggerSOS = () => {
    setPanicModalVisible(true);
  };

  const handlePanicConfirm = () => {
    setPanicModalVisible(false);
    setIsEmergencyActive(true);
  };

  const handleToolSelect = (toolId: string) => {
    if (toolId === 'fakeCall') setFakeCallVisible(true);
    else if (toolId === 'siren') setSirenVisible(true);
    else if (toolId === 'morse') setMorseVisible(true);
    else if (toolId === 'survivalGuides') setSurvivalGuidesVisible(true);
    else if (toolId === 'liveTracker') setLiveTrackerVisible(true);
    else if (toolId === 'lostChild') setLostChildVisible(true);
    else if (toolId === 'lowChat') setLowChatVisible(true);
    else if (toolId === 'safeWalk') setSafeWalkVisible(true);
    else if (toolId === 'widget') setWidgetModalVisible(true);
    else if (toolId === 'shakeModal') setShakeModalVisible(true);
    else if (toolId === 'duress') setActiveSubScreen('duressPIN');
    else if (toolId === 'voice') setVoiceModalVisible(true);
    else if (toolId === 'stress') setActiveSubScreen('voiceStress');
    else if (toolId === 'pushNotif') setPushNotifVisible(true);
    else if (toolId === 'routing') setIsRoutingActive(true);
    else if (toolId === 'afterAlert') setIsAfterAlertActive(true);
    else if (toolId === 'familyAlert') setActiveSubScreen('trustedFamilyAlert');
    else if (toolId === 'offline') setActiveSubScreen('offlineMode');
    else if (toolId === 'shakeSettings') setActiveSubScreen('shakeSettings');
  };

  return (
    <View style={styles.container}>
      {/* 1. Splash Screen */}
      {currentStep === 'splash' && (
        <SplashScreen onFinish={() => setCurrentStep('onboarding')} />
      )}

      {/* 2. Onboarding Screens (1, 2, 3) */}
      {currentStep === 'onboarding' && (
        <OnboardingScreen
          onComplete={() => setCurrentStep('main')}
          onLogin={() => setCurrentStep('login')}
        />
      )}

      {/* 3. Login / Sign Up (Screen 5) */}
      {currentStep === 'login' && (
        <LoginScreen
          onLoginSuccess={() => setCurrentStep('main')}
          onSignUpClick={() => setCurrentStep('main')}
        />
      )}

      {/* 4. Main App Flow with Bottom Tabs */}
      {currentStep === 'main' && (
        <NavigationContainer ref={navigationRef}>
          <BottomTabNavigator
            onTriggerSOS={handleTriggerSOS}
            onOpenMedicalDossier={() => setActiveSubScreen('medicalDossier')}
            onOpenOfflineMode={() => setActiveSubScreen('offlineMode')}
            onOpenShakeSettings={() => setActiveSubScreen('shakeSettings')}
            onNotifyFamilyModal={() => setActiveSubScreen('trustedFamilyAlert')}
            onOpenToolsModal={() => setQuickToolsVisible(true)}
            onOpenSurvivalGuides={() => setSurvivalGuidesVisible(true)}
          />
        </NavigationContainer>
      )}

      {/* Emergency Active Flow Modal */}
      <Modal
        visible={isEmergencyActive || isRoutingActive || isAfterAlertActive}
        animationType="fade"
        statusBarTranslucent={true}
        onRequestClose={() => {
          if (isRoutingActive) {
            setIsRoutingActive(false);
            setIsEmergencyActive(true);
          } else if (isAfterAlertActive) {
            setIsAfterAlertActive(false);
            setIsEmergencyActive(false);
          } else {
            setIsEmergencyActive(false);
          }
        }}
      >
        {isEmergencyActive && (
          <EmergencyActiveScreen
            onCancel={() => setIsEmergencyActive(false)}
            onViewRouting={() => {
              setIsEmergencyActive(false);
              setIsRoutingActive(true);
            }}
            onViewLiveTracker={() => setLiveTrackerVisible(true)}
          />
        )}

        {isRoutingActive && (
          <MultiAgencyRoutingScreen
            onBack={() => {
              setIsRoutingActive(false);
              setIsEmergencyActive(true);
            }}
            onFinish={() => {
              setIsRoutingActive(false);
              setIsAfterAlertActive(true);
            }}
          />
        )}

        {isAfterAlertActive && (
          <AfterAlertScreen
            onViewDetails={() => {
              setIsAfterAlertActive(false);
              setIsEmergencyActive(true);
            }}
            onDone={() => {
              setIsAfterAlertActive(false);
              setIsEmergencyActive(false);
            }}
          />
        )}
      </Modal>

      {/* Auxiliary Sub-Screens Modal */}
      <Modal
        visible={activeSubScreen !== null}
        animationType="slide"
        statusBarTranslucent={true}
        onRequestClose={() => setActiveSubScreen(null)}
      >
        {activeSubScreen === 'voiceStress' && (
          <VoiceStressScreen onBack={() => setActiveSubScreen(null)} />
        )}

        {activeSubScreen === 'medicalDossier' && (
          <MedicalDossierScreen onBack={() => setActiveSubScreen(null)} />
        )}

        {activeSubScreen === 'offlineMode' && (
          <OfflineModeScreen
            onBack={() => setActiveSubScreen(null)}
            onRetry={() => setActiveSubScreen(null)}
          />
        )}

        {activeSubScreen === 'shakeSettings' && (
          <ShakeTriggerSettingsScreen
            onBack={() => setActiveSubScreen(null)}
            onTestTrigger={() => setShakeModalVisible(true)}
          />
        )}

        {activeSubScreen === 'trustedFamilyAlert' && (
          <TrustedFamilyAlertModal
            onBack={() => setActiveSubScreen(null)}
            onSendAlert={() => {
              setActiveSubScreen(null);
              setPushNotifVisible(true);
            }}
          />
        )}

        {activeSubScreen === 'duressPIN' && (
          <DuressPINScreen
            onBack={() => setActiveSubScreen(null)}
            onPINSubmitted={(pin) => {
              setActiveSubScreen(null);
              handleTriggerSOS();
            }}
          />
        )}
      </Modal>

      {/* Screen 20: Panic Button Flow Modal */}
      <PanicButtonFlowModal
        visible={panicModalVisible}
        onConfirm={handlePanicConfirm}
        onCancel={() => setPanicModalVisible(false)}
      />

      {/* Screen 21: Shake Detected Modal */}
      <ShakeDetectedModal
        visible={shakeModalVisible}
        onSendSOS={() => {
          setShakeModalVisible(false);
          handleTriggerSOS();
        }}
        onCancel={() => setShakeModalVisible(false)}
      />

      {/* Screen 23: Voice Command Modal */}
      <VoiceCommandModal
        visible={voiceModalVisible}
        onRecognized={(cmd) => {
          setVoiceModalVisible(false);
          handleTriggerSOS();
        }}
        onCancel={() => setVoiceModalVisible(false)}
      />

      {/* Screen 25: Push Notification Preview Modal */}
      <PushNotificationModal
        visible={pushNotifVisible}
        onClose={() => setPushNotifVisible(false)}
      />

      {/* Screen 18: Quick Access SOS Widget Modal */}
      <Modal
        visible={widgetModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setWidgetModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <QuickAccessWidget
            onTriggerSOS={() => {
              setWidgetModalVisible(false);
              handleTriggerSOS();
            }}
            onPolicePress={() => {
              setWidgetModalVisible(false);
              handleTriggerSOS();
            }}
            onAmbulancePress={() => {
              setWidgetModalVisible(false);
              handleTriggerSOS();
            }}
            onFirePress={() => {
              setWidgetModalVisible(false);
              handleTriggerSOS();
            }}
          />
          <View style={{ marginTop: 20 }}>
            <DuressCancelLink onPress={() => setWidgetModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* SIH Feature #13: Fake Call Modal */}
      <FakeCallModal
        visible={fakeCallVisible}
        onDismiss={() => setFakeCallVisible(false)}
      />

      {/* SIH Feature #14: High-Decibel Tactical Siren Modal */}
      <LoudSirenModal
        visible={sirenVisible}
        onClose={() => setSirenVisible(false)}
      />

      {/* SIH Feature #18: Morse Code Optical SOS Strobe Modal */}
      <MorseCodeStrobeModal
        visible={morseVisible}
        onClose={() => setMorseVisible(false)}
      />

      {/* SIH Feature #16: Survival & First-Aid Guides */}
      <Modal
        visible={survivalGuidesVisible}
        animationType="slide"
        statusBarTranslucent={true}
        onRequestClose={() => setSurvivalGuidesVisible(false)}
      >
        <SurvivalGuidesScreen onBack={() => setSurvivalGuidesVisible(false)} />
      </Modal>

      {/* SIH Feature #8: Live Dispatcher Vehicle Tracker Modal */}
      <LiveDispatcherTrackerModal
        visible={liveTrackerVisible}
        onClose={() => setLiveTrackerVisible(false)}
      />

      {/* SIH Feature #26: Lost Child AI Face Matcher Modal */}
      <LostChildMatcherModal
        visible={lostChildVisible}
        onClose={() => setLostChildVisible(false)}
      />

      {/* SIH Feature #9: Low-Bandwidth 2G Text Mode */}
      <LowBandwidthChatModal
        visible={lowChatVisible}
        onClose={() => setLowChatVisible(false)}
      />

      {/* SIH Feature #15: Safe Walk Geo-Monitor */}
      <SafeWalkModal
        visible={safeWalkVisible}
        onClose={() => setSafeWalkVisible(false)}
        onTriggerSOS={handleTriggerSOS}
      />

      {/* Quick Tools & Feature Selector */}
      <QuickToolsModal
        visible={quickToolsVisible}
        onClose={() => setQuickToolsVisible(false)}
        onSelectTool={handleToolSelect}
      />
    </View>
  );
};

const DuressCancelLink = ({ onPress }: { onPress: () => void }) => {
  const { TouchableOpacity, Text } = require('react-native');
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>Close Widget</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
});
