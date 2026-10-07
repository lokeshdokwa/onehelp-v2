# OneHelp v2 🛡️

[![React Native](https://img.shields.io/badge/React_Native-0.76-blue.svg)](https://reactnative.dev)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS-green.svg)](https://reactnative.dev)
[![Offline-First](https://img.shields.io/badge/Offline--First-SQLite%20%2B%20Telephony-orange.svg)]()
[![Security](https://img.shields.io/badge/Security-AES--256--GCM-red.svg)]()

> **Industrial-grade, offline-first personal emergency response & disaster safety system.**  
> Built with React Native and native Android Kotlin modules for direct hardware integration.

---

## 📖 Complete Documentation
For an exhaustive technical breakdown of **all 29 emergency features**, native Android Kotlin modules, offline SQLite databases, and end-to-end workflows, please see:

👉 **[DOCUMENTATION.md](./DOCUMENTATION.md)**

---

## ⚡ Highlights

- **Direct Cellular Telephony (No Internet Required)**: Custom native Kotlin `SmsManagerModule` sends background distress SMS with Google Maps links and physical address even in zero-data/no-internet areas.
- **Native Android Reverse Geocoding**: Direct hardware geocoder translates latitude/longitude into complete postal and street addresses on-device.
- **Hardware Battery & Network Detection**: Real-time integration with Android `BatteryManager` and `ConnectivityManager` (5G / 4G LTE / WiFi / Offline).
- **Hold-to-Activate Panic Button**: 3-second deliberate hold with haptic feedback and 5-second cancel banner.
- **Duress PIN Stealth Protection**: Coercion-resistant login PIN that mimics a normal exit while silently dispatching high-priority alerts with live coordinates.
- **Offline Medical Dossier & ICE Card**: Locally encrypted emergency medical details (blood type, allergies, medications, donor status).
- **12 Interactive Offline Survival Guides**: Built-in CPR metronome, choking Heimlich maneuvers, snake bite protocol, earthquake, and flood guides.
- **Tactical Safety Suite**: 120dB dual-tone siren, Morse Code SOS optical torch, Fake Incoming Call simulator, SafeWalk escort timer, and Shake-to-trigger.
- **AI Face Matcher & Missing Child Scanner**: On-device facial embedding matching with cosine similarity against missing child records.
- **Zero-Network Family QR Pairing**: Instant offline crypto pairing of emergency contacts in under 2 seconds.

---

## 🚀 Quick Start

### 1. Requirements
- Node.js >= 18
- React Native CLI
- Android Studio (Android SDK 34+)
- Android device or Emulator

### 2. Setup
```bash
# Clone the repository
git clone https://github.com/lokeshdokwa/onehelp-v2.git
cd onehelp-v2

# Install dependencies
npm install
```

### 3. Launch App
```bash
# Start Metro bundler
npm start

# Run on Android device
npm run android
```

---

## 📄 License & Confidentiality
Private repository for personal safety and research. All rights reserved.
