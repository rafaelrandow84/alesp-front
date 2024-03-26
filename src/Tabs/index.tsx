import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'

import Principal from "./Principal";
import Boxter from "./Boxter";

import Eventos from "./Eventos";
import Cracha from "./Cracha";
import Perfil from "./Perfil";
import QRCode from "./QRCode";
import Consultas from "./Consultas";

const Tab = createBottomTabNavigator()

const screenOptions = {
  tabBarStyle: {
    backgroundColor: "#002851",
    height:70,
    paddingTop: 5,
    paddingBottom: 10
  },
  tabBarActiveTintColor: "#339cff",
  tabBarInactiveTintColor: "#FFF"
}

const tabs = [
  {
    name: 'Principal',
    component: Principal,
    icon: 'home'
  },
  {
    name: 'Cartilha',
    component: Boxter,
    icon: 'book'
  },
  {
    name: 'Eventos',
    component: Eventos,
    icon: 'calendar'
  },
  {
    name: 'Identificação',
    component: Cracha,
    icon: 'finger-print'
  },
  {
    name: 'QRCode',
    component: QRCode,
    icon: 'qr-code'
  },
]

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} color={color} size={size} />
            )
          }}
        />
      ))
      }
    </Tab.Navigator>
  )
}