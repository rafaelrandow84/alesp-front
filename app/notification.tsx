import ThemeAwareBackground from "@/components/ThemeAwareBackground";
import useNotification from "@/hooks/useNotification";
import { Button, Text } from "@rneui/themed";
import { useRouter } from "expo-router";
import { View } from "react-native";

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Navegar para a página",
    body: "/user - Perfil de usuário",
    data: { dadosExtras: "vão aqui", url: "/user" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export default function Notification() {
  const router = useRouter();

  const { notification, expoPushToken } = useNotification();

  return (
    <ThemeAwareBackground>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
        <Text>Expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>Título: {notification && notification.request.content.title} </Text>
          <Text>Corpo: {notification && notification.request.content.body}</Text>
          <Text>Dados: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Enviar Notificação"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
      </View>
    </ThemeAwareBackground>
  );
}
