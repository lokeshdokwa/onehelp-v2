/**
 * OneHelp — User Profile Store
 *
 * Manages user identity, age mode selection, onboarding state,
 * emergency contacts, and language preference.
 * Persisted to MMKV for instant startup hydration.
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'onehelp-user-store' });

const mmkvStorage = {
  getItem: (name: string): string | null => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string): void => {
    storage.set(name, value);
  },
  removeItem: (name: string): void => {
    storage.delete(name);
  },
};

export type AgeMode = 'child' | 'adult' | 'senior';
export type AppLanguage =
  | 'en'
  | 'hi'
  | 'mr'
  | 'ta'
  | 'te'
  | 'bn'
  | 'gu'
  | 'kn'
  | 'pa'
  | 'ml';

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

interface UserState {
  // Identity
  userId: string;
  userName: string;
  userPhone: string;

  // Mode
  ageMode: AgeMode;
  language: AppLanguage;

  // Onboarding
  hasCompletedOnboarding: boolean;
  onboardingStep: number;

  // Contacts
  emergencyContacts: EmergencyContact[];

  // PIN (hashes only — actual PINs in Keychain)
  hasPrimaryPin: boolean;
  hasDuressPin: boolean;

  // Settings
  shakeDetectionEnabled: boolean;
  dangerZoneAlertsEnabled: boolean;
  gunshotDetectorEnabled: boolean;
  seniorModeEnabled: boolean;

  // Actions
  setUserId: (id: string) => void;
  setUserName: (name: string) => void;
  setUserPhone: (phone: string) => void;
  setAgeMode: (mode: AgeMode) => void;
  setLanguage: (lang: AppLanguage) => void;
  completeOnboarding: () => void;
  setOnboardingStep: (step: number) => void;
  addEmergencyContact: (contact: EmergencyContact) => void;
  removeEmergencyContact: (id: string) => void;
  updateEmergencyContact: (id: string, updates: Partial<EmergencyContact>) => void;
  setPrimaryPinStatus: (has: boolean) => void;
  setDuressPinStatus: (has: boolean) => void;
  toggleShakeDetection: () => void;
  toggleDangerZoneAlerts: () => void;
  toggleGunshotDetector: () => void;
  toggleSeniorMode: () => void;
  resetUser: () => void;
}

const initialState = {
  userId: '',
  userName: '',
  userPhone: '',
  ageMode: 'adult' as AgeMode,
  language: 'en' as AppLanguage,
  hasCompletedOnboarding: false,
  onboardingStep: 0,
  emergencyContacts: [] as EmergencyContact[],
  hasPrimaryPin: false,
  hasDuressPin: false,
  shakeDetectionEnabled: true,
  dangerZoneAlertsEnabled: true,
  gunshotDetectorEnabled: false,
  seniorModeEnabled: false,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      setUserId: (id: string) => set({ userId: id }),
      setUserName: (name: string) => set({ userName: name }),
      setUserPhone: (phone: string) => set({ userPhone: phone }),
      setAgeMode: (mode: AgeMode) => set({ ageMode: mode }),
      setLanguage: (lang: AppLanguage) => set({ language: lang }),

      completeOnboarding: () =>
        set({ hasCompletedOnboarding: true }),

      setOnboardingStep: (step: number) =>
        set({ onboardingStep: step }),

      addEmergencyContact: (contact: EmergencyContact) =>
        set((state) => ({
          emergencyContacts: [...state.emergencyContacts, contact].slice(0, 5),
        })),

      removeEmergencyContact: (id: string) =>
        set((state) => ({
          emergencyContacts: state.emergencyContacts.filter((c) => c.id !== id),
        })),

      updateEmergencyContact: (id: string, updates: Partial<EmergencyContact>) =>
        set((state) => ({
          emergencyContacts: state.emergencyContacts.map((c) =>
            c.id === id ? { ...c, ...updates } : c,
          ),
        })),

      setPrimaryPinStatus: (has: boolean) => set({ hasPrimaryPin: has }),
      setDuressPinStatus: (has: boolean) => set({ hasDuressPin: has }),

      toggleShakeDetection: () =>
        set((state) => ({ shakeDetectionEnabled: !state.shakeDetectionEnabled })),

      toggleDangerZoneAlerts: () =>
        set((state) => ({ dangerZoneAlertsEnabled: !state.dangerZoneAlertsEnabled })),

      toggleGunshotDetector: () =>
        set((state) => ({ gunshotDetectorEnabled: !state.gunshotDetectorEnabled })),

      toggleSeniorMode: () =>
        set((state) => ({ seniorModeEnabled: !state.seniorModeEnabled })),

      resetUser: () => set(initialState),
    }),
    {
      name: 'onehelp-user-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
