import { create } from 'zustand';

export type NetworkType = 'wifi' | 'cellular' | 'none';

interface DeviceStatusState {
  batteryLevel: number;
  isOnline: boolean;
  networkType: NetworkType;
  isLocating: boolean;

  setBatteryLevel: (level: number) => void;
  setNetworkStatus: (isOnline: boolean, type: NetworkType) => void;
  setIsLocating: (locating: boolean) => void;
}

export const useDeviceStatusStore = create<DeviceStatusState>((set) => ({
  batteryLevel: 50, // default until read from OS
  isOnline: true,
  networkType: 'wifi',
  isLocating: false,

  setBatteryLevel: (batteryLevel: number) => set({ batteryLevel }),
  setNetworkStatus: (isOnline: boolean, networkType: NetworkType) =>
    set({ isOnline, networkType }),
  setIsLocating: (isLocating: boolean) => set({ isLocating }),
}));
