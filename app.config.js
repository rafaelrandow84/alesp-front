const IS_DEV = process.env.APP_VARIANT === 'development';


export default {
  "expo": {
    "name": IS_DEV ? "ALESP (Dev)" : "ALESP",
    "slug": "alesp-demo",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/icon.png",
    "splash": {
      "image": "./src/assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": IS_DEV ? "br.com.fcrespo82.alespdemo.dev": "br.com.fcrespo82.alespdemo",
      "buildNumber": "3"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "android.permission.USE_BIOMETRIC",
        "android.permission.USE_FINGERPRINT"
      ],
      "package": IS_DEV ? "br.com.fcrespo82.alespdemo.dev" : "br.com.fcrespo82.alespdemo",
      "versionCode": 6
    },
    "web": {
      "bundler": "metro"
    },
    "scheme": "alesp-demo",
    "owner": "alesp",
    "extra": {
      "eas": {
        "projectId": "8f01a2b6-0cc4-4f19-9b2a-dac0c0fe7e06"
      }
    },
    "plugins": [
      [
        "expo-local-authentication",
        {
          "supportedAuthenticationTypes": [
            "fingerprint",
            "facial_recognition"
          ],
          "faceIDPermission": "Allow $(PRODUCT_NAME) to use Face ID."
        }
      ],
      "expo-router",
      [
        "expo-camera",
        {
          "cameraPermission": "Permitir que $(PRODUCT_NAME) use a câmera para escanear QR-Code."
        }
      ],
      "@config-plugins/react-native-blob-util",
      "@config-plugins/react-native-pdf",
      "expo-asset",
      "expo-font",
      "expo-secure-store"
    ],
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/8f01a2b6-0cc4-4f19-9b2a-dac0c0fe7e06"
    },
    "experiments": {
      "tsconfigPaths": true
    }
  }
}
