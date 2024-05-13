import { Text } from "@rneui/themed";
import { BarCodePoint, BarCodeScanner } from "expo-barcode-scanner";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { Button, Platform, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { useAppStyles } from "@/helper/helper";
import useInterval from "@/hooks/useInterval";

export default function CameraPage() {
  const [permission, requestPermission] = BarCodeScanner.usePermissions();
  const [cornerPoints, setCornerPoints] = useState<BarCodePoint[]>();
  const [data, setData] = useState<string>();
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const styles = useAppStyles();

  function getDimensions(e) {
    setHeight(e.nativeEvent.layout.height);
    setWidth(e.nativeEvent.layout.width);
  }

  const cornerPointsAsString = useMemo(() => {
    if (!cornerPoints) return "";
    return cornerPoints
      .map((point) => {
        return `${point.x},${point.y}`;
      })
      .join(" ");
  }, [cornerPoints]);

  useInterval(() => {
    setCornerPoints(undefined);
  }, 1000);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Leitor de QRCode não suportado na web</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>Precisamos da sua permissão para mostrar a câmera</Text>
        <Button onPress={requestPermission} title="Dar permissão" />
      </View>
    );
  }

  return (
    <>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        onBarCodeScanned={(e) => {
          setCornerPoints(e.cornerPoints);
          setData(e.data);
        }}
        onLayout={getDimensions}
      >
        <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
          <Polygon
            points={cornerPointsAsString}
            fill="yellow"
            fillOpacity={0.3}
            stroke="yellow"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </Svg>
      </BarCodeScanner>
      <Text
        style={[styles.text_centered, styles.qrcode_data_block]}
        numberOfLines={2}
        minimumFontScale={0.1}
        adjustsFontSizeToFit={true}
        onPress={() => {
          // Alert.alert(data);
          router.back();
          // stopInterval();
        }}
      >
        {data}
      </Text>
    </>
  );
}
