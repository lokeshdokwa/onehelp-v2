/**
 * OneHelp — Hardware Shake & Power Button Trigger Service
 *
 * Direct interface to native Android hardware accelerometer & power button detector:
 * - Real-time physical shake detection with adjustable sensitivity.
 * - Screen on/off triple press SOS detection.
 * - Automatic haptic feedback upon trigger.
 */

import { NativeModules, DeviceEventEmitter, Platform, EmitterSubscription } from 'react-native';

const { ShakeDetectorModule } = NativeModules;

export type ShakeSensitivity = 'low' | 'normal' | 'high';

export interface ShakeEvent {
  acceleration: number;
  source: 'hardware_accelerometer' | 'test_simulation';
  timestamp: number;
}

type ShakeListener = (event: ShakeEvent) => void;
type PowerListener = () => void;

class ShakeManager {
  private shakeListeners: Set<ShakeListener> = new Set();
  private powerListeners: Set<PowerListener> = new Set();
  private shakeSubscription: EmitterSubscription | null = null;
  private powerSubscription: EmitterSubscription | null = null;
  private isWatching = false;
  private currentSensitivity: ShakeSensitivity = 'normal';

  constructor() {
    this.setupListeners();
  }

  private setupListeners() {
    if (Platform.OS !== 'android') return;

    this.shakeSubscription = DeviceEventEmitter.addListener(
      'ON_SHAKE_DETECTED',
      (data: any) => {
        console.log('[ShakeService] 🚨 Hardware Shake Detected:', data);
        const event: ShakeEvent = {
          acceleration: data?.acceleration || 18.0,
          source: data?.source || 'hardware_accelerometer',
          timestamp: data?.timestamp || Date.now(),
        };
        this.shakeListeners.forEach((listener) => {
          try {
            listener(event);
          } catch (e) {
            console.error('[ShakeService] Listener error:', e);
          }
        });
      }
    );

    this.powerSubscription = DeviceEventEmitter.addListener(
      'POWER_BUTTON_SOS',
      () => {
        console.log('[ShakeService] 🚨 Power Button Triple-Press Detected');
        this.powerListeners.forEach((listener) => {
          try {
            listener();
          } catch (e) {
            console.error('[ShakeService] Power listener error:', e);
          }
        });
      }
    );
  }

  /**
   * Start listening to hardware accelerometer and power button.
   */
  async startListening(sensitivity: ShakeSensitivity = 'normal'): Promise<boolean> {
    this.currentSensitivity = sensitivity;
    if (Platform.OS !== 'android' || !ShakeDetectorModule) {
      console.warn('[ShakeService] Native ShakeDetectorModule not available.');
      this.isWatching = true;
      return true;
    }

    try {
      const success = await ShakeDetectorModule.startWatch(sensitivity);
      this.isWatching = success;
      console.log(`[ShakeService] Shake watch started (sensitivity: ${sensitivity})`);
      return success;
    } catch (error) {
      console.error('[ShakeService] Failed to start shake watcher:', error);
      return false;
    }
  }

  /**
   * Stop listening to hardware accelerometer.
   */
  async stopListening(): Promise<boolean> {
    if (Platform.OS !== 'android' || !ShakeDetectorModule) {
      this.isWatching = false;
      return true;
    }

    try {
      await ShakeDetectorModule.stopWatch();
      this.isWatching = false;
      console.log('[ShakeService] Shake watch stopped');
      return true;
    } catch (error) {
      console.error('[ShakeService] Failed to stop shake watcher:', error);
      return false;
    }
  }

  /**
   * Manually simulate a shake trigger for UI / testing purposes.
   */
  async simulateShake(): Promise<void> {
    if (Platform.OS === 'android' && ShakeDetectorModule?.simulateShakeTest) {
      await ShakeDetectorModule.simulateShakeTest();
    } else {
      // Fallback JS emit
      const event: ShakeEvent = {
        acceleration: 22.5,
        source: 'test_simulation',
        timestamp: Date.now(),
      };
      this.shakeListeners.forEach((cb) => cb(event));
    }
  }

  /**
   * Register a callback for physical shake events.
   * Returns an unsubscribe function.
   */
  onShake(callback: ShakeListener): () => void {
    this.shakeListeners.add(callback);
    return () => {
      this.shakeListeners.delete(callback);
    };
  }

  /**
   * Register a callback for power button triple press events.
   * Returns an unsubscribe function.
   */
  onPowerButton(callback: PowerListener): () => void {
    this.powerListeners.add(callback);
    return () => {
      this.powerListeners.delete(callback);
    };
  }

  getSensitivity(): ShakeSensitivity {
    return this.currentSensitivity;
  }

  isActive(): boolean {
    return this.isWatching;
  }
}

export const ShakeService = new ShakeManager();
