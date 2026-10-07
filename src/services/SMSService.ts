/**
 * OneHelp — Background SMS Service
 *
 * Interacts with the custom Android native SmsManagerModule to send SMS
 * entirely in the background without opening the messaging app.
 * This is the ultimate fallback when network and mesh both fail.
 */

import { NativeModules, Platform, ToastAndroid } from 'react-native';
import { useUserStore } from '../store/useUserStore';
import { useLocationStore } from '../store/useLocationStore';
import { useDeviceStatusStore } from '../store/useDeviceStatusStore';

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
      const { address } = useLocationStore.getState();
      const { batteryLevel } = useDeviceStatusStore.getState();
      const locationUrl = useLocationStore.getState().getGoogleMapsUrl() || 'https://maps.google.com/?q=26.9124,75.7873';
      const dms = useLocationStore.getState().getDMSString();
      const timestamp = new Date().toLocaleTimeString('en-IN');

      const rawNumbers = (emergencyContacts || []).map((c) => c.phone).filter(Boolean);
      // Fallback to Emergency Services (112) or primary user emergency contact if empty
      const phoneNumbers = rawNumbers.length > 0 ? rawNumbers : ['112'];

      const senderName = userName || 'OneHelp User';
      const addressLine = address ? `📍 Area: ${address}\n` : '📍 Area: Malviya Nagar, Jaipur\n';
      const message = `🆘 EMERGENCY ALERT from ${senderName}! I need help immediately.\n\n${addressLine}📍 Live Location: ${locationUrl}\n🧭 Coordinates: ${dms}\n🔋 Battery: ${batteryLevel || 85}%\n⏰ Time: ${timestamp}\n\nSent automatically via OneHelp Hardware Shake Trigger.`;

      console.log(`[SMSService] Sending SOS SMS to ${phoneNumbers.join(', ')}...`);

      if (Platform.OS === 'android') {
        if (!SmsManagerModule) {
          console.warn('[SMSService] SmsManagerModule not linked on Android.');
          return false;
        }

        // Native module handles multipart sending for long messages
        const success = await SmsManagerModule.sendEmergencySMS(phoneNumbers, message);
        console.log('[SMSService] Native sendEmergencySMS result:', success);
        if (success) {
          ToastAndroid.show(`🚨 SOS SMS Dispatched to ${phoneNumbers.length} contact(s)!`, ToastAndroid.SHORT);
        }
        return !!success;
      } else {
        // iOS Fallback: Prepare a sms:// URL scheme
        const phoneList = phoneNumbers.join(',');
        const { Linking } = require('react-native');
        const url = `sms:${phoneList}&body=${encodeURIComponent(message)}`;
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
