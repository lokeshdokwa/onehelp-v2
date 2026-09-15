# TFLite Models

To use the AI features offline, you must place the following `.tflite` model files in this directory:

1. `voice_stress_analysis.tflite` - Core model for analyzing MFCC audio chunks.
2. `yamnet.tflite` - YAMNet model for gunshot and crash detection.
3. `face_recognition.tflite` - Vector embedding model for lost child scanner.

These models will be bundled into the APK/IPA assets.
