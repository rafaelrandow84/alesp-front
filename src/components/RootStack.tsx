import { Icon, useTheme } from "@rneui/themed";
import { Stack, router } from "expo-router";
import { Pressable } from "react-native";

export default function RootStack() {
    const { theme } = useTheme();


    return (
        <Stack
            screenOptions={{
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
                headerStyle: {
                    backgroundColor: theme.colors.primary,
                },
                title: "ALESP Mobile",
                headerTitleStyle: {
                    color: "#fff"
                },
                headerRight: () => (
                    <Pressable
                        style={({ pressed }) => ({
                            flexDirection: "row",
                            opacity: pressed ? 0.5 : 1,
                        })}
                        onPress={() => {
                            router.push("/debug");
                        }}
                    >
                        <Icon size={28} name="account-circle" color="#fff" type="material-community" />
                    </Pressable>
                ),
            }}
        >
            <Stack.Screen
                name="(loggedIn)"
                options={{
                    title: "ALESP Mobile",

                }}
            />
            <Stack.Screen name="debug" options={{ title: "DEBUG" }} />
            <Stack.Screen name="notification" options={{ title: "Teste de Notificação" }} />
            <Stack.Screen name="cartilha/index" options={{ title: "Cartilha" }} />
        </Stack>
    );
}
