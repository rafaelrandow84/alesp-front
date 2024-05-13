import ThemeAwareBackground from "@/components/ThemeAwareBackground";
import config from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useBiometrics from "@/hooks/useBiometrics";
import {
  AppThemeMode,
  selectIsUsingBiometrics,
  selectThemeMode,
  setThemeMode,
  setUseBiometrics,
} from "@/redux/configSlice";
import { Button, Icon, ListItem, Text } from "@rneui/themed";
import * as Updates from "expo-updates";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

export const options = {
  tabBarIcon: () => <Icon name="list" />,
};

const ThemeModeLabel = {
  light: "Claro",
  dark: "Escuro",
  system: "Sistema",
} as const;

export default function Config() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, prompt } = useBiometrics();
  const isUsingBiometrics = useAppSelector(selectIsUsingBiometrics);
  const themeMode = useAppSelector(selectThemeMode);
  const [manifest, setManifest] = useState<any>();
  const [isFetching, setIsFetching] = useState(false);

  const themeIndex = useMemo(() => {
    return Object.keys(ThemeModeLabel).indexOf(themeMode);
  }, [themeMode]);

  async function onFetchUpdateAsync() {
    if (__DEV__) {
      Alert.alert("Atualização", "Você está em modo de desenvolvimento.");
      return;
    }
    setIsFetching(true);
    try {
      const update = await Updates.checkForUpdateAsync();
      setIsFetching(false);
      if (update.isAvailable) {
        setManifest(update.manifest);
        Alert.alert("Atualização disponível", "Deseja atualizar o aplicativo?", [
          { text: "Não", style: "cancel" },
          {
            text: "Sim",
            onPress: async () => {
              await Updates.fetchUpdateAsync();
              await Updates.reloadAsync();
            },
          },
        ]);
      } else {
        Alert.alert("Atualização", "Você já está com a versão mais recente do aplicativo.");
        setManifest({ noData: true });
      }
    } catch (error) {
      setIsFetching(false);
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  return (
    <ThemeAwareBackground
      style={{
        flex: 1,
        gap: 8,
        padding: 8,
      }}
    >
      <ListItem bottomDivider>
        <ListItem.CheckBox
          checked={isUsingBiometrics}
          onPress={() => {
            prompt();
            dispatch(setUseBiometrics(!isUsingBiometrics));
          }}
        />
        <ListItem.Title>Usar biometria</ListItem.Title>
      </ListItem>

      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Tema</ListItem.Title>
        </ListItem.Content>
        <ListItem.ButtonGroup
          buttons={Object.values(ThemeModeLabel)}
          selectedIndex={themeIndex}
          onPress={(index) => {
            dispatch(setThemeMode(Object.keys(ThemeModeLabel)[index] as AppThemeMode));
          }}
        ></ListItem.ButtonGroup>
      </ListItem>

      <Button
        title="Atualizar aplicativo"
        loading={isFetching}
        disabled={isFetching}
        onPress={() => {
          onFetchUpdateAsync();
        }}
      />
      <Text>Versão Atual: {config.versao}</Text>
    </ThemeAwareBackground>
  );
}
