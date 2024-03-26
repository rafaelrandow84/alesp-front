import { Text, Avatar, VStack } from 'native-base'
import { Botao } from './Botao'

interface CardProps {
  data?: string;
  nome: string;
  foto: string;  
  descricao:string;
}

export function CardEvento({
  data,
  nome,
  foto,
  descricao, 
}: CardProps){
  return(
    <VStack w="100%" bg={'white'} p="5" borderRadius="lg" shadow="2" mb={5}>
      <VStack flexDir="row">
        <Avatar size="lg" source={{ uri: foto }} />
        <VStack pl="4">
          <Text>{data}</Text>
          <Text fontSize="md" bold>{nome}</Text>
          <Text isTruncated maxW="300" w="80%">{descricao}</Text>
        </VStack>
      </VStack>
      {/* <Botao mt={4}>
        {foiAgendado ? 'Cancelar' : 'Agendar'}
      </Botao> */}
    </VStack>
  )
}