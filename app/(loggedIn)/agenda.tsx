import useAuth from "@/hooks/useAuth";
import { useGetCalendarioQuery } from "@/services/api";
import { Card, Text, useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    view: {
        margin: 10,
    },
    text: {
        textAlign: "center",
        padding: 10,
    },
    more: {
        marginVertical: 20,
    },
    button: {
        width: 120,
        marginLeft: "auto",
        marginRight: "auto",
    },
});

// Criar um componente de função que irá renderizar a página
export default function CalendarEventsPage() {
    const { theme } = useTheme();

    // Utilizar o hook useQuery para buscar os dados da API
    const { data: eventos, error: err, isLoading, isError, isSuccess } = useGetCalendarioQuery();

    const [accessToken, setAccessToken] = useState(null);
    const { refreshToken } = useAuth();

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

    // Renderizar os dados na página
    return (
        <>
            <Text style={styles.text} h4 h4Style={{ color: theme.colors.secondary }}>
                Calendário de Eventos
            </Text>
            {isLoading && <Text>Carregando...</Text>}
            {isError && <Text>Ocorreu um erro ao buscar os dados do calendário. {JSON.stringify(err)}</Text>}
            {isSuccess && (
                <ScrollView>
                    {eventos !== null &&
                        eventos.eventos.map((event) => (
                            <View key={event.DATA_EVENTO}>
                                <Card>
                                    <Card.Title> {event.DATA_EVENTO}</Card.Title>
                                    <Card.Divider />
                                    <Text>{event.DESCRICAO}</Text>
                                </Card>
                            </View>
                        ))}
                </ScrollView>
            )}
        </>
    );
}
