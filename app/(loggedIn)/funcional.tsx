import ThemeAwareBackground from "@/components/ThemeAwareBackground";
import config from "@/config/config";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { ActivityIndicator,SafeAreaView, Text } from "react-native";
import Pdf from "react-native-pdf";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Funcional() {
    const [accessToken, setAccessToken] = useState(null);
    const { refreshToken } = useAuth();
    const insets = useSafeAreaInsets();

    useEffect(() => {
        refreshToken().then((tokenResponse) => {
            setAccessToken(tokenResponse.accessToken);
        });
    }, []);

    if (!accessToken) {
        return (<>
            <Text>
                Usuário não logado
            </Text>
        </>);
    }

    return (
        <ThemeAwareBackground>        
        <SafeAreaView style={{ flex: 1, paddingBottom: insets.bottom }}>
            <Pdf
                renderActivityIndicator={(percentage) => <ActivityIndicator size="large" />}
                style={{ flex: 1 }}
                trustAllCerts={false}
                source={{
                    uri: `${config.api_url}/rh/funcional`,
                    headers: { Authorization: `Bearer ${accessToken}` },
                    cache: true,
                    expiration: 604800, // 1 week
                }}
            />            
            </SafeAreaView>
        </ThemeAwareBackground>
    );
}
