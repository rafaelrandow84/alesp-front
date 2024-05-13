import { useRef, useState } from "react";
import { Button, Text, Platform, View } from "react-native";
import WebView from "react-native-webview";
import { WebViewSourceUri } from "react-native-webview/lib/WebViewTypes";
import * as WebBrowser from "expo-web-browser";

export type PdfEmbedProps = {
    source: WebViewSourceUri;
};

export default function GlobalWebView(props: PdfEmbedProps) {
    let webview = useRef<WebView>(null);
    const [result, setResult] = useState(null);
    const _handlePressButtonAsync = async () => {
        let result = await WebBrowser.openBrowserAsync(props.source.uri);
        setResult(result);
    };
    const handleWebViewNavigationStateChange = (newNavState) => {
        const { url } = newNavState;
        if (!url) return;

        // Desabilita navegação dentro do PDF
        if (url !== props.source.uri) {
            webview.current.stopLoading();
        }
    };
    return (
        <>
            {Platform.OS === "android" && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Button title="Visualizar" onPress={_handlePressButtonAsync} />
                    <Text>{result && JSON.stringify(result)}</Text>
                </View>
            )}
            {Platform.OS === "ios" && (
                <WebView
                    ref={(ref) => (webview.current = ref)}
                    source={props.source}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                />
            )}
            {Platform.OS === "web" && <iframe title="cartilha" style={{ flex: 1 }} src={props.source.uri} />}
        </>
    );
}
