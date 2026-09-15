package com.onehelp.modules

import android.telephony.SmsManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableArray

class SmsManagerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SmsManagerModule"
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
}
