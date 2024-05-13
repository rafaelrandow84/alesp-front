import * as LocalAuthentication from "expo-local-authentication";
import { useState } from "react";
import { Alert } from "react-native";

export default function useBiometrics() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function prompt() {
    if (!isAuthenticated) {
      LocalAuthentication.hasHardwareAsync().then((hasHardware) => {
        if (!hasHardware) {
          Alert.alert("Biometria não suportada");
        }
      });

      LocalAuthentication.isEnrolledAsync().then(async (isEnrolled) => {
        if (isEnrolled) {
          const result = await LocalAuthentication.authenticateAsync();

          setIsAuthenticated(result.success);
        }
      });
    }
  }

  return { isAuthenticated, prompt };
}
