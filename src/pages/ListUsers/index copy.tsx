import AsyncStorage from '@react-native-async-storage/async-storage';

import { useState, useEffect } from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native'

import { Header } from "../../components/Header";

interface ListUsersProps {
  id: string;
  name: string;
  cpf: string;
  banco_agencia: string;
  conta: string;
  salario: string;
}

export function ListUsers() {
  const [users, setUsers] = useState<ListUsersProps[]>([])

  async function loadDataUser() {
    const data = await AsyncStorage.getItem('@si:users')
    if (data) {
      setUsers(JSON.parse(data))
    }
  }

  useEffect(() => {
    loadDataUser()
  }, [])

  return (
    <View style={styles.container}>
      <Header title='Listam de Usuários' />
      <FlatList data={users} keyExtractor={item => item.id} renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>Nome: {item.name}</Text>
            <Text>CPF: {item.cpf}</Text>
            <Text>Banco/Agencia: {item.banco_agencia}</Text>
            <Text>Conta: {item.conta}</Text>
            <Text>Salaraio: {item.salario}</Text>
          </TouchableOpacity>
        )} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f2f5'
  }
})