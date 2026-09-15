package com.onehelp.modules

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.facebook.react.bridge.ReactApplicationContext

class PowerButtonReceiver(private val reactContext: ReactApplicationContext) : BroadcastReceiver() {

    private val toggleTimestamps = LongArray(3)
    private var index = 0

    override fun onReceive(context: Context?, intent: Intent?) {
        if (intent?.action == Intent.ACTION_SCREEN_OFF || intent?.action == Intent.ACTION_SCREEN_ON) {
            val currentTime = System.currentTimeMillis()
            toggleTimestamps[index] = currentTime
            index = (index + 1) % 3

            // Check if all 3 toggles happened within 2000ms
            val oldestToggle = toggleTimestamps[index]
            if (oldestToggle > 0 && (currentTime - oldestToggle) <= 2000) {
                Log.d("PowerButtonReceiver", "Triple press detected! Triggering SOS.")
                triggerSOSInReact()
                // Reset the array so it doesn't trigger repeatedly
                toggleTimestamps.fill(0)
            }
        }
    }

    private fun triggerSOSInReact() {
        if (reactContext.hasActiveCatalystInstance()) {
            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                .emit("POWER_BUTTON_SOS", null)
        } else {
            Log.e("PowerButtonReceiver", "React context not active, cannot trigger SOS")
        }
    }
}
