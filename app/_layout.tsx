import Loading from "@/components/Loading";
import RootStack from "@/components/RootStack";
import { SessionProvider } from "@/hooks/authContext";
import { useAppSelector } from "@/hooks/redux";
import useNotification from "@/hooks/useNotification";
import { selectThemeMode } from "@/redux/configSlice";
import { persistor, store } from "@/redux/store";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

SplashScreen.preventAutoHideAsync();

declare module "@rneui/themed" {
  interface Colors {
    readonly tertiary: string;
  }
}

const theme = createTheme({
  lightColors: {
    primary: "#0B3B60",
    secondary: "#339CFF",
    tertiary: "#8D8D99",
  },
  darkColors: {
    primary: "#0B3B60",
    secondary: "#339CFF",
    tertiary: "#8D8D99",
  },
  components: {
    Text: {
      style: {
        fontFamily: "Lato-Regular",
      },
    },
    Button: {
      titleStyle: {
        fontFamily: "Lato-Regular",
      },
      type: "solid",
    },
  },
});

export default function Root() {
  useNotification();

  const [fontsLoaded] = useFonts({
    "Lato-Black": require("@/assets/fonts/Lato-Black.ttf"),
    "Lato-Bold": require("@/assets/fonts/Lato-Bold.ttf"),
    "Lato-Italic": require("@/assets/fonts/Lato-Italic.ttf"),
    "Lato-Light": require("@/assets/fonts/Lato-Light.ttf"),
    "Lato-LightItalic": require("@/assets/fonts/Lato-LightItalic.ttf"),
    "Lato-Regular": require("@/assets/fonts/Lato-Regular.ttf"),
  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <ThemeWrapper />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

function ThemeWrapper() {
  const themeMode = useAppSelector(selectThemeMode);
  const colorScheme = useColorScheme();

  theme.mode = themeMode === "system" ? colorScheme : themeMode;
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <RootStack />
      </SessionProvider>
    </ThemeProvider>
  );
}
