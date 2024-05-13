import ThemeAwareBackground from "@/components/ThemeAwareBackground";
import appConfig from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useAuth from "@/hooks/useAuth";
import {
  initialState,
  setConsentimento,
  setFirstTimeLogin,
  setJaLeuCartilha,
  setThemeMode,
  setUseBiometrics,
} from "@/redux/configSlice";
import { Button, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Debug() {
  const session = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const config = useAppSelector((state) => state.config);
  const enviromentVariables = {};

  Object.getOwnPropertyNames(process.env).forEach((key) => {
    enviromentVariables[key] = process.env[key];
  });

  return (
    <ThemeAwareBackground>
      <View style={{ flex: 1, gap: 8, paddingBottom: insets.bottom, paddingTop: 8 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "space-evenly",
          }}
        >
          <Button
            title="Voltar"
            onPress={() => {
              router.back();
            }}
          />
          <Button
            title="Login"
            disabled={session.disableLogin}
            onPress={() => {
              session.signIn().then((loggedIn) => {
                if (loggedIn) {
                  session.refreshUserData();
                }
              });
            }}
          />
          <Button title="Atualizar token" onPress={() => session.refreshToken()} />
          <Button title="Atualizar dados do usuário" onPress={() => session.refreshUserData()} />
          <Button title="Push" onPress={() => router.push("/notification")} />
        </View>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "space-evenly",
          }}
        >
          <Button title="Logout" color="warning" onPress={() => session.signOut()} />
          <Button
            title="LIMPAR TODOS DADOS"
            color="error"
            onPress={() => {
              dispatch(setFirstTimeLogin(initialState.firstTimeLogin));
              dispatch(setJaLeuCartilha(initialState.jaLeuCartilha));
              dispatch(setConsentimento(initialState.consentimento));
              dispatch(setUseBiometrics(initialState.useBiometrics));
              dispatch(setThemeMode(initialState.themeMode));
              session.signOut();
            }}
          />
        </View>
        <ScrollView>
          <Text>
            {JSON.stringify(
              {
                config: config || {},
                appConfig: appConfig || {},
                auth: auth || {},
              },
              (_, value) => {
                return typeof value === "string" && value.length > 50 ? value.substring(0, 50) + "..." : value;
              },
              4
            )}
          </Text>
        </ScrollView>
      </View>
    </ThemeAwareBackground>
  );
}
