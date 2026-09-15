/**
 * OneHelp — Location Service
 *
 * Interfaces with @react-native-community/geolocation for robust, battery-efficient
 * background GPS tracking. Feeds data directly into useLocationStore.
 */

import Geolocation from '@react-native-community/geolocation';
import { useLocationStore, LocationData } from '../store/useLocationStore';

let watchId: number | null = null;

export const LocationService = {
  /**
   * Configure and start the background geolocation engine.
   * Prompts for necessary permissions on first run.
   */
  start: async (): Promise<void> => {
    try {
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'always',
        locationProvider: 'auto'
      });

      watchId = Geolocation.watchPosition(
        (location) => {
          const locData: LocationData = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
            altitude: location.coords.altitude || 0,
            speed: location.coords.speed || 0,
            heading: location.coords.heading || 0,
            timestamp: location.timestamp,
          };
          useLocationStore.getState().setLocation(locData);
        },
        (error) => {
          console.error('[LocationService] Location error:', error);
          useLocationStore.getState().setGPSStatus('low_accuracy');
        },
        { enableHighAccuracy: true, distanceFilter: 10, maximumAge: 10000 }
      );
      
      useLocationStore.getState().setTracking(true);
    } catch (error) {
      console.error('[LocationService] Failed to start:', error);
      useLocationStore.getState().setGPSStatus('off');
    }
  },

  /**
   * Stop background tracking.
   */
  stop: async (): Promise<void> => {
    try {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
        watchId = null;
      }
      useLocationStore.getState().setTracking(false);
    } catch (error) {
      console.error('[LocationService] Failed to stop:', error);
    }
  },

  /**
   * Force a high-accuracy GPS fix immediately.
   * Used when SOS is triggered.
   */
  getCurrentPosition: async (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (location) => {
          const locData: LocationData = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
            altitude: location.coords.altitude || 0,
            speed: location.coords.speed || 0,
            heading: location.coords.heading || 0,
            timestamp: location.timestamp,
          };
          useLocationStore.getState().setLocation(locData);
          resolve(locData);
        },
        (error) => {
          console.error('[LocationService] getCurrentPosition error:', error);
          const cached = useLocationStore.getState().location;
          if (cached) {
            resolve(cached); // Fallback to last known
          } else {
            reject(error);
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000 }
      );
    });
  },
};
