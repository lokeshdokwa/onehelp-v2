package com.onehelp.modules

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import kotlin.math.sqrt

/**
 * OneHelp — Native Hardware Shake & Power Button Detector Module
 *
 * Direct hardware sensor integration for life-safety emergency triggering:
 * 1. Listens to Android Accelerometer (Sensor.TYPE_ACCELEROMETER) at SENSOR_DELAY_GAME.
 * 2. Multi-threshold peak detection with dynamic windowing to avoid false positives.
 * 3. Power Button Triple Press receiver (Screen On/Off broadcast).
 * 4. Emits `ON_SHAKE_DETECTED` and `POWER_BUTTON_SOS` to React Native with haptic vibration.
 */
class ShakeDetectorModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext), SensorEventListener {

    private val TAG = "ShakeDetectorModule"

    private var sensorManager: SensorManager? = null
    private var accelerometer: Sensor? = null
    private var isListening = false

    // Sensitivity threshold in m/s² (Earth gravity g = 9.81 m/s²)
    // High sensitivity = ~13.5 m/s² (light shake)
    // Normal sensitivity = ~16.5 m/s² (standard vigorous shake)
    // Low sensitivity = ~21.0 m/s² (hard violent shake)
    private var accelerationThreshold = 16.5f

    // Smart Multi-Peak Shake Detector
    private var shakeCount = 0
    private var firstShakeTimestamp: Long = 0
    private var lastShakeTimestamp: Long = 0
    private val SHAKE_WINDOW_MS = 1400L // 1.4 second window to complete 2 shakes
    private val SHAKE_COOLDOWN_MS = 2500L // 2.5s cooldown after SOS trigger
    private var lastTriggeredTimestamp: Long = 0

    // Power Button Triple-Press Receiver
    private var powerReceiver: BroadcastReceiver? = null
    private val powerToggles = LongArray(3)
    private var powerToggleIndex = 0

    override fun getName(): String {
        return "ShakeDetectorModule"
    }

    init {
        try {
            sensorManager = reactContext.getSystemService(Context.SENSOR_SERVICE) as? SensorManager
            accelerometer = sensorManager?.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        } catch (e: Exception) {
            Log.e(TAG, "Failed to initialize SensorManager", e)
        }
    }

    @ReactMethod
    fun isSupported(promise: Promise) {
        val supported = accelerometer != null
        promise.resolve(supported)
    }

    @ReactMethod
    fun startWatch(sensitivity: String?, promise: Promise) {
        try {
            when (sensitivity?.lowercase()) {
                "high" -> accelerationThreshold = 13.5f
                "low" -> accelerationThreshold = 21.0f
                else -> accelerationThreshold = 16.5f // "normal"
            }

            if (!isListening && sensorManager != null && accelerometer != null) {
                val success = sensorManager?.registerListener(
                    this,
                    accelerometer,
                    SensorManager.SENSOR_DELAY_GAME
                ) ?: false
                isListening = success
                registerPowerReceiver()
                Log.d(TAG, "Shake detection started. Threshold=$accelerationThreshold m/s², registered=$success")
                promise.resolve(success)
            } else {
                promise.resolve(isListening)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error starting shake listener", e)
            promise.reject("SHAKE_START_ERR", e.message)
        }
    }

    @ReactMethod
    fun stopWatch(promise: Promise) {
        try {
            if (isListening && sensorManager != null) {
                sensorManager?.unregisterListener(this)
                isListening = false
                unregisterPowerReceiver()
                Log.d(TAG, "Shake detection stopped.")
            }
            promise.resolve(true)
        } catch (e: Exception) {
            Log.e(TAG, "Error stopping shake listener", e)
            promise.reject("SHAKE_STOP_ERR", e.message)
        }
    }

    @ReactMethod
    fun simulateShakeTest(promise: Promise) {
        try {
            vibrateDevice(500)
            notifyShakeTriggered(24.5f, "test_simulation")
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("SIMULATE_ERR", e.message)
        }
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event == null || event.sensor.type != Sensor.TYPE_ACCELEROMETER) return

        val x = event.values[0]
        val y = event.values[1]
        val z = event.values[2]

        // Calculate total magnitude
        val gForce = sqrt((x * x + y * y + z * z).toDouble()).toFloat()
        // Subtract gravity vector (~9.81 m/s²) to isolate user movement
        val netAcceleration = kotlin.math.abs(gForce - SensorManager.GRAVITY_EARTH)

        val now = System.currentTimeMillis()

        // Enforce trigger cooldown
        if (now - lastTriggeredTimestamp < SHAKE_COOLDOWN_MS) {
            return
        }

        if (netAcceleration >= accelerationThreshold) {
            if (now - lastShakeTimestamp > 250) { // minimum spacing between individual peaks
                if (shakeCount == 0 || (now - firstShakeTimestamp > SHAKE_WINDOW_MS)) {
                    // Start of a new potential shake sequence
                    firstShakeTimestamp = now
                    shakeCount = 1
                } else {
                    shakeCount++
                }
                lastShakeTimestamp = now

                // If 2 or more strong acceleration peaks happen within window -> VALID EMERGENCY SHAKE
                if (shakeCount >= 2 && (now - firstShakeTimestamp <= SHAKE_WINDOW_MS)) {
                    lastTriggeredTimestamp = now
                    shakeCount = 0
                    Log.i(TAG, "🚨 Physical Emergency Shake Confirmed! NetAcc=$netAcceleration m/s²")
                    vibrateDevice(450)
                    notifyShakeTriggered(netAcceleration, "hardware_accelerometer")
                }
            }
        }
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        // No-op
    }

    private fun notifyShakeTriggered(acceleration: Float, source: String) {
        try {
            if (reactContext.hasActiveCatalystInstance()) {
                val params = Arguments.createMap()
                params.putDouble("acceleration", acceleration.toDouble())
                params.putString("source", source)
                params.putDouble("timestamp", System.currentTimeMillis().toDouble())

                reactContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                    .emit("ON_SHAKE_DETECTED", params)
            }
        } catch (e: Exception) {
            Log.e(TAG, "Failed to emit ON_SHAKE_DETECTED", e)
        }
    }

    private fun registerPowerReceiver() {
        if (powerReceiver != null) return
        try {
            powerReceiver = object : BroadcastReceiver() {
                override fun onReceive(context: Context?, intent: Intent?) {
                    if (intent?.action == Intent.ACTION_SCREEN_OFF || intent?.action == Intent.ACTION_SCREEN_ON) {
                        val currentTime = System.currentTimeMillis()
                        powerToggles[powerToggleIndex] = currentTime
                        powerToggleIndex = (powerToggleIndex + 1) % 3

                        val oldestToggle = powerToggles[powerToggleIndex]
                        if (oldestToggle > 0 && (currentTime - oldestToggle) <= 2200) {
                            Log.i(TAG, "🚨 Triple Power Button Toggle Detected!")
                            vibrateDevice(500)
                            powerToggles.fill(0)
                            if (reactContext.hasActiveCatalystInstance()) {
                                reactContext
                                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                                    .emit("POWER_BUTTON_SOS", null)
                            }
                        }
                    }
                }
            }
            val filter = IntentFilter().apply {
                addAction(Intent.ACTION_SCREEN_ON)
                addAction(Intent.ACTION_SCREEN_OFF)
            }
            reactContext.registerReceiver(powerReceiver, filter)
            Log.d(TAG, "Power Button Triple-Press receiver registered.")
        } catch (e: Exception) {
            Log.e(TAG, "Failed to register power receiver", e)
        }
    }

    private fun unregisterPowerReceiver() {
        if (powerReceiver != null) {
            try {
                reactContext.unregisterReceiver(powerReceiver)
                powerReceiver = null
            } catch (e: Exception) {
                Log.e(TAG, "Failed to unregister power receiver", e)
            }
        }
    }

    private fun vibrateDevice(durationMs: Long) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                val vibratorManager =
                    reactContext.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as? VibratorManager
                vibratorManager?.defaultVibrator?.vibrate(
                    VibrationEffect.createOneShot(durationMs, VibrationEffect.DEFAULT_AMPLITUDE)
                )
            } else {
                @Suppress("DEPRECATION")
                val vibrator = reactContext.getSystemService(Context.VIBRATOR_SERVICE) as? Vibrator
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                    vibrator?.vibrate(
                        VibrationEffect.createOneShot(durationMs, VibrationEffect.DEFAULT_AMPLITUDE)
                    )
                } else {
                    @Suppress("DEPRECATION")
                    vibrator?.vibrate(durationMs)
                }
            }
        } catch (e: Exception) {
            Log.w(TAG, "Vibration failed", e)
        }
    }
}
