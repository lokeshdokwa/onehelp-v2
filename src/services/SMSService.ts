/**
 * OneHelp — Background SMS Service
 *
 * Interacts with the custom Android native SmsManagerModule to send SMS
 * entirely in the background without opening the messaging app.
 * This is the ultimate fallback when network and mesh both fail.
 */

import { NativeModules, Platform } from 'react-native';
import { useUserStore } from '../store/useUserStore';
import { useLocationStore } from '../store/useLocationStore';

const { SmsManagerModule } = NativeModules;

export const SMSService = {
  /**
   * Broadcast an SOS SMS to all emergency contacts.
   * On iOS, this falls back to opening the SMS app URL scheme since
   * background SMS is not permitted by Apple sandboxing.
   */
  broadcastSOS: async (incidentId: string): Promise<boolean> => {
    try {
      const { emergencyContacts, userName } = useUserStore.getState();
      const locationUrl = useLocationStore.getState().getGoogleMapsUrl();
      const dms = useLocationStore.getState().getDMSString();
      const timestamp = new Date().toLocaleTimeString('en-IN');

      if (emergencyContacts.length === 0) {
        console.warn('[SMSService] No emergency contacts configured.');
        return false;
      }

      const message = `🆘 EMERGENCY ALERT from ${userName}! I need help immediately.\n\n📍 Live Location: ${locationUrl}\n🧭 Coordinates: ${dms}\n⏰ Time: ${timestamp}\n\nSent automatically via OneHelp App.`;

      if (Platform.OS === 'android') {
        if (!SmsManagerModule) {
          throw new Error('SmsManagerModule not linked on Android.');
        }

        const phoneNumbers = emergencyContacts.map((c) => c.phone);
        
        // Native module handles multipart sending for long messages
        const success = await SmsManagerModule.sendEmergencySMS(phoneNumbers, message);
        return success;
      } else {
        // iOS Fallback: Prepare a sms:// URL scheme
        // Requires user interaction, but is the only Apple-approved way
        const phoneNumbers = emergencyContacts.map((c) => c.phone).join(',');
        const { Linking } = require('react-native');
        const url = `sms:${phoneNumbers}&body=${encodeURIComponent(message)}`;
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
          return true;
        }
        return false;
      }
    } catch (error) {
      console.error('[SMSService] Failed to broadcast SOS SMS:', error);
      return false;
    }
  },
};
