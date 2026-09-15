/**
 * OneHelp — Location State Store
 *
 * Tracks live GPS coordinates, accuracy, speed, heading.
 * Updated by LocationService on every position change.
 * Non-persistent — always fresh from hardware.
 */

import { create } from 'zustand';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  heading: number;
  timestamp: number;
}

type GPSStatus = 'active' | 'low_accuracy' | 'off' | 'initializing';

interface LocationState {
  // Current position
  location: LocationData | null;
  previousLocation: LocationData | null;

  // Status
  gpsStatus: GPSStatus;
  isTracking: boolean;
  lastUpdateAge: number;

  // TrackMe
  trackMeActive: boolean;
  trackMeDestination: { lat: number; lng: number; label: string } | null;
  trackMeExpiresAt: number;
  trackMeDeviationWarning: boolean;

  // Actions
  setLocation: (loc: LocationData) => void;
  setGPSStatus: (status: GPSStatus) => void;
  setTracking: (active: boolean) => void;
  startTrackMe: (dest: { lat: number; lng: number; label: string }, expiresAt: number) => void;
  stopTrackMe: () => void;
  setDeviationWarning: (warn: boolean) => void;
  getGoogleMapsUrl: () => string;
  getDMSString: () => string;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  location: null,
  previousLocation: null,
  gpsStatus: 'initializing',
  isTracking: false,
  lastUpdateAge: 0,

  trackMeActive: false,
  trackMeDestination: null,
  trackMeExpiresAt: 0,
  trackMeDeviationWarning: false,

  setLocation: (loc: LocationData) =>
    set((state) => ({
      location: loc,
      previousLocation: state.location,
      lastUpdateAge: 0,
      gpsStatus: loc.accuracy < 20 ? 'active' : 'low_accuracy',
    })),

  setGPSStatus: (status: GPSStatus) => set({ gpsStatus: status }),

  setTracking: (active: boolean) => set({ isTracking: active }),

  startTrackMe: (dest, expiresAt) =>
    set({
      trackMeActive: true,
      trackMeDestination: dest,
      trackMeExpiresAt: expiresAt,
      trackMeDeviationWarning: false,
    }),

  stopTrackMe: () =>
    set({
      trackMeActive: false,
      trackMeDestination: null,
      trackMeExpiresAt: 0,
      trackMeDeviationWarning: false,
    }),

  setDeviationWarning: (warn: boolean) =>
    set({ trackMeDeviationWarning: warn }),

  getGoogleMapsUrl: () => {
    const loc = get().location;
    if (!loc) return '';
    return `https://maps.google.com/?q=${loc.latitude},${loc.longitude}`;
  },

  getDMSString: () => {
    const loc = get().location;
    if (!loc) return 'No GPS';

    const toDMS = (value: number, posChar: string, negChar: string): string => {
      const abs = Math.abs(value);
      const deg = Math.floor(abs);
      const minFloat = (abs - deg) * 60;
      const min = Math.floor(minFloat);
      const sec = ((minFloat - min) * 60).toFixed(1);
      const dir = value >= 0 ? posChar : negChar;
      return `${deg}°${min}'${sec}"${dir}`;
    };

    return `${toDMS(loc.latitude, 'N', 'S')} ${toDMS(loc.longitude, 'E', 'W')}`;
  },
}));
