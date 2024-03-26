import { VStack, Box, ScrollView, Text, Button, Modal, Checkbox } from "native-base";
import { Titulo } from "../componentes/Titulo";
import { PDFExample } from "../componentes/PDFExample";

let isOpen = false;
let onClose = true;
export default function Boxter(){

  return (
    <ScrollView  bgColor="white">
      <VStack flex={1} alignItems="flex-start" justifyContent="flex-start" px={5} >
        <Titulo color="blue.500" mt={5}>Bem-vindo</Titulo>
         <Text py={5}>Para continuar, leia a Cartilha Comportamental Alesp:</Text> 
        <Box w="100%" borderRadius="lg" px={5} mt={0} shadow="1" borderRightRadius="md" >
          <PDFExample />
          <Button onPress={() => isOpen = true}>Cartilha Comportamental</Button>
      <Modal isOpen={isOpen} onClose={onClose} _backdrop={{
      _dark: {
        bg: "coolGray.800"
      },
      bg: "warmGray.50"
    }}>
        <Modal.Content maxWidth="350" maxH="312">
          <Modal.CloseButton />
          <Modal.Header>Cartilha</Modal.Header>
          <Modal.Body>
          Esta cartilha tem por objetivo criar mecanismos de
          prevenção e enfrentamento do assédio moral.
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Checkbox  value="test" accessibilityLabel="This is a dummy checkbox">
                Li e concordo
              </Checkbox>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
        </Box>
        </VStack>
    </ScrollView>
  );
}
