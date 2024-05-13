import { View } from "react-native";
import GlobalWebView from "@/components/GlobalWebView";

export default function Functional() {
  return (
    <View style={{ flex: 1, paddingBottom: 10 }}>
      <GlobalWebView source={{ uri: "https://www.e-folha.prodesp.sp.gov.br/desc_dempagto/entrada.asp?cliente=050" }} />
    </View>
  );
}
