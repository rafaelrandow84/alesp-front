import ColorSchemeAwareImage from "@/components/ColorSchemeAwareImage";
import ThemeAwareBackground from "@/components/ThemeAwareBackground";
import { useSession } from "@/hooks/authContext";
import { useAppSelector } from "@/hooks/redux";
import { selectJaLeuCartilha } from "@/redux/configSlice";
import { useHeaderHeight, } from '@react-navigation/elements';
import { Icon, useTheme } from "@rneui/themed";
import { Redirect, Tabs, useNavigation } from "expo-router";
import { View } from "react-native";

export default function AppLayout() {
    const { loggedIn } = useSession();
    const { theme } = useTheme();

    const jaLeuCartilha = useAppSelector(selectJaLeuCartilha);
    const headerHeight = useHeaderHeight() / 3;

    const nav = useNavigation()
    nav.setOptions({
        headerLeft: () => (
            <View style={{
                height: headerHeight,
                aspectRatio: 2,
            }}>
                <ColorSchemeAwareImage
                    lightSource={require("@/assets/alesp_marca_monocromatica_negativa.png")}
                    darkSource={require("@/assets/alesp_marca_monocromatica_negativa.png")}
                    style={{ height: "100%", width: "100%", resizeMode: "contain" }}
                />
            </View>
        ),
    })

    if (!loggedIn) {
        return <Redirect href="/" />;
    }

    if (!jaLeuCartilha) {
        return <Redirect href="/cartilha" />;
    }

    return (
        <ThemeAwareBackground>
            <Tabs
                initialRouteName="home"
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: theme.colors.primary,
                    },
                    tabBarActiveTintColor: theme.colors.secondary,
                    tabBarInactiveTintColor: theme.colors.white,
                    headerShown: false,
                    unmountOnBlur: true,
                }}

            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: "Início",
                        tabBarIcon: (props) => <Icon name="home" size={props.size} color={props.color} />,
                    }}
                />
                <Tabs.Screen
                    name="agenda"
                    options={{
                        title: "Eventos",
                        tabBarIcon: (props) => (
                            <Icon
                                name="calendar-month-outline"
                                type="material-community"
                                size={props.size}
                                color={props.color}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="qrcode"
                    options={{
                        title: "Zeladoria",
                        tabBarIcon: (props) => (
                            <Icon name="qrcode-scan" type="material-community" size={props.size} color={props.color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="funcional"
                    options={{
                        title: "Identificação",
                        tabBarIcon: (props) => (
                            <Icon name="fingerprint" type="material-community" size={props.size} color={props.color} />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="config"
                    options={{
                        title: "Configuração",
                        tabBarIcon: (props) => <Icon name="settings" size={props.size} color={props.color} />,
                    }}
                />

                <Tabs.Screen
                    name="user"
                    options={{
                        title: "Usuário",
                        href: null,
                        //tabBarIcon: (props) => <Icon name="person" size={props.size} color={props.color} />,
                    }}
                />
                <Tabs.Screen
                    name="deputados"
                    options={{
                        href: null,
                        title: "Deputados",
                        // tabBarIcon: (props) => <Icon name="people" size={props.size} color={props.color} />,
                    }}
                />
                <Tabs.Screen
                    name="holerite"
                    options={{
                        href: null,
                    }}
                />
                <Tabs.Screen
                    name="debugger"
                    options={{
                        href: null,
                    }}
                />
            </Tabs>
        </ThemeAwareBackground>
    );
}
