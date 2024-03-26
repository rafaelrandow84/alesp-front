import { VStack, Text, ScrollView, Avatar, Divider } from 'native-base'
import { Titulo } from '../componentes/Titulo'

export default function Principal(){
  return(
    <ScrollView flex={1}>
      <VStack flex={1} alignItems="center" p={1}>
        <Titulo color="blue.500" mt={5}>Meu Perfil</Titulo>

        <Avatar size="xl" source={{ uri: "https://github.com/rafaelrandow.png" }} mt={5} />

        <Titulo color="blue.500">Informações pessoais</Titulo>
        <Titulo fontSize="lg" mb={1}>Rafael Randow</Titulo>
        <Text>06/02/1984</Text>
        <Text>São Paulo</Text>

        <Divider mt={5} />

        <Titulo color="blue.500" mb={1}>Informações profissionais</Titulo>
        
        <Titulo fontSize="lg" mb={1}>Cargo atual</Titulo>
        <Text>Técnico Legislativo</Text>
        
        <Titulo fontSize="lg" mb={1}>Lotação atual</Titulo>        
        <Text>DIVISÃO DE TECNOLOGIA DA INFORMAÇÃO</Text>
      </VStack>
    </ScrollView>
  )
}