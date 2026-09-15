/**
 * OneHelp — SOS State Store
 *
 * Tracks the entire lifecycle of an active SOS event:
 * idle → countdown → active → dispatching → dispatched → resolved/cancelled
 *
 * Persisted to MMKV so an active SOS survives app restarts.
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'onehelp-sos-store' });

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

export type SOSStatus =
  | 'idle'
  | 'countdown'
  | 'active'
  | 'dispatching'
  | 'dispatched'
  | 'cancelled'
  | 'resolved';

export type TriggerMethod =
  | 'button'
  | 'shake'
  | 'voice'
  | 'duress_pin'
  | 'power_button'
  | 'trackme_expired'
  | 'auto';

export type DispatchMethod = 'api' | 'sms' | 'mesh' | 'satellite' | 'none';

export type EmergencyCategory =
  | 'police'
  | 'fire'
  | 'medical'
  | 'disaster'
  | 'women'
  | 'child'
  | 'general';

interface SOSState {
  // SOS lifecycle
  status: SOSStatus;
  incidentId: string;
  triggerMethod: TriggerMethod;
  emergencyCategory: EmergencyCategory;

  // Dispatch info
  dispatchMethod: DispatchMethod;
  dispatchTimestamp: number;
  contactsNotified: number;

  // Location at trigger
  triggerLat: number;
  triggerLng: number;

  // AI analysis
  stressScore: number;
  audioEvidencePath: string;

  // Duress
  isDuressMode: boolean;

  // Cancel window
  cancelWindowActive: boolean;
  cancelWindowEndsAt: number;

  // Responder tracking
  responderLat: number;
  responderLng: number;
  responderETA: number;
  responderType: string;

  // Actions
  startCountdown: (method: TriggerMethod) => void;
  activateSOS: (params: {
    incidentId: string;
    lat: number;
    lng: number;
    category: EmergencyCategory;
    isDuress: boolean;
  }) => void;
  setDispatching: () => void;
  setDispatched: (method: DispatchMethod, contactCount: number) => void;
  setStressScore: (score: number) => void;
  setAudioEvidence: (path: string) => void;
  updateResponder: (lat: number, lng: number, eta: number, type: string) => void;
  startCancelWindow: (endsAt: number) => void;
  cancelSOS: () => void;
  resolveSOS: () => void;
  resetSOS: () => void;
}

const initialState = {
  status: 'idle' as SOSStatus,
  incidentId: '',
  triggerMethod: 'button' as TriggerMethod,
  emergencyCategory: 'general' as EmergencyCategory,
  dispatchMethod: 'none' as DispatchMethod,
  dispatchTimestamp: 0,
  contactsNotified: 0,
  triggerLat: 0,
  triggerLng: 0,
  stressScore: 0,
  audioEvidencePath: '',
  isDuressMode: false,
  cancelWindowActive: false,
  cancelWindowEndsAt: 0,
  responderLat: 0,
  responderLng: 0,
  responderETA: 0,
  responderType: '',
};

export const useSOSStore = create<SOSState>()(
  persist(
    (set) => ({
      ...initialState,

      startCountdown: (method: TriggerMethod) =>
        set({
          status: 'countdown',
          triggerMethod: method,
        }),

      activateSOS: ({ incidentId, lat, lng, category, isDuress }) =>
        set({
          status: 'active',
          incidentId,
          triggerLat: lat,
          triggerLng: lng,
          emergencyCategory: category,
          isDuressMode: isDuress,
        }),

      setDispatching: () =>
        set({ status: 'dispatching' }),

      setDispatched: (method: DispatchMethod, contactCount: number) =>
        set({
          status: 'dispatched',
          dispatchMethod: method,
          dispatchTimestamp: Date.now(),
          contactsNotified: contactCount,
        }),

      setStressScore: (score: number) =>
        set({ stressScore: score }),

      setAudioEvidence: (path: string) =>
        set({ audioEvidencePath: path }),

      updateResponder: (lat: number, lng: number, eta: number, type: string) =>
        set({
          responderLat: lat,
          responderLng: lng,
          responderETA: eta,
          responderType: type,
        }),

      startCancelWindow: (endsAt: number) =>
        set({
          cancelWindowActive: true,
          cancelWindowEndsAt: endsAt,
        }),

      cancelSOS: () =>
        set({
          ...initialState,
          status: 'cancelled',
        }),

      resolveSOS: () =>
        set((state) => ({
          ...state,
          status: 'resolved',
          cancelWindowActive: false,
        })),

      resetSOS: () => set(initialState),
    }),
    {
      name: 'onehelp-sos-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
