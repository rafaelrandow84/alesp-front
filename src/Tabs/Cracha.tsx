import { VStack, Stack, HStack, Heading, Image, Box, ScrollView, Text, Divider, AspectRatio, Center } from "native-base";
import Cracha from '../assets/cracha.png';
import { Botao } from "../componentes/Botao";
import { EntradaTexto } from "../componentes/EntradaTexto";
import { Titulo } from "../componentes/Titulo";
import Logo from '../assets/Logo.png';

export default function Boxter(){

  return (<ScrollView><Box alignItems="center">
      <Box  mt={1}  maxW="80" rounded="lg" overflow="hidden">
        {/* <Box >
        <Image source={Logo} alt="Logo" mt={1} mb={2} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
        </Box> */}
        <Titulo color="blue.500" mt={5}>Identificação</Titulo>
        <VStack p="2" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Rafael Randow Grossi 
            </Heading>
            <Text fontSize="xs" _light={{
            color: "green.900"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              Servidor ALESP
            </Text>
          </Stack>
         </VStack>
          
          <AspectRatio w="100%" ratio={5/ 16}>
            <Image source={Cracha} alt="Logo" mx={2} mt={5} style={{ width: '100%', height: 100, resizeMode: 'contain' }} />
        
          </AspectRatio>
       
      </Box>
    </Box>
    </ScrollView> );
};