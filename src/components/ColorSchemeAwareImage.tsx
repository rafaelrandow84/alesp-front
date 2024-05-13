import { Image, useThemeMode } from "@rneui/themed";
import { useMemo } from "react";
import { ImageSourcePropType, ImageStyle, StyleProp } from "react-native";

type ColorSchemeAwareImageProps = {
  darkSource: ImageSourcePropType;
  lightSource: ImageSourcePropType;
  style: StyleProp<ImageStyle>;
};

export default function ColorSchemeAwareImage({ darkSource, lightSource, style }: ColorSchemeAwareImageProps) {
  const { mode } = useThemeMode();

  const source = useMemo(() => {
    return mode === "dark" ? darkSource : lightSource;
  }, [mode]);

  return <Image source={source} style={style} />;
}
