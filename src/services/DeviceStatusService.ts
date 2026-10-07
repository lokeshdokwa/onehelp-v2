/**
 * OneHelp — Device Status Service
 *
 * Connects directly to real device hardware:
 * 1. Real Battery capacity via native Android BatteryManager
 * 2. Real Network connectivity via Android ConnectivityManager + fast Google 204 ping
 * 3. Real GPS Coordinates via Geolocation + Real Locality Reverse Geocoding
 */

import { NativeModules, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useDeviceStatusStore, NetworkType } from '../store/useDeviceStatusStore';
import { useLocationStore, LocationData } from '../store/useLocationStore';

const { SmsManagerModule } = NativeModules;

let statusIntervalId: ReturnType<typeof setInterval> | null = null;
let isStarted = false;

export const DeviceStatusService = {
  /**
   * Start periodic tracking of battery, network, and GPS
   */
  start: async () => {
    if (isStarted) return;
    isStarted = true;

    // Immediately fetch initial states
    await DeviceStatusService.updateBattery();
    await DeviceStatusService.updateNetwork();
    await DeviceStatusService.updateLocation();

    // Check battery & network every 3 seconds
    statusIntervalId = setInterval(async () => {
      await DeviceStatusService.updateBattery();
      await DeviceStatusService.updateNetwork();
    }, 3000);
  },

  stop: () => {
    if (statusIntervalId) {
      clearInterval(statusIntervalId);
      statusIntervalId = null;
    }
    isStarted = false;
  },

  /**
   * Read real battery percentage from Android BatteryManager
   */
  updateBattery: async (): Promise<number> => {
    try {
      if (SmsManagerModule && typeof SmsManagerModule.getBatteryLevel === 'function') {
        const level = await SmsManagerModule.getBatteryLevel();
        if (typeof level === 'number' && level >= 0 && level <= 100) {
          useDeviceStatusStore.getState().setBatteryLevel(level);
          return level;
        }
      }
    } catch (e) {
      console.warn('[DeviceStatusService] Battery read error:', e);
    }
    return useDeviceStatusStore.getState().batteryLevel;
  },

  /**
   * Detect real network connectivity:
   * 1. Query Android ConnectivityManager
   * 2. Double-check with an ultra-fast network probe
   */
  updateNetwork: async (): Promise<{ isOnline: boolean; type: NetworkType }> => {
    let nativeOnline = false;
    let netType: NetworkType = 'none';

    try {
      if (SmsManagerModule && typeof SmsManagerModule.getNetworkStatus === 'function') {
        const status = await SmsManagerModule.getNetworkStatus();
        nativeOnline = !!status?.isConnected;
        netType = (status?.type as NetworkType) || 'none';
      }
    } catch (e) {
      // ignore
    }

    // Ping check to verify genuine internet access
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      const res = await fetch('https://clients3.google.com/generate_204', {
        method: 'HEAD',
        signal: controller.signal,
      });
      clearTimeout(timer);
      const isOnline = res.status === 204 || res.status === 200;
      useDeviceStatusStore.getState().setNetworkStatus(isOnline, isOnline ? (netType !== 'none' ? netType : 'wifi') : 'none');
      return { isOnline, type: netType };
    } catch (e) {
      // If ping failed, device has no active internet
      useDeviceStatusStore.getState().setNetworkStatus(false, 'none');
      return { isOnline: false, type: 'none' };
    }
  },

  /**
   * Request real Android GPS location and reverse geocode human-readable area
   */
  updateLocation: async () => {
    useDeviceStatusStore.getState().setIsLocating(true);

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'GPS Emergency Access',
            message: 'OneHelp needs high-accuracy GPS to detect your real location for emergency dispatch.',
            buttonPositive: 'Allow GPS',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          useDeviceStatusStore.getState().setIsLocating(false);
          return;
        }
      } catch (e) {
        console.warn('[DeviceStatusService] Permission request failed:', e);
      }
    }

    // 1. Try Native Android Hardware Location (LocationManager + Android Google Geocoder)
    if (Platform.OS === 'android' && SmsManagerModule && typeof SmsManagerModule.getHardwareLocation === 'function') {
      try {
        const hwLoc = await SmsManagerModule.getHardwareLocation();
        if (hwLoc && typeof hwLoc.latitude === 'number' && typeof hwLoc.longitude === 'number') {
          const locData: LocationData = {
            latitude: hwLoc.latitude,
            longitude: hwLoc.longitude,
            accuracy: hwLoc.accuracy || 10,
            altitude: hwLoc.altitude || 0,
            speed: hwLoc.speed || 0,
            heading: 0,
            timestamp: hwLoc.timestamp || Date.now(),
          };
          useLocationStore.getState().setLocation(locData);
          useLocationStore.getState().setGPSStatus('active');
          useDeviceStatusStore.getState().setIsLocating(false);

          const addr = hwLoc.shortAddress || hwLoc.fullAddress;
          if (addr && addr.trim().length > 0) {
            useLocationStore.getState().setAddress(addr);
          }
          if (hwLoc.fullAddress) {
            useLocationStore.getState().setFullAddress(hwLoc.fullAddress);
          }
          return;
        }
      } catch (hwErr) {
        console.warn('[DeviceStatusService] Native location call error, falling back to Geolocation:', hwErr);
      }
    }

    // 2. Fallback: Geolocation library
    Geolocation.setRNConfiguration({
      skipPermissionRequests: false,
      authorizationLevel: 'always',
      locationProvider: 'auto',
    });

    Geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy, altitude, speed, heading } = pos.coords;
        const locData: LocationData = {
          latitude,
          longitude,
          accuracy: accuracy || 10,
          altitude: altitude || 0,
          speed: speed || 0,
          heading: heading || 0,
          timestamp: pos.timestamp,
        };

        useLocationStore.getState().setLocation(locData);
        useLocationStore.getState().setGPSStatus('active');
        useDeviceStatusStore.getState().setIsLocating(false);

        // Reverse geocode via OpenStreetMap Nominatim or BigDataCloud
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            { headers: { 'User-Agent': 'OneHelp-Emergency-App/1.0' } }
          );
          const data = await res.json();
          const addr = data.address;
          if (addr) {
            const neighbourhood = addr.neighbourhood || addr.suburb || addr.residential || addr.road || '';
            const city = addr.city || addr.town || addr.state_district || addr.county || '';
            const parts = [neighbourhood, city].filter(Boolean);
            if (parts.length > 0) {
              useLocationStore.getState().setAddress(parts.join(', '));
              return;
            }
          }
        } catch (osmErr) {
          // ignore
        }

        // Secondary fallback
        try {
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const data = await res.json();
          const locality = data.locality || data.neighbourhood || '';
          const city = data.city || data.localityInfo?.administrative?.[2]?.name || data.principalSubdivision || '';
          const placeName = [locality, city].filter(Boolean).join(', ') || `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;
          useLocationStore.getState().setAddress(placeName);
        } catch (revErr) {
          useLocationStore.getState().setAddress(`${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`);
        }
      },
      (err) => {
        console.warn('[DeviceStatusService] GPS error:', err);
        useDeviceStatusStore.getState().setIsLocating(false);
        useLocationStore.getState().setGPSStatus('low_accuracy');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  },
};
