/**
 * OneHelp — Accessibility State Store
 *
 * Manages senior mode, font scale overrides, theme selection,
 * TTS voice readout preference, and high-contrast mode.
 * Persisted to MMKV.
 */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({ id: 'onehelp-accessibility-store' });

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

interface AccessibilityState {
  seniorModeActive: boolean;
  fontScale: number;
  highContrast: boolean;
  voiceReadoutEnabled: boolean;
  hapticFeedbackEnabled: boolean;
  reducedMotion: boolean;
  screenReaderActive: boolean;

  setSeniorMode: (active: boolean) => void;
  setFontScale: (scale: number) => void;
  setHighContrast: (enabled: boolean) => void;
  setVoiceReadout: (enabled: boolean) => void;
  setHapticFeedback: (enabled: boolean) => void;
  setReducedMotion: (reduced: boolean) => void;
  setScreenReaderActive: (active: boolean) => void;
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set) => ({
      seniorModeActive: false,
      fontScale: 1.0,
      highContrast: false,
      voiceReadoutEnabled: false,
      hapticFeedbackEnabled: true,
      reducedMotion: false,
      screenReaderActive: false,

      setSeniorMode: (active: boolean) =>
        set({
          seniorModeActive: active,
          fontScale: active ? 1.5 : 1.0,
          highContrast: active,
          voiceReadoutEnabled: active,
        }),

      setFontScale: (scale: number) => set({ fontScale: scale }),
      setHighContrast: (enabled: boolean) => set({ highContrast: enabled }),
      setVoiceReadout: (enabled: boolean) => set({ voiceReadoutEnabled: enabled }),
      setHapticFeedback: (enabled: boolean) => set({ hapticFeedbackEnabled: enabled }),
      setReducedMotion: (reduced: boolean) => set({ reducedMotion: reduced }),
      setScreenReaderActive: (active: boolean) => set({ screenReaderActive: active }),
    }),
    {
      name: 'onehelp-accessibility-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
