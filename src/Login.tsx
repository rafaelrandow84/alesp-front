import { VStack, Image, Text, Box, Link } from 'native-base'
import { TouchableOpacity } from 'react-native';
import Logo  from './assets/Logo.png'
import { Botao } from './componentes/Botao';
import { EntradaTexto } from './componentes/EntradaTexto';
import { Titulo } from './componentes/Titulo';

export default function Login({ navigation }) {
  return (
    <VStack flex={1} alignItems="center" justifyContent="center" p={5}>
      <Image source={Logo} alt="Logo" style={{ width: '100%', height: 100, resizeMode: 'contain' }} />

      <Titulo>
        Faça login em sua conta
      </Titulo>
      <Box>
        <EntradaTexto
          label="Usuário"
          placeholder="Insira seu usuário"
        />
        <EntradaTexto
          label="Senha"
          placeholder="Insira sua senha"
        />
      </Box>
      <Botao onPress={() => navigation.navigate('Tabs')} variant="link">Entrar</Botao>

      <Link href='https://app.al.sp.gov.br/sspr/public/forgottenpassword' mt={2}>
        Esqueceu sua senha?
      </Link>

      <Box w="100%" flexDirection="row" justifyContent="center" mt={8}>
        <Text>Ainda não tem cadastro? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text color="blue.500">
            Faça seu cadastro!
          </Text>
        </TouchableOpacity>
      </Box>
    </VStack>
  );
}