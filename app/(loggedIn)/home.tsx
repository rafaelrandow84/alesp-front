import { Button, Text, Icon, makeStyles, useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import { StyleSheet, ScaledSize, ScrollView, View, useWindowDimensions } from "react-native";
import ThemeAwareBackground from "@/components/ThemeAwareBackground";

const useLocalStyles = makeStyles((theme, dimensions: ScaledSize) => ({
    text: {
        // color:"#fff",
        fontSize: 14,
        textShadowColor: "rgba(80, 80, 80, 1)",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    button: {
        width: (dimensions.width - 24) / 2,
        height: (dimensions.width - 244) / 2,
        borderRadius: 25,
        elevation: 1,
        opacity: 1,
        borderColor: "#fff",
        borderWidth: 1,
        backgroundColor: "rgba(40,140,190, 1)",
    },
}));

export default function Home() {
    const { theme } = useTheme();
    const dimensions = useWindowDimensions();
    const router = useRouter();

    const localStyles = useLocalStyles(dimensions);

    const styles = StyleSheet.create({
        view: {
            margin: 10,
        },
        text: {
            textAlign: "center",
            padding: 10,
            margin: 10,
        },
        more: {
            marginVertical: 20,
        },
    });
    return (
        <ThemeAwareBackground >
            <ScrollView showsVerticalScrollIndicator={false} centerContent={true} contentContainerStyle={{flexGrow: 1}}>
                <Text style={styles.text} h4 h4Style={{ color: theme.colors.secondary }}>
                    Bem-vindo ao ALESP Mobile!
                </Text>
                <Text style={styles.text}>Aqui você encontrará serviços para auxiliar o seu dia-a dia na ALESP</Text>
                <View
                    style={{
                        padding: 8,
                        gap: 8,
                        flexDirection: "row",
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        title="Cartilha da ALESP"
                        titleStyle={localStyles.text}
                        buttonStyle={localStyles.button}
                        onPress={() => router.push("/cartilha")}
                    />
                    <Button
                        title={`Eventos da ALESP`}
                        titleStyle={localStyles.text}
                        buttonStyle={localStyles.button}
                        onPress={() => router.push("/agenda")}
                    />
                    <Button
                        title={`Carteira\nFuncional`}
                        titleStyle={localStyles.text}
                        buttonStyle={localStyles.button}
                        onPress={() => router.push("/funcional")}
                    />
                    <Button
                        title={`Zeladoria`}
                        titleStyle={localStyles.text}
                        buttonStyle={localStyles.button}
                        onPress={() => router.push("/qrcode")}
                    />                    
                </View>
            </ScrollView>
        </ThemeAwareBackground>
    );
}
