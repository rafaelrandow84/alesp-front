import { makeStyles, Text } from "@rneui/themed";
import { ImageBackground, View } from "react-native";
const image = require("@/assets/splash.png");

export default function Loading() {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>Carregando</Text>
      </ImageBackground>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: theme?.colors.white || "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000b0",
  },
}));
