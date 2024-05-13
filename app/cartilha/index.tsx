import ThemeAwareBackground from "@/components/ThemeAwareBackground";
import config from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useInterval from "@/hooks/useInterval";
import useTimeout from "@/hooks/useTimeout";
import {
    selectConsentimento,
    selectIsFirstTimeLogin,
    selectJaLeuCartilha,
    setConsentimento,
    setJaLeuCartilha,
} from "@/redux/configSlice";
import { Button, CheckBox, useTheme } from "@rneui/themed";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, View } from "react-native";
import Pdf from "react-native-pdf";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const cartilha = require("@/assets/cartilha_comportamental_alesp.pdf")

export default function Cartilha() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();
    const [enableDismissButton, setEnableDismissButton] = useState(false);
    const dispatch = useAppDispatch();
    const jaLeuCartilha = useAppSelector(selectJaLeuCartilha);
    const primeiroLogin = useAppSelector(selectIsFirstTimeLogin);
    const consentimento = useAppSelector(selectConsentimento);

    const [countdown, setCountdown] = useState(config.tempo_de_leitura_da_cartilha.as("seconds"));

    const stopIntervalCountdown = useInterval(() => {
        setCountdown((countdown) => {
            if (countdown <= 0) {
                stopIntervalCountdown();
                return 0;
            }
            return countdown - 1;
        });
    }, 1000);

    const stopTimeoutLeitura = useTimeout(() => {
        setEnableDismissButton(true);
        stopTimeoutLeitura();
    }, config.tempo_de_leitura_da_cartilha.as("milliseconds"));

    useEffect(() => {
        if (jaLeuCartilha) {
            setEnableDismissButton(true);
            stopIntervalCountdown();
            stopTimeoutLeitura();
        }
    }, [jaLeuCartilha]);

    return (
        <ThemeAwareBackground colorOverride={theme.colors.primary}>
            <SafeAreaView style={{ flex: 1, paddingBottom: insets.bottom }}>
                <Pdf
                    renderActivityIndicator={(percentage) => <ActivityIndicator size="large" />}
                    style={{ flex: 1 }}
                    trustAllCerts={false}
                    source={cartilha}
                />

                {!jaLeuCartilha && (
                    <View>
                        <CheckBox
                            containerStyle={{ backgroundColor: "transparent" }}
                            checkedColor={theme.colors.secondary}
                            checked={consentimento}
                            titleProps={{
                                style: { color: theme.colors.white, paddingHorizontal: 8, fontWeight: "bold" },
                            }}
                            title="Estou de acordo com os termos da cartilha"
                            onPress={() => {
                                dispatch(setConsentimento(!consentimento));
                            }}
                        />
                        <Button
                            disabled={!enableDismissButton || !consentimento}
                            title={countdown > 0 && !jaLeuCartilha ? `Fechar (${countdown}s)` : "Fechar"}
                            onPress={() => {
                                dispatch(setJaLeuCartilha(true));
                                if (!jaLeuCartilha) {
                                    router.replace("/home");
                                } else {
                                    router.back();
                                }
                            }}
                        />
                    </View>
                )}
            </SafeAreaView>
        </ThemeAwareBackground>
    );
}
