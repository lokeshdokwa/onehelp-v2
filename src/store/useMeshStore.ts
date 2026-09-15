/**
 * OneHelp — Mesh Network State Store
 * Tracks connected BLE peers, mesh relay status, and packet queue.
 */

import { create } from 'zustand';

export interface MeshPeer {
  id: string;
  deviceName: string;
  rssi: number;
  lastSeen: number;
  isRelaying: boolean;
}

type MeshStatus = 'ready' | 'broadcasting' | 'unavailable' | 'scanning';

interface MeshState {
  status: MeshStatus;
  peers: MeshPeer[];
  pendingPackets: number;
  totalRelayed: number;

  setStatus: (status: MeshStatus) => void;
  addPeer: (peer: MeshPeer) => void;
  removePeer: (id: string) => void;
  updatePeer: (id: string, updates: Partial<MeshPeer>) => void;
  clearStalePeers: (maxAge: number) => void;
  incrementRelayed: () => void;
  setPendingPackets: (count: number) => void;
  reset: () => void;
}

export const useMeshStore = create<MeshState>((set) => ({
  status: 'unavailable',
  peers: [],
  pendingPackets: 0,
  totalRelayed: 0,

  setStatus: (status: MeshStatus) => set({ status }),

  addPeer: (peer: MeshPeer) =>
    set((state) => {
      const exists = state.peers.find((p) => p.id === peer.id);
      if (exists) {
        return {
          peers: state.peers.map((p) =>
            p.id === peer.id ? { ...p, ...peer, lastSeen: Date.now() } : p,
          ),
        };
      }
      return { peers: [...state.peers, { ...peer, lastSeen: Date.now() }] };
    }),

  removePeer: (id: string) =>
    set((state) => ({
      peers: state.peers.filter((p) => p.id !== id),
    })),

  updatePeer: (id: string, updates: Partial<MeshPeer>) =>
    set((state) => ({
      peers: state.peers.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),

  clearStalePeers: (maxAge: number) =>
    set((state) => ({
      peers: state.peers.filter((p) => Date.now() - p.lastSeen < maxAge),
    })),

  incrementRelayed: () =>
    set((state) => ({ totalRelayed: state.totalRelayed + 1 })),

  setPendingPackets: (count: number) => set({ pendingPackets: count }),

  reset: () =>
    set({
      status: 'unavailable',
      peers: [],
      pendingPackets: 0,
      totalRelayed: 0,
    }),
}));
