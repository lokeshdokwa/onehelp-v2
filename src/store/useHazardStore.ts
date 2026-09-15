/**
 * OneHelp — Hazard Map State Store
 * Tracks visible hazard pins on the map with spatial query support.
 */

import { create } from 'zustand';

export interface HazardPin {
  id: string;
  latitude: number;
  longitude: number;
  type: 'flood' | 'fallen_tree' | 'live_wire' | 'stray_animal' | 'fire' | 'rubble';
  description: string;
  photoPath: string;
  createdAt: number;
  expiresAt: number;
  verifiedCount: number;
  reportedBy: string;
}

interface HazardState {
  hazards: HazardPin[];
  selectedHazard: HazardPin | null;
  isDropping: boolean;

  setHazards: (hazards: HazardPin[]) => void;
  addHazard: (hazard: HazardPin) => void;
  removeHazard: (id: string) => void;
  verifyHazard: (id: string) => void;
  selectHazard: (hazard: HazardPin | null) => void;
  setDropping: (dropping: boolean) => void;
  purgeExpired: () => void;
  getHazardsByType: (type: HazardPin['type']) => HazardPin[];
}

export const useHazardStore = create<HazardState>((set, get) => ({
  hazards: [],
  selectedHazard: null,
  isDropping: false,

  setHazards: (hazards: HazardPin[]) => set({ hazards }),

  addHazard: (hazard: HazardPin) =>
    set((state) => ({ hazards: [...state.hazards, hazard] })),

  removeHazard: (id: string) =>
    set((state) => ({
      hazards: state.hazards.filter((h) => h.id !== id),
      selectedHazard: state.selectedHazard?.id === id ? null : state.selectedHazard,
    })),

  verifyHazard: (id: string) =>
    set((state) => ({
      hazards: state.hazards.map((h) =>
        h.id === id ? { ...h, verifiedCount: h.verifiedCount + 1 } : h,
      ),
    })),

  selectHazard: (hazard: HazardPin | null) => set({ selectedHazard: hazard }),

  setDropping: (dropping: boolean) => set({ isDropping: dropping }),

  purgeExpired: () =>
    set((state) => ({
      hazards: state.hazards.filter((h) => h.expiresAt > Date.now()),
    })),

  getHazardsByType: (type: HazardPin['type']) =>
    get().hazards.filter((h) => h.type === type),
}));
