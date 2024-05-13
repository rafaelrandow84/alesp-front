import { makeStyles } from "@rneui/themed";
import { PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle, StatusBar } from "react-native";

type ThemeAwareBackgroundProps = PropsWithChildren<{
    colorOverride?: string;
    style?: StyleProp<ViewStyle>;
}>;

export default function ThemeAwareBackground(props: ThemeAwareBackgroundProps) {
    const styles = useLocalStyles(props);
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
            <StatusBar barStyle="light-content" />
        </View>
    );
}

const useLocalStyles = makeStyles((theme, props: ThemeAwareBackgroundProps) => ({
    container: {
        flex: 1,
        backgroundColor: props.colorOverride || theme.colors.background,
    },
}));
