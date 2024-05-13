import { Text, useTheme } from "@rneui/themed";
import { PropsWithChildren } from "react";

export default function SectionListSectionHeader(props: PropsWithChildren<{}>) {
  const { theme } = useTheme();
  return (
    <Text h3 style={{ padding: 5, color: theme.colors.white, backgroundColor: theme.colors.tertiary }}>
      {props.children}
    </Text>
  );
}
