import ThemeAwareBackground from "@/components/ThemeAwareBackground";
import { useSession } from "@/hooks/authContext";
import { useAppSelector } from "@/hooks/redux";
import useBiometrics from "@/hooks/useBiometrics";
import { selectIsUsingBiometrics } from "@/redux/configSlice";
import { Button } from "@rneui/themed";
import * as Notifications from "expo-notifications";
import { Redirect, useRouter } from "expo-router";
import { View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    // if (notification.request.content.data.url) {
    //   router.push(notification.request.content.data.url);
    // }
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    };
  },
});

export default function App() {
  const { disableLogin, signIn, loggedIn } = useSession();
  const router = useRouter();

  const { isAuthenticated, prompt } = useBiometrics();

  const isUsingBiometrics = useAppSelector(selectIsUsingBiometrics);

  if (isUsingBiometrics && !isAuthenticated) {
    prompt();
  }

  if (loggedIn) {
    return <Redirect href="/home" />;
  }

  return (
    <ThemeAwareBackground>
      {/* <AppHeader /> */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          title="Login!"
          disabled={disableLogin}
          onPress={() => {
            signIn().then((loggedIn) => {
              if (loggedIn) {
                router.replace("/home");
              }
            });
          }}
        />
      </View>
    </ThemeAwareBackground>
  );
}
