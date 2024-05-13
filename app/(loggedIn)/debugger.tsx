import { Button, makeStyles } from "@rneui/themed";
import { useRouter } from "expo-router";
import { ScaledSize, ScrollView, View, useWindowDimensions } from "react-native";
import ThemeAwareBackground from "@/components/ThemeAwareBackground";

const useLocalStyles = makeStyles((theme, dimensions: ScaledSize) => ({
  text: {
    fontSize: 24,
  },
  button: {
    width: (dimensions.width - 24) / 2,
    height: (dimensions.width - 24) / 2,
  },
}));

export default function Home() {
  const dimensions = useWindowDimensions();
  const router = useRouter();

  const localStyles = useLocalStyles(dimensions);

  return (
    <ThemeAwareBackground>
      <ScrollView showsVerticalScrollIndicator={false} centerContent={true}>
        <View
          style={{
            padding: 8,
            gap: 8,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Button
            title="Cartilha"
            color="secondary"
            titleStyle={localStyles.text}
            buttonStyle={localStyles.button}
            onPress={() => router.push("/cartilha")}
          />
          <Button
            title="Perfil"
            color="secondary"
            titleStyle={localStyles.text}
            buttonStyle={localStyles.button}
            onPress={() => router.push("/user")}
          />
          <Button
            title="QR Code"
            color="secondary"
            titleStyle={localStyles.text}
            buttonStyle={localStyles.button}
            onPress={() => router.push("/qrcode")}
          />
          <Button
            title={`Carteira\nFuncional`}
            color="secondary"
            titleStyle={localStyles.text}
            buttonStyle={localStyles.button}
            onPress={() => router.push("/funcional")}
          />
          <Button
            title={`Notificação`}
            color="secondary"
            titleStyle={localStyles.text}
            buttonStyle={localStyles.button}
            onPress={() => router.push("/notification")}
          />
          <Button
            title={`Agenda`}
            color="secondary"
            titleStyle={localStyles.text}
            buttonStyle={localStyles.button}
            onPress={() => router.push("/agenda")}
          />
        </View>
      </ScrollView>
    </ThemeAwareBackground>
  );
}
