package com.onehelp.modules

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.location.Geocoder
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.os.BatteryManager
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.telephony.SmsManager
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap
import java.util.Locale

class SmsManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SmsManagerModule"
    }

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val bm = reactApplicationContext.getSystemService(Context.BATTERY_SERVICE) as? BatteryManager
            var level = bm?.getIntProperty(BatteryManager.BATTERY_PROPERTY_CAPACITY) ?: -1
            if (level < 0 || level > 100) {
                val ifilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
                val batteryStatus = reactApplicationContext.registerReceiver(null, ifilter)
                val rawLevel = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
                val scale = batteryStatus?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1
                level = if (rawLevel >= 0 && scale > 0) (rawLevel * 100) / scale else 50
            }
            promise.resolve(level)
        } catch (e: Exception) {
            promise.resolve(50)
        }
    }

    @ReactMethod
    fun getNetworkStatus(promise: Promise) {
        try {
            val cm = reactApplicationContext.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager
            val activeNetwork = cm?.activeNetwork
            val caps = cm?.getNetworkCapabilities(activeNetwork)
            val isConnected = caps?.hasCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET) == true
            val isWifi = caps?.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) == true
            val isCellular = caps?.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) == true

            val map: WritableMap = Arguments.createMap()
            map.putBoolean("isConnected", isConnected)
            map.putString("type", if (isWifi) "wifi" else if (isCellular) "cellular" else "none")
            promise.resolve(map)
        } catch (e: Exception) {
            val map: WritableMap = Arguments.createMap()
            map.putBoolean("isConnected", false)
            map.putString("type", "none")
            promise.resolve(map)
        }
    }

    @ReactMethod
    fun sendEmergencySMS(phoneNumbers: ReadableArray, message: String, promise: Promise) {
        try {
            val smsManager = SmsManager.getDefault()
            
            // Divide long message into parts (multipart message)
            val parts = smsManager.divideMessage(message)
            
            var successCount = 0
            val totalContacts = phoneNumbers.size()

            for (i in 0 until totalContacts) {
                val phone = phoneNumbers.getString(i)
                if (phone != null && phone.isNotEmpty()) {
                    if (parts.size > 1) {
                        smsManager.sendMultipartTextMessage(phone, null, parts, null, null)
                    } else {
                        smsManager.sendTextMessage(phone, null, message, null, null)
                    }
                    successCount++
                }
            }
            
            if (successCount > 0) {
                promise.resolve(true)
            } else {
                promise.resolve(false)
            }
        } catch (e: Exception) {
            promise.reject("SMS_SEND_ERROR", e.message, e)
        }
    }

    @ReactMethod
    fun getHardwareLocation(promise: Promise) {
        val context = reactApplicationContext
        try {
            val hasFine = ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED
            val hasCoarse = ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED
            if (!hasFine && !hasCoarse) {
                promise.reject("PERMISSION_DENIED", "Location permissions are not granted")
                return
            }

            val lm = context.getSystemService(Context.LOCATION_SERVICE) as? LocationManager
            if (lm == null) {
                promise.reject("LM_NULL", "LocationManager service not available")
                return
            }

            val providers = listOf(
                LocationManager.GPS_PROVIDER,
                LocationManager.NETWORK_PROVIDER,
                LocationManager.PASSIVE_PROVIDER
            )

            var bestLoc: Location? = null
            for (p in providers) {
                try {
                    if (lm.isProviderEnabled(p)) {
                        val loc = lm.getLastKnownLocation(p)
                        if (loc != null) {
                            if (bestLoc == null) {
                                bestLoc = loc
                            } else {
                                val isSignificantlyNewer = loc.time - bestLoc.time > 1000 * 60 * 2
                                val isMoreAccurate = loc.accuracy < bestLoc.accuracy
                                if (isSignificantlyNewer || (isMoreAccurate && loc.time >= bestLoc.time - 1000 * 60)) {
                                    bestLoc = loc
                                }
                            }
                        }
                    }
                } catch (e: SecurityException) {
                    // ignore
                }
            }

            fun resolveLocation(loc: Location) {
                try {
                    val map = Arguments.createMap()
                    map.putDouble("latitude", loc.latitude)
                    map.putDouble("longitude", loc.longitude)
                    map.putDouble("accuracy", loc.accuracy.toDouble())
                    map.putDouble("altitude", loc.altitude)
                    map.putDouble("speed", loc.speed.toDouble())
                    map.putDouble("timestamp", loc.time.toDouble())

                    var fullAddress = ""
                    var shortAddress = ""
                    try {
                        val geocoder = Geocoder(context, Locale.getDefault())
                        val addrs = geocoder.getFromLocation(loc.latitude, loc.longitude, 1)
                        if (!addrs.isNullOrEmpty()) {
                            val addr = addrs[0]
                            fullAddress = addr.getAddressLine(0) ?: ""
                            val parts = mutableListOf<String>()
                            if (!addr.subLocality.isNullOrBlank()) parts.add(addr.subLocality)
                            else if (!addr.thoroughfare.isNullOrBlank()) parts.add(addr.thoroughfare)
                            if (!addr.locality.isNullOrBlank()) parts.add(addr.locality)
                            else if (!addr.adminArea.isNullOrBlank()) parts.add(addr.adminArea)
                            if (parts.isEmpty()) {
                                parts.add(addr.locality ?: addr.adminArea ?: "Jaipur")
                            }
                            shortAddress = parts.joinToString(", ")
                        }
                    } catch (geoEx: Exception) {
                        // ignore
                    }

                    map.putString("fullAddress", fullAddress)
                    map.putString("shortAddress", shortAddress)
                    promise.resolve(map)
                } catch (e: Exception) {
                    promise.reject("RESOLVE_ERR", e.message)
                }
            }

            // If we have a recent location (< 3 mins), return immediately
            val threeMinutesAgo = System.currentTimeMillis() - 3 * 60 * 1000
            if (bestLoc != null && bestLoc.time > threeMinutesAgo) {
                resolveLocation(bestLoc)
                return
            }

            // Otherwise, request active single update
            Handler(Looper.getMainLooper()).post {
                var isResolved = false
                val listener = object : LocationListener {
                    override fun onLocationChanged(loc: Location) {
                        if (!isResolved) {
                            isResolved = true
                            try { lm.removeUpdates(this) } catch (e: Exception) {}
                            resolveLocation(loc)
                        }
                    }
                    override fun onStatusChanged(provider: String?, status: Int, extras: Bundle?) {}
                    override fun onProviderEnabled(provider: String) {}
                    override fun onProviderDisabled(provider: String) {}
                }

                try {
                    if (lm.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
                        lm.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0L, 0f, listener, Looper.getMainLooper())
                    }
                    if (lm.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
                        lm.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 0L, 0f, listener, Looper.getMainLooper())
                    }

                    Handler(Looper.getMainLooper()).postDelayed({
                        if (!isResolved) {
                            isResolved = true
                            try { lm.removeUpdates(listener) } catch (e: Exception) {}
                            if (bestLoc != null) {
                                resolveLocation(bestLoc)
                            } else {
                                promise.reject("TIMEOUT", "GPS hardware timeout")
                            }
                        }
                    }, 4000)
                } catch (e: SecurityException) {
                    if (bestLoc != null) resolveLocation(bestLoc)
                    else promise.reject("SEC_ERR", e.message)
                }
            }
        } catch (e: Exception) {
            promise.reject("LOC_ERR", e.message)
        }
    }
}
