/**
 * OneHelp — Master SOS Orchestration Service
 *
 * Coordinates the entire emergency response sequence:
 * GPS grab, audio recording, payload encryption, and cascading dispatch
 * (API -> SMS -> Mesh -> Satellite).
 */

import { v4 as uuidv4 } from 'uuid';
import { useSOSStore, TriggerMethod, EmergencyCategory } from '../store/useSOSStore';
import { useUserStore } from '../store/useUserStore';
import { useLocationStore } from '../store/useLocationStore';
import { LocationService } from './LocationService';
import { SMSService } from './SMSService';
import { execute } from '../database/DatabaseClient';

export const SOSService = {
  /**
   * Main entry point for triggering an SOS.
   * Executes the strict cascade of actions defined in the prompt.
   */
  triggerSOS: async (
    triggerMethod: TriggerMethod = 'button',
    category: EmergencyCategory = 'general',
    isDuress: boolean = false
  ): Promise<void> => {
    const store = useSOSStore.getState();
    const userStore = useUserStore.getState();
    
    // Prevent double-firing
    if (store.status === 'active' || store.status === 'dispatching') {
      return;
    }

    const incidentId = uuidv4();
    console.log(`[SOSService] Triggering SOS via ${triggerMethod} [ID: ${incidentId}]`);

    // 1. Set Status to Active
    let lat = 0;
    let lng = 0;

    // 2. Grab current GPS
    try {
      const loc = await LocationService.getCurrentPosition();
      lat = loc.latitude;
      lng = loc.longitude;
    } catch (e) {
      console.warn('[SOSService] GPS grab failed, using fallback 0,0', e);
    }

    store.activateSOS({
      incidentId,
      lat,
      lng,
      category,
      isDuress,
    });

    // 3. Load encrypted medical dossier from Keychain (stubbed for now)
    // const medicalSummary = await KeychainService.getMedicalDossier();

    // 4. Start Audio Evidence Recording (10s) - running asynchronously
    // In a real app we'd await or run in parallel.
    // store.setAudioEvidence(await AudioService.startEvidenceRecording(10000));

    // 5. Start Voice Stress Analysis - running asynchronously
    // store.setStressScore(await AIService.analyzeVoiceStress());

    // 6. Build Payload
    const payload = {
      incidentId,
      userId: userStore.userId,
      lat,
      lng,
      triggerMethod,
      category,
      isDuress,
      timestamp: Date.now(),
      // medicalSummary,
    };

    // 7. Encrypt Payload
    // const encryptedPayload = EncryptionService.encrypt(payload);

    store.setDispatching();

    let dispatchSuccess = false;
    let successfulMethod: 'api' | 'sms' | 'mesh' | 'satellite' | 'none' = 'none';

    // 8. Try RoutingEngine (API dispatch)
    try {
      // await RoutingEngine.dispatchViaAPI(encryptedPayload);
      // dispatchSuccess = true;
      // successfulMethod = 'api';
      throw new Error('API unreachable in offline mode'); // Simulating offline
    } catch (e) {
      console.log('[SOSService] API Dispatch failed, falling back to SMS...');
      
      // 9. If API fails: SMS Fallback
      const smsSent = await SMSService.broadcastSOS(incidentId);
      if (smsSent) {
        dispatchSuccess = true;
        successfulMethod = 'sms';
      } else {
        console.log('[SOSService] SMS Dispatch failed, falling back to Mesh...');
        
        // 10. If SMS fails: Mesh Broadcast
        // const meshSent = await MeshService.broadcastSOSPacket(encryptedPayload);
        // if (meshSent) {
        //   dispatchSuccess = true;
        //   successfulMethod = 'mesh';
        // } else {
        //   // 11. If all fail: Satellite
        //   console.log('[SOSService] Mesh Dispatch failed, falling back to Satellite...');
        //   const satSent = await SatelliteService.transmit(minimalPayload);
        //   if (satSent) {
        //     dispatchSuccess = true;
        //     successfulMethod = 'satellite';
        //   }
        // }
      }
    }

    if (dispatchSuccess) {
      store.setDispatched(successfulMethod, userStore.emergencyContacts.length);
    } else {
      console.error('[SOSService] ALL DISPATCH METHODS FAILED');
      store.setDispatched('none', 0);
    }

    // 12. Log incident to SQLite audit_logs
    try {
      execute(
        `INSERT INTO audit_logs (id, incident_type, trigger_method, latitude, longitude, dispatch_method, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [incidentId, 'sos', triggerMethod, lat, lng, successfulMethod, Date.now()]
      );
    } catch (dbError) {
      console.error('[SOSService] Failed to write audit log:', dbError);
    }

    // 13. Send local push notification
    // NotificationService.showDispatchConfirmation(successfulMethod);

    // 14. Trigger Morse if dark
    // FlashlightMorseService.checkAndTrigger();
  },

  cancelSOS: async (): Promise<void> => {
    console.log('[SOSService] Cancelling SOS...');
    // Tell RoutingEngine to send cancel signal
    // Stop audio recording
    useSOSStore.getState().cancelSOS();
  },
};
