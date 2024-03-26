import { NativeBaseProvider, StatusBar, HStack, Image, Text } from 'native-base';
import { TEMAS } from './src/estilos/temas';
import { Botao } from './src/componentes/Botao';
import Logo from './src/assets/alesp.png';
import Rotas from './src/Rotas';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator()
const screenOptions = {
  tabBarStyle: {
    height:70,
    backgroundColor: '#0B3B60',
  },
  tabBarActiveTintColor: "transparent",  
  tabBarInActiveTintColor: "transparent",
}
export default function App() {
  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.blue[800]} />
      <HStack bg={TEMAS.colors.blue[800]} w="100%" px={5} alignItems={"center"}>  
      <NavigationContainer >
      <Image source={Logo} alt="Logo" style={{ width: 66, height: 66, resizeMode: 'contain' }} />
      <Text 
        color="white" pr={5} w="74%"  fontSize="lg"
        fontWeight="bold"
        textAlign="center">Alesp Mobile</Text>      
      <Ionicons name="person-circle-outline" color={TEMAS.colors.white} size={32}/> 
      {/* <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen 
          name='notification' 
          component={Botao}
          options={{
            tabBarIcon: () => (
              ),
            }}
        />
      </Tab.Navigator> */}
      {/* <Ionicons name="log-out-outline" color={TEMAS.colors.white} size={32}/>  */}
      </NavigationContainer>
      </HStack>
      <Rotas />
    </NativeBaseProvider>
  );
}
