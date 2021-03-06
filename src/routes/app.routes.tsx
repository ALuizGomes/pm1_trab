import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

const { Navigator, Screen } = createBottomTabNavigator()

import { Dashboard } from '../pages/Dashboard'
import { ListUsers } from '../pages/ListUsers'
import { SearchUsers } from '../pages/SearchUsers'

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ff872c',
        tabBarInactiveTintColor: '#969cb2',
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          height: 88
        }
      }}
    >
      <Screen
        name="Cadastro"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) =>
            <AntDesign
              name='adduser'
              size={size}
              color={color}
            />
          )
        }}
      />
      <Screen
        name="Listagem"
        component={ListUsers}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather
              name='list'
              size={size}
              color={color}
            />
          )
        }}
      />

      <Screen
        name="Pesquisa"
        component={SearchUsers}
        options={{
          tabBarIcon: (({ size, color }) =>
            <Feather
              name='search'
              size={size}
              color={color}
            />
          )
        }}
      />

    </Navigator>
  )
}