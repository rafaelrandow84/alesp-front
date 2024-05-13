import SectionListSectionHeader from "@/components/SectionListSectionHeader";
import { useGetDeputadosQuery } from "@/services/api";
import { Avatar, Divider, ListItem, Text, useTheme } from "@rneui/themed";
import { useEffect, useState } from "react";
import { SectionList } from "react-native";

export default function Deputados() {
    const { data: deputados, isLoading, isError, isSuccess } = useGetDeputadosQuery();
    useEffect(() => {
        if (!deputados || isLoading) return;
        const deps = {};
        deputados.forEach((c) => {
            if (c.partido in deps) {
                deps[c.partido].push(c);
            } else {
                deps[c.partido] = [c];
            }
        });
        let final = [];
        for (const [title, data] of Object.entries(deps).sort()) {
            final.push({ title, data });
        }
        setDATA(final);
    }, [deputados, isLoading]);

    const { theme } = useTheme();
    const [DATA, setDATA] = useState([]);

    return (
        <>
            {isLoading && <Text>Carregando...</Text>}
            {isError && <Text>Ocorreu um erro ao buscar os dados do calendário.</Text>}
            {isSuccess && (
                <SectionList
                    sections={DATA}
                    ItemSeparatorComponent={() => <Divider />}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                        <ListItem>
                            <Avatar rounded source={{ uri: item.pathFoto }} size={64} />
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: "bold" }}>{item.nomeParlamentar}</ListItem.Title>
                                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionListSectionHeader>{title}</SectionListSectionHeader>
                    )}
                    style={{ backgroundColor: theme.colors.background }}
                />
            )}
        </>
    );
}
